import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {ChangeEvent} from 'react';
import {setSettings} from 'store/settings/slice';

const AnswerTimeSetting = () => {
    const {answerTime} = useSettings();
    const dispatch = useAppDispatch();
    const options = [3, 5, 7, 10];

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        dispatch(setSettings({answerTime: +e.target.value}));
    }

    return (
        <div>
            <span>Answer time (seconds):</span>
            <select onChange={handleChange} value={answerTime}>
                {options.map(o =>
                    <option key={o} value={o}>{o}</option>
                )}
            </select>
        </div>
    );
};

export default AnswerTimeSetting;