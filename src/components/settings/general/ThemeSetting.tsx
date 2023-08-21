import {setSettings} from 'store/settings/slice';
import {ThemeType} from 'enums/ThemeType';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {useState} from 'react';
import styles from 'scss/Setting.module.scss';

const ThemeSetting = () => {
    const {theme} = useSettings();
    const dispatch = useAppDispatch();
    const [id] = useState(String(Math.random()));

    return (
        <div className={styles.setting}>
            <label htmlFor={id}>Theme</label>
            <select value={theme} id={id} onChange={e => {
                dispatch(setSettings({theme: e.target.value === 'Light' ? ThemeType.Light : ThemeType.Dark}));
            }}>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
            </select>
        </div>
    );
};

export default ThemeSetting;