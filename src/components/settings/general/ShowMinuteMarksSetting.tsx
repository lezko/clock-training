import {setSettings} from 'store/settings/slice';
import {useAppDispatch} from 'store';
import {useSettings} from 'hooks/settings';
import {useState} from 'react';

const ShowMinuteMarksSetting = () => {
    const dispatch = useAppDispatch();
    const {showMinuteMarks} = useSettings();
    const [id] = useState(String(Math.random()));
    return (
        <div>
            <label htmlFor={id}>Show minute marks</label>
            <input
                type="checkbox"
                id={id}
                checked={showMinuteMarks}
                onChange={() => dispatch(setSettings({showMinuteMarks: !showMinuteMarks}))}
            />
        </div>
    );
};

export default ShowMinuteMarksSetting;