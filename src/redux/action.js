import axios from '../api/axios';

export const getItem = () => async dispatch => {
    const res = await axios.get('/listItems')
    return dispatch({ type: 'LOAD', payload: res.data})
}
export const AddItem = (data,currentUser) => {
    // console.log(currentUser,'currentUser')
    if (currentUser){
        return async (dispatch) => {
            const res = await axios.post('/listItems',{ title: data, status: false, user: currentUser.name })
            console.log(res.data,'aa')
            dispatch ({
                type: 'ADD',
                payload: res.data
            })
        }
    }
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

export const Login = (user) => {
    return async (dispatch) => {
        const res = await axios.post(`/users`,{name: user.getName(), email: user.getEmail()})
        dispatch({
            type: "LOGIN",
            payload: res.data
        })
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