import { useState, useEffect, useCallback, useRef } from "react";

import { WebContainer } from "@webcontainer/api";

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

    async function initializeWebContainer() {
      try {
        const webContainerInstance = await WebContainer.boot();

        webContainerInstance.on("server-ready", (port, url) => {
          console.log("Server ready:", url);

          if (mounted) {
            setServerUrl(url);
          }
        });

        if (!mounted) {
          webContainerInstance.teardown();
          return;
        }

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

      // DON'T teardown here
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
