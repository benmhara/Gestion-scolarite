import axios from "axios";
import { postMessage } from "../reducers/PostMessage";
import { postEnseignant } from "../reducers/PostEnseignant";
import { postCour } from "../reducers/PostCour";
import { postPfe } from "../reducers/PostPfe";


const baseUrl = 'http://localhost:3000/'

export default {
    postEnseignant(url = baseUrl + 'postEnseignants/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    },
    postMessage(url = baseUrl + 'postMessages/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    },
    postCour(url = baseUrl + 'postCours/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    },
    postPfe(url = baseUrl + 'postPfes/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

}

