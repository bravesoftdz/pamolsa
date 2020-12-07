import { 
    GET_VACANT, 
    GET_VACANT_ERROR, 
    SEND_VACANT, 
    SEND_VACANT_ERROR,
    DELETE_VACANT,
    DELETE_VACANT_ERROR,
    UPDATE_VACANT,
    UPDATE_VACANT_ERROR
} from './types'
import axios from 'axios'

const root = 'http://pmls.tk/api'


export const getVacants = (size,page) => async dispatch => {
    try {
        const res = await axios.get(`${root}/vacant/listVacant?size=${size}&page=${page}`);
        console.log(res.data)
        dispatch({
            type: GET_VACANT,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_VACANT_ERROR
        })
    }
}

export const sendVacant = (data) => async dispatch => {
    try {
        const res = await axios.post(`${root}/vacant/save`, data);
        console.log(res.data)
        dispatch({
            type: SEND_VACANT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SEND_VACANT_ERROR
        })
    }
}

export const deleteVacant = (id) => async dispatch => {
    try {
        const res = await axios.put(`${root}/vacant/delete`, id);
        console.log(res.data)
        dispatch({
            type: DELETE_VACANT,
            payload: Number(res.data.data.vacant_id)
        })
    } catch (error) {
        dispatch({
            type: DELETE_VACANT_ERROR
        })
    }
}

export const updateVacant = (data) => async dispatch => {
    try {
        const res = await axios.put(`${root}/vacant/update`,data);
        console.log(res.data)
        dispatch({
            type: UPDATE_VACANT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_VACANT_ERROR
        })
    }
}