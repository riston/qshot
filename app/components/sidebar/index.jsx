
import Radium from "radium";
import React, { Component, PropTypes } from "react";

import ImageList   from "image-list";
import ButtonStyle from "styles/button";

@Radium
export default class Sidebar extends Component {

    static propTypes = {
        isVisible:         PropTypes.bool,
        onCloseFn:         PropTypes.func.isRequired,
        onDownloadAllFn:   PropTypes.func.isRequired,
        onScreenCaptureFn: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isVisible: true,
    }

    render() {
        const { isVisible } = this.props;
        const year = new Date().getFullYear();

        return (
            <div className="sidebar"
                style={[styles.base, isVisible ? styles.isVisible : styles.isHidden]}
                onClick={e => this._onClick(e)}
            >
                <div style={styles.header}>
                    <h2 style={styles.h2}>QShot</h2>
                    <button key="capture"
                        style={ButtonStyle.menuButton}
                        data-action="screen-capture">Screen capture</button>
                    <button key="download-all"
                        style={ButtonStyle.menuButton}
                        data-action="download-all">Download All</button>
                </div>
                <div style={styles.body}>
                    <ImageList images={this.props.images} />
                </div>
                <div style={styles.footer}>
                    <button key="close"
                        style={ButtonStyle.menuButton}
                        data-action="close">Close</button>
                    <div style={styles.footerCopy}>
                        Risto Novik &copy; {year}
                    </div>
                </div>
            </div>
        )
    }

    _onClick(e) {
        const { action } = e.target.dataset;
        const {
            onCloseFn, onDownloadAllFn, onScreenCaptureFn,
        } = this.props;

        switch (action) {
        case "download-all":
            return onDownloadAllFn();

        case "close":
            return onCloseFn();

        case "screen-capture":
            return onScreenCaptureFn();
        }
    }
}

const styles = {

    base: {
        position: "fixed",
        top: "0px",
        right: "0px",
        width: "150px",
        height: "100vh",
        backgroundColor: "rgb(0, 100, 148)",
        display: "flex",
        flexDirection: "column",
    },

    header: {
        padding: "0.5em",
    },

    footer: {
        backgroundColor: "rgb(0, 100, 148)",
        padding: "0.5em",
        color: "#E8F1F2",
        fontWeight: 900,
    },

    footerCopy: {
        fontSize: "0.7em",
        textAlign: "center",
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    },

    h2: {
        fontSize: "1.5em",
        paddingBottom: "0.5em",
        fontWeight: "900",
        color: "#E8F1F2",
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
        textAlign: "center",
    },

    body: {
        // position: "relative",
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
        position: "relative",
    },

    isHidden: {
        display: "none",
    },

    isVisible: {
        display: "flex",
    }
};
