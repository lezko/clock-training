import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {ChangeEvent} from 'react';
import {setSettings} from 'store/settings/slice';

const MaxAnswerErrorSetting = () => {
    const settings = useSettings();
    const dispatch = useAppDispatch();

    const options = [1, 2, 3, 4, 5];

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        dispatch(setSettings({valueSpread: +e.target.value * 60}));
    }

    return (
        <div>
            <span>Max answer error (minutes):</span>
            <select onChange={handleChange} value={Math.round(settings.valueSpread / 60)}>
                {options.map(o =>
                    <option key={o} value={o}>{o}</option>
                )}
            </select>
        </div>
    );
};

export default MaxAnswerErrorSetting;