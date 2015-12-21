
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
                <div style={styles.closeWrapper}>
                    <button data-action="close" style={styles.closeButton}>✖</button>
                </div>
                <img style={styles.image} src={url} />
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
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: "#006494",
    },

    image: {
        width: "500px",
        minWidth: "200px",
        minHeight: "100px",
        height: "auto",
    },

    closeWrapper: {
        position: "absolute",
        top: "-0.5em",
        right: "-0.5em",
    },

    closeButton: {
        backgroundColor: "#888",
        borderRadius: "50%",
        fontWeight: "900",
        padding: "0.5em",
        color: "#FFF",
        cursor: "pointer",
        border: "none",
        outline: "none",

        ":hover": {
            backgroundColor: "#F00",
        }
    },

    isHidden: {
        display: "none",
    }
};
