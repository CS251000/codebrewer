import Link from "next/link";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Adjust the path as necessary

const difficultyClass = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-500";
    case "Medium":
      return "text-yellow-500";
    case "Hard":
      return "text-red-500";
    default:
      return "";
  }
};

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const q = query(collection(db, "problems"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const problemsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProblems(problemsData);
      } catch (error) {
        console.error("Error fetching problems: ", error);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((problem) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return problem.name.toLowerCase().includes(lowercasedQuery);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl my-8 text-center text-teal-300 font-lg text-shadow-lg">
        CODING ARENA
      </h1>
      
      

      {/* Add Question Button */}
      <div className="flex justify-end mb-4">
        
        <Link href={"/problems/add"}>
          <button className="bg-indigo-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-indigo-500 transition-all tracking-wide">
            Add Question
          </button>
        </Link>
      </div>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className=" text-lg w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="bg-white/20 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center lg:text-left text-xs text-gray-300 uppercase font-light tracking-wide">
                Problem Name
              </th>
              <th className="px-6 py-3 text-xs text-gray-300 uppercase tracking-wider font-light text-center lg:text-left">
                Difficulty
              </th>
              <th className="hidden lg:inline-block px-6 py-3 text-xs text-gray-300 uppercase tracking-wider font-light text-center lg:text-left">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProblems.map((problem) => (
              <tr key={problem.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 tracking-wide">
                  <Link href={`/problems/${problem.id}`}>
                    <span
                      className="block text-center md:whitespace-normal lg:text-left"
                      style={{ maxWidth: "300px" }}
                      title={problem.name} 
                    >
                      {problem.name.length > 10 ? (
                        <>
                          <span className="block md:hidden">
                            {problem.name.slice(0, 10)}...
                          </span>
                          <span className="hidden md:block">
                            {problem.name}
                          </span>
                        </>
                      ) : (
                        problem.name
                      )}
                    </span>
                  </Link>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${difficultyClass(
                    problem.difficulty
                  )} font-light tracking-wide text-center lg:text-left`}
                >
                  {problem.difficulty}
                </td>
                <td className="hidden lg:inline-block px-6 py-4 whitespace-nowrap text-sm text-gray-200 text-center lg:text-left tracking-wide">
                  {problem.tags ? problem.tags.join(", ") : "No Tags"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProblems.length === 0 && (
          <p className="text-center text-gray-500 py-4">No problems found.</p>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
