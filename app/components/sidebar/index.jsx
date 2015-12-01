
import Radium from "radium";
import React, { Component, PropTypes } from "react";
import ImageList from "image-list";

@Radium
export default class Sidebar extends Component {

    static propTypes = {
        isVisible:       PropTypes.bool,
        onCloseFn:       PropTypes.func.isRequired,
        onDownloadAllFn: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isVisible: true,
    }

    render() {
        const { isVisible } = this.props;

        return (
            <div className="sidebar"
                style={[styles.base, isVisible ? styles.isVisible : styles.isHidden]}
            >
                <div style={styles.header} onClick={e => this._onClick(e)}>
                    <h2 style={styles.h2}>QuickShot</h2>
                    <button style={styles.button} data-action="download-all">Download All</button>
                    <button style={styles.button} data-action="close">Close</button>
                </div>
                <div>
                    <ImageList images={this.props.images} />
                </div>
            </div>
        )
    }

    _onClick(e) {
        const { action } = e.target.dataset;
        const { onCloseFn, onDownloadAllFn } = this.props;

        if ("download-all" === action) {
            onDownloadAllFn();
        }
        else if ("close" === action) {
            onCloseFn();
        }
    }
}

const styles = {

    base: {
        position: "fixed",
        top: "0px",
        right: "0px",
        width: "150px",
        height: "100%",
        backgroundColor: "rgb(0, 100, 148)",
    },

    header: {
        padding: "0.5em",
    },

    h2: {
        fontSize: "1.5em",
        paddingBottom: "0.5em",
        fontWeight: "900",
        color: "#E8F1F2",
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    },

    button: {
        cursor: "pointer",
        fontSize: "1em",
        fontWeight: "600",
        width: "100%",
        padding: "0.2em",
        outline: "none",
        border: "none",
        borderRadius: "3px",
        backgroundColor: "#E84855",
        color: "#FFF",
        marginBottom: "0.5em",
    },

    isHidden: {
        display: "none",
    },

    isVisible: {
        display: "block",
    }
};
