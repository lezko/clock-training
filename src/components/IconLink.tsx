import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NavLink} from 'react-router-dom';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FC} from 'react';
import styles from 'scss/IconLink.module.scss';

interface IconLinkProps {
    icon: IconDefinition;
    path: string;
}

const IconLink: FC<IconLinkProps> = ({icon, path}) => {
    return <NavLink to={path}><FontAwesomeIcon className={styles.iconLink} icon={icon} /></NavLink>;
};

export default IconLink;