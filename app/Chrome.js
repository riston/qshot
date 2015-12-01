
const Chrome = {

    isChromeContext() {
        return !!chrome.runtime.id;
    },

    sendMessage(data, cb) {

        if (!this.isChromeContext()) {
            return cb(new Error("Not chrome extension context"));
        }

        chrome.runtime.sendMessage(data, response => {
            let error = chrome.runtime.lastError;
            if (error) {
                return cb(error);
            }

            cb(null, response);
        });
    },

    onMessage(cb) {

        if (!this.isChromeContext()) {
            return cb(new Error("Not chrome extension context"));
        }

        chrome.runtime.onMessage.addListener(cb);
    }
};

export default Chrome;
