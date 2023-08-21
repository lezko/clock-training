import {setSettings} from 'store/settings/slice';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {useState} from 'react';
import styles from 'scss/Setting.module.scss';

const AutoConfirmAnswerSetting = () => {
    const {autoConfirm} = useSettings();
    const dispatch = useAppDispatch();
    const [id] = useState(String(Math.random()));

    return (
        <div className={styles.setting}>
            <label htmlFor={id}>Auto confirm answers</label>
            <input
                id={id}
                type="checkbox"
                checked={autoConfirm}
                onChange={() => dispatch(setSettings({autoConfirm: !autoConfirm}))}
            />
        </div>
    );
};

export default AutoConfirmAnswerSetting;