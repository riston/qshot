
import Radium from "radium"
import React, { Component, PropTypes } from "react"

@Radium
export default class ImagePreview extends Component {

    static propTypes = {
        url:       PropTypes.string,
        isVisible: PropTypes.bool,
        onClose:   PropTypes.func,
    }

    static defaultProps = {
        isVisible: true,
        onClose: () => console.log("NOOP on close"),
    }

    render() {
        const { url, isVisible } = this.props;

        if (!url || !isVisible) {
            return null;
        }

        return (
            <div className="image-preview"
                style={styles.imagePreview}
                onClick={e => this._onClick(e)}
            >
                <div style={styles.overlay} />
                <img style={styles.image} src={url} />
                <div style={styles.closeWrapper}>
                    <button data-action="close" style={styles.closeButton}>✖</button>
                </div>
            </div>
        )
    }

    _onClick(e) {
        const { action } = e.target.dataset;
        e.stopPropagation();

        if (action === "close") {
            this.props.onClose(e);
        }
    }
}

const styles = {

    imagePreview: {
        position: "relative",
        height: "100%",
        padding: 0,
        margin: 0,
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "#000",
        opacity: "0.5",
    },

    image: {
        maxWidth: "70%",
        maxHeight: "70%",
        margin: "auto",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        objectFit: "contain",
    },

    closeWrapper: {
        position: "absolute",
        top: "2em",
        right: "12em",
    },

    closeButton: {
        backgroundColor: "#000",
        borderRadius: "50%",
        fontSize: "1.4em",
        padding: "0.3em",
        color: "#FFF",
        cursor: "pointer",
        border: "none",
        outline: "none",

        ":hover": {
            backgroundColor: "#F00",
        }
    },
};
