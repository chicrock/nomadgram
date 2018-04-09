import React, { Component } from "react";
import Navigation from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
    state = {
        term: "",
        seeingAlarms: false,
    };
    static propTypes = {
        goToSearch: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
    };
    render() {
        return (
            <Navigation
                value={this.state.term}
                onInputChange={this._onInputChange}
                onSubmit={this._onSubmit}
                openAlarms={this._openAlarms}
                closeAlarms={this._closeAlarms}
                seeingAlarms={this.state.seeingAlarms}
                {...this.props}
            />
        );
    }

    _onInputChange = (event) => {
        const { target: { value } } = event;
        this.setState({
            term: value,
        });
    };

    _onSubmit = (event) => {
        const { term } = this.state;
        const { goToSearch } = this.props;
        event.preventDefault();

        goToSearch(term);

        this.setState({
            term: "",
        });
    };

    _openAlarms = (event) => {
        const { getUserAlarms } = this.props;
        this.setState({
            seeingAlarms: !this.state.seeingAlarms,
        });

        if (this.state.seeingAlarms === false) {
            getUserAlarms();
        }
    };

    _closeAlarms = () => {
        this.setState({
            seeingAlarms: false,
        });
    };
}

export default Container;
