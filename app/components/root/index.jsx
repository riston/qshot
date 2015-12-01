
import "./reset.css";

import Radium             from "radium";
import Rx, { Observable } from "rx";
import React, {Component} from "react";
import { connect }        from "react-redux";

import * as Application from "actions/app";
import Sidebar          from "sidebar";
import Selection        from "selection";

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
        this.up$ = Observable.fromEvent(document, "mouseup");
        this.down$ = Observable.fromEvent(document, "mousedown");
        this.move$ = Observable.fromEvent(document, "mousemove");

        this.path$ = this.down$
          .first()
          .concat(this.move$.takeUntil(this.up$))
          .repeat()
          .map(this._eventToObject.bind(this))
          .distinctUntilChanged();

        this.up$
            // .filter(this._isSidebar, this)
            .subscribe(e => this._mouseUp(e));
        this.down$
            .subscribe(e => this._mouseDown(e));
        this.path$
            // .filter(this._isSidebar, this)
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
            isVisible, isSidebarVisible, isSelectionVisible, images
        } = this.props;

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
                    onCloseFn={this._onClose.bind(this)}
                    onDownloadAllFn={this._onDownloadAll.bind(this)} />
			</section>
		)
	}

    _onClose() {
        const { dispatch }  = this.props;

        dispatch(Application.close());
    }

    _onDownloadAll() {
        console.log("Download all images");
    }

    _mouseUp(ev) {
        const { dispatch }  = this.props;
        const { selection } = this.state;

        if (this._isSidebar(ev, "sidebar")) {
            return;
        }

        this.setState({ start: null });

        // Capture event
        dispatch(Application.hideSelection());
        dispatch(Application.capture(selection));
        dispatch(Application.showSidebar());
    }

    _mouseDown(ev) {

        // Check is sidebar
        if (this._isSidebar(ev, "sidebar")) {
            return;
        }

        const { dispatch } = this.props;
        console.log("Click done", this._getXY(ev));

        this.setState({ start: this._getXY(ev) });

        // Show selection
        dispatch(Application.showSelection());

        // Hide sidebar for more room
        dispatch(Application.hideSidebar());
    }

    _mouseMove(selection) {

        this.setState({ selection });
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
        console.log("Is action", ev);
        // return ev.target
        //     && ev.target.dataset
        //     && ev.target.dataset.action;
        const isOnSidebar = this._checkParentByClass(ev, "sidebar");
        console.log("Check parent", isOnSidebar);
        return isOnSidebar;
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
    };
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
        // backgroundColor: "rgba(200, 200, 200, 0.3)",
    },

    hide: {
        visibility: "hidden",
    },

    show: {
        visibility: "visible",
    },
};
