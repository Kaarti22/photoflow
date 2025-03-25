"use client";
import {
  Heart,
  HomeIcon,
  LogOutIcon,
  MessageCircle,
  Search,
  SquarePlus,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "sonner";

const LeftSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(
      `${BASE_API_URL}/users/logout`,
      {},
      { withCredentials: true }
    );

    dispatch(setAuthUser(null));
    toast.success("Logout sucessfully");
    router.push("/auth/login");
  }

    const handleSideBar = (label: string) => {
      if (label === "Home") router.push("/");
      if (label === "Logout") handleLogout();
    };

    const SidebarLinks = [
      {
        icon: <HomeIcon />,
        label: "Home",
      },
      {
        icon: <Search />,
        label: "Search",
      },
      {
        icon: <MessageCircle />,
        label: "Message",
      },
      {
        icon: <Heart />,
        label: "Notification",
      },
      {
        icon: <SquarePlus />,
        label: "Create",
      },
      {
        icon: (
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={user?.profilePicture}
              className="h-full w-full text-sm font-medium"
            />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        ),
        label: "Profile",
      },
      // {
      //   icon: (
      //     <Avatar className="w-6 h-6">
      //       {" "}
      //       {/* Match icon size */}
      //       <AvatarImage src={user?.profilePicture} className="object-cover" />
      //       <AvatarFallback className="bg-gray-100 text-sm font-medium">
      //         {user?.username?.slice(0, 2).toUpperCase() || "ME"}
      //       </AvatarFallback>
      //     </Avatar>
      //   ),
      //   label: "Profile",
      // },
      {
        icon: <LogOutIcon />,
        label: "Logout",
      },
    ];

    return (
      <div className="h-full">
        <div className="lg:p-6 p-3 cursor-pointer">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="relative w-[90%] h-[5%] lg:p-6 p-3 cursor-pointer"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo"
              fill
              className="object-cover mt-[2rem] ml-[-1rem]"
            />
          </div>
          <div className="mt-20">
            {SidebarLinks.map((link) => {
              return (
                <div
                  key={link.label}
                  className="flex items-center mb-2 p-3 rounded-lg group cursor-pointer transition-all duration-200 hover:bg-gray-100 space-x-2"
                  onClick={() => handleSideBar(link.label)}
                >
                  <div className="group-hover:scale-110 transistion-all duration-200">
                    {link.icon}
                  </div>
                  <p className="lg:text-lg text-base">{link.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};


export default LeftSidebar;
