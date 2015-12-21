
import "./reset.css";
import "./style.css";

import R                   from "ramda";
import Radium              from "radium";
import Rx, { Observable }  from "rx";
import React, {Component } from "react";
import { connect }         from "react-redux";

import * as Application from "actions/app";
import Sidebar          from "sidebar";
import Selection        from "selection";
import ImagePreview     from "image-preview";

@connect(state => {
    return state.app;
})
@Radium
export default class Root extends Component {

    state = {
        start: null,
        selection: { x: 0, y: 0, width: 0, height: 0 },
    }

    componentWillMount() {
        this.up$   = Observable.fromEvent(document, "mouseup");
        this.down$ = Observable.fromEvent(document, "mousedown");
        this.move$ = Observable.fromEvent(document, "mousemove");

        this.path$ = this.down$
          .first()
          .concat(this.move$.takeUntil(this.up$))
          .repeat()
          .map(this._eventToObject.bind(this))
          .distinctUntilChanged();

        this.up$
            .subscribe(e => this._mouseUp(e));
        this.down$
            .subscribe(e => this._mouseDown(e));
        this.path$
            .subscribe(e => this._mouseMove(e));
    }

    componentWillUnmount() {
        this.up$.dispose();
        this.down$.dispose();
        this.move$.dispose();

        this.path$.dispose();
    }

	render() {
        const {x, y, width, height} = this.state.selection;
        const {
            isVisible, isSidebarVisible, isSelectionVisible, preview, images
        } = this.props;
        const image = R.pathOr(null, [preview], images);

		return (
			<section style={[styles.base, !isVisible && styles.hide]}>
                <div style={styles.overlay}>
                    <Selection isVisible={isSelectionVisible}
                        x={x}
                        y={y}
                        width={width}
                        height={height} />
                </div>
                <Sidebar images={images}
                    isVisible={isSidebarVisible}
                    onScreenCaptureFn={this._onScreenCapture.bind(this)}
                    onCloseFn={this._onClose.bind(this)}
                    onDownloadAllFn={this._onDownloadAll.bind(this)} />
                <ImagePreview
                    {...image}
                    onClose={this._onPreviewClose.bind(this)} />
			</section>
		)
	}

    _onClose() {
        const { dispatch } = this.props;

        dispatch(Application.close());
    }

    _onPreviewClose() {
        const { dispatch } = this.props;

        dispatch(Application.hidePreview());
    }

    _onDownloadAll() {
        const { dispatch, images } = this.props;

        const keys = R.keys(images);
        const asArray = R.map(ID => R.assoc("id", ID, images[ID]), keys);

        dispatch(Application.zip(asArray));
    }

    _onScreenCapture() {
        const { dispatch } = this.props;

        // Instead of user selection, use whole screen
        const selection = {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this._capture(selection, dispatch);
    }

    _mouseUp(ev) {
        const { dispatch }  = this.props;
        const { selection } = this.state;

        if (this._isSidebar(ev) || this._isImagePreview(ev)) {
            return;
        }

        this.setState({ start: null });

        this._capture(selection, dispatch);
    }

    _mouseDown(ev) {

        // Check is sidebar
        if (this._isSidebar(ev) || this._isImagePreview(ev)) {
            return;
        }

        const { dispatch } = this.props;

        this.setState({ start: this._getXY(ev) });

        // Show selection
        dispatch(Application.showSelection());

        // Hide sidebar for more room
        dispatch(Application.hideSidebar());
    }

    _mouseMove(selection) {

        this.setState({ selection });
    }

    _capture(selection, dispatch) {

        // Hide the UI
        dispatch(Application.hide());
        dispatch(Application.hideSelection());

        // Capture event
        dispatch(Application.capture(selection));
        dispatch(Application.showSidebar());

        // Show UI again
        setTimeout(() => dispatch(Application.visible()), 200);
    }

    _eventToObject(ev) {
        if (!this.state.start) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }

        const { start } = this.state;
        const current = this._getXY(ev);

        let width = (current[0] - start[0]);
        let height = (current[1] - start[1]);

        return this._normalize({
            x: start[0],
            y: start[1],
            width,
            height,
        });
    }

    _normalize(rect) {
        let { x, y, width, height } = rect;

        return {
            x: width < 0 ? x + width : x,
            y: height < 0 ? y + height : y,
            width: Math.abs(width),
            height: Math.abs(height),
        };
    }

    _isSidebar(ev) {
        const isOnSidebar = this._checkParentByClass(ev, "sidebar");
        return isOnSidebar;
    }

    _isImagePreview(ev) {
        const isOnImagePreview = this._checkParentByClass(ev, "image-preview");
        return isOnImagePreview;
    }

    _checkParentByClass(ev, name) {
        let found = false;
        let path = [];
        let target = ev
            && ev.target
            && ev.target.parentNode;

        let check = target
            && target.parentNode;

        do {
            if (target && target.className === name) {
                found = true;
            }

            path.push(target);
        } while (!found && check && (target = target.parentNode));

        return found;
    }

    _getXY(ev) {
        return [
          ev.pageX - document.body.scrollLeft,
          ev.pageY - document.body.scrollTop
        ];
    }
}

// Styles
const styles = {
    base: {
        position: "absolute",
        boxSizing: "border-box",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
    },

    overlay: {
        cursor: "crosshair",
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        userSelect: "none",
    },

    hide: {
        visibility: "hidden",
    },

    show: {
        visibility: "visible",
    },
};
