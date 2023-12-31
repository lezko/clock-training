import {ThemeType} from 'enums/ThemeType';

interface ITheme {
    bgColor: string;
    primaryColor: string;
    secondaryColor: string;
    focusColor: string;
}

const LightTheme: ITheme = {
    bgColor: '#f9fcdc',
    primaryColor: '#356c35',
    secondaryColor: '#e7b14a',
    focusColor: 'darkblue'
};

const DarkTheme: ITheme = {
    bgColor: '#211e21',
    primaryColor: '#e0c1a6',
    secondaryColor: '#e4a66f',
    focusColor: 'blue'
};

const themes = {
    [ThemeType.Light]: LightTheme,
    [ThemeType.Dark]: DarkTheme
};

export function setColorTheme(themeType: ThemeType) {
    const theme = themes[themeType];
    document.documentElement.style.setProperty('--bg-color', theme.bgColor);
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--focus-color', theme.focusColor);
}