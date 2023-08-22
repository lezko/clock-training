import {useState} from 'react';
import styles from 'scss/pages/main.module.scss';
import navStyles from 'scss/Nav.module.scss';
import {faCircleInfo, faGear} from '@fortawesome/free-solid-svg-icons';
import IconLink from 'components/IconLink';
import DefaultScreen from 'components/main-screens/DefaultScreen';
import GameScreen from 'components/main-screens/GameScreen';
import FinishScreen from 'components/main-screens/FinishScreen';
import {useSettings} from 'hooks/settings';

const Main = () => {
    const {roundCount} = useSettings();
    const [status, setStatus] = useState<'default' | 'playing' | 'finished'>('default');
    // todo find better solution
    const [roundsWon, setRoundsWon] = useState(0);

    let screen;
    if (status === 'default') {
        screen = <DefaultScreen startGame={() => setStatus('playing')} />;
    } else if (status === 'finished') {
        screen = <FinishScreen
            roundsWon={roundsWon}
            startNewGame={() => setStatus('playing')}
            goToMainScreen={() => setStatus('default')}
            totalRounds={roundCount}
        />;
    } else {
        screen = <GameScreen stopGame={(roundsWon) => {
            if (typeof roundsWon === 'number') {
                setRoundsWon(roundsWon);
                setStatus('finished');
            } else {
                setStatus('default');
            }
        }} />;
    }

    return (
        <div className={styles.main}>
            <nav className={navStyles.nav}>
                <ul>
                    <li><IconLink icon={faCircleInfo} path="/about" /></li>
                    <li><IconLink icon={faGear} path="/settings" /></li>
                </ul>
            </nav>
            {screen}
        </div>
    );
};

export default Main;