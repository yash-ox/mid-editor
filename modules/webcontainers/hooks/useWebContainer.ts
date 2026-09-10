import { useState, useEffect, useCallback, useRef } from "react";

import { WebContainer } from "@webcontainer/api";

let sharedInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;
let activeConsumers = 0;

const bootWebContainer = async (): Promise<WebContainer> => {
  if (sharedInstance) return sharedInstance;

  if (!bootPromise) {
    bootPromise = WebContainer.boot().then((webContainerInstance) => {
      sharedInstance = webContainerInstance;
      bootPromise = null;
      return webContainerInstance;
    });
  }

  return bootPromise;
};

const releaseWebContainer = () => {
  activeConsumers -= 1;

  if (activeConsumers > 0 || !sharedInstance) return;

  const webContainerInstance = sharedInstance;
  sharedInstance = null;
  webContainerInstance.teardown();
};

interface UseWebContainerReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destroy: () => void;
}

export const useWebContainer = (): UseWebContainerReturn => {
  const instanceRef = useRef<WebContainer | null>(null);

  const [instance, setInstance] = useState<WebContainer | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let released = false;
    activeConsumers += 1;

    const release = () => {
      if (released) return;

      released = true;
      releaseWebContainer();
    };

    async function initializeWebContainer() {
      try {
        const webContainerInstance = await bootWebContainer();

        webContainerInstance.on("server-ready", (port, url) => {
          console.log("Server ready:", url);

          if (mounted) {
            setServerUrl(url);
          }
        });

        if (!mounted) {
          release();
          return;
        }

        instanceRef.current = webContainerInstance;
        setInstance(webContainerInstance);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize WebContainer: ", error);

        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize WebContainer.",
          );

          setIsLoading(false);
        }
      }
    }

    initializeWebContainer();

    return () => {
      mounted = false;
      instanceRef.current = null;
      release();
    };
  }, []);

  const writeFileSync = useCallback(async (path: string, content: string) => {
    const webContainer = instanceRef.current;

    if (!webContainer) {
      throw new Error("WebContainer instance is not available.");
    }

    const pathParts = path.split("/");
    const folderPath = pathParts.slice(0, -1).join("/");

    if (folderPath) {
      await webContainer.fs.mkdir(folderPath, {
        recursive: true,
      });
    }

    await webContainer.fs.writeFile(path, content);
  }, []);

  const destroy = useCallback(() => {
    instanceRef.current?.teardown();

    instanceRef.current = null;

    setInstance(null);
    setServerUrl(null);
  }, []);

  return {
    serverUrl,
    isLoading,
    error,
    instance,
    writeFileSync,
    destroy,
  };
};
