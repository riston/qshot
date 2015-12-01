/* global document */

import React        from "react";
import ReactDOM     from "react-dom";
import { Provider } from "react-redux";

import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";

import * as Application from "actions/app";

import Root  from "root";
import store from "store";

import Chrome from "./Chrome";

// Get message back from background script
Chrome.onMessage(request => {

    const { selection, url } = request;

    if (!selection || !url) {
        console.log("Not received correct attributes");
        return;
    }

    store.dispatch(Application.convert(selection, url));
});

const renderDevTools = isDev => {
    if (!isDev) {
        return null;
    }

    return (
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    );
}

const element = (
    <div>
        <Provider store={store}>
            <Root />
        </Provider>
        {renderDevTools(false)}
    </div>
);

const elName = "qs-screenshot-extension";
const refEl = document.getElementById(elName);
const rootEl = document.createElement("div");

if (!refEl) {

    rootEl.setAttribute("id", elName);
    document.body.appendChild(rootEl);
}

ReactDOM.render(element, refEl || rootEl);
