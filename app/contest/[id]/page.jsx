"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ContestHeader from "@/components/Contest/ContestHeader";
import Timer from "@/components/Contest/Timer";
import ContestProblems from "@/components/Contest/ContestProblems";
import Leaderboard from "@/components/Contest/Leaderboard";
import NavBar from "@/components/HomePage/NavBar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import {  doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function Page() {
  const { id } = useParams(); // Get the contest ID from the URL
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    const fetchContestAndProblems = async () => {
      try {
        // Fetch contest document
        const contestRef = doc(db, 'contests', id);
        const contestSnap = await getDoc(contestRef);
        const contestData = contestSnap.data();
        
        if (contestData) {
          setContest({
            title: contestData.title,
            date: contestData.date.toDate().toDateString(), // Adjust as needed
            endTime: contestData.endTime, // Ensure this is in the correct format
          });
          
          // Fetch problem documents based on questionids
          const problemsQuery = query(collection(db, 'problems'), where('__name__', 'in', contestData.questionids));
          const problemsSnap = await getDocs(problemsQuery);
          const problemsData = problemsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          setProblems(problemsData);
        }
      } catch (error) {
        console.error("Error fetching contest or problems: ", error);
      }
    };
    
    fetchContestAndProblems();
  }, [id]);
  
  if (!contest) return <p>Loading...</p>;
  
  return (
    <div className="bg-gray-900 text-gray-100">
      <NavBar />
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

        <div className="text-gray-100 min-h-screen p-6">
          <SignedIn>
            <div className="max-w-5xl mx-auto">
              <ContestHeader title={contest.title} date={contest.date} />
              <Timer endTime={contest.endTime} />
              <ContestProblems problems={problems} /> {/* Pass the problems to the component */}
              <Leaderboard />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
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
    </div>
  );
}
