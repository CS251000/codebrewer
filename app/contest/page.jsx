"use client"
import Link from 'next/link';
import NavBar from "@/components/HomePage/NavBar";
import { useUser } from '@clerk/nextjs'; // Import Clerk hook for user info

export default function Page() {
  const { user } = useUser(); // Get the current user from Clerk
  const currentContest = {
    id: 1,
    title: 'CodeArena Weekly Contest 250',
    date: 'Aug 10, 2024',
    registrationOpen: true,
  };

  const pastContests = [
    { id: 11, title: 'CodeArena Weekly Contest 249', date: 'Aug 03, 2024' },
    { id: 2, title: 'CodeArena Weekly Contest 248', date: 'Jul 27, 2024' },
    { id: 3, title: 'CodeArena Weekly Contest 247', date: 'Jul 20, 2024' },
    { id: 4, title: 'CodeArena Weekly Contest 246', date: 'Jul 13, 2024' },
    { id: 5, title: 'CodeArena Weekly Contest 245', date: 'Jul 06, 2024' },
    { id: 6, title: 'CodeArena Weekly Contest 244', date: 'Jun 29, 2024' },
    { id: 7, title: 'CodeArena Weekly Contest 243', date: 'Jun 22, 2024' },
    { id: 8, title: 'CodeArena Weekly Contest 242', date: 'Jun 15, 2024' },
    { id: 9, title: 'CodeArena Weekly Contest 241', date: 'Jun 08, 2024' },
    { id: 10, title: 'CodeArena Weekly Contest 240', date: 'Jun 01, 2024' },
  ];

  const handleRegisterClick = () => {
    const confirmed = window.confirm("Are you sure you want to register for this contest?");
    if (confirmed) {
      if (user) {
        const username = user.username; // Fetch username from Clerk
        window.location.href = `/contest/${currentContest.id}`;
      } else {
        alert("User not logged in. Please log in to register.");
      }
    }
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
        <div className="p-6 max-w-5xl mx-auto">

          {/* Current Contest */}
          <div className=" p-6 my-10 bg-gray-300 text-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Current Contest</h2>
            <p className="text-xl">{currentContest.title}</p>
            <p className="text-md text-gray-500">{currentContest.date}</p>
            {currentContest.registrationOpen && (
              <button onClick={handleRegisterClick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Register Now
              </button>
            )}
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
  )
}
