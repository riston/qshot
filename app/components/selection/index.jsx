
import Radium from "radium";
import React, { Component, PropTypes} from "react";

@Radium
export default class Selection extends Component {

    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        isVisible: PropTypes.bool,
    }

    static defaultProps = {
        isVisible: true,
    }

    render() {

        const isVisible = !this.props.isVisible;
        const { x, y } = this.props;
        const rectStyles = {
            transform: `translate3d(${x}px, ${y}px, 0)`,
            width: this.props.width,
            height: this.props.height,
        };

        return (
            <div style={[styles.selection, rectStyles, isVisible && styles.hide]}>
                <div style={[styles.corner, styles.topLeft]}></div>
                <div style={[styles.corner, styles.topRight]}></div>
                <div style={[styles.corner, styles.bottomLeft]}></div>
                <div style={[styles.corner, styles.bottomRight]}></div>
            </div>
        )
    }
}

const styles = {

    selection: {
        position: "fixed",
        border: "1.3px dashed #006494",
    },

    hide: {
        display: "none",
    },

    corner: {
        position: "absolute",
        backgroundColor: "#73C1E2",
        borderRadius: "6px",
        width: "6px",
        height: "6px",
    },

    topLeft: {
        top: "-3px",
        left: "-3px",
    },

    topRight: {
        top: "-3px",
        right: "-3px",
    },

    bottomLeft: {
        bottom: "-3px",
        left: "-3px",
    },

    bottomRight: {
        bottom: "-3px",
        right: "-3px",
    },

};
