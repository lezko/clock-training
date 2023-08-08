import {useEffect, useState} from 'react';
import Clock from 'components/Clock';
import styles from 'scss/pages/main.module.scss';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleInfo, faGear} from '@fortawesome/free-solid-svg-icons';
import IconLink from 'components/IconLink';

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
        <div className={styles.main}>
            <nav className={styles.navbar}>
                <ul>
                    <li><IconLink icon={faCircleInfo} path="/about" /></li>
                    <li><IconLink icon={faGear} path="/settings" /></li>
                </ul>
            </nav>
            {/* todo 24h format */}
            <Clock className={styles.clock} hour={time.h} min={time.m} sec={time.s} />


        </div>
    );
};

export default Main;