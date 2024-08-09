// "use client"
import React from "react";
import Link from "next/link";
import MobileNav from "./Mobilenav";
import { forwardRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-50">
      <div
        aria-label="Global"
        className="flex items-center justify-between lg:justify-center p-6 lg:px-10"
      >
        <div className="flex lg:hidden">
          <MobileNav />
        </div>
        <div className="flex lg:flex-1">
          <Link href={"/"}>
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">EventHub</span>
              <Image
                src={"/assets/images/codelogo.png"}
                alt={"logo"}
                height={90}
                width={120}
              />
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                
                  <NavigationMenuLink href="/playground"
                    className={
                      navigationMenuTriggerStyle() + " text-gray-100 text-xl"
                    }
                  >
                    Playground
                  </NavigationMenuLink>
                
              </NavigationMenuItem>
              <NavigationMenuItem>
                
                  <NavigationMenuLink href="/problems"
                    className={
                      navigationMenuTriggerStyle() + " text-gray-100 text-xl"
                    }
                  >
                    Problems
                  </NavigationMenuLink>
                
              </NavigationMenuItem>
              <NavigationMenuItem>
                
                  <NavigationMenuLink href="/battleground"
                    className={
                      navigationMenuTriggerStyle() + " text-gray-100 text-xl"
                    }
                  >
                    Battle Ground
                  </NavigationMenuLink>
                
              </NavigationMenuItem>
              <NavigationMenuItem>
                
                  <NavigationMenuLink href="/discussion"
                    className={
                      navigationMenuTriggerStyle() + " text-gray-100 text-xl"
                    }
                  >
                    Discussion
                  </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-around">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-semibold leading-6 text-blue-100">
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href="#" >
          <div
            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-gray-100 ${className}`}
            ref={ref}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-gray-400">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
