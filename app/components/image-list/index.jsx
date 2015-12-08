
import R from "ramda";
import Radium from "radium";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

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

    componentDidUpdate(prevProps) {
        this.refs.scroll.refresh();
    }

    render() {
        const { images } = this.props;
        const IDs = R.keys(images);

        const renderImages = IDs.map(ID => {
            return <Image key={ID} id={ID} {...images[ID]} />
        });

        const noImages = <p>No images</p>;

        return (
            <ScrollWrapper ref="scroll">
                <div style={styles.list} onClick={e => this._onClick(e)}>
                    {IDs.length <= 0 ? noImages : renderImages}
                </div>
            </ScrollWrapper>
        )
    }

    _onClick(ev) {
        const { dispatch } = this.props;
        const { id, action } = ev.target.dataset;

        if ("download" === action) {

            const { url } = this.props.images[id];

            console.log("Download image", id, action);

            dispatch(Application.download(id, url));
        }
        else if ("upload" === action) {

            console.log("Upload image where to ?");
        }
        else if ("delete" === action) {

            console.log("Delete image");

            dispatch(Application.remove(id));
        }
    }
}

const styles = {

    list: {
    }
};
