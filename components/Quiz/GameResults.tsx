// components/GameResults.tsx
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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Game Results</h1>
      <h2 className="text-2xl font-bold mb-2">Winner: {winner.playerName}</h2>
      <div className="mb-8">
        {sortedResults.map((result, index) => (
          <div
            key={result.playerId}
            className="border border-gray-300 p-4 mb-4"
          >
            <p>
              {index + 1}. {result.playerName}: {result.correctAnswers} correct
              answers
            </p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-2">Game Summary</h2>
      <p>{gameSummary}</p>
    </div>
  );
};
