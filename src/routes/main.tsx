import {createRef, useEffect, useRef, useState} from 'react';
import Clock from 'components/Clock';
import styles from 'scss/pages/main.module.scss';
import navStyles from 'scss/Nav.module.scss';
import {faCircleInfo, faGear} from '@fortawesome/free-solid-svg-icons';
import IconLink from 'components/IconLink';
import TimeForm from 'components/TimeForm';
import GameInfo from 'components/GameInfo';
import {useSettings} from 'hooks/settings';
import {ITime} from 'types/ITime';
import {compareTime, generateTime} from 'utils/time';

const Main = () => {
    const t = new Date();
    const millis = t.getMilliseconds();

    function mapDateToState(time: Date) {
        return {
            h: time.getHours(),
            m: time.getMinutes(),
            s: time.getSeconds(),
        };
    }

    const [time, setTime] = useState(mapDateToState(t));

    // useEffect(() => {
    //     let interval: string | number | NodeJS.Timeout | undefined;
    //     let timeout = setTimeout(() => {
    //         function tick() {
    //             t.setSeconds(t.getSeconds() + 1);
    //             setTime(mapDateToState(t));
    //         }
    //
    //         tick();
    //         interval = setInterval(tick, 1000);
    //     }, 1000 - millis);
    //     return () => {
    //         clearTimeout(timeout);
    //         clearInterval(interval);
    //     };
    // }, []);

    const settings = useSettings();
    const [status, setStatus] = useState<'default' | 'playing'>('default');
    const [roundStatus, setRoundStatus] = useState<'finished' | 'going'>('going');
    const [roundTime, setRoundTime] = useState<ITime>({h: 0, m: 0, s: 0});
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(settings.answerTime);
    const [currentRound, setCurrentRound] = useState(1);
    const roundIntervalRef = useRef<any>();

    function decrementTimeLeftWithFinishCheck() {
        let nextTimeLeft;
        setTimeLeft(prevState => {
            nextTimeLeft = prevState - 1;
            if (nextTimeLeft === 0) {
                clearInterval(roundIntervalRef.current);
            }
            return nextTimeLeft;
        });
    }

    function startGame() {
        setStatus('playing');
        setRoundTime(generateTime());
        setRoundStatus('going');
        roundIntervalRef.current = setInterval(decrementTimeLeftWithFinishCheck, 1000);
    }

    function getStatusDependentHtml() {
        if (status === 'default') {
            return (
                // in-game settings
                <button className={styles.startBtn} onClick={startGame}>START</button>
            );
        }
        return (
            <>
                <GameInfo
                    isAnswerCorrect={roundStatus === 'finished' ? isAnswerCorrect : undefined}
                    correctAnswer={roundTime}
                    round={currentRound}
                    totalRounds={settings.roundCount}
                    timeLeft={timeLeft}
                />
                <TimeForm onSubmit={time => {
                    setIsAnswerCorrect(compareTime(time, roundTime, settings.valueSpread));
                    setRoundStatus('finished');
                }} />
            </>
        );
    }

    return (
        <div className={styles.main}>
            <nav className={navStyles.nav}>
                <ul>
                    <li><IconLink icon={faCircleInfo} path="/about" /></li>
                    <li><IconLink icon={faGear} path="/settings" /></li>
                </ul>
            </nav>
            {/* todo 24h format */}
            <Clock className={styles.clock} hour={roundTime.h} min={roundTime.m} sec={roundTime.s} />

            {getStatusDependentHtml()}
        </div>
    );
};

export default Main;