import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { list } from "./list.reducer";
import { filter } from "./filter.reducer";
import { creation } from "./creation.reducer";
import { get } from "./get.reducer";
import { forgot } from "./forgot.reducer";
import { alert } from "./alert.reducer";
import { dashboardtask } from "./dashboardtask.reducer";
import { pie } from "./pie.reducer";
import { profilepie } from "./profilepie.reducer";
import { listtasks } from "./listtasks.reducer";
import { createtask } from "./createtask.reducer";
import { profile } from "./profile.reducer";
import { profiletasks } from "./profiletasks.reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  authentication,
  registration,
  list,
  filter,
  creation,
  get,
  forgot,
  alert,
  dashboardtask,
  pie,
  listtasks,
  createtask,
  profile,
  profiletasks,
  profilepie,
  form: formReducer
});

export default rootReducer;
