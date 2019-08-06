import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.services";
import { alertActions } from "../actions/alert.actions";
import history from "../history";
import axios from "axios";
axios.defaults.withCredentials = true;
export const userActions = {
  login,
  logout,
  register,
  create,
  getUser,
  filterUser,
  userList,
  roleChange,
  userDelete,
  forgotPassword,
  resetPassword,
  dashboardTasks,
  pieTasks,
  listTasks,
  createTask,
  taskStatusUpdate,
  taskDelete,
  editTask,
  profileTasks,
  pieProfile
};
function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));
    // userService.loginUser(email,password).then(

    //       user => dispatch(success(user)),
    //       error => dispatch(failure(error))
    //   );
    axios({
      method: "post",
      url: "http://localhost:8000/login/",
      withCredentials: true,
      data: {
        email: email,
        password: password
      }
    })
      .then(response => {
        // handle successlocalStorage.setItem('user', (response.data.token));
        // localStorage.setItem('user', (response.data.token));
        // localStorage.setItem('userdata', (response.data.user.roles));
        // localStorage.setItem('userid', (response.data.user.id));
        console.log(response);
        dispatch(success(response.data.user));
        history.push("/users/");
        // window.location.replace("http://localhost:3000/users");
      })
      .catch(error => {
        // handle error
        // console.log("wgdgwjkfwkjfgjkwf");
        console.log(error);
        if (error.response.status === 422) {
          if (null == error.response.data.email) {
            console.log(error.response);
            dispatch(alertActions.error(error.response.data.password[0]));
          } else {
            console.log(error.response.data.email[0]);
            dispatch(alertActions.error(error.response.data.email[0]));
          }
        } else if (error.response.status === 403) {
          console.log(error.response.data.error);
          dispatch(alertActions.error(error.response.data.error));
        }
      });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function register(name, email, password) {
  return dispatch => {
    dispatch(request({ email }));

    axios({
      method: "post",
      url: "http://localhost:8000/register/",
      data: {
        email: email,
        password: password,
        name: name
      }
    })
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        // console.log("wgdgwjkfwkjfgjkwf");
        console.log(error);
        if (error.response.status === 422) {
          if (null == error.response.data.password)
            dispatch(alertActions.error(error.response.data.email[0]));
          else if (null == error.response.data.email)
            dispatch(alertActions.error(error.response.data.password[0]));
          else
            dispatch(
              alertActions.error(
                error.response.data.password[0] + error.response.data.email[0]
              )
            );
        } else if (error.response.status === 403) {
          console.log(error.response.data.error);
          dispatch(alertActions.error(error.response.data.error));
        }
      });
  };
  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
}

function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path =/";
  
  // document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path =/';
  // document.cookie = 'userrole=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path =/';
  return { type: userConstants.LOGOUT };
}
function create(name, email, password) {
  return dispatch => {
    dispatch(request({ email }));

    axios(
      {
        method: "post",
        url: "http://localhost:8000/users/",
        data: {
          email: email,
          password: password,
          name: name
        }
      },
      {
        withCredentials: true
      }
    )
      .then(function(response) {
        // handle success
        console.log(response);
        alert("User Creation done with id " + response.data.id);
      })
      .catch(function(error) {
        // handle error
        // console.log("wgdgwjkfwkjfgjkwf");
        console.log(error.response);
        if (error.response.status === 422) {
          // console.log(error.response.data.email[0])
          // console.log(error.response.data.password[0])
          if (null == error.response.data.password)
            dispatch(alertActions.error(error.response.data.email[0]));
          else if (null == error.response.data.email)
            dispatch(alertActions.error(error.response.data.password[0]));
          else
            dispatch(
              alertActions.error(
                error.response.data.password[0] + error.response.data.email[0]
              )
            );
        } else if (error.response.status === 403) {
          console.log(error.response.data.error);
          dispatch(alertActions.error(error.response.data.error));
        } else if (error.response.status === 401) {
          console.log(error.response.data.error);
          dispatch(alertActions.error(error.response.data.error));
        }
        // alert('User Creation failed');
      });
  };
  function request(user) {
    return { type: userConstants.CREATE_REQUEST, user };
  }
}

