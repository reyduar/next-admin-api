import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      {/* Este contenido va dentro de page.tsx */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* TODO: src/components <WidgetItem /> */}
        <WidgetItem title="User information from Server Side">
          <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </WidgetItem>
        {/* TODO: Fin <WidgetItem /> */}
      </div>
      {/* TODO: fin del dashboard/page.tsx  */}
    </>
  );
}
