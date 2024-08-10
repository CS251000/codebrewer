import Link from "next/link";
import React from "react";

const problems = [
    { id: 1, name: "Two-Sum", difficulty: "Easy" },
    { id: 2, name: "Add-Two-Numbers", difficulty: "Medium" },
    { id: 3, name: "Longest-Substring-Without-Repeating-Characters", difficulty: "Hard" },
    // Add more problems as needed
];

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
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl my-8 text-center text-teal-300 font-medium">Problems List</h1> {/* Changed to font-medium */}
            <div className="bg-white/20 shadow rounded-lg overflow-hidden"> {/* Reduced transparency with bg-white/20 */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase font-light">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase tracking-wider font-light">
                                Problem Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs text-gray-300 uppercase tracking-wider font-light">
                                Difficulty
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {problems.map((problem) => (
                            
                            <tr key={problem.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 font-light">{problem.id}</td>
                               
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 tracking-wide">
                                <Link href={`/problems/${problem.name}`} > {problem.name}</Link>
                                    </td>
                                
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${difficultyClass(problem.difficulty)} font-light tracking-wide`}>
                                    {problem.difficulty}
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProblemsPage;
