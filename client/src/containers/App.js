import React, { Fragment } from "react";
import decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { setCurrentUser, addError, setToken } from "../store/actions";

// import Auth from "../components/Auth";
// import ErrorMessage from "../components/ErrorMessage";
import NavBar from "../containers/Navbar";
import RouteViews from "../containers/RouteViews";

// Check if the user is authenticated before the application opens
if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (error) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(error));
  }
}

const App = () => (
  <Provider store={store}>
    <Fragment>
      <BrowserRouter>
        <NavBar />
        <RouteViews />
      </BrowserRouter>
    </Fragment>
  </Provider>
);

export default App;
