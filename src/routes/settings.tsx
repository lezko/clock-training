import styles from 'scss/pages/settings.module.scss';
import navStyles from 'scss/Nav.module.scss';
import IconLink from 'components/IconLink';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {setSettings} from 'store/settings/slice';
import {ThemeType} from 'enums/ThemeType';

const Settings = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    return (
        <div className={styles.settings}>
            <nav className={navStyles.nav}><IconLink icon={faArrowLeft} path="/main" /></nav>

            <ul>
                <li>
                    <span>Show minute marks</span>
                    <input
                        type="checkbox"
                        checked={settings.showMinuteMarks}
                        onChange={() => dispatch(setSettings({showMinuteMarks: !settings.showMinuteMarks}))}
                    />
                </li>
                <li>
                    <span>Show numbers</span>
                    <input
                        type="checkbox"
                        checked={settings.showNumbers}
                        onChange={() => dispatch(setSettings({showNumbers: !settings.showNumbers}))}
                    />
                </li>
                <li>
                    <span>Show seconds arrow</span>
                    <input
                        type="checkbox"
                        checked={settings.showSeconds}
                        onChange={() => dispatch(setSettings({showSeconds: !settings.showSeconds}))}
                    />
                </li>
                <li>
                    <span>Auto confirm answers</span>
                    <input
                        type="checkbox"
                        checked={settings.autoConfirm}
                        onChange={() => dispatch(setSettings({autoConfirm: !settings.autoConfirm}))}
                    />
                </li>
                <li>
                    <span>Theme</span>
                    <select value={settings.theme} onChange={e => {
                        dispatch(setSettings({theme: e.target.value === 'Light' ? ThemeType.Light : ThemeType.Dark}));
                    }}>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                </li>
            </ul>
        </div>
    );
};

export default Settings;