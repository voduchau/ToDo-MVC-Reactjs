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

export const Login = () => {
    return {
        type: "LOGIN"
    }
}
export const setLogin = (data) => {
    return {
        type: "SETLOGIN",
        payload: data
    }
}

export const DeleteItem = (item) => {
    return async (dispatch) => {
        await axios.delete(`/listItems/${item.id}`)
        const res2 = await axios.get(`/listItems/`)
        dispatch({
            type: "DELETE",
            payload: res2.data
        })
    }
}

export const UpdateItem = (item,value) => {
    return async (dispatch) => {
        const res = await axios.put(`/listItems/${item.id}`,{...item,title: value})
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