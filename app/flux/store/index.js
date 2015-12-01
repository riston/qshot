
import Immutable from "seamless-immutable";
import * as reducers from "reducers";
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import { devTools, persistState } from "redux-devtools";
import thunk from "redux-thunk";

import Chrome from "../../Chrome";

// Compose the store
const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

// Initial state for the application
const initState = Immutable({
    app: {
        isVisible: true,
        isSidebarVisible: true,
        isSelectionVisible: false,
        images: {
            122: {
                url: "https://placehold.it/150x150",
                width: 300,
                height: 200
            },
            32: {
                url: "https://placehold.it/150x150",
                width: 300,
                height: 200
            },
            13: {
                url: "https://placehold.it/50x50",
                width: 50,
                height: 50
            },
            14: {
                url: "https://placehold.it/150x150",
                width: 300,
                height: 200
            },
            15: {
                url: "https://placehold.it/150x150",
                width: 300,
                height: 200
            },
        }
    },
});

const combined = combineReducers(reducers);
const store = finalCreateStore(combined, initState);

if (module.hot) {
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers')
		store.replaceReducer(nextRootReducer)
	})
}

export default store
