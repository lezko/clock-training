import Cleave from 'cleave.js/react';
import {FC, forwardRef} from 'react';
import {useSettings} from 'hooks/settings';
import styles from 'scss/TimeForm.module.scss';

interface TimeFormProps {
    timeStr: string;
    setTimeStr: (str: string) => void;
    disabled: boolean;
    onSubmit: () => void;
    ref: any;
}

const TimeForm: FC<TimeFormProps> = forwardRef(({onSubmit, timeStr, setTimeStr, disabled}, ref) => {
    const {autoConfirm, enableSecondsInput} = useSettings();

    function handleChange(e: any) {
        const nextTimeStr = e.target.value;
        setTimeStr(nextTimeStr);
    }

    function handleSubmit() {
        onSubmit();
    }

    return (
        <form onSubmit={e => e.preventDefault()} className={styles.timeForm}>
            <Cleave
                htmlRef={(inputNode: HTMLInputElement) => {
                    if (!ref) {
                        return
                    }
                    if (typeof ref === 'function') {
                        ref(inputNode)
                    } else {
                        ref.current = inputNode
                    }
                }}
                disabled={disabled}
                placeholder={enableSecondsInput ? 'hh:mm:ss' : 'hh:mm'}
                value={timeStr}
                options={{time: true, timePattern: enableSecondsInput ? ['h', 'm', 's'] : ['h', 'm'], timeFormat: '12'}}
                onChange={handleChange}
            />
            {!autoConfirm && <button disabled={disabled} onClick={handleSubmit}>OK</button>}
        </form>
    );
});

export default TimeForm;