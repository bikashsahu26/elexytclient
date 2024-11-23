import { BASE_API_URL } from "../../config/Api";
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

// to createSubcategory
export const addCourseSubCategory = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseSubCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: CREATE_COURSE_SUB_CATAGORY, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};

// to all get Subcategory in dataTable
export const getCourseSubCategory = () => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseSubCategory/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_COURSE_SUB_CATAGORY, payload: resData });
  } catch (error) {}
};

// to fetch Subcategory during edit
export const fetchCourseSubCategoryEdit = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseSubCategory/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_COURSE_SUB_CATAGORY_EDIT, payload: resData });
  } catch (error) {}
};

// to update the edited Subcategory
export const updateCourseSubCategoryEdit =
  (id, courseSubCategory) => async (dispatch) => {
    try {
      const res = await fetch(`${BASE_API_URL}/courseSubCategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer`,
        },
        body: JSON.stringify(courseSubCategory),
      });
      const resData = await res.json();

      if (res.ok && resData.statusCode === "00") {
        dispatch({ type: GET_COURSE_SUB_CATAGORY_UPDATE, payload: resData });
        return { success: true };
      } else {
        return {
          success: false,
          error: resData.message || "An unknown error occurred",
        };
      }
    } catch (error) {}
  };

//category creation

export const addCourseCategory = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: CREATE_COURSE_CATEGORY, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};
//get all category at datatable
export const getAllCourseCategory = () => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseCategory/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_ALL_COURSE_LIST, payload: resData });
  } catch (error) {}
};
//get all courseList at modal by id

export const fetchCourseCategorybyId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseCategory/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_COURSE_BY_ID, payload: resData });
  } catch (error) {}
};
// to update the edited category
export const updateCourseCategory = (id, category) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseCategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(category),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_COURSE_BY_ID, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};
//course creation
export const addCourse = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/course`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      // body: JSON.stringify(data),
      body: data,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: CREATE_COURSE, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};

//get all course at datatable
export const getAllCourse = () => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/course/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_ALL_COURSE, payload: resData });
  } catch (error) {}
};
//FEtch course in modal by id
export const fetchCoursebyId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/course/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    console.log(resData.category);
    dispatch({ type: FETCH_COURSE_BY_ID, payload: resData });
  } catch (error) {}
};
// to update the edited course
export const updateCourse = (id, course) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/course/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      //body: JSON.stringify(course),
      body: course,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_COURSE, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};

//add course content
export const addCourseContent = (formData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseContent`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: formData,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: CREATE_COURSE_CONTENT, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};
//get all content
export const getAllContent = (id) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/courseContent/getAllCourseContent/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer `,
        },
      }
    );
    const resData = await res.json();
    dispatch({ type: GET_ALL_COURSE_CONTENT, payload: resData });
  } catch (error) {}
};
//FEtch CONTENT in modal by id
export const fetchContentbyId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseContent/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    console.log(resData.category);
    dispatch({ type: GET_ALL_COURSE_CONTENT_BY_ID, payload: resData });
  } catch (error) {}
};

//update Course Content

export const updateCourseContent = (id, formData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseContent/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer`,
      },
      body: formData,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_COURSE_CONTENT, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};
//add material
export const addCourseMaterial = (formData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseDocument`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: formData,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPLOAD_COURSE_MATERIAL, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};

//get all material

export const getAllMaterial = (id) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/courseDocument/getAllCourseDocument/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer `,
        },
      }
    );
    const resData = await res.json();
    dispatch({ type: GET_ALL_COURSE_MATERIAL, payload: resData });
  } catch (error) {}
};
//FEtch Meterial in modal by id
export const getMaterialbyId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseDocument/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    console.log(resData.category);
    dispatch({ type: GET_COURSE_MATERIAL_BY_ID, payload: resData });
  } catch (error) {}
};

//update material
export const updateCourseMaterial = (id, formData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseDocument/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer`,
      },
      body: formData,
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_COURSE_MATERIAL, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};
// to createSubcategory
export const addCourseFee = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseFee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: ADD_COURSE_FEE, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};

export const getCourseFee = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseFee/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_COURSE_FEE, payload: resData });
  } catch (error) {}
};

export const getCourseFeeById = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseFee/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_COURSE_FEE_BY_ID, payload: resData });
  } catch (error) {}
};
// to update the  course fee
export const updateCourseFee = (id, fees) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/courseFee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(fees),
    });
    const resData = await res.json();

    if (res.ok && resData.statusCode === "00") {
      dispatch({ type: UPDATE_COURSE_FEE, payload: resData });
      return { success: true };
    } else {
      return {
        success: false,
        error: resData.message || "An unknown error occurred",
      };
    }
  } catch (error) {}
};
