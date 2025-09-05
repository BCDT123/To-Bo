import HeaderHome from "./Header";
import ProtectedLayout from "@/components/ProtectLayout";

export default function Home() {
  return (
    <ProtectedLayout>
      <HeaderHome />
    </ProtectedLayout>
  );

  {
    /* <HelloPage /> */
  }
  {
    /* <div className="card">
        <h2 className="text-xl font-bold">Hola,👋</h2>
        <p>Esta web cambia según el tema.</p>
      </div> */
  }

  {
    /* <div>{user ? <p>Bienvenido, {user.displayName}</p> : <Login />}</div> */
  }
}
