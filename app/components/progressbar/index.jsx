
import Radium from "radium"
import React, { Component, PropTypes } from "react"

@Radium
export default class Progressbar extends Component {

    static propTypes = {
        progress: PropTypes.number.isRequired,
        isVisible: PropTypes.bool,
        isDone: PropTypes.bool,
    }

    static defaultProps = {
        progress: 0,
        isVisible: false,
        isDone: true,
    }

    render() {
        const { progress, isDone, isVisible } = this.props;
        const done = isDone || progress >= 100;

        const currentProgress = {
            width: progress
        }

        return (
            <div
                style={[
                    styles.progress,
                    currentProgress,
                    done && styles.isDone,
                    !isVisible && styles.isHidden
            ]}></div>
        )
    }
}

const styles = {

    progress: {
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "0",
        height: "0.2em",
        backgroundColor: "#098BFF",
    },

    isDone: {
        backgroundColor: "#40D804",
    },

    isHidden: {
        display: "none",
    }
};
