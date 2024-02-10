import { WidgetItem } from "@/components";
import React from "react";

export default function DashboardPage() {
  return (
    <>
      {/* Este contenido va dentro de page.tsx */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* TODO: src/components <WidgetItem /> */}
        <WidgetItem />
        {/* TODO: Fin <WidgetItem /> */}
      </div>
      {/* TODO: fin del dashboard/page.tsx  */}
    </>
  );
}
