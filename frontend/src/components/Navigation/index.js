import { connect } from "react-redux";
import Container from "./container";
import { push } from "react-router-redux";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goToSearch: (searchTerm) => {
            dispatch(push(`/search/${searchTerm}`));
        },
        getUserAlarms: () => {
            dispatch(userActions.getUserAlarms());
        },
    };
};

const mapStateToProps = (state, ownProps) => {
    const { user } = state;

    return {
        username: user.username,
    };
};

/// attach function to props
export default connect(mapStateToProps, mapDispatchToProps)(Container);
