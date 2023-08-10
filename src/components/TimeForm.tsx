import Cleave from 'cleave.js/react';
import {FC, useState} from 'react';
import {useSettings} from 'hooks/settings';
import styles from 'scss/TimeForm.module.scss';
import {ITime} from 'types/ITime';

const RAW_INPUT_LENGTH = 5;
const RAW_INPUT_LENGTH_SEC = 8;

interface TimeInputFormProps {
    onSubmit: (time: ITime) => void;
}

const TimeForm: FC<TimeInputFormProps> = ({onSubmit}) => {
    const {autoConfirm, enableSecondsInput} = useSettings();
    const [timeStr, setTimeStr] = useState('');
    function handleChange(e: any) {
        const nextTimeStr = e.target.value;
        setTimeStr(nextTimeStr);
        if (autoConfirm) {
            if (isFulfilled(nextTimeStr)) {
                onSubmit(getTimeFromStr(nextTimeStr));
            }
        }
    }

    function handleSubmit() {
        onSubmit(getTimeFromStr(timeStr));
    }

    function getTimeFromStr(str: string): ITime {
        const timeStrArr = str.split(':');
        const h = +timeStrArr[0];
        const m = +timeStrArr[1];
        let s = 0;
        if (timeStrArr.length === 3) {
            s = +timeStrArr[2];
        }
        return {h, m, s}
    }

    function isFulfilled(str: string) {
        return enableSecondsInput && str.length === RAW_INPUT_LENGTH_SEC ||
            !enableSecondsInput && str.length === RAW_INPUT_LENGTH;
    }

    return (
        <form onSubmit={e => e.preventDefault()} className={styles.timeForm}>
            <Cleave
                placeholder={enableSecondsInput ? 'hh:mm:ss' : 'hh:mm'}
                value={timeStr}
                options={{time: true, timePattern: enableSecondsInput ? ['h', 'm', 's'] : ['h', 'm'], timeFormat: '12'}}
                onChange={handleChange}
            />
            {!autoConfirm && <button disabled={!isFulfilled(timeStr)} onClick={handleSubmit}>OK</button>}
        </form>
    );
};

export default TimeForm;