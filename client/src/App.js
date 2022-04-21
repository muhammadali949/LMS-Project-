/* eslint-disable eqeqeq */
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
import AddLeaveType from "./components/admin/addleavetype/AddLeaveType";
import UpdateLeaveType from "./components/admin/UpdateLeaveType";
import UpdatePage from "./components/admin/UpdatePage";
import UpdateMyLeave from "./components/userleave/UpdateMyLeave";
import UpdatePassword from "./components/auth/updatepassword/UpdatePassword";
import ManagerLeave from "./components/managerLeave/ManagerLeave";
import DrawerBar from "./components/sidebar/Drawer";
import Profile from "./components/myprofile/Profile";
import ManageEmployee from "./components/admin/manageEmployee/ManageEmployee";
import EmployeeDetail from "./components/admin/manageEmployee/EmployeeDetail";
import EmployeeUpdate from "./components/admin/manageEmployee/EmployeeUpdate";
import { createTheme, ThemeProvider } from '@material-ui/core'
import AdminDashboard from "./components/admin/dashborad/AdminDashboard";
import AddDepartment from "./components/admin/department/AddDepartment";
import ManageDepartment from "./components/admin/department/ManageDepartment";
import UpdateDepartment from "./components/admin/department/UpdateDepartment";
import AllLeave from "./components/admin/leaveManagement/AllLeave";
import LeaveDetails from "./components/admin/leaveManagement/LeaveDetails";
import PendingLeave from "./components/admin/leaveManagement/PendingLeave";
import GrantedLeave from "./components/admin/leaveManagement/GrantedLeave";
import RejectedLeave from "./components/admin/leaveManagement/RejectedLeave";

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
  },
  typography: {
    fontFamily: 'Nunito',
    button: {
      textTransform: 'none'
    }
  }

})

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ auth: { user } }) {



  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <Router>
            <>
              <Routes>
                <Route exact path="/" element={<Landing />} />
                {
                  user?.role !== 'admin' ?
                    <Route
                      exact
                      path="/myprofile"
                      element={
                        <PrivateRoute>
                          <DrawerBar>
                            <Profile />
                          </DrawerBar>
                        </PrivateRoute>
                      }
                    /> : <Route exact path="/myprofile" element={<NotFound />} />
                }

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
                      <DrawerBar>
                        <AddLeave />
                      </DrawerBar>
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/updatestatus/:id"
                  element={
                    <PrivateRoute>
                      <DrawerBar>
                        <UpdateStatus />
                      </DrawerBar>
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/userleave"
                  element={
                    <PrivateRoute>
                      <DrawerBar>
                        <UserLeave />
                      </DrawerBar>
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/managerleave"
                  element={
                    <PrivateRoute>
                      <DrawerBar>
                        <ManagerLeave />
                      </DrawerBar>
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/changepassword"
                  element={
                    <PrivateRoute>
                      <DrawerBar>
                        <UpdatePassword />
                      </DrawerBar>
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="/updatemyleave/:id"
                  element={
                    <PrivateRoute>
                      <DrawerBar>
                        <UpdateMyLeave />
                      </DrawerBar>
                    </PrivateRoute>
                  }
                />
                <Route exact path="/leavedetails/:id" element={
                  <PrivateRoute>
                    <DrawerBar>
                      <LeaveDetails />
                    </DrawerBar></PrivateRoute>}
                />

                {
                  user?.role == 'admin' ? <Route
                    exact
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DrawerBar>
                          <Dashboard />
                        </DrawerBar>
                      </PrivateRoute>
                    }
                  />
                    : <Route exact path="/admin" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/updatepage/:id" element={
                    <PrivateRoute>
                      <DrawerBar>
                        <UpdatePage />
                      </DrawerBar>
                    </PrivateRoute>
                  } />
                    : <Route exact path="/admin" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/updateleavetype" element={<PrivateRoute><DrawerBar><UpdateLeaveType /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/updateleavetype" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/admindashboard" element={<PrivateRoute><DrawerBar><AdminDashboard /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/admindashboard" element={<NotFound />} />
                }
                {

                  user?.role == 'admin' ? <Route exact path="/addleavetype" element={<PrivateRoute><DrawerBar><AddLeaveType /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/addleavetype" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                    : <Route exact path="/admin" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/register" element={<PrivateRoute><DrawerBar><Register /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/register" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/employee" element={<PrivateRoute><DrawerBar><ManageEmployee /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/employee" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/updateemployee/:id" element={<PrivateRoute><DrawerBar><EmployeeUpdate /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/updateemployee/:id" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/adddepartment" element={<PrivateRoute><DrawerBar><AddDepartment /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="adddepartment" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/updatedepartment/:id" element={<PrivateRoute><DrawerBar><UpdateDepartment /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/updatedepartment/:id" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/managedepartment" element={<PrivateRoute><DrawerBar><ManageDepartment /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/managedepartment" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/employee/:id" element={<PrivateRoute><DrawerBar><EmployeeDetail /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/employee/:id" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/allleave" element={<PrivateRoute><DrawerBar><AllLeave /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/allleave" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/pendingleave" element={<PrivateRoute><DrawerBar><PendingLeave /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/pendingleave" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/grantedleave" element={<PrivateRoute><DrawerBar><GrantedLeave /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/grantedleave" element={<NotFound />} />
                }
                {
                  user?.role == 'admin' ? <Route exact path="/rejectedleave" element={<PrivateRoute><DrawerBar><RejectedLeave /></DrawerBar></PrivateRoute>} />
                    : <Route exact path="/rejectedleave" element={<NotFound />} />
                }

                <Route exact path="/login" element={<Login />} />
                <Route path='*' exact={true} element={<NotFound />} />
              </Routes>
            </>
          </Router>
        </div>
      </ThemeProvider>
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