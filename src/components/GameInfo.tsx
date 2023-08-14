import styles from 'scss/GameInfo.module.scss';
import {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfinity, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {ITime} from 'types/ITime';
import {useSettings} from 'hooks/settings';

interface GameInfoProps {
    round: number;
    totalRounds: number;
    timeRemaining: number;
    isAnswerCorrect?: boolean;
    //todo interface ITime
    correctAnswer?: ITime;
}

const GameInfo: FC<GameInfoProps> = ({round, totalRounds, timeRemaining, correctAnswer, isAnswerCorrect}) => {
    const {enableSecondsInput, timeFormat} = useSettings();

    function getRoundResult() {
        if (typeof isAnswerCorrect === 'undefined') {
            return null;
        }

        if (!correctAnswer) {
            throw new Error('correctAnswer is undefined');
        }

        const iconStyles = isAnswerCorrect ? styles.check : styles.xMark;
        const icon = isAnswerCorrect ? faCheck : faXmark;
        return (
            <div>
                <FontAwesomeIcon className={iconStyles} icon={icon} />
                <span>{correctAnswer.h + (timeFormat === '24h' ? 12 : 0)}:{correctAnswer.m}{enableSecondsInput && (':' + correctAnswer.s)}</span>
            </div>
        );
    }

    return (
        <div className={styles.gameInfo}>
            <div>Round {round} / {totalRounds || <FontAwesomeIcon icon={faInfinity} />}</div>
            {getRoundResult()}
            <div>{timeRemaining}s</div>
        </div>
    );
};

export default GameInfo;