import HelloPage from "./hello/page";

export default function Home() {
  return (
    <>
      <HelloPage />
      <div className="card">
        <h2 className="text-xl font-bold">Hola,👋</h2>
        <p>Esta web cambia según el tema.</p>
      </div>
    </>
  );
}
