import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SettingsState {
    showNumbers: boolean;
    showMinuteMarks: boolean;
    showSeconds: boolean;
    // todo find better name
    valueSpread: number;
    enableSecondsInput: boolean;
}

const initialState: SettingsState = {
    showNumbers: false,
    showMinuteMarks: false,
    showSeconds: true,
    valueSpread: 300,
    enableSecondsInput: false
};



const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings(state, action: PayloadAction<Partial<SettingsState>>) {
            return {...state, ...action.payload};
        }
    }
})