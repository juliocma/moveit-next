import React, { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "boby" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExp: number;
  expToNextLevel: number;
  challengesCompleted: number;
  currentChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExp: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({
  children,
  ...rest
}: ChallengesProviderProps) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const expToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  const startNewChallenge = () => {
    const index = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[index];

    setCurrentChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉 ", {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
  };

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExp", String(currentExp));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExp, challengesCompleted]);

  const resetChallenge = () => {
    setCurrentChallenge(null);
  };
  const completeChallenge = () => {
    if (!currentChallenge) {
      return;
    }

    const { amount } = currentChallenge;
    let exp = currentExp + amount;
    if (exp >= expToNextLevel) {
      exp = exp - expToNextLevel;
      levelUp();
    }

    setCurrentExp(exp);
    setCurrentChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };
  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExp,
        expToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        currentChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};
