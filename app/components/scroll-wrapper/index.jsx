
import React, { Component } from "react";
import ReactDOM from "react-dom";
import IScroll from "iscroll";

export default class ScrollWrapper extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var wrapper = ReactDOM.findDOMNode(this);

        this.scroll = new IScroll(wrapper, {
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars: true,
        });

        setTimeout(() => {

            this.scroll.refresh()
        }, 300)
    }

    componentWillUnmount() {
        this.scroll.destroy();
        this.scroll = null;
    }

    render() {
        const { children } = this.props;

        const styles = {
            height: this.props.height || "80vh",
            overflow: "hidden",
            position: "absolute",
        };

        return (
            <div className="scroll-wrapper" style={styles}>
                {children}
            </div>
        )
    }

    refresh() {
        this.scroll.refresh();
    }
}
