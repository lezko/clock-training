import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {ChangeEvent} from 'react';
import {setSettings} from 'store/settings/slice';

const NewRoundSetting = () => {
    const {newRoundDelay} = useSettings();
    const dispatch = useAppDispatch();
    const optionStr = `don't start automatically`;
    const options = [3, 5, 7, 10, optionStr];

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        let nextNewRoundDelay;
        if (isNaN(+e.target.value)) {
            nextNewRoundDelay = 0;
        } else {
            nextNewRoundDelay = +e.target.value;
        }
        dispatch(setSettings({newRoundDelay: nextNewRoundDelay}));
    }

    return (
        <div>
            <span>Start new round after</span>
            <select onChange={handleChange} value={newRoundDelay || optionStr}>
                {options.map(o =>
                    <option key={o} value={o}>{isNaN(+o) ? o : o + ' seconds'}</option>
                )}
            </select>
        </div>
    );
};

export default NewRoundSetting;