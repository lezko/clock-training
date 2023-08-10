import styles from 'scss/GameInfo.module.scss';
import {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfinity, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {ITime} from 'types/ITime';
import {useSettings} from 'hooks/settings';

interface GameInfoProps {
    round: number;
    totalRounds: number;
    timeLeft: number;
    isAnswerCorrect?: boolean;
    //todo interface ITime
    correctAnswer?: ITime;
}

const GameInfo: FC<GameInfoProps> = ({round, totalRounds, timeLeft, correctAnswer, isAnswerCorrect}) => {
    const {enableSecondsInput} = useSettings();

    function getRoundResult() {
        if (typeof isAnswerCorrect === 'undefined') {
            return null;
        }

        if (isAnswerCorrect) {
            return <FontAwesomeIcon icon={faCheck} />
        }

        if (!correctAnswer) {
            throw new Error('correctAnswer is undefined');
        }
        return (
            <div>
                <FontAwesomeIcon icon={faXmark} />
                <span>{correctAnswer.h}:{correctAnswer.m}{enableSecondsInput && (':' + correctAnswer.s)}</span>
            </div>
        );
    }

    return (
        <div className={styles.gameInfo}>
            <div>Round {round} / {totalRounds || <FontAwesomeIcon icon={faInfinity} />}</div>
            {getRoundResult()}
            <div>{timeLeft}s</div>
        </div>
    );
};

export default GameInfo;