import { 
    SEND_NEWSPAPER,
    SEND_NEWSPAPER_ERROR,
    GET_NEWSPAPER,
    GET_NEWSPAPER_ERROR,
    DELETE_NEWPAPER,
    DELETE_NEWPAPER_ERROR,
    UPDATE_NEWPAPER,
    UPDATE_NEWPAPER_ERROR
} from './types'
import axios from 'axios'

const root = 'http://3.120.185.254:8090/api'

export const sendNewspaper = (data) => async dispatch => {
    try {
        const res = await axios.post(`${root}/news/saveGallery`, data);
        console.log(res.data)
        dispatch({
            type: SEND_NEWSPAPER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SEND_NEWSPAPER_ERROR
        })
    }
}

export const getNewsPaper = () => async dispatch => {
    try {
        const res = await axios.get(`${root}/news/listGallery`);
        console.log(res.data)
        dispatch({
            type: GET_NEWSPAPER,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_NEWSPAPER_ERROR
        })
    }
}

export const updateNewPaper= (data) => async dispatch => {
    try {
        const res = await axios.put(`${root}/news/updateGallery`,data);
        console.log(res.data)
        dispatch({
            type: UPDATE_NEWPAPER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_NEWPAPER_ERROR
        })
    }
}

export const deleteNewPaper = (id) => async dispatch => {
    try {
        const res = await axios.put(`${root}/news/deleteGallery`, id);
        console.log(res.data)
        dispatch({
            type: DELETE_NEWPAPER,
            payload: Number(res.data.data.gallery_id)
        })
    } catch (error) {
        dispatch({
            type: DELETE_NEWPAPER_ERROR
        })
    }
}