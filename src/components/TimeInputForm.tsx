import Cleave from 'cleave.js/react';
import {ChangeEvent, FC} from 'react';

interface TimeInputFormProps {
    onSubmit: (h: number, m: number, s?: number) => void;
}

const TimeInputForm: FC<TimeInputFormProps> = ({onSubmit}) => {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <Cleave
                options={{time: true}}
                onChange={handleChange}
            />
        </form>
    );
};

export default TimeInputForm;