import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

class Container extends Component {
    state = {
        loading: true,
    };

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { getUserProfile } = this.props;
        getUserProfile();
    }

    render() {
        return <Profile {...this.state} {...this.props} />;
    }
}

export default Container;
