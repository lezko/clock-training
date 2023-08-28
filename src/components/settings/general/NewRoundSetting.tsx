import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {ChangeEvent, useState} from 'react';
import {setSettings} from 'store/settings/slice';
import styles from 'scss/Setting.module.scss';

const NewRoundSetting = () => {
    const {newRoundDelay} = useSettings();
    const dispatch = useAppDispatch();
    const optionStr = `no autostart`;
    const options = [3, 5, 7, 10, optionStr];
    const [id] = useState(String(Math.random()));

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        let nextNewRoundDelay;
        if (isNaN(+e.target.value)) {
            nextNewRoundDelay = 0;
        } else {
            nextNewRoundDelay = +e.target.value;
        }
        dispatch(setSettings({newRoundDelay: nextNewRoundDelay}));
    }

    return (
        <div className={styles.setting}>
            <label htmlFor={id}>Start new round after</label>
            <select onChange={handleChange} id={id} value={newRoundDelay || optionStr}>
                {options.map(o =>
                    <option key={o} value={o}>{isNaN(+o) ? o : o + ' seconds'}</option>
                )}
            </select>
        </div>
    );
};

export default NewRoundSetting;