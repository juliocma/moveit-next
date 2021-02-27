import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallengeBox.module.css";
import { CountdownContext } from "../contexts/CountdownContext";

export function ChallengeBox() {
  const { currentChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountdown();
  };
  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  };
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
            <button
              type="button"
              className={styles.challengeFailButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
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
