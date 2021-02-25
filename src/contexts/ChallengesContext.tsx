import { createContext, ReactNode, useState } from "react";
import challenges from "../../challenges.json";
interface Challenge {
  type: "boby" | "eye";
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExp: number;
  challengesCompleted: number;
  currentChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(1);
  const [currentExp, setCurrentExp] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
    const index = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[index];
    setCurrentChallenge(challenge);
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExp,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        currentChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
