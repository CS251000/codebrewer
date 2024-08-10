"use client"

const problems = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy' },
  { id: 2, title: 'Median of Two Sorted Arrays', difficulty: 'Hard' },
  { id: 3, title: 'Longest Palindromic Substring', difficulty: 'Medium' },
];

const ContestProblems = () => {
  return (
    <div className="contest-problems p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Problems</h2>
      <ul className="mt-4">
        {problems.map(problem => (
          <li key={problem.id} className="mt-4 border border-gray-300 p-4 rounded-md flex justify-between">
            <span>{problem.title}</span>
            <span className={`text-${problem.difficulty === 'Hard' ? 'red' : problem.difficulty === 'Medium' ? 'yellow' : 'green'}-500`}>
              {problem.difficulty}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestProblems;
