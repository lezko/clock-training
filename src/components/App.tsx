import Clock from 'components/Clock';
import {useEffect, useState} from 'react';

const App = () => {
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
            {/* todo 24h format */}
            <Clock hour={time.h} min={time.m} sec={time.s} />
        </div>
    );
};

export default App;