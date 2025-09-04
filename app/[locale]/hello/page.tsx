// src/app/page.tsx (o cualquier componente)
"use client";
import { useEffect, useState } from "react";
import { apiService } from "@/services/firestore";
import { useTranslations } from "next-intl";

export default function HelloPage() {
  const t = useTranslations("greetings");

  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    apiService.getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div className="card">
      <h1>{t("greeting1")} Usuarios</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
