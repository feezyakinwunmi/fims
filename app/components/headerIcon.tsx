"use client"
import help from '@/public/icons/help.png';
import logout from '@/public/icons/logout.png';
import setting from '@/public/icons/setting.png';
import { IoChevronDownSharp } from  'react-icons/io5';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '../../components/ui/dropdown-menu';
  import Image from 'next/image';
  import Link from 'next/link';
  import { Avatar, AvatarFallback } from '../../components/ui/avatar';
  import { useState } from 'react';


export const HeaderIcons = () => {
  const [loading, ] = useState<boolean>(true); // Loading state for fetching cart
  const handleLogout = () => {
    // Clear userId from localStorage
    localStorage.removeItem("user");
  
    // Optionally clear other stored da  
    // Redirect to login page or home page
    window.location.href = "/"; // Replace with your desired redirect path
  };
    return(
        <div className="header-icons">
            <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:ring-0 focus-within:ring-0 focus-within:border-none focus-within:outline-none">
            <span className="flex items-center gap-1 cursor-pointer">
              {/* Display the profile picture if available */}
              {loading ? (
                <span className="w-[46px] h-[46px] rounded-full bg-gray-200 animate-pulse" />
              ) : setting ? (
                <span className="object-contain w-[46px] h-[46px] hover:text-eweko_green_light cursor-pointer border-[1px] border-transparent hover:border-eweko_green_light transition-all duration-300 rounded-full hover:p-[2px] flex items-center justify-center">
                  <Image
                    src={setting}
                    alt="Profile"
                    width={46}
                    height={46}
                    loading="eager"
                    className="rounded-full bg-white object-cover w-[46px] h-[46px]"
                  />
                </span>
              ) : (
                // Fallback avatar if no image is available
                <Avatar className="border-[1px] border-transparent hover:border-eweko_green_light transition-all duration-300 rounded-full p-1 flex items-center justify-center hover:text-eweko_green_light cursor-pointer hover:p-[2px]">
                  <AvatarFallback className="bg-eweko_green_light text-white">
                    U
                  </AvatarFallback>
                </Avatar>
              )}
              {/* Dropdown arrow */}
              <IoChevronDownSharp
                size={18}
                className="text-eweko_green_light"
              />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute mt-10  -right-[50px] w-[180px]">
            {/* <DropdownMenuItem className="focus:text-eweko_green_light focus:bg-transparent border-b">
              <Link
                rel="prefetch"
                href="/buyers/settings"
                className="w-full flex justify-between"
              >
                Profile
                <span>
                  <Image src={setting} width={16} height={16} alt="settings" />
                </span>
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem className="focus:text-eweko_green_light focus:bg-transparent border-b  ">
              <Link
                rel="prefetch"
                href="/help"
                className="w-full flex justify-between "
              >
                Help
                <span>
                  <Image src={help} width={16} height={16} alt="settings" />
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:text-eweko_green_light focus:bg-transparent">
              <span
                // onClick={() => {
                //   setAuthToken(undefined);
                //   setLoggedInUser(null);
                // }}
                onClick={handleLogout}
                className="w-full flex justify-between"
              >
                Logout
                <span>
                  <Image src={logout} width={16} height={16} alt="settings" />
                </span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        </div>
    )
}