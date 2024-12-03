import {
  ADD_COURSE_EDUCATION,
  GET_ALL_EDUCATION,
  GET_EDUCATION_BY_ID,
  UPDATE_EDUCATION_BY_ID,
} from "./ActionType";

const initialValue = {
  createEducation: [],
  getAllEducation: [],
  getEducationByID: [],
  updateEducation: [],
};
export const authReducer = (store = initialValue, { type, payload }) => {
  if (type === ADD_COURSE_EDUCATION) {
    return { ...store, createEducation: payload };
  } else if (type === GET_ALL_EDUCATION) {
    return { ...store, getAllEducation: payload };
  } else if (type === GET_EDUCATION_BY_ID) {
    return { ...store, getEducationByID: payload };
  } else if (type === UPDATE_EDUCATION_BY_ID) {
    return { ...store, updateEducation: payload };
  }
  return store;
};
