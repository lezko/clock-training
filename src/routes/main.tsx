import {useState} from 'react';
import styles from 'scss/pages/main.module.scss';
import navStyles from 'scss/Nav.module.scss';
import {faCircleInfo, faGear} from '@fortawesome/free-solid-svg-icons';
import IconLink from 'components/IconLink';
import DefaultScreen from 'components/DefaultScreen';
import GameScreen from 'components/GameScreen';

const Main = () => {
    const [status, setStatus] = useState<'default' | 'playing'>('default');

    return (
        <div className={styles.main}>
            <nav className={navStyles.nav}>
                <ul>
                    <li><IconLink icon={faCircleInfo} path="/about" /></li>
                    <li><IconLink icon={faGear} path="/settings" /></li>
                </ul>
            </nav>
            {/* todo 24h format */}
            {status === 'default' ?
                <DefaultScreen startGame={() => setStatus('playing')} /> :
                <GameScreen stopGame={() => setStatus('default')} />
            }
        </div>
    );
};

export default Main;