function getUser() {
  return dispatch => {
    dispatch(request());
    // console.log("asdfghjkl");
    userService
      .getById()
      .then(user => dispatch(success(user)), error => dispatch(failure(error)));
  };
  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
function filterUser(name, email, role, created_by, currentPage) {
  return dispatch => {
    dispatch(request({ email }));
    // console.log(id);

    if (name === "") name = null;
    if (email === "") email = null;
    if (role === "") role = null;
    if (created_by === "") created_by = null;
    // console.log(role)
    userService
      .getUsers(name, email, role, created_by, currentPage)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };
  function request(user) {
    return { type: userConstants.FILTER_REQUEST, user };
  }
  function success(users) {
    return { type: userConstants.FILTER_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.FILTER_FAILURE, error };
  }
}

function userList() {
  return dispatch => {
    dispatch(request({}));
    userService
      .listUsers()
      .then(
        usernames => dispatch(success(usernames)),
        error => dispatch(failure(error))
      );
  };
  function request() {
    return { type: userConstants.LIST_REQUEST };
  }
  function success(usernames) {
    return { type: userConstants.LIST_SUCCESS, usernames };
  }
  function failure(error) {
    return { type: userConstants.LIST_FAILURE, error };
  }
}
function roleChange(id, name, role, email, created_by) {
  return dispatch => {
    dispatch(request(id));
    userService.roleChange(id, "admin").then(
      user => {
        dispatch(success(user));
        dispatch(userActions.filterUser(name, email, role, created_by));
      },
      error => dispatch(failure(error))
    );
  };
  function request(id) {
    return { type: userConstants.ROLE_CHANGE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.ROLE_CHANGE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.ROLE_CHANGE_FAILURE, id, error };
  }
}

function userDelete(id, name, role, email, created_by) {
  return dispatch => {
    dispatch(request(id));
    userService.deleteUser(id).then(
      user => {
        dispatch(success(user));
        dispatch(userActions.filterUser(name, email, role, created_by));
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
function forgotPassword(email) {
  return dispatch => {
    dispatch(request({ email }));
    axios({
      method: "post",
      url: "http://localhost:8000/forgotpassword/",
      data: {
        email: email
      }
    })
      .then(function() {
        //handle success

        dispatch(success());
        // window.location.replace("http://localhost:3000/resetpassword");
      })
      .catch(function(error) {
        //handle error
        console.log(error);
        dispatch(failure(error));
      });
  };

  function request(user) {
    return { type: userConstants.FORGOT_PASSWORD_REQUEST, user };
  }
  function success() {
    return { type: userConstants.FORGOT_PASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.FORGOT_PASSWORD_ERROR, error };
  }
}
function resetPassword(password, token) {
  return dispatch => {
    dispatch(request({ password }));
    axios({
      method: "post",
      url: "http://localhost:8000/resetpassword/",
      data: {
        password: password,
        token: token
      }
    })
      .then(function(reset) {
        //handle success
        // localStorage.setItem('user', JSON.stringify(reset.data));
        console.log(reset.data);
        localStorage.removeItem("reset");
        window.location.replace("http://localhost:3000/login");
      })
      .catch(function(error) {
        //handle error
        console.log(error.response);
        if (error.response.status === 401) {
          dispatch(alertActions.error(error.response.data.error));
        }
        localStorage.removeItem("reset");
      });
  };

  function request(user) {
    return { type: userConstants.RESET_PASSWORD_REQUEST, user };
  }
  // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  // function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function dashboardTasks() {
  return dispatch => {
    dispatch(request({}));
    userService
      .getDashboardTasks()
      .then(
        tasks => dispatch(success(tasks)),
        error => dispatch(failure(error))
      );
  };
  function request() {
    return { type: userConstants.DASHBOARD_TASK_REQUEST };
  }
  function success(tasks) {
    return { type: userConstants.DASHBOARD_TASK_SUCCESS, tasks };
  }
  function failure(error) {
    return { type: userConstants.DASHBOARD_TASK_FAILURE, error };
  }
}
function pieTasks() {
  return dispatch => {
    dispatch(request({}));
    userService
      .getPie()
      .then(data => dispatch(success(data)), error => dispatch(failure(error)));
  };
  function request() {
    return { type: userConstants.PIE_TASK_REQUEST };
  }
  function success(data) {
    return { type: userConstants.PIE_TASK_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.PIE_TASK_FAILURE, error };
  }
}

function listTasks(
  title,
  assignee_id,
  assigner_id,
  start_time,
  end_time,
  currentPage
) {
  return dispatch => {
    dispatch(request({}));
    if (title === "") title = null;
    if (start_time === "") title = null;
    if (end_time === "") title = null;
    userService
      .getListTasks(
        title,
        assignee_id,
        assigner_id,
        start_time,
        end_time,
        currentPage
      )
      .then(
        tasks => dispatch(success(tasks)),
        error => dispatch(failure(error))
      );
  };
  function request() {
    return { type: userConstants.TASK_LIST_REQUEST };
  }
  function success(tasks) {
    return { type: userConstants.TASK_LIST_SUCCESS, tasks };
  }
  function failure(error) {
    return { type: userConstants.TASK_LIST_FAILURE, error };
  }
}

function createTask(title, description, duetime, assignee) {
  return dispatch => {
    dispatch(request({}));
    axios({
      method: "post",
      url: "http://localhost:8000/tasks/",
      data: {
        title: title,
        description: description,
        duetime: duetime,
        assignee_id: assignee
      }
    })
      .then(function(response) {
        // handle success
        console.log(response);
        alert("Task Creation done with id " + response.data.id);
      })
      .catch(function(error) {
        // handle error
        // console.log("wgdgwjkfwkjfgjkwf");
        console.log(error.response);
      });
  };
  function request() {
    return { type: userConstants.CREATE_TASK_REQUEST };
  }
}
function taskStatusUpdate(id, status) {
  return dispatch => {
    dispatch(request(id));
    userService.taskStatus(id, status).then(
      task => {
        dispatch(success(task));
        dispatch(userActions.dashboardTasks());
        dispatch(userActions.pieTasks());
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: userConstants.TASK_STATUS_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.TASK_STATUS_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.TASK_STATUS_FAILURE, id, error };
  }
}
function taskDelete(
  id,
  title,
  assignee_id,
  assigner_id,
  start_time,
  end_time,
  currentPage
) {
  return dispatch => {
    dispatch(request(id));
    userService.deleteTask(id).then(
      task => {
        dispatch(success(task));
        dispatch(
          userActions.listTasks(
            title,
            assignee_id,
            assigner_id,
            start_time,
            end_time,
            currentPage
          )
        );
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };

  function request(id) {
    return { type: userConstants.TASK_DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.TASK_DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.TASK_DELETE_FAILURE, id, error };
  }
}

function editTask(
  title,
  description,
  duetime,
  id,
  title_form,
  assignee_id,
  assigner_id,
  start_time,
  end_time,
  currentPage
) {
  return dispatch => {
    dispatch(request({}));
    userService.taskEditing(id, title, description, duetime).then(
      task => {
        dispatch(success(task));
        dispatch(
          userActions.listTasks(
            title_form,
            assignee_id,
            assigner_id,
            start_time,
            end_time,
            currentPage
          )
        );
      },
      error => {
        dispatch(failure(id, error));
      }
    );
  };
  function request() {
    return { type: userConstants.EDIT_TASK_REQUEST };
  }
  function success(task) {
    return { type: userConstants.EDIT_TASK_SUCCESS, task };
  }
  function failure(error) {
    return { type: userConstants.EDIT_TASK_FAILURE, error };
  }
}

function profileTasks(id) {
  return dispatch => {
    dispatch(request({}));
    userService
      .getProfileTasks(id)
      .then(
        tasks => dispatch(success(tasks)),
        error => dispatch(failure(error))
      );
  };
  function request() {
    return { type: userConstants.PROFILE_TASK_REQUEST };
  }
  function success(tasks) {
    return { type: userConstants.PROFILE_TASK_SUCCESS, tasks };
  }
  function failure(error) {
    return { type: userConstants.PROFILE_TASK_FAILURE, error };
  }
}

function pieProfile(id) {
  return dispatch => {
    dispatch(request({}));
    userService
      .getProfilePie(id)
      .then(data => dispatch(success(data)), error => dispatch(failure(error)));
  };
  function request() {
    return { type: userConstants.PROFILE_PIE_TASK_REQUEST };
  }
  function success(data) {
    return { type: userConstants.PROFILE_PIE_TASK_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.PROFILE_PIE_TASK_FAILURE, error };
  }
}
