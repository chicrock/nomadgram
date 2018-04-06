import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
    const { alarm } = ownProps;
    return {
        handleClick: () => {
            //dispatch(userActions);
            if (alarm.creator.following) {
                dispatch(userActions.unfollowUser(alarm.creator.id));
            } else {
                dispatch(userActions.followUser(alarm.creator.id));
            }
        },
    };
};

/// attach function to props
export default connect(null, mapDispatchToProps)(Container);
