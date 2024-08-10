"use client"

const participants = [
  { id: 1, username: 'user123', score: 300 },
  { id: 2, username: 'codeMaster', score: 250 },
  { id: 3, username: 'leetCoder', score: 200 },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard bg-transparent p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Leaderboard</h2>
      <ul className="mt-4">
        {participants.map(participant => (
          <li key={participant.id} className="mt-2 flex justify-between">
            <span>{participant.username}</span>
            <span>{participant.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
