import styles from 'scss/pages/settings.module.scss';
import navStyles from 'scss/Nav.module.scss';
import IconLink from 'components/IconLink';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import NewRoundSetting from 'components/settings/general/NewRoundSetting';
import ShowMinuteMarksSetting from 'components/settings/general/ShowMinuteMarksSetting';
import ShowNumbersSetting from 'components/settings/general/ShowNumbersSetting';
import ShowSecondsArrowSetting from 'components/settings/general/ShowSecondsArrowSetting';
import AutoConfirmAnswerSetting from 'components/settings/general/AutoConfirmAnswerSetting';
import ThemeSetting from 'components/settings/general/ThemeSetting';

const Settings = () => {
    return (
        <div className={styles.settings}>
            <nav className={navStyles.nav}><IconLink icon={faArrowLeft} path="/main" /></nav>

            <ShowMinuteMarksSetting />
            <ShowNumbersSetting />
            <ShowSecondsArrowSetting />
            <AutoConfirmAnswerSetting />
            <ThemeSetting />
            <NewRoundSetting />
        </div>
    );
};

export default Settings;