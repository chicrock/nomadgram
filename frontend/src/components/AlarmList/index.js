import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
    const { user: { alarmList } } = state;
    return {
        alarmList,
    };
};

/// attach function to props
export default connect(mapStateToProps, null)(Container);
