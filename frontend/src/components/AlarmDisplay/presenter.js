import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const AlarmDisplay = (props, context) => (
    <div className={styles.row}>
        <div className={styles.column}>
            <img
                src={
                    props.alarm.creator.profile_image ||
                    require("images/noPhoto.jpg")
                }
                alt={props.alarm.creator.username}
                className={props.big ? styles.bigAvatar : styles.avatar}
            />
            <div className={styles.user}>
                <span className={styles.username}>
                    {props.alarm.creator.username}
                </span>
                <span className={styles.name}>
                    {(() => {
                        switch (props.alarm.notification_type) {
                            case "follow":
                                return context.t("was following you");
                            case "like":
                                return context.t("was like your photo");
                            case "comment":
                                return context.t("was comment your photo");
                            default:
                                return context.t("was something do for you");
                        }
                    })()}
                </span>
            </div>
        </div>
        {props.alarm.notification_type === "follow" ? (
            <RenderFollows
                isFollowing={props.alarm.creator.following}
                handleClick={props.handleClick}
            />
        ) : (
            <RenderPhotos file={props.alarm.image.file} />
        )}
    </div>
);

const RenderPhotos = (props) => (
    <span className={styles.column}>
        <img className={styles.image} src={props.file} alt={""} />
    </span>
);

const RenderFollows = (props, context) => (
    <span className={styles.column}>
        <button className={styles.button} onClick={props.handleClick}>
            {props.isFollowing ? context.t("Unfollow") : context.t("Follow")}
        </button>
    </span>
);

RenderPhotos.propTypes = {
    file: PropTypes.string.isRequired,
};

RenderFollows.contextTypes = {
    t: PropTypes.func.isRequired,
};
RenderFollows.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isFollowing: PropTypes.bool.isRequired,
};

AlarmDisplay.contextTypes = {
    t: PropTypes.func.isRequired,
};

AlarmDisplay.propTypes = {
    handleClick: PropTypes.func.isRequired,
    alarm: PropTypes.shape({
        creator: PropTypes.shape({
            following: PropTypes.bool.isRequired,
            id: PropTypes.number.isRequired,
            name: PropTypes.string,
            profile_image: PropTypes.string,
            username: PropTypes.string.isRequired,
        }),
        id: PropTypes.number.isRequired,
        image: PropTypes.shape({
            file: PropTypes.string.isRequired,
        }),
        notification_type: PropTypes.string.isRequired,
    }).isRequired,
};

export default AlarmDisplay;
