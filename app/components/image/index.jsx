
// import "image/image.css"
import Radium from "radium"
import React, { Component, PropTypes } from "react"

import Progressbar from "progressbar";

@Radium
export default class Image extends Component {

    state = {
        showActions: false,
    }

    constructor(props) {
        super(props);
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
                    <button data-id={id} data-action="delete" style={styles.quickAction}>
                        ✖
                    </button>
                </div>
            </div>
        )
    }

    renderActionButtons(id) {
        const buttons = [
            {
                action: "preview",
                text: "Preview",
                style: [styles.actionsButton, styles.previewBtn],
            },
            {
                action: "download",
                text: "Download",
                style: [styles.actionsButton, styles.downloadBtn],
            },
        ];

        const renderButtons = buttons.map((button, idx) => {
            return (
                <button key={idx} data-id={id} data-action={button.action} style={button.style}>
                    {button.text}
                </button>
            );
        });

        return (
            <div style={styles.actions}>
                {renderButtons}
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

    quickAction: {
        position: "absolute",
        top: "-0.5em",
        left: "-0.5em",
        backgroundColor: "#AF0A0A",
        borderRadius: "50%",
        padding: "0.4em",
        color: "#FFF",
        cursor: "pointer",
        border: "none",
        outline: "none",

        ":hover": {
            backgroundColor: "#F00",
        }
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

    previewBtn: {
        backgroundColor: "#2FBD4F",
    },

    downloadBtn: {
        backgroundColor: "#2FBD4F",
    },

    isHidden: {
        display: "none",
    }
}
