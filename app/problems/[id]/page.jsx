'use client';

import NavBar from "@/components/HomePage/NavBar";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useParams } from "next/navigation";
import axios from 'axios';
import CodeCompiler from "@/components/Playground/Playground";

export default function Page() {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('// Start coding here...');
  const [output, setOutput] = useState('');
  const [match, setMatch] = useState(false);
  const [problemWidth, setProblemWidth] = useState(600); 
  const { id } = useParams(); 

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

  const submitCode = async () => {
    if (problem) {
      try {
        const response = await axios.post('/run', {
          code,
          expectedOutput: problem.testCases,
        });
        
        setOutput(response.data.output);
        setMatch(response.data.match);
      } catch (error) {
        console.error('Error executing code:', error);
        setOutput('Error executing code');
        setMatch(false);
      }
    }
  };

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
          {/* Container for Problem Details and Code Editor */}
          <div className="flex flex-1">
            {/* Problem Details Section */}
            <div
              className="relative bg-white/20 p-6 rounded-lg shadow-md text-gray-800 resize-x overflow-auto"
              style={{ width: `${problemWidth}px` }}
            >
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

              {/* Resize Handle */}
              <div
                className="absolute right-0 top-0 h-full w-2 cursor-col-resize bg-gray-300"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const startWidth = problemWidth;
                  const onMouseMove = (event) => {
                    const newWidth = startWidth + (event.clientX - startX);
                    setProblemWidth(newWidth > 200 ? newWidth : 200); // Minimum width of 200px
                  };
                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              />
            </div>

            {/* Code Editor Section */}
            <div className="flex-1 flex flex-col ml-4">
              <div className="max-h-[400px] rounded-lg shadow-md">
                <CodeCompiler />
              </div>
              <Button variant="primary" className="mt-4 self-end bg-white/10" onClick={submitCode}>
                Submit
              </Button>

              {/* Output Display */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2 text-black">Output:</h2>
                <pre className="whitespace-pre-line text-gray-200">{output}</pre>
                <p className={`mt-2 ${match ? 'text-green-500' : 'text-red-500'}`}>
                  {match ? 'Output matches expected output' : 'Output does not match expected output'}
                </p>
              </div>
            </div>
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
