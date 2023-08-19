import styles from 'scss/pages/settings.module.scss';
import navStyles from 'scss/Nav.module.scss';
import IconLink from 'components/IconLink';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {setSettings} from 'store/settings/slice';
import {ThemeType} from 'enums/ThemeType';
import NewRoundSetting from 'components/settings/NewRoundSetting';
import ShowMinuteMarksSetting from 'components/settings/general/ShowMinuteMarksSetting';

const ID_PREFIX = 'settings-input-';

const Settings = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    return (
        <div className={styles.settings}>
            <nav className={navStyles.nav}><IconLink icon={faArrowLeft} path="/main" /></nav>

            <ul>
                <li>
                    <ShowMinuteMarksSetting />
                </li>
                <li>
                    <label>Show numbers</label>
                    <input
                        type="checkbox"
                        checked={settings.showNumbers}
                        onChange={() => dispatch(setSettings({showNumbers: !settings.showNumbers}))}
                    />
                </li>
                <li>
                    <label>Show seconds arrow</label>
                    <input
                        type="checkbox"
                        checked={settings.showSeconds}
                        onChange={() => dispatch(setSettings({showSeconds: !settings.showSeconds}))}
                    />
                </li>
                <li>
                    <label>Auto confirm answers</label>
                    <input
                        type="checkbox"
                        checked={settings.autoConfirm}
                        onChange={() => dispatch(setSettings({autoConfirm: !settings.autoConfirm}))}
                    />
                </li>
                <li>
                    <label>Theme</label>
                    <select value={settings.theme} onChange={e => {
                        dispatch(setSettings({theme: e.target.value === 'Light' ? ThemeType.Light : ThemeType.Dark}));
                    }}>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                </li>

                <NewRoundSetting />
            </ul>
        </div>
    );
};

export default Settings;