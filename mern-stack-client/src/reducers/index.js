import { combineReducers } from "redux";
import { postMessage} from "./PostMessage";
import { postEnseignant} from"./PostEnseignant";
import { postCour} from"./PostCour";
import { postPfe } from "./PostPfe";


export const reducers = combineReducers({

    postMessage,
    postEnseignant,
    postCour,
    postPfe
})

