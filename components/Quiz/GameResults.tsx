import React from "react";

interface PlayerResult {
  playerId: string;
  playerName: string;
  correctAnswers: number;
}

interface GameResultsProps {
  results: PlayerResult[];
  gameSummary: string;
}

export const GameResults: React.FC<GameResultsProps> = ({
  results,
  gameSummary,
}) => {
  const sortedResults = results.sort(
    (a, b) => b.correctAnswers - a.correctAnswers
  );
  const winner = sortedResults[0];

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center text-blue-500">
        Game Results
      </h1>
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">Winner: {winner.playerName}</h2>
        <span className="text-2xl text-gray-500">
          Correct Answers: {winner.correctAnswers}
        </span>
      </div>
      <div className="mb-8">
        {sortedResults.map((result, index) => (
          <div
            key={result.playerId}
            className="p-4 mb-4 border border-gray-300 rounded-md shadow-sm"
          >
            <p className="text-xl font-semibold text-gray-700">
              {index + 1}. {result.playerName}
            </p>
            <p className="text-lg text-gray-500">
              Correct Answers: {result.correctAnswers}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <h2 className="mb-4 text-3xl font-bold text-center text-blue-500">
          Game Summary
        </h2>
        <p className="text-lg text-gray-700">{gameSummary}</p>
      </div>
    </div>
  );
};
