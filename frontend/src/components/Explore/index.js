import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/user';

const mapStateToProps = (state, ownProps) => {
    const { user: { userList } } = state;
    return {
        userList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getExplore: () => {
            dispatch(userActions.getExplore());
        },
    };
};

/// attach function to props
export default connect(mapStateToProps, mapDispatchToProps)(Container);
