import {useSettings} from 'hooks/settings';
import {useAppDispatch} from 'store';
import {ChangeEvent} from 'react';
import {setSettings} from 'store/settings/slice';

const TimeFormatSetting = () => {
    const {timeFormat} = useSettings();
    const dispatch = useAppDispatch();
    const options = ['12h', '24h'];

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const nextTimeFormat: '12h' | '24h' = e.target.value === '12h' ? '12h' : '24h';
        dispatch(setSettings({timeFormat: nextTimeFormat}));
    }

    return (
        <div>
            <span>Time format:</span>
            <select onChange={handleChange} value={timeFormat}>
                {options.map(o =>
                    <option key={o} value={o}>{o}</option>
                )}
            </select>
        </div>
    );
};

export default TimeFormatSetting;