'use client';

import NavBar from "@/components/HomePage/NavBar";
import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useParams } from "next/navigation";

export default function Page() {
  const [problem, setProblem] = useState(null);
  const { id } = useParams();  // Assuming 'id' is the name of your dynamic route parameter

  useEffect(() => {
    async function fetchProblem() {
      const docRef = doc(db, "problems", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProblem(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
    fetchProblem();
  }, [id]);

  if (!problem) {
    return <div className="text-center text-red-500">Problem not found!</div>;
  }

  const difficultyColor =
    problem.difficulty === "Easy"
      ? "text-green-500"
      : problem.difficulty === "Medium"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <NavBar />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Problem Details Section */}
          <div className="lg:w-1/2 bg-white/20 p-6 rounded-lg shadow-md text-gray-800">
            <h1 className={`text-2xl font-semibold mb-4 text-gray-200`}>
              {problem.name}
            </h1>
            <p className="text-md mb-2">
              <strong>Difficulty:</strong> <span className={`${difficultyColor}`}>{problem.difficulty}</span>
            </p>
            <p className="mb-4">{problem.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Constraints */}
            <div className="mb-4">
              <h2 className="text-lg mb-2 text-black">Constraints:</h2>
              <p className="whitespace-pre-line text-gray-200">
                {problem.constraints}
              </p>
            </div>

            {/* Test Cases */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-black">Test Cases:</h2>
              <p className="whitespace-pre-line text-gray-200">
                {problem.testCases}
              </p>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="lg:w-1/2 flex flex-col">
            <CodeMirror
              value="// Start coding here..."
              height="400px"
              theme={dracula}
              extensions={[javascript()]}
              onChange={(value) => setCode(value)}
              className="rounded-lg shadow-md"
            />
            <Button variant="primary" className="mt-4 self-end bg-white/10">
              Submit
            </Button>
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
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
