"use client";

import { Book, File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
    {
      id: 4,
      name: "About",
      icon: Book,
      path: "/about",
    },
  ];

  const [activeIndex, setActiveIndex] = useState();
  const router = useRouter();

  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5 border-b flex justify-between">
        <Link href="/">
          <Image src="/logo.svg" width={150} height={100} alt="logo" />
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="flex flex-col float-left w-full">
        {menuList.map((item, index) => (
          <button
            key={index}
            className={`flex gap-2 p-4 px-8 hover:bg-gray-100 w-full text-gray-500 ${
              activeIndex == index ? "bg-gray-50 text-primary" : null
            } `}
            onClick={() => {
              setActiveIndex(index);
              router.push(item.path);
            }}
          >
            <item.icon />
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
