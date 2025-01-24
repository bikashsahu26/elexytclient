import {
  ADD_COURSE_FEE,
  CREATE_COURSE,
  CREATE_COURSE_CATEGORY,
  CREATE_COURSE_CONTENT,
  CREATE_COURSE_SUB_CATAGORY,
  FETCH_COURSE_BY_ID,
  GET_ALL_COURSE,
  GET_ALL_COURSE_CONTENT,
  GET_ALL_COURSE_CONTENT_BY_ID,
  GET_ALL_COURSE_LIST,
  GET_ALL_COURSE_MATERIAL,
  GET_COURSE_BY_ID,
  GET_COURSE_FEE,
  GET_COURSE_FEE_BY_ID,
  GET_COURSE_MATERIAL_BY_ID,
  GET_COURSE_SUB_CATAGORY,
  GET_COURSE_SUB_CATAGORY_EDIT,
  GET_COURSE_SUB_CATAGORY_UPDATE,
  UPDATE_COURSE,
  UPDATE_COURSE_BY_ID,
  UPDATE_COURSE_CONTENT,
  UPDATE_COURSE_FEE,
  UPDATE_COURSE_MATERIAL,
  UPLOAD_COURSE_MATERIAL,
} from "./ActionType";

const initialValue = {
  courseSubCategory: [],
  allCourseCategory: [],
  editSubCategory: [],
  updateSubCategory: [],
  createCourseCategory: [],
  getAllCourseCatagory: [],
  getCoursebyId: [],
  updateCategory: [],
  createCourse: [],
  getallCourse: [],
  fetchCourse: [],
  updateCourse: [],
  createContent: [],
  fetchAllContent: [],
  fetchContentwithId: [],
  updateContent: [],
  uploadMaterial: [],
  fetchAllMaterial: [],
  fetchMaterialById: [],
  updateMaterial: [],
  addFee: [],
  getFee: [],
  updateFee: [],
  fetchFeeById: [],
  fetchVideo: [],
};

export const courseReducer = (store = initialValue, { type, payload }) => {
  if (type === CREATE_COURSE_SUB_CATAGORY) {
    return { ...store, courseSubCategory: payload };
  } else if (type === GET_COURSE_SUB_CATAGORY) {
    return { ...store, allCourseCategory: payload };
  } else if (type === GET_COURSE_SUB_CATAGORY_EDIT) {
    return { ...store, editSubCategory: payload };
  } else if (type === GET_COURSE_SUB_CATAGORY_UPDATE) {
    return { ...store, updateSubCategory: payload };
  } else if (type === CREATE_COURSE_CATEGORY) {
    return { ...store, createCourseCategory: payload };
  } else if (type === GET_ALL_COURSE_LIST) {
    return { ...store, getAllCourseCatagory: payload };
  } else if (type === GET_COURSE_BY_ID) {
    return { ...store, getCoursebyId: payload };
  } else if (type === UPDATE_COURSE_BY_ID) {
    return { ...store, updateCategory: payload };
  } else if (type === CREATE_COURSE) {
    return { ...store, createCourse: payload };
  } else if (type === GET_ALL_COURSE) {
    return { ...store, getallCourse: payload };
  } else if (type === FETCH_COURSE_BY_ID) {
    return { ...store, fetchCourse: payload };
  } else if (type === UPDATE_COURSE) {
    return { ...store, updateCourse: payload };
  } else if (type === CREATE_COURSE_CONTENT) {
    return { ...store, createContent: payload };
  } else if (type === GET_ALL_COURSE_CONTENT) {
    return { ...store, fetchAllContent: payload };
  } else if (type === GET_ALL_COURSE_CONTENT_BY_ID) {
    return { ...store, fetchContentwithId: payload };
  } else if (type === UPDATE_COURSE_CONTENT) {
    return { ...store, updateContent: payload };
  } else if (type === UPLOAD_COURSE_MATERIAL) {
    return { ...store, uploadMaterial: payload };
  } else if (type === GET_ALL_COURSE_MATERIAL) {
    return { ...store, fetchAllMaterial: payload };
  } else if (type === GET_COURSE_MATERIAL_BY_ID) {
    return { ...store, fetchMaterialById: payload };
  } else if (type === UPDATE_COURSE_MATERIAL) {
    return { ...store, updateMaterial: payload };
  } else if (type === ADD_COURSE_FEE) {
    return { ...store, addFee: payload };
  } else if (type === GET_COURSE_FEE) {
    return { ...store, getFee: payload };
  } else if (type === UPDATE_COURSE_FEE) {
    return { ...store, updateFee: payload };
  } else if (type === GET_COURSE_FEE_BY_ID) {
    return { ...store, fetchFeeById: payload };
  }
  return store;
};
