import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setColorTheme} from 'themes';
import {ThemeType} from 'enums/ThemeType';

export interface SettingsState {
    showNumbers: boolean;
    showMinuteMarks: boolean;
    showSeconds: boolean;
    autoConfirm: boolean;
    // todo find better name
    valueSpread: number;
    answerTime: number;
    enableSecondsInput: boolean;
    theme: ThemeType;
}

const initialState: SettingsState = {
    showNumbers: false,
    showMinuteMarks: false,
    showSeconds: true,
    autoConfirm: false,
    valueSpread: 300,
    answerTime: 5,
    enableSecondsInput: false,
    theme: ThemeType.Dark
};

function getSettingsFromStorage(): SettingsState {
    const settingsString = localStorage.getItem('settings');
    if (!settingsString) {
        throw new Error('Cannot get settings from local storage');
    }
    return JSON.parse(settingsString);
}

function saveSettingsToStorage(settings: SettingsState) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

try {
    saveSettingsToStorage({...initialState, ...getSettingsFromStorage()});
    setColorTheme(getSettingsFromStorage().theme);
} catch (e: any) {
    saveSettingsToStorage(initialState);
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: getSettingsFromStorage(),
    reducers: {
        setSettings(state, action: PayloadAction<Partial<SettingsState>>) {
            const newSettings = {...state, ...action.payload};
            saveSettingsToStorage(newSettings);
            if (action.payload.theme) {
                setColorTheme(action.payload.theme);
            }
            return newSettings;
        }
    }
});

export const {setSettings} = settingsSlice.actions;

export default settingsSlice.reducer;