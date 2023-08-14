import styles from 'scss/InGameSettings.module.scss';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {ChangeEvent} from 'react';
import {setSettings} from 'store/settings/slice';

const RoundsSetting = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    const options = [5, 10, 15, 20, 25, 30, 'infinite'];

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        let nextRoundCount;
        if (isNaN(+e.target.value)) {
            nextRoundCount = 0;
        } else {
            nextRoundCount = +e.target.value;
        }
        dispatch(setSettings({roundCount: nextRoundCount}));
    }

    return (
        <div className={styles.rounds}>
            <span>Rounds:</span>
            <select onChange={handleChange} value={settings.roundCount || 'infinite'}>
                {options.map(o =>
                    <option key={o} value={String(o)}>{o}</option>
                )}
            </select>
        </div>
    );
};

export default RoundsSetting;