"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from "@/components/HomePage/NavBar";
import { useUser } from '@clerk/nextjs'; // Import Clerk hook for user info
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default function Page() {
  const { user } = useUser(); // Get the current user from Clerk
  const [currentContest, setCurrentContest] = useState(null);
  const [pastContests, setPastContests] = useState([]);
  const [randomProblems, setRandomProblems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestsAndProblems = async () => {
      try {
        // Fetch current contest
        const currentContestQuery = query(collection(db, 'contests'), where('isCurrent', '==', true));
        const currentContestSnapshot = await getDocs(currentContestQuery);
        if (currentContestSnapshot.empty) {
          throw new Error("No current contest found.");
        }
        const currentContestData = currentContestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]; 
        const contestId = currentContestData.id;

        setCurrentContest({
          id: contestId,
          title: currentContestData.title,
          date: currentContestData.date.toDate().toDateString(), 
        });

        // Fetch past contests
        const pastContestsQuery = query(collection(db, 'contests'), where('isCurrent', '==', false));
        const pastContestsSnapshot = await getDocs(pastContestsQuery);
        const pastContestsData = pastContestsSnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          date: doc.data().date.toDate().toDateString() 
        }));
        setPastContests(pastContestsData);

        // Fetch problems
        const problemsQuery = query(collection(db, 'problems'));
        const problemsSnapshot = await getDocs(problemsQuery);
        if (problemsSnapshot.empty) {
          throw new Error("No problems found.");
        }
        const problemsData = problemsSnapshot.docs.map(doc => ({ id: doc.id, ref: doc.ref, ...doc.data() }));

        // Select 4 random problems
        const shuffledProblems = problemsData.sort(() => 0.5 - Math.random()); 
        const selectedProblems = shuffledProblems.slice(0, 4); 
        setRandomProblems(selectedProblems);

        // Prepare an array of references for the selected problems
        const problemRefs = selectedProblems.map(problem => problem.ref);
        const contestRef = doc(db, 'contests', contestId);
        await updateDoc(contestRef, { questionids: problemRefs });

      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      }
    };

    fetchContestsAndProblems();
  }, []);

  const handleRegisterClick = () => {
    const confirmed = window.confirm("Are you sure you want to start the contest?");
    if (confirmed) {
      if (user) {
        const username = user.username; // Fetch username from Clerk
        window.location.href = `/contest/${currentContest.id}`;
      } else {
        alert("User not logged in. Please log in to start.");
      }
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!currentContest) return <p>Loading...</p>;

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
        <div className="p-6 max-w-5xl mx-auto">

          {/* Current Contest */}
          <div className=" p-6 my-10 bg-gray-300 text-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Current Contest</h2>
            <p className="text-xl">{currentContest.title}</p>
            <p className="text-md text-gray-500">{currentContest.date}</p>
              <button onClick={handleRegisterClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Start the Contest Now
              </button>
            

            
            
          </div>

          {/* Past Contests */}
          <div className="past-contests mt-10">
            <h2 className="text-2xl font-semibold mb-4">Past Contests</h2>
            <ul>
              {pastContests.map(contest => (
                <li key={contest.id} className="mb-4">
                  <span className="text-xl">{contest.title}</span>
                  <span className="text-md text-gray-500"> - {contest.date}</span>
                </li>
              ))}
            </ul>
          </div>
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
  );
}
