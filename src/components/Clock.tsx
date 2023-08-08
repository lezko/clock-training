import styles from 'scss/Clock.module.scss';
import {CSSProperties, FC} from 'react';
import {useSettings} from 'hooks/settings';

interface ClockProps {
    sec?: number;
    min: number;
    hour: number;
    className?: string;
}

const Clock: FC<ClockProps> = ({min, hour, sec = 0, className}) => {
    const settings = useSettings();

    function getRotationStyle(deg: number) {
        return {
            '--rot': deg - 90 + 'deg'
        } as CSSProperties;
    }

    const minuteMarks = [];
    for (let i = 0; i < 12; i++) {
        for (let j = 1; j <= 4; j++) {
            minuteMarks.push(
                <div
                    key={String(i) + j}
                    className={styles.minuteMark}
                    style={getRotationStyle(i * 30 + j * 6)}
                />
            );
        }
    }

    return (
        <div className={styles.clock + ' ' + (className || '')}>
            {Array(12).fill(null).map((_, i) =>
                <div
                    key={i}
                    className={styles.mark}
                    style={getRotationStyle(i * 30)}
                >
                    {settings.showNumbers &&
                        <span
                            className={styles.number}
                            style={getRotationStyle(i * -30 + 180)}
                        >
                            {((i + 6) % 12) || 12}
                        </span>
                    }
                </div>
            )}
            {settings.showMinuteMarks && minuteMarks}

            <div
                className={styles.hArrow}
                style={getRotationStyle((0.5 / 60) * (hour * 3600 + min * 60 + sec))}
            />
            <div
                className={styles.mArrow}
                style={getRotationStyle(0.1 * (min * 60 + sec))}
            />
            {/* todo settings show sec arrow */}
            <div
                className={styles.sArrow}
                style={getRotationStyle(sec * 6)}
            />

            <div className={styles.dot} />
        </div>
    );
};

export default Clock;