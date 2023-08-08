import IconLink from 'components/IconLink';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <div>
            <nav><IconLink icon={faArrowLeft} path="/main" /></nav>
            about
        </div>
    );
};

export default About;