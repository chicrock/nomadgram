import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    const { user } = ownProps;
    return {
        handleClick: () => {
            //dispatch(userActions);
            if (user.following) {
                dispatch(userActions.unfollowUser(user.id));
            } else {
                dispatch(userActions.followUser(user.id));
            }
        },
    };
};

/// attach function to props
export default connect(null, mapDispatchToProps)(Container);
