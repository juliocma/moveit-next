import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExpBar.module.css";

export function ExpBar() {
  const { currentExp, expToNextLevel } = useContext(ChallengesContext);
  const percentToNextLevel = Math.round(currentExp * 100) / expToNextLevel;
  return (
    <header className={styles.expBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExp} xp
        </span>
      </div>
      <span>{expToNextLevel} xp</span>
    </header>
  );
}
