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
        dispatch({
            type: "CHANGE",
            payload: res.data
        })
    }
   
}

export const UpdateItem = (item,value) => {
    console.log(value,"update trong action")
    return async (dispatch) => {
        const res = await axios.put(`/listItems/${item.id}`,{...item,title: value})
        console.log(res.data,'data')
        dispatch({
            type: "UPDATE",
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