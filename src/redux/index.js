import {combineReducers} from 'redux'
import _ from 'lodash';

const getItem = (state = {},action) => {
    switch (action.type) {
        case "LOAD":
            return {...state,..._.mapKeys(action.payload,'id')};
        case "ADD":
            return {...state, [action.payload.id]: action.payload};
        case "CHANGE":
            return {...state, [action.payload.id]: action.payload}
        case "UPDATE":
            return {...state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}

// const AddItem = (state = [], action) => {
//     switch (action.type) {
//         case "ADD":
//             return [...state,action.payload] ;
//         default:
//             return state;
//     }
// }
const Search = (state = [], action) =>{
    switch (action.type){
        case "SEARCH":
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    Search,
    getItem
})