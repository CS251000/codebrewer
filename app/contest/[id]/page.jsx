
"use client";
import { useParams } from "next/navigation";
import ContestHeader from "@/components/Contest/ContestHeader";
import Timer from "@/components/Contest/Timer";
import ContestProblems from "@/components/Contest/ContestProblems";
import Leaderboard from "@/components/Contest/Leaderboard";
import NavBar from "@/components/HomePage/NavBar"
import { SignedIn,SignedOut,SignInButton } from "@clerk/nextjs";
export default function Page() {
  const {id}= useParams();
  const contest = {
    title: `CodeArena Weekly Contest ${id}`,
    date: 'Aug 10, 2024',
    endTime: '2024-08-10T15:00:00', // End time of the contest
  };
  return (
    <div className="bg-gray-900 text-gray-100">
      <NavBar/>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className=" text-gray-100 min-h-screen p-6">
          <SignedIn>
      <div className="max-w-5xl mx-auto">
        <ContestHeader title={contest.title} date={contest.date} />
        <Timer endTime={contest.endTime} />
        <ContestProblems />
        <Leaderboard />
      </div></SignedIn>
      {/* <SignedOut><SignInButton/></SignedOut> */}
    </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

  )
}



