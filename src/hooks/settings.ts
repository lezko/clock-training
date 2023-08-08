import {useAppSelector} from 'store';
import {SettingsState} from 'store/settings/slice';

export function useSettings(): SettingsState {
    return useAppSelector(state => state.settings);
}