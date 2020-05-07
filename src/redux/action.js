import axios from '../api/axios';

export const getItem = () => async dispatch => {
    const res = await axios.get('/listItems')
    return dispatch({ type: 'LOAD', payload: res.data})
}
export const AddItem = (data) => {
    return async (dispatch) => {
        const res = await axios.post('/listItems',{ title: data, status: false })
        dispatch ({
            type: 'ADD',
            payload: res.data
        })
    }
}
export const ChangeStatus = (item) => {
    return async (dispatch) => {
        const res = await axios.put(`/listItems/${item.id}`,{...item, status: !item.status})
        console.log(res.data,'x')
        dispatch({
            type: "CHANGE",
            payload: res.data
        })
    }
   
}

export const Search = (data) => {
    return {
        type: "SEARCH",
        payload: data,
    }
}