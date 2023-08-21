import {setSettings} from 'store/settings/slice';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {useState} from 'react';
import styles from 'scss/Setting.module.scss';

const ShowSecondsArrowSetting = () => {
    const {showSeconds} = useSettings();
    const dispatch = useAppDispatch();
    const [id] = useState(String(Math.random()));

    return (
        <div className={styles.setting}>
            <label htmlFor={id}>Show seconds arrow</label>
            <input
                id={id}
                type="checkbox"
                checked={showSeconds}
                onChange={() => dispatch(setSettings({showSeconds: !showSeconds}))}
            />
        </div>
    );
};

export default ShowSecondsArrowSetting;