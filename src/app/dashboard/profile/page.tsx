"use client";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
interface IUserProfile {
  name?: string;
  email?: string;
  image?: string;
}
export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<IUserProfile>();

  useEffect(() => {
    if (session) {
      const user = session.user;
      setProfile({
        name: user?.name || "No name",
        email: user?.email || "No Email",
        image: user?.image || "No Image",
      });
    }
  }, [session]);

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <div className="flex flex-col">
        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src={profile?.image || "/images/1700280-00-A_1.jpg"}
            alt=""
            width={150}
            height={150}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {profile?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>
      </div>
    </div>
  );
}
