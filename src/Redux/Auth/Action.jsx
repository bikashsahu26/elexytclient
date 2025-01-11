import { BASE_API_URL_AUTH } from "../../config/Api";
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

// to createSubcategory
export const addEducation = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/education`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: ADD_COURSE_EDUCATION, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {
    throw error;
  }
};

// to all get education in dataTable
export const getEducation = () => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/education/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_ALL_EDUCATION, payload: resData });
  } catch (error) {}
};

export const fetchEducationEdit = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/education/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_EDUCATION_BY_ID, payload: resData });
  } catch (error) {}
};

export const updateCourseEducation = (id, data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/education/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_EDUCATION_BY_ID, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const addFaculty = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/faculty`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: data,
      // body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: CREATE_FACULTY, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {
    throw error;
  }
};
export const getAllFaculty = () => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/faculty/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_ALL_FACULTY, payload: resData });
  } catch (error) {}
};

export const fetchFacultybyId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/faculty/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    console.log(resData.category);
    dispatch({ type: GET_ALL_FACULTY_BY_ID, payload: resData });
  } catch (error) {}
};

export const updateFaculty = (id, data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL_AUTH}/faculty/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer`,
      },
      body: data,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_FACULTY, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {
    throw error;
  }
};
