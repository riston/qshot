
import JSZip        from "jszip";
import Chrome       from "../../Chrome";
import { saveAs }   from "../../FileSaver";
import * as Actions from "constants/actions";

export function hide() {

    return { type: Actions.HIDE };
};

export function visible() {
    return { type: Actions.VISIBLE };
};

export function hideSidebar() {
    return { type: Actions.HIDE_SIDEBAR };
};

export function showSidebar() {
    return { type: Actions.SHOW_SIDEBAR };
};

export function showSelection() {
    return { type: Actions.SHOW_SELECTION };
};

export function hideSelection() {
    return { type: Actions.HIDE_SELECTION };
}

export function remove(imgID) {
    return { type: Actions.REMOVE, id: imgID };
};

export function zip(images) {

    const archive = new JSZip();

    images.forEach(image => {
        archive.file(`${image.id}.png`, image.url, { base64: true });
    });

    var saveData = (function () {
        var a = document.createElement("a");
        return function (data, fileName) {
            var json = JSON.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    return dispatch => {
        var blob = archive.generate({ type: "blob" });
        saveData(blob, "hello.zip");
        dispatch({ type: Actions.ZIP, images });
    };
};

export function close() {

    const mainEl = "qs-screenshot-extension";

    const node = document.getElementById(mainEl);
    if (node.parentNode) {
        node.parentNode.removeChild(node);

        return { type: Actions.CLOSE };
    }
};

export function download(imgID, uri) {

    const link = document.createElement("a");
    const fileName = `shot-${imgID}.png`;
    const WAIT_TIME = 30;

    link.download = fileName;
    link.href = uri;

    return dispatch => {
        setTimeout(() => {
            // Activate download link
            link.click();

            dispatch({
                type: Actions.DOWNLOAD,
                ID: imgID,
                uri,
            });
        }, WAIT_TIME);
    }
};

export function capture(selection) {

    console.log("Received capture");

    const message = {
        action: "capture",
        selection
    };

    return dispatch => {

        // Hide the UI
        dispatch(hide());

        console.log("Send random data");

        setTimeout(() => {

            Chrome.sendMessage(message, (err, response) => {
                dispatch({
                    type: Actions.CAPTURE,
                    selection,
                });
            });
        }, 100);

        setTimeout(() => dispatch(visible()), 200);
    };
};

export function convert(selection, imgURL) {

    return dispatch => {
        const image = new Image();
        const canvas = document.createElement("canvas");

        const width = Math.max(32, selection.width);
        const height = Math.max(32, selection.height);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        image.onload = () => {
            // Source attributes
            const sX = selection.x;
            const sY = selection.y;
            const sWidth = width;
            const sHeight = height;

            // Destination attributes
            // const { dX, dY, dWidth, dHeight } = [0, 0, width, height];
            const dX = 0;
            const dY = 0;
            const dWidth = width;
            const dHeight = height;

            ctx.drawImage(image,
              sX, sY, sWidth, sHeight,
              dX, dY, dWidth, dHeight);

            const dataUrl = canvas.toDataURL();

            dispatch({
                type: Actions.CONVERT,
                url: dataUrl,
                selection,
            });
        };

        // Set the source
        image.src = imgURL;
    };
};

export function testAsync(message) {
    return dispatcher => {
        setTimeout(() => {
            dispatcher({
                message,
                type: Actions.TEST_ASYNC,
            })
        }, 2000)
    }
};
