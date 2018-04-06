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
                <span className={styles.name}>{props.alarm.creator.name}</span>
            </div>
        </div>
        <span className={styles.column}>
            <button className={styles.button} onClick={props.handleClick}>
                {props.alarm.creator.following
                    ? context.t("Unfollow")
                    : context.t("Follow")}
            </button>
        </span>
    </div>
);

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
