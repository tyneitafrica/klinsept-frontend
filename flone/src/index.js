import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./helpers/backendFectch";
import rootReducer from "./redux/reducers/rootReducer";
import App from "./App";
import "./assets/scss/style.scss";
import '../src/assets/css/index.css'
// import * as serviceWorker from "./serviceWorker";
import { Toaster } from "react-hot-toast";

import { composeWithDevTools } from "redux-devtools-extension";


// clear localstorage
// window.addEventListener('load',()=>localStorage.clear())

const store = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    {/* <Toaster position='top-right'/> */}
    <App />
  </Provider>,
  document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
