import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const { currentChallenge } = useContext(ChallengesContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {currentChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {currentChallenge.amount} xp</header>
          <main>
            <img src={`icons/${currentChallenge.type}.svg`} alt="body" />
            <strong>Novo desafio</strong>
            <p>{currentChallenge.description}</p>
          </main>
          <footer>
            <button type="button" className={styles.challengeFailButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level UP" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
