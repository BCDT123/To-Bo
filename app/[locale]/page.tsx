import HeaderHome from "@/features/home/Header";
import ProtectedLayout from "@/features/login/ProtectLayout";

export default function Home() {
  return (
    //<ProtectedLayout>
    <section className="md:pt-10">
      <HeaderHome />
    </section>

    //</ProtectedLayout>
  );
}
