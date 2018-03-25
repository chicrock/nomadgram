import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import PhotoActions from 'components/PhotoActions';

const FeedPhoto = (props, context) => {
    console.log(props);
    return (
        <div className={styles.feedPhoto}>
            <header className={styles.header}>
                <img
                    src={props.creator.profile_image || require('images/noPhoto.jpg')}
                    alt={props.creator.username}
                    className={styles.image}
                />
                <div className={styles.headerColumn}>
                    <span className={styles.creator}>{props.creator.username}</span>
                    <span className={styles.location}>{props.location}</span>
                </div>
            </header>
            <img src={props.file} alt={props.caption} />
            <div>
                <PhotoActions number={props.like_count} />
            </div>
        </div>
    );
};

FeedPhoto.propsTypes = {
    creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    comment: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            creator: PropTypes.shape({
                profile_image: PropTypes.string,
                username: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    created_on: PropTypes.string.isRequired,
};

export default FeedPhoto;
