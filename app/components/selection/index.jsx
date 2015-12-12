
import Radium from "radium";
import React, { Component, PropTypes} from "react";

import Badge from "badge";

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
        const { x, y, width, height } = this.props;
        const rectStyles = {
            transform: `translate3d(${x}px, ${y}px, 0)`,
            width,
            height,
        };
        const badge = this.isBadgeVisible(width, height)
            ? <Badge text={`${width}x${height}`} style={{color: "red"}} />
            : null;

        return (
            <div style={[styles.selection, rectStyles, isVisible && styles.hide]}>
                <div style={[styles.corner, styles.topLeft]}></div>
                <div style={[styles.corner, styles.topRight]}></div>
                <div style={[styles.corner, styles.bottomLeft]}></div>
                <div style={[styles.corner, styles.bottomRight]}></div>
                {badge}
            </div>
        )
    }

    isBadgeVisible(width, height) {
        const MIN_SIZE = 64;

        return width >= MIN_SIZE
            && height >= MIN_SIZE;
    }
}

const styles = {

    selection: {
        position: "fixed",
        border: "1.3px solid #006494",
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

    sizeBadge: {
        position: "absolute",
        display: "block",
        bottom: "10px",
        left: "50%",
        background: "#73C1E2",
        padding: "0.2em",
        borderRadius: "5px",
        color: "#FFF",
        fontSize: "0.9em",
        fontWeight: "900",
    }
};
