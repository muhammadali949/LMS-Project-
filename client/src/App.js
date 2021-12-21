import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./routing/PrivateRoute";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Admin from "./components/admin/Admin";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ auth: { user } }) {

  useEffect(() => {
    store.dispatch(loadUser());

  }, []);
  return (
    <>
      <div className="App">
        <Router>
          <>
            <Navbar />
            <Routes>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              {
                user?.role == 'admin' ? <Route exact path="/admin" element={<Admin />} />
                  : <Route exact path="/admin" element={<NotFound />} />
              }
              {
                user?.role == 'admin' ? <Route exact path="/register" element={<Register />} />
                  : <Route exact path="/register" element={<NotFound />} />
              }
              <Route exact path="/login" element={<Login />} />
              <Route path='*' exact={true} element={<NotFound />} />
            </Routes>
          </>
        </Router>
      </div>
    </>
  );
}
App.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);