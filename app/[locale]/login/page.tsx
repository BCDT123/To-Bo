// src/app/page.tsx (o cualquier componente)
"use client";
import { useTranslations } from "next-intl";

//Components
import Image from "next/image";
import Login from "@/features/login/Login";
import LogoutButton from "@/features/login/LoginOut";
import InputWithIcon from "@/components/Input";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

//icons
import { MdEmail } from "react-icons/md";
import letter from "@/public/favicon/letter.png";

export default function LoginPage() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

  return (
    <section className="flex flex-col gap-6 justify-center items-center w-xs sm:w-sm lg:w-md h-screen mx-auto my-auto">
      <div>
        <Image
          priority={false}
          src={letter}
          width={300}
          alt="Picture of the author"
        />
      </div>

      <div className="flex flex-col justify-center text-center">
        <h1 className="text-lg font-semibold">{tAuth("createAccount")}</h1>
        <h2>{tAuth("addEmailMsg")}</h2>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <InputWithIcon
          icon={<MdEmail />}
          type="email"
          placeholder="example@email.com"
        ></InputWithIcon>

        <Button>{tCommon("continue")}</Button>
      </div>
      <div className=" w-full">
        <Divider text={tCommon("or")} />
      </div>
      <div className="flex flex-col w-full">
        <Login />
      </div>

      {/* <div>
        <LogoutButton />
      </div> */}
    </section>
  );
}
