"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export const SidebarItem = ({ title, icon, path }: Props) => {
  const usePathName = usePathname();
  return (
    <>
      <li>
        <Link
          href={path}
          className={`
          px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
          hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400
          ${
            usePathName === path
              ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              : ""
          }`}
        >
          {icon}
          <span className="group-hover:text-gray-700">{title}</span>
        </Link>
      </li>
    </>
  );
};
