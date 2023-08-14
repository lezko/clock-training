import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {ITime} from 'types/ITime';
import {compareTime, generateTime} from 'utils/time';
import GameInfo from 'components/GameInfo';
import TimeForm from 'components/TimeForm';
import styles from 'scss/GameScreen.module.scss';
import {useSettings} from 'hooks/settings';
import Clock from 'components/Clock';
import {useStateAndRef} from 'hooks/useStateAndRef';

const RAW_INPUT_LENGTH = 5;
const RAW_INPUT_LENGTH_SEC = 8;

interface GameScreenProps {
    stopGame: () => void;
}

// TODO replace all these hacky refs with effects

const GameScreen: FC<GameScreenProps> = ({stopGame}) => {
    const settings = useSettings();
    const [roundStatus, setRoundStatus] = useState<'finished' | 'going'>('finished');
    const [roundTime, setRoundTime, roundTimeRef] = useStateAndRef<ITime>({h: 0, m: 0, s: 0});
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(settings.answerTime);
    const [answerTimeStr, setAnswerTimeStr, answerTimeStrRef] = useStateAndRef('');
    const [currentRound, setCurrentRound, currentRoundRef] = useStateAndRef(0);
    const roundIntervalRef = useRef<any>();

    const [newRoundTimeRemaining, setNewRoundTimeRemaining] = useState(settings.newRoundDelay);
    const newRoundIntervalRef = useRef<any>();

    function startRound() {
        // console.log('started');
        clearInterval(newRoundIntervalRef.current);
        if (currentRoundRef.current && currentRoundRef.current === settings.roundCount) {
            stopGame();
        }
        setAnswerTimeStr('');
        setTimeRemaining(settings.answerTime);
        let x = settings.answerTime;
        setCurrentRound(currentRoundRef.current + 1);
        setRoundTime(generateTime());
        setShouldFocus(true);
        setRoundStatus('going');
        roundIntervalRef.current = setInterval(() => {
            // console.log('decrement');
            setTimeRemaining(prevState => prevState - 1);
            x--;
            if (x === 0) {
                if (isFulfilled(answerTimeStrRef.current)) {
                    finishRound(getTimeFromStr(answerTimeStrRef.current));
                } else {
                    finishRound();
                }
            }
        }, 1000);
    }

    function finishRound(time?: ITime) {
        // console.log('finished');
        clearInterval(roundIntervalRef.current);
        // todo accept answer if it is ready but 'ok' not clicked
        if (time) {
            setIsAnswerCorrect(compareTime(time, roundTimeRef.current, settings.valueSpread));
        } else {
            setIsAnswerCorrect(false);
        }
        setRoundStatus('finished');
        setNewRoundTimeRemaining(settings.newRoundDelay);

        if (settings.newRoundDelay === 0) {
            return;
        }
        let x = settings.newRoundDelay;
        newRoundIntervalRef.current = setInterval(() => {
            setNewRoundTimeRemaining(prevState => prevState - 1);
            x--;
            if (x === 0) {
                startRound();
            }
        }, 1000);
    }

    const handleFinish = useCallback(() => {
        finishRound(getTimeFromStr(answerTimeStr));
    }, [answerTimeStr]);

    const handleAnswerTimeChange = useCallback((str: string) => {
        setAnswerTimeStr(str);
        if (settings.autoConfirm && isFulfilled(str)) {
            handleFinish();
        }
    }, []);

    function isFulfilled(str: string) {
        return settings.enableSecondsInput && str.length === RAW_INPUT_LENGTH_SEC ||
            !settings.enableSecondsInput && str.length === RAW_INPUT_LENGTH;
    }


    function cleanup() {
        clearInterval(roundIntervalRef.current);
        clearInterval(newRoundIntervalRef.current);
        setCurrentRound(0);
        roundIntervalRef.current = null;
    }

    useEffect(() => {
        // console.log('set interval');
        startRound();
        return () => {
            // console.log('clear interval');
            cleanup();
        };
    }, []);

    const [shouldFocus, setShouldFocus] = useState(false);
    const memoizedSetShouldFocus = useCallback(setShouldFocus, []);

    return (
        <div className={styles.gameScreen}>
            <Clock className={styles.clock} hour={roundTime.h} min={roundTime.m} sec={roundTime.s} />
            <GameInfo
                isAnswerCorrect={roundStatus === 'finished' ? isAnswerCorrect : undefined}
                correctAnswer={roundTime}
                round={currentRound}
                totalRounds={settings.roundCount}
                timeRemaining={timeRemaining}
            />
            <TimeForm
                shouldFocus={shouldFocus}
                setShouldFocus={memoizedSetShouldFocus}
                onSubmit={handleFinish}
                answerTimeStr={answerTimeStr}
                setTimeStr={handleAnswerTimeChange}
                disabled={roundStatus === 'finished'}
            />
            <div className={styles.inGameBtns}>
                <button onClick={stopGame}>STOP</button>
                <button disabled={roundStatus === 'going'} onClick={() => {
                    startRound();
                }}>NEXT {settings.newRoundDelay && roundStatus === 'finished' ? (`(${newRoundTimeRemaining})`) : ''}</button>
            </div>
        </div>
    );
};

export default GameScreen;


function getTimeFromStr(str: string): ITime {
    const timeStrArr = str.split(':');
    const h = +timeStrArr[0];
    const m = +timeStrArr[1];
    let s = 0;
    if (timeStrArr.length === 3) {
        s = +timeStrArr[2];
    }
    return {h, m, s};
}