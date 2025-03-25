"use client";
import React from 'react'
import { useSelector } from 'react-redux'
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet';
import Feed from './Feed';
import { useRouter } from 'next/navigation';

const Home = () => {

  return (
    <div className="flex">
      <div className="w-[20%] hidden md:block border-r-2 h-screen fixed ">
        <LeftSidebar />
      </div>
      <div className="flex-1 md:ml-[20%] overerflow-y-auto">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>

            <SheetContent>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
              <LeftSidebar />
            </SheetContent>
          </Sheet>
        </div>
        <Feed />
      </div>
      <div className="w-[30%] pt-8 px-6 lg:block hidden ">
        <RightSidebar />
      </div>
    </div>
  );
}

export default Home