import axios from "axios";
axios.defaults.withCredentials = true;
export const userService = {
  loginUser,
  getUsers,
  listUsers,
  getById,
  deleteUser,
  roleChange,
  getDashboardTasks,
  getPie,
  getListTasks,
  taskStatus,
  deleteTask,
  taskEditing,
  getProfileTasks,
  getProfilePie
};
function loginUser(email, password) {
  return axios({
    method: "post",
    url: "http://localhost:8000/login/",
    withCredentials: true,
    data: {
      email: email,
      password: password
    }
  })
    .then(response => {
      window.location.replace("http://localhost:3000/users");
      return response.data;
    })
    .catch(function(error) {
      //handle error
      console.log(error.response);
      if (error.response.status === 422) {
        console.log(error.response.data.password);
        // dispatch(alertActions.error(error.response.data.password[0]));
      }
      if (error.response.status === 403) {
        console.log(error.response.data.error);

        // dispatch(alertActions.error(error.response.data.error));
      }
    });
}
function getById() {
  return axios
    .get("http://localhost:8000/users/user", {
      withCredentials: true
    })
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response);
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function getUsers(name, email, role, created_by, currentPage) {
  return axios
    .get(
      "http://localhost:8000/users/",
      {
        params: {
          keyword_name: name,
          keyword_email: email,
          keyword_role: role,
          keyword_created_by: created_by,
          page: currentPage
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response.data.list);
      return response.data.list;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function listUsers(user_token) {
  return axios
    .get("http://localhost:8000/users/userlist", {
      withCredentials: true
    })
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response.data.list);
      return response.data.list;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function deleteUser(id) {
  return axios
    .delete("http://localhost:8000/users/" + id, {
      withCredentials: true
    })
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response);
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function roleChange(id, role) {
  return axios
    .get(
      "http://localhost:8000/users/" + id + "/role_change/",
      {
        params: {
          roles: role
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // // console.log(id);
      console.log(response);
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function getDashboardTasks() {
  return axios
    .get("http://localhost:8000/tasks/", {
      withCredentials: true
    })
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(JSON.parse(response.data.list));
      return JSON.parse(response.data.list);
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function getPie() {
  return axios
    .get("http://localhost:8000/tasks/dashboard/pie", {
      withCredentials: true
    })
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response.data.list);
      return response.data.list;
    })
    .catch(error => {
      // handle error
      console.log("hjwvhjfwvfhwav");
      console.log(error);
    });
}

function getListTasks(
  title,
  assignee_id,
  assigner_id,
  start_time,
  end_time,
  currentPage
) {
  return axios
    .get(
      "http://localhost:8000/tasks/filter",
      {
        params: {
          search: title,
          assignee_id: assignee_id,
          assigner_id: assigner_id,
          start_time: start_time,
          end_time: end_time,
          page: currentPage
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response.data.list);
      return response.data.list;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function taskStatus(id, status) {
  return axios
    .get(
      "http://localhost:8000/tasks/" + id + "/status_update/",
      {
        params: {
          status: status
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response);
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}
function deleteTask(id) {
  return axios
    .delete("http://localhost:8000/tasks/" + id, {
      withCredentials: true
    })
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response);
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}

function taskEditing(id, title, description, duetime) {
  return axios
    .get(
      "http://localhost:8000/tasks/" + id + "/edit/",
      {
        params: {
          title: title,
          description: description,
          duetime: duetime
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response);
      return response.data;
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}

function getProfileTasks(id) {
  console.log(id);
  return axios
    .get(
      "http://localhost:8000/tasks/",
      {
        params: {
          id: id
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(JSON.parse(response.data.list));
      return JSON.parse(response.data.list);
    })
    .catch(function(error) {
      // handle error
      console.log(error.response);
    });
}

function getProfilePie(id) {
  return axios
    .get(
      "http://localhost:8000/tasks/dashboard/pie",
      {
        params: {
          id: id
        }
      },
      {
        withCredentials: true
      }
    )
    .then(response => {
      // handle success
      // // console.log(id);
      console.log(response.data.list);
      return response.data.list;
    })
    .catch(error => {
      console.log(error);
    });
}
