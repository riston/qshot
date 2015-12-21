
import R                               from "ramda";
import Radium                          from "radium";
import React, { Component, PropTypes } from "react";
import CSSTransitionGroup              from "react-addons-css-transition-group";
import { connect }                     from "react-redux";

import * as Application from "actions/app";
import Image            from "image";
import ScrollWrapper    from "scroll-wrapper";

@connect(state => {
    return state.app;
})
@Radium
export default class ImageList extends Component {

    static propTypes = {
        images: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        this.refs.scroll.refresh();
    }

    render() {
        const { images } = this.props;
        const IDs = R.keys(images);

        const renderImages = IDs.map(ID => {
            return <Image key={ID} id={ID} {...images[ID]} />
        });

        return (
            <ScrollWrapper ref="scroll">
                <div style={styles.list} onClick={e => this._onClick(e)}>
                    <CSSTransitionGroup transitionName="image" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {IDs.length <= 0 ? this.renderNoImages() : renderImages}
                    </CSSTransitionGroup>
                </div>
            </ScrollWrapper>
        )
    }

    renderNoImages() {
        return (
            <div style={styles.noImages}>
                No images, but you could take some
            </div>
        );
    }

    _onClick(ev) {
        const { dispatch } = this.props;
        const { id, action } = ev.target.dataset;

        console.log(ev);

        switch (action) {
        case "download":
            const { url } = this.props.images[id];

            console.log("Download image", id, action);

            dispatch(Application.download(id, url));
        break

        case "preview":
            console.log("Preview image", id);
            dispatch(Application.preview(id));
        break;

        case "delete":
            console.log("Delete image");

            dispatch(Application.remove(id));
        break;
        }
    }
}

const styles = {

    list: {
        paddingTop: "0.5em",
    },

    noImages: {
        textAlign: "center",
        color: "#FFF",
        padding: "0.1em",
        fontWeight: "900",
        fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
    }
};
