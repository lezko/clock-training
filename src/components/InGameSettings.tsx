import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {setSettings} from 'store/settings/slice';
import styles from 'scss/InGameSettings.module.scss';
import RoundsSetting from 'components/settings/RoundsSetting';
import MaxAnswerErrorSetting from 'components/settings/MaxAnswerErrorSetting';
import AnswerTimeSetting from 'components/settings/AnswerTimeSetting';

const InGameSettings = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    return (
        <div className={styles.inGameSettings}>
            <RoundsSetting />
            <MaxAnswerErrorSetting />
            <AnswerTimeSetting />
        </div>
    );
};

export default InGameSettings;