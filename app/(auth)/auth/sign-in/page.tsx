import SignInFormClient from "@/modules/auth/components/sign-in-form-client";
import Image from "next/image";
import React from "react";

function SignIn() {
  return (
    <>
      <Image
        src={"/login.svg"}
        alt="login-img"
        height={300}
        width={300}
        className="m-6 object-cover"
      />
      <SignInFormClient />
    </>
  );
}

export default SignIn;
