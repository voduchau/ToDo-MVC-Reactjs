import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import combineReducers from './redux/index';
import reduxthunk from 'redux-thunk';
const store = createStore(combineReducers,applyMiddleware(reduxthunk));

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, document.getElementById('root'));