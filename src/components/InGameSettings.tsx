import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {setSettings} from 'store/settings/slice';
import styles from 'scss/InGameSettings.module.scss';
import RoundsSetting from 'components/settings/in-game/RoundsSetting';
import MaxAnswerErrorSetting from 'components/settings/in-game/MaxAnswerErrorSetting';
import AnswerTimeSetting from 'components/settings/in-game/AnswerTimeSetting';
import TimeFormatSetting from 'components/settings/in-game/TimeFormatSetting';

const InGameSettings = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    return (
        <div className={styles.inGameSettings}>
            <RoundsSetting />
            <MaxAnswerErrorSetting />
            <AnswerTimeSetting />
            <TimeFormatSetting />
        </div>
    );
};

export default InGameSettings;