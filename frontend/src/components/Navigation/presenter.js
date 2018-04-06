import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

import AlarmList from "components/AlarmList";

const Navigation = (props, context) => (
    <div className={styles.navigation}>
        <div className={styles.inner}>
            <div className={styles.column}>
                <Link to="/">
                    <img
                        src={require("images/logo.png")}
                        className={styles.logo}
                        alt={context.t("Logo")}
                    />
                </Link>
            </div>
            <div className={styles.column}>
                <form onSubmit={props.onSubmit}>
                    <input
                        type="text"
                        placeholder={context.t("Search")}
                        className={styles.searchInput}
                        onChange={props.onInputChange}
                        value={props.value}
                    />
                </form>
            </div>

            <div className={styles.column}>
                <div className={styles.navIcon}>
                    <Link to="/explore">
                        <Ionicon
                            icon="ios-compass-outline"
                            fontSize="28px"
                            color="black"
                        />
                    </Link>
                </div>
                <div className={styles.navIcon}>
                    <span onClick={props.openAlarms}>
                        <Ionicon
                            icon="ios-heart-outline"
                            fontSize="28px"
                            color="black"
                        />
                    </span>
                    {props.seeingAlarms && (
                        <AlarmList
                            title={context.t("Alarms")}
                            closeAlarms={props.closeAlarms}
                        />
                    )}
                </div>
                <div className={styles.navIcon}>
                    <Link to="/profile">
                        <Ionicon
                            icon="ios-person-outline"
                            fontSize="32px"
                            color="black"
                        />
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

Navigation.contextTypes = {
    t: PropTypes.func.isRequired,
};

Navigation.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    openAlarms: PropTypes.func.isRequired,
    closeAlarms: PropTypes.func.isRequired,
    seeingAlarms: PropTypes.bool.isRequired,
};

export default Navigation;
