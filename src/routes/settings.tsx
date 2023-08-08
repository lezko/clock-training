import styles from 'scss/pages/settings.module.scss';
import IconLink from 'components/IconLink';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {setSettings} from 'store/settings/slice';

const Settings = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    return (
        <div className={styles.settings}>
            <nav><IconLink icon={faArrowLeft} path="/main" /></nav>

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
            </ul>
        </div>
    );
};

export default Settings;