
import R            from "ramda";
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

    // Remove the header data:[<MIME-type>][;charset=<encoding>][;base64],<data>
    const getBase = R.pipe(
        R.split(","),
        R.last
    );

    // Add readme file
    archive.file("readme.txt", "Created with QuickShot");
    images.forEach(image => {
        const name = `${image.id}.png`;
        const options = { base64: true };

        archive.file(name, getBase(image.url), options);
    });

    return dispatch => {
        const blob = archive.generate({ type: "blob" });
        const name = `quickshot-${Date.now()}.zip`;

        // Trigger the browser save
        saveAs(blob, name);

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

    const message = {
        action: "capture",
        selection
    };

    return dispatch => {

        setTimeout(() => {

            Chrome.sendMessage(message, (err, response) => {
                dispatch({
                    type: Actions.CAPTURE,
                    selection,
                });
            });
        }, 100);
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
