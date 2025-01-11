import {
  ADD_COURSE_EDUCATION,
  CREATE_FACULTY,
  GET_ALL_EDUCATION,
  GET_ALL_FACULTY,
  GET_ALL_FACULTY_BY_ID,
  GET_EDUCATION_BY_ID,
  UPDATE_EDUCATION_BY_ID,
  UPDATE_FACULTY,
} from "./ActionType";

const initialValue = {
  createEducation: [],
  getAllEducation: [],
  getEducationByID: [],
  updateEducation: [],
  faculty: [],
  allFaculty: [],
  facultyById: [],
  updateFaculty: [],
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
  } else if (type === CREATE_FACULTY) {
    return { ...store, faculty: payload };
  } else if (type === GET_ALL_FACULTY) {
    return { ...store, allFaculty: payload };
  } else if (type === GET_ALL_FACULTY_BY_ID) {
    return { ...store, facultyById: payload };
  } else if (type === UPDATE_FACULTY) {
    return { ...store, updateFaculty: payload };
  }
  return store;
};
