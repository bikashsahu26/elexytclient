import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./CourseSubcategory.css";
import {
  addCourseSubCategory,
  getCourseSubCategory,
  fetchCourseSubCategoryEdit,
  updateCourseSubCategoryEdit,
} from "../../Redux/Course/Action";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

const CourseSubcategory = () => {
  //   const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [search, setSearch] = useState("");
  const [onEditing, setonEditing] = useState(false);

  const { allCourseCategory, editSubCategory } = useSelector(
    (store) => store.course
  );
  const [courseSubCategory, setcourseSubCategory] = useState({
    id: "",
    subCategory: "",
    subCategoryDesc: "",
  });

  useEffect(() => {
    if (editSubCategory) {
      setcourseSubCategory((prevData) => ({
        ...prevData,
        id: editSubCategory.id,
        subCategory: editSubCategory.subCategory,
        subCategoryDesc: editSubCategory.subCategoryDesc,
      }));
    }
  }, [editSubCategory]);

  useEffect(() => {
    dispatch(getCourseSubCategory());
  }, [dispatch]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    if (!onEditing) {
      setShow(false);
      setcourseSubCategory("");
    } else {
      setShow(false);
      setonEditing(false);
      setcourseSubCategory("");
    }
  };

  const handleSubInputChange = (e) => {
    const { name, value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setcourseSubCategory({ ...courseSubCategory, [name]: value });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };
  const filteredData = allCourseCategory?.filter((item) =>
    item.subCategory?.toLowerCase().includes(search.toLowerCase())
  );
  const dataToShow = allCourseCategory?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // const handleSubcategorySubmit = (e) => {
  //   e.preventDefault();
  //   if (onEditing) {
  //     dispatch(
  //       updateCourseSubCategoryEdit(editSubCategory.id, courseSubCategory)
  //     ).then(() => {
  //       handleClose();
  //       dispatch(getCourseSubCategory());
  //       setonEditing(false);
  //       setcourseSubCategory("");
  //     });
  //   } else {
  //     dispatch(addCourseSubCategory(courseSubCategory)).then(() => {
  //       dispatch(getCourseSubCategory());
  //       setShow(false);
  //       setcourseSubCategory("");
  //     });
  //   }
  // };
  const handleSubcategorySubmit = (e) => {
    e.preventDefault();

    const actionMessage = onEditing ? "update" : "add";
    const actionTitle = onEditing
      ? "Are you sure you want to update this subcategory?"
      : "Are you sure you want to add this subcategory?";
    const successMessage = onEditing
      ? "Subcategory updated successfully."
      : "Subcategory added successfully.";
    const errorMessage = onEditing
      ? "There was an error updating the subcategory."
      : "There was an error adding the subcategory.";

    Swal.fire({
      title: "Are you sure?",
      html: actionTitle,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionMessage} it!`,
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (onEditing) {
          dispatch(
            updateCourseSubCategoryEdit(editSubCategory.id, courseSubCategory)
          )
            .then(() => {
              handleClose();
              dispatch(getCourseSubCategory());
              setonEditing(false);
              setcourseSubCategory("");
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: successMessage,
                timer: 4000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        } else {
          dispatch(addCourseSubCategory(courseSubCategory))
            .then(() => {
              dispatch(getCourseSubCategory());
              setShow(false);
              setcourseSubCategory("");
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: successMessage,
                timer: 4000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }
      }
    });
  };

  const handelfetchSubCourse = (row) => {
    dispatch(fetchCourseSubCategoryEdit(row.id));
    setShow(true);
    setonEditing(true);
  };
  const columns = [
    {
      name: "SN",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Subcategory",
      selector: (row) => row.subCategory,
      sortable: true,
    },
    {
      name: "Subcategory Description",
      selector: (row) => row.subCategoryDesc,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row,
      sortable: true,
      cell: (row) => (
        <div>
          <button
            type="button"
            className="btn btn-warning text-white btn-sm me-2"
            onClick={() => handelfetchSubCourse(row)}
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#478CCF",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        color: "black",
        "&:nth-of-type(odd)": {
          backgroundColor: "white",
        },
        "&:nth-of-type(even)": {
          backgroundColor: " lightgrey",
        },
        "&:hover": {
          backgroundColor: "#f2f2f2",
        },
      },
    },
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container-fluid mt-4">
        <div className="row mainbtn mb-0  align-items-center">
          <div className="col-auto d-flex align-items-center">
            <button className="btn btn-primary" onClick={handleShow}>
              CREATE SUB CATEGORY
            </button>
          </div>
        </div>
        {/* data table card3 */}
        <div className="card3">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="left-header text-primary">
                COURSE SUBCATAGORY LIST
              </h5>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                className="form-control search-input w-25"
              />
            </div>
            <DataTable
              columns={columns}
              data={dataToShow || []}
              pagination
              paginationServer
              paginationTotalRows={filteredData.length || 0}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              className="responsive-table"
              customStyles={customStyles}
            />
          </div>
        </div>
        {/* modal */}
        {show && <div className="modal-backdrop fade show"></div>}
        <div
          className={`modal fade ${show ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">
                  <b>{onEditing ? "Update Subject Details" : "Add Subject"}</b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubcategorySubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="subCategory">
                      <b>Sub category</b>
                    </label>
                    <input
                      type="text"
                      id="subCategory"
                      className="form-control"
                      name="subCategory"
                      value={courseSubCategory.subCategory || ""}
                      onChange={handleSubInputChange}
                    />
                  </div>
                  <div className="form-group mb-3 ">
                    <label htmlFor="subCategoryDesc">
                      <b>Subcategory Description </b>
                    </label>
                    <input
                      type="text"
                      id="subCategoryDesc"
                      className="form-control"
                      name="subCategoryDesc"
                      value={courseSubCategory.subCategoryDesc || ""}
                      onChange={handleSubInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      {onEditing ? "UPDATE" : "SUBMIT"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSubcategory;
