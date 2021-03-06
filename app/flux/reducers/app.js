
import Immutable from "seamless-immutable";
import * as Actions from "constants/actions"

export default function (state = {}, action) {

    switch (action.type) {
    case Actions.HIDE:
        return state.merge({ isVisible: false });

    case Actions.VISIBLE:
        return state.merge({ isVisible: true });

    case Actions.SHOW_SIDEBAR:
        return state.merge({ isSidebarVisible: true });

    case Actions.HIDE_SIDEBAR:
        return state.merge({ isSidebarVisible: false });

    case Actions.SHOW_SELECTION:
        return state.merge({ isSelectionVisible: true });

    case Actions.HIDE_SELECTION:
        return state.merge({ isSelectionVisible: false });

    case Actions.REMOVE:

        const obj = state.asMutable({ deep: true });
        // Remove image
        delete obj.images[action.id];

        return Immutable(obj);

    case Actions.CONVERT:

        const uid = (~~(Math.random() * 5000)).toString();

        return state.merge({
            images: {
                [uid]: {
                    url: action.url,
                    selection: action.selection,
                    created: Date.now(),
                }
            }
        }, { deep: true });

    case Actions.CAPTURE:
        return state;

    case Actions.PREVIEW:

        const { id } = action;

        return state.merge({ preview: id });

    case Actions.HIDE_PREVIEW:

        return state.merge({ preview: null });
    }

    return state
}
