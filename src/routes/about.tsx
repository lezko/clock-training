import IconLink from 'components/IconLink';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import styles from 'scss/pages/about.module.scss';
import navStyles from 'scss/Nav.module.scss';

const About = () => {
    return (
        <div className={styles.about}>
            <nav className={navStyles.nav}><IconLink icon={faArrowLeft} path="/main" /></nav>
            <main>
                about
            </main>
        </div>
    );
};

export default About;