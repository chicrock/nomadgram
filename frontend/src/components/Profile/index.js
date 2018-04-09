import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: { userName } } } = ownProps;
    return {
        getUserProfile: () => {
            dispatch(userActions.getUserProfile(userName));
        },
    };
};

/// attach function to props
export default connect(null, mapDispatchToProps)(Container);
