import Cleave from 'cleave.js/react';
import {FC, memo, useEffect, useRef} from 'react';
import {useSettings} from 'hooks/settings';
import styles from 'scss/TimeForm.module.scss';

interface TimeFormProps {
    answerTimeStr: string;
    setTimeStr: (str: string) => void;
    disabled: boolean;
    onSubmit: () => void;
    shouldFocus: boolean;
    setShouldFocus: (sf: boolean) => void;
}

const TimeForm: FC<TimeFormProps> = memo(({onSubmit, answerTimeStr, shouldFocus, setShouldFocus, setTimeStr, disabled}) => {
    const {autoConfirm, enableSecondsInput, timeFormat} = useSettings();
    const inputRef = useRef<HTMLInputElement>();

    function handleChange(e: any) {
        const nextTimeStr = e.target.value;
        setTimeStr(nextTimeStr);
    }

    function handleSubmit() {
        onSubmit();
    }

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            inputRef.current.focus();
            setShouldFocus(false);
        }
    }, [shouldFocus]);

    return (
        <form onSubmit={e => e.preventDefault()} className={styles.timeForm}>
            <Cleave
                type="tel"
                htmlRef={r => inputRef.current = r}
                disabled={disabled}
                placeholder={enableSecondsInput ? 'hh:mm:ss' : 'hh:mm'}
                value={answerTimeStr}
                options={{time: true, timePattern: enableSecondsInput ? ['h', 'm', 's'] : ['h', 'm'], timeFormat: timeFormat.slice(0, -1)}}
                onChange={handleChange}
            />
            {!autoConfirm && <button disabled={disabled} onClick={handleSubmit}>OK</button>}
        </form>
    );
});

export default TimeForm;