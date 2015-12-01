
// import "image/image.css"
import Radium from "radium"
import React, { Component, PropTypes } from "react"

import Progressbar from "progressbar";

@Radium
export default class Image extends Component {

    state = {
        showActions: false,
        progress: 10
    }

    constructor(props) {
        super(props);

        this.updateRef = setInterval(() => {
            const current = this.state.progress;

            this.setState({
                progress: current > 100 ? 0 : current + 10,
            });
        }, Math.random() * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateRef);
        this.updateRef = null;
    }

    render() {
        const { id, url } = this.props;
        const hideLayer = !this.state.showActions;
        const progress = this.state.progress;

        return (
            <div style={styles.base}
                onMouseEnter={this._onMouseEnter.bind(this)}
                onMouseLeave={this._onMouseLeave.bind(this)}>
                <img style={styles.img} src={url} />
                <div style={[styles.layer, hideLayer && styles.isHidden]}>
                    {this.renderActionButtons(id)}
                </div>
                <Progressbar progress={progress} />
            </div>
        )
    }

    renderActionButtons(id) {

        const downloadStyles = [styles.actionsButton, styles.downloadBtn];
        const uploadStyles = [styles.actionsButton, styles.uploadBtn];
        const deleteStyles = [styles.actionsButton, styles.deleteBtn];

        return (
            <div style={styles.actions}>
                <button key="delete" data-id={id} data-action="delete" style={deleteStyles}>
                    Delete
                </button>
                <button key="upload" data-id={id} data-action="upload" style={uploadStyles}>
                    Upload
                </button>
                <button key="download" data-id={id} data-action="download" style={downloadStyles}>
                    Download
                </button>
            </div>
        );
    }

    _onMouseEnter() {
        this.setState({ showActions: true });
    }

    _onMouseLeave() {
        this.setState({ showActions: false });
    }
}

const styles = {

    base: {
        position: "relative",
        boxSizing: "border-box",
        border: "1px solid #aaa",
        display: "block",
        width: "130px",
        margin: "0 auto 1em",
    },

    img: {
        display: "block",
        maxWidth: "128px",
        minWidth: "128px",
        minHeight: "128px",
    },

    layer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(100, 100, 100, 0.8)",

        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",

    },

    actions: {
        display: "flex",
        flexDirection: "column",
    },

    actionsButton: {
        margin: "0.1em",
        color: "#fff",
        fontSize: "1em",
        fontWeight: "800",
        borderRadius: "3px",
        padding: "0.4em",
        border: "none",
        outline: "none",
        cursor: "pointer",

        ":hover": {
            opacity: "0.7"
        }
    },

    deleteBtn: {
        backgroundColor: "#AD4E4E",
    },

    uploadBtn: {
        backgroundColor: "#2FBD4F",
    },

    downloadBtn: {
        backgroundColor: "#2FBD4F",
    },

    isHidden: {
        display: "none",
    }
}
