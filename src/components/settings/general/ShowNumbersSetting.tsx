import {setSettings} from 'store/settings/slice';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import styles from 'scss/Setting.module.scss';
import {useState} from 'react';

const ShowNumbersSetting = () => {
    const {showNumbers} = useSettings();
    const dispatch = useAppDispatch();
    const [id] = useState(String(Math.random()));

    return (
        <div className={styles.setting}>
            <label htmlFor={id}>Show numbers</label>
            <input
                id={id}
                type="checkbox"
                checked={showNumbers}
                onChange={() => dispatch(setSettings({showNumbers: !showNumbers}))}
            />
        </div>
    );
};

export default ShowNumbersSetting;