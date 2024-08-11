"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

const ContestProblems = ({id}) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const querySnapshot = await getDocs(collection(db, "problems"));
      const problemsData = [];
      querySnapshot.forEach((doc) => {
        problemsData.push({ id: doc.id, ...doc.data() });
      });

      // Shuffle and select 4 random problems
      const shuffled = problemsData.sort(() => 0.5 - Math.random());
      const selectedProblems = shuffled.slice(0, 4);

      setProblems(selectedProblems);
    };

    fetchProblems();
  }, []);

  return (
    <div className="contest-problems p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Problems</h2>
      <ul className="mt-4">
        {problems.map((problem) => (
          <Link href={`/problems/${problem.id}`}>
          <li
            key={problem.id}
            className="mt-4 border border-gray-300 p-4 rounded-md flex justify-between"
          >
            <span>{problem.name}</span>
            <span
              className={`text-${
                problem.difficulty === "Hard"
                  ? "red"
                  : problem.difficulty === "Medium"
                  ? "yellow"
                  : "green"
              }-500`}
            >
              {problem.difficulty}
            </span>
          </li></Link>
        ))}
      </ul>
    </div>
  );
};

export default ContestProblems;
