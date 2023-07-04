// components/WaitScreen.js
import { useAtom } from "jotai";
import { numCorrectAnswersAtom } from "../../store/atom";

export const WaitScreen = () => {
  const [numCorrectAnswers] = useAtom(numCorrectAnswersAtom);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl">Waiting for next question...</h1>
      <p className="text-xl">{numCorrectAnswers} users answered correctly</p>
    </div>
  );
};
