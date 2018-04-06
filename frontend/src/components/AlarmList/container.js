import React, { Component } from "react";
import AlarmList from "./presenter";

class Container extends Component {
    state = {
        loading: true,
    };
    componentDidMount() {
        const { alarmList } = this.props;
        if (alarmList) {
            this.setState({
                loading: false,
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.alarmList) {
            this.setState({
                loading: false,
            });
        }
    }
    render() {
        return <AlarmList {...this.props} {...this.state} />;
    }
}

export default Container;
