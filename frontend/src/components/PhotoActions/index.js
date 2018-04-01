import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as photoAction } from 'redux/modules/photos';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleHeartClick: () => {
            if (ownProps.isLiked) {
                dispatch(photoAction.unlikePhoto(ownProps.photoId));
            } else {
                dispatch(photoAction.likePhoto(ownProps.photoId));
            }
        },
    };
};

/// attach function to props
export default connect(null, mapDispatchToProps)(Container);
