"use client"
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";


export default function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleBack = () => setMobileMenuOpen(false);

  return (
    <>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex items-center justify-between p-4">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                src={'/assets/images/codelogo.png'}
                alt="logo"
                height={90}
                width={120}
              />
            </div>
            <button
              type="button"
              onClick={handleBack}
              className="-m-2.5 rounded-md p-2.5 text-gray-100"
            >
              <span className="sr-only">Close menu</span>
              <ArrowLeftIcon aria-hidden="true" className="h-6 w-6 text-gray-100" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-100/10">
              <div className="space-y-2 py-6">
                <Link href={'/playground'}>
                <button
                  className="block w-full text-left -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                >
                  Playground
                </button></Link>
                <Link href={'/problems'}>
                <button
                  className="block w-full text-left -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                >
                  Problems
                </button></Link>
                <Link href={'/contest'}>
                <button
                  className="block w-full text-left -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                >
                  Contest
                </button></Link>
                <Link href={'/discussion'}>
                <button
                  className="block w-full text-left -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                >
                  Discussion
                </button></Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
