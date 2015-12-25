
import Immutable from "seamless-immutable";
import * as reducers from "reducers";
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

// Compose the store
const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  // devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

// Initial state for the application
let initState = Immutable({
    app: {

        // Hide the main UI container
        isVisible: true,

        // Show sidebar
        isSidebarVisible: true,

        // Selection box visible or not
        isSelectionVisible: false,

        // Preview image ID is stored here
        preview: null,

        // Images array rendered in sidebar
        images: {}
    },
});

// Add some images for development mode
if (process.env.NODE_ENV === "development") {

    initState = initState.merge({
        app: {
            images: {
                122: {
                    url: "http://lorempixel.com/200/300/",
                    width: 300,
                    height: 200
                },
                32: {
                    url: "http://lorempixel.com/100/200/",
                    width: 300,
                    height: 200
                },
                13: {
                    url: "http://lorempixel.com/400/500/",
                    width: 50,
                    height: 50
                },
                14: {
                    url: "http://lorempixel.com/700/600/",
                    width: 300,
                    height: 200
                },
                15: {
                    url: "http://lorempixel.com/300/200/",
                    width: 300,
                    height: 200
                },
            },
        }
    }, { deep: true });
}

const combined = combineReducers(reducers);
const store = finalCreateStore(combined, initState);

if (module.hot) {
	module.hot.accept("../reducers", () => {
		const nextRootReducer = require("../reducers")
		store.replaceReducer(nextRootReducer)
	})
}

export default store
