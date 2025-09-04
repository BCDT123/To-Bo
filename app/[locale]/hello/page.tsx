// src/app/page.tsx (o cualquier componente)
"use client";
import { useEffect, useState } from "react";
import { userService } from "@/features/users/userService";
import { useTranslations } from "next-intl";
import Login from "@/components/Login";
import LogoutButton from "@/components/LoginOut";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function HelloPage() {
  const t = useTranslations("greetings");

  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    userService.getUsers().then(setUsers).catch(console.error);
  }, []);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="card">
      <h1>{t("greeting1")} Usuarios</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
      <div>{user ? <p>Bienvenido, {user.displayName}</p> : <Login />}</div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
