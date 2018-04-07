import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import AlarmDisplay from "components/AlarmDisplay";

const AlarmList = (props) => (
    <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.content}>
                {props.loading ? (
                    <Loading />
                ) : (
                    <RenderAlarms list={props.alarmList} />
                )}
            </div>
        </div>
    </div>
);

const RenderAlarms = (props) =>
    props.list.map((alarm) => <AlarmDisplay key={alarm.id} alarm={alarm} />);

RenderAlarms.propTypes = {
    list: PropTypes.array,
};

AlarmList.propTypes = {
    alarmList: PropTypes.arrayOf(
        PropTypes.shape({
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
        }).isRequired
    ),
};

export default AlarmList;
