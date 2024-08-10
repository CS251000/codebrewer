"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "./Timer/Timer";
import { useRouter, usePathname } from "next/navigation";
import { problems } from "@/utils/problems";

const Topbar = ({ problemPage }) => {
    const router = useRouter();
    const pathname = usePathname();
    const pid = pathname.split("/").pop(); // Extract the problem id from the URL

    const handleProblemChange = (isForward) => {
        const { order } = problems[pid];
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = order + direction;
        const nextProblemKey = Object.keys(problems).find(
            (key) => problems[key].order === nextProblemOrder
        );

        if (isForward && !nextProblemKey) {
            const firstProblemKey = Object.keys(problems).find(
                (key) => problems[key].order === 1
            );
            router.push(`/problems/${firstProblemKey}`);
        } else if (!isForward && !nextProblemKey) {
            const lastProblemKey = Object.keys(problems).find(
                (key) => problems[key].order === Object.keys(problems).length
            );
            router.push(`/problems/${lastProblemKey}`);
        } else {
            router.push(`/problems/${nextProblemKey}`);
        }
    };

    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
            <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
                <Link href='/' className='h-[22px] flex-1'>
                    <Image src='/assets/images/codelogo.png' alt='Logo' height={100} width={100} />
                </Link>

                {problemPage && (
                    <div className='flex items-center gap-4 flex-1 justify-center'>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(false)}
                        >
                            <FaChevronLeft />
                        </div>
                        <Link
                            href='/'
                            className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
                        >
                            <div>
                                <BsList />
                            </div>
                            <p>Problem List</p>
                        </Link>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
                            onClick={() => handleProblemChange(true)}
                        >
                            <FaChevronRight />
                        </div>
                    </div>
                )}

                {problemPage && <Timer />}
            </div>
        </nav>
    );
};

export default Topbar;
