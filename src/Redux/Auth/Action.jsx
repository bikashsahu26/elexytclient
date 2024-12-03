import { BASE_API_URL_AUTH } from "../../config/Api";
import {
  ADD_COURSE_EDUCATION,
  GET_ALL_EDUCATION,
  GET_EDUCATION_BY_ID,
  UPDATE_EDUCATION_BY_ID,
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
