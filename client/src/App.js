import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import PrivateRoute from "./routing/PrivateRoute";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/./authAction/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Admin from "./components/admin/Admin";
import UserLeaveAvailable from "./components/leaveAvailable/UserLeaveAvailable";
import AddLeave from "./components/userleave/AddLeave";
import UpdateStatus from "./components/admin/UpdateStatus";
import UserLeave from "./components/userleave/UserLeave";
import AddLeaveType from "./components/admin/AddLeaveType";
import UpdateLeaveType from "./components/admin/UpdateLeaveType";
import UpdatePage from "./components/admin/UpdatePage";
import UpdateMyLeave from "./components/userleave/UpdateMyLeave";
import UpdatePassword from "./components/auth/updatepassword/UpdatePassword";
import ManagerLeave from "./components/managerLeave/ManagerLeave";


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
              <Route
                exact
                path="/leave"
                element={
                  <PrivateRoute>
                    <UserLeaveAvailable />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/addleave"
                element={
                  <PrivateRoute>
                    <AddLeave />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/updatestatus/:id"
                element={
                  <PrivateRoute>
                    <UpdateStatus />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/userleave"
                element={
                  <PrivateRoute>
                    <UserLeave />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/managerleave"
                element={
                  <PrivateRoute>
                    <ManagerLeave />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/updatepassword"
                element={
                  <PrivateRoute>
                    <UpdatePassword />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/updatemyleave/:id"
                element={
                  <PrivateRoute>
                    <UpdateMyLeave />
                  </PrivateRoute>
                }
              />
              {
                user?.role == 'admin' ? <Route exact path="/updatepage/:id" element={<UpdatePage />} />
                  : <Route exact path="/admin" element={<NotFound />} />
              }
              {
                user?.role == 'admin' ? <Route exact path="/updateleavetype" element={<UpdateLeaveType />} />
                  : <Route exact path="/admin" element={<NotFound />} />
              }
              {
                user?.role == 'admin' ? <Route exact path="/addleavetype" element={<AddLeaveType />} />
                  : <Route exact path="/admin" element={<NotFound />} />
              }
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