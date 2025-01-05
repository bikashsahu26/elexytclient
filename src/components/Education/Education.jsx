import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  fetchEducationEdit,
  getEducation,
  updateCourseEducation,
} from "../../Redux/Auth/Action";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Education = () => {
  const dispatch = useDispatch();
  //   const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);
  const [onEditing, setonEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [search, setSearch] = useState("");

  const { getAllEducation, getEducationByID } = useSelector(
    (store) => store.education
  );

  const [userEducation, setuserEducation] = useState({
    id: "",
    education: "",
  });

  useEffect(() => {
    dispatch(getEducation());
  }, [dispatch]);

  useEffect(() => {
    if (getEducationByID) {
      setuserEducation((prevData) => ({
        ...prevData,
        id: getEducationByID.id,
        education: getEducationByID.education,
      }));
    }
  }, [getEducationByID]);

  const handleClose = () => {
    if (!onEditing) {
      setShow(false);
    } else {
      setShow(false);
      setonEditing(false);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (/^[a-zA-Z\s]*$/.test(value)) {
  //     setuserEducation({ ...userEducation, [name]: value });
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "education") {
      let trimmedValue = value.replace(/^\s+/, ""); // removing leading spaces only
      trimmedValue = trimmedValue.replace(/\s+$/, ""); //  all trailing spaces remove

      // if the value ends with a space, allow only one trailing space
      if (value.endsWith(" ")) {
        trimmedValue += " "; //  one trailing space allowed
      }

      // Update the state with the processed value
      setuserEducation({
        ...userEducation,
        [name]: trimmedValue,
      });
    } else {
      setuserEducation({
        ...userEducation,
        [name]: value,
      });
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
  const filteredData = getAllEducation?.filter((item) =>
    item.subCategory?.toLowerCase().includes(search.toLowerCase())
  );
  const dataToShow = getAllEducation?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // const handleEducationSubmit = (e) => {
  //   e.preventDefault();
  //   if (onEditing) {
  //     dispatch(updateCourseEducation(getEducationByID.id, userEducation)).then(
  //       () => {
  //         handleClose();
  //         dispatch(getEducation());
  //         setonEditing(false);
  //         setuserEducation("");
  //       }
  //     );
  //   } else {
  //     dispatch(addEducation(userEducation)).then(() => {
  //       dispatch(getEducation());
  //       setuserEducation("");
  //       handleClose();
  //     });
  //   }
  // };

  const handleEducationSubmit = (e) => {
    e.preventDefault();

    const actionMessage = onEditing ? "update" : "add";
    const actionTitle = onEditing
      ? "Are you sure you want to update this education?"
      : "Are you sure you want to add this education?";
    const successMessage = onEditing
      ? "Education updated successfully."
      : "Education added successfully.";
    const errorMessage = onEditing
      ? "There was an error updating the education."
      : "There was an error adding the education.";

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
          dispatch(updateCourseEducation(getEducationByID.id, userEducation))
            .then(() => {
              handleClose();
              dispatch(getEducation());
              setonEditing(false);
              setuserEducation("");
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
          dispatch(addEducation(userEducation))
            .then(() => {
              dispatch(getEducation());
              setuserEducation("");
              handleClose();
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

  const handelfetchEducation = (row) => {
    dispatch(fetchEducationEdit(row.id));
    setShow(true);
    setonEditing(true);
  };

  const handleShow = () => {
    setShow(true);
  };
  const columns = [
    {
      name: "SN",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: false,
    },
    {
      name: "Betch",
      selector: (row) => row.education,
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
            onClick={() => handelfetchEducation(row)}
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
              CREATE EDUCATION
            </button>
          </div>
        </div>
        {/* data table card3 */}
        {dataToShow && dataToShow.length > 0 ? (
          <div className="card3">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="left-header text-primary">
                  COURSE EDUCATION LIST
                </h5>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="form-control search-input w-25"
                />
              </div>
              {/* datatable */}
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
              />{" "}
            </div>
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <p>No data available, create the task.</p>
          </div>
        )}
        {/* modal */}
        {show && <div className="modal-backdrop fade show"></div>}
        <div
          className={`modal fade ${show ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">
                  <b>{onEditing ? "Update Education" : "Add Education"}</b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEducationSubmit}>
                  <div className="form-group mb-3 ">
                    <label htmlFor="education">
                      <b>Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="education"
                      id="education"
                      value={userEducation.education || ""}
                      onChange={handleInputChange}
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
export default Education;
