import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Ionicon from 'react-ionicons';

const PhotoActions = (props, context) => (
    <div>
        <div>
            <span>
                <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
            </span>
            <span>
                <Ionicon icon="ios-text-outline" fontSize="28px" color="black" />
            </span>
        </div>
        <span>
            {props.number} {props.number === 1 ? context.t('like') : context.t('likes')}
        </span>
    </div>
);

PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired,
};

PhotoActions.propsTypes = {
    number: PropTypes.number.isRequired,
};

export default PhotoActions;
