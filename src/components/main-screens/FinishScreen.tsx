import {FC} from 'react';
import styles from 'scss/main-screens/FinishScreen.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfinity} from '@fortawesome/free-solid-svg-icons';

interface FinishScreenProps {
    roundsWon: number;
    totalRounds?: number;
    startNewGame: () => void;
    goToMainScreen: () => void;
}

const FinishScreen: FC<FinishScreenProps> = ({roundsWon, totalRounds, goToMainScreen, startNewGame}) => {
    return (
        <div className={styles.finishScreen}>
            <div className={styles.result}>Correct answers: {roundsWon} / {totalRounds || <FontAwesomeIcon icon={faInfinity} />}</div>
            <div className={styles.buttons}>
                <button onClick={startNewGame}>RESTART</button>
                <button onClick={goToMainScreen}>BACK TO MAIN</button>
            </div>
        </div>
    );
};

export default FinishScreen;