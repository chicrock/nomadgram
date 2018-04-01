import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Ionicon from 'react-ionicons';

const PhotoActions = (props, context) => (
    <div className={styles.actions}>
        <div className={styles.icons}>
            <span className={styles.icon} onClick={props.handleHeartClick}>
                {props.isLiked ? (
                    <Ionicon icon="ios-heart" fontSize="28px" color="#EB4B59" />
                ) : (
                    <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
                )}
            </span>
            <span className={styles.icon}>
                <Ionicon icon="ios-text-outline" fontSize="28px" color="black" />
            </span>
        </div>
        <span className={styles.likes} onClick={props.openLikes}>
            {props.number} {props.number === 1 ? context.t('like') : context.t('likes')}
        </span>
    </div>
);

PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired,
};

PhotoActions.propsTypes = {
    number: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    photoId: PropTypes.number.isRequired,
    handleHeartClick: PropTypes.func.isRequired,
    openLikes: PropTypes.func.isRequired,
};

export default PhotoActions;
