import {FC, useEffect, useState} from 'react';
import styles from 'scss/pages/main.module.scss';
import InGameSettings from 'components/InGameSettings';
import Clock from 'components/Clock';

interface DefaultScreenProps {
    startGame: () => void;
}

const DefaultScreen: FC<DefaultScreenProps> = ({startGame}) => {
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

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        let timeout = setTimeout(() => {
            function tick() {
                t.setSeconds(t.getSeconds() + 1);
                setTime(mapDateToState(t));
            }

            tick();
            interval = setInterval(tick, 1000);
        }, 1000 - millis);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <Clock className={styles.clock} hour={time.h} min={time.m} sec={time.s} />
            {/*<InGameSettings />*/}
            <button className={styles.startBtn} onClick={startGame}>START</button>
        </div>
    );
};

export default DefaultScreen;