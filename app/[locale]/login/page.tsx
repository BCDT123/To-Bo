"use client";

import { useTranslations } from "next-intl";

//Components
import Image from "next/image";
import Divider from "@/shared/components/atoms/Divider";

//icons
import letterImg from "@/public/favicon/letter.png";
import LoginGoogle from "@/modules/auth/components/LoginGoogle";
import LoginMail from "@/modules/auth/components/LoginMail";

export default function LoginPage() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

  return (
    <section className="flex flex-col gap-6 justify-center items-center w-xs sm:w-sm lg:w-md h-screen mx-auto my-auto">
      <div>
        <Image priority={false} src={letterImg} width={300} alt="Logo" />
      </div>

      <div className="flex flex-col justify-center text-center">
        <h1 className="text-lg font-semibold">{tAuth("createAccount")}</h1>
        <h2>{tAuth("addEmailMsg")}</h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* email login */}
        <LoginMail />
      </div>
      <div className=" w-full">
        <Divider text={tCommon("or")} />
      </div>
      <div className="flex flex-col w-full">
        {/* google login */}
        <LoginGoogle />
      </div>
    </section>
  );
}
