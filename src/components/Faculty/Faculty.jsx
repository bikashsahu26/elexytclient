import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar/Navbar";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import {
  addFaculty,
  fetchFacultybyId,
  getAllFaculty,
  getEducation,
  updateFaculty,
} from "../../Redux/Auth/Action";
import Swal from "sweetalert2";

const Faculty = () => {
  const [show, setShow] = useState(false);
  const [onEditing, setonEditing] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [faculty, setFaculty] = useState({
    id: "",
    name: "",
    education: "",
    experience: 0,
    specialization: "",
    profile: "",
    photo: null,
  });
  // const { allFaculty, facultyById } = useSelector((store) => store.education);

  const { getAllEducation, allFaculty, facultyById } = useSelector(
    (store) => store.education
  );
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      dispatch(getEducation());
    }
  }, [dispatch, show]);

  useEffect(() => {
    dispatch(getAllFaculty());
  }, [dispatch]);

  useEffect(() => {
    if (facultyById) {
      setFaculty((prevData) => ({
        ...prevData,
        id: facultyById.id || "",
        name: facultyById.name || "",
        education: facultyById.education || "",
        experience: facultyById.experience || "",
        specialization: facultyById.specialization || "",
        photo: facultyById.photo || "",
        profile: facultyById.profile || "",
      }));
    }
  }, [facultyById]);

  const handleClose = () => {
    if (!onEditing) {
      setShow(false);
      setFaculty("");
    } else {
      setShow(false);
      setonEditing(false);
      setFaculty("");
    }
  };
  const photoInputRef = useRef(null);
  const handleResetphotofield = () => {
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };
  // for JoditEditor ref and  states
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      showCharsCounter: false, // Hides the characters counter
      showWordsCounter: false, // Hides the word counter
      showPoweredBy: false, // Hides the "Powered by Jodit" footer
      statusbar: false, // Hides the entire status bar
      toolbar: true, // Keep toolbar visible
      placeholder: "",
    }),
    []
  );

  // const handleInputChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   if (name === "experience" && value < 0) {
  //     alert("Experience cannot be a negative value.");
  //     return;
  //   }
  //   if (name === "photo" && files.length > 0) {
  //     const file = files[0];
  //     if (!file.type.startsWith("image/")) {
  //       alert("Please upload a valid image file (jpg, jpeg, png).");
  //       return;
  //     }
  //   }

  //   // setFaculty({ ...faculty, [name]: type === "file" ? files[0] : value });
  //   setFaculty({ ...faculty, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const photo = files[0];
      const validImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (validImageTypes.includes(photo.type)) {
        setFaculty((prevfaculty) => ({
          ...prevfaculty,
          [name]: photo,
        }));
      } else {
        alert(
          "Invalid file type! Please select a JPEG, PNG, GIF, or WEBP image."
        );
        e.target.value = null;
        setFaculty((prevfaculty) => ({
          ...prevfaculty,
          [name]: null,
        }));
      }
    } else if (name === "experience") {
      const experienceValue = parseInt(value, 10);

      if (experienceValue < 0) {
        alert("Experience cannot be a negative value.");
        setFaculty((prevfaculty) => ({
          ...prevfaculty,
          [name]: 0,
        }));
      } else {
        setFaculty((prevfaculty) => ({
          ...prevfaculty,
          [name]: experienceValue,
        }));
      }
    } else {
      setFaculty((prevfaculty) => ({
        ...prevfaculty,
        [name]: value,
      }));
    }
  };

  const handlefacultySubmit = (e) => {
    e.preventDefault();

    const actionMessage = onEditing ? "Update" : "Add";
    const actionTitle = onEditing
      ? "Are you sure you want to update this Faculty?"
      : "Are you sure you want to add this Faculty?";
    const successMessage = onEditing
      ? "Faculty updated successfully."
      : "Faculty added successfully.";
    const errorMessage = onEditing
      ? "There was an error updating the Faculty."
      : "There was an error adding the Faculty.";

    Swal.fire({
      title: "Are you sure?",
      text: actionTitle,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionMessage} it!`,
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleShow();

        const formData = new FormData();
        if (faculty.photo) {
          formData.append("file", faculty.photo);
        }

        formData.append(
          "facultyDto",
          new Blob([JSON.stringify(faculty)], { type: "application/json" })
        );

        if (onEditing) {
          dispatch(updateFaculty(facultyById.id, formData))
            .then(() => {
              Swal.fire({
                title: "Updated!",
                text: successMessage,
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
              }).then(() => {
                handleClose();
                dispatch(getAllFaculty());
                setonEditing(false);
                setFaculty("");
                handleResetphotofield();
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
          dispatch(addFaculty(formData))
            .then(() => {
              Swal.fire({
                title: "Added!",
                text: successMessage,
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
              }).then(() => {
                dispatch(getAllFaculty());
                setShow(false);
                handleResetphotofield();
                setFaculty("");
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
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "No changes were made.",
          icon: "info",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
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
  const filteredData = allFaculty?.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.education?.toLowerCase().includes(search.toLowerCase())
  );
  const dataToShow = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handelFetchFaculty = (row) => {
    dispatch(fetchFacultybyId(row.id));
    setShow(true);
    setonEditing(true);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => row.experience,
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
            onClick={() => handelFetchFaculty(row)}
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
              Create Faculty
            </button>
          </div>
        </div>
        {/* data table card3 */}
        {dataToShow && dataToShow.length > 0 ? (
          <div className="card3">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="left-header text-primary">Faculty Details</h5>
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
              />{" "}
            </div>
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <p>No data available, create the Faculty Details .</p>
          </div>
        )}

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
                  <b>{onEditing ? "Update Faculty" : "Add Faculty"}</b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handlefacultySubmit}>
                  <div className="row g-3">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="name">
                        <b>Name</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={faculty.name || ""}
                        onChange={handleInputChange}
                        id="name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="specialization">
                        <b>Specialization</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="specialization"
                        id="specialization"
                        value={faculty.specialization || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="education">
                        <b>Education</b>
                      </label>

                      <select
                        name="education"
                        value={faculty.education || ""}
                        onChange={handleInputChange}
                        id="education"
                        className="form-select"
                        required
                      >
                        <option value="">Choose...</option>
                        {getAllEducation &&
                          getAllEducation.map((education, index) => (
                            <option key={index} value={education.id}>
                              {education.education}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="experience">
                        <b>Experience</b>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience"
                        id="experience"
                        value={faculty.experience || ""}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-12 ">
                      <label htmlFor="photo">
                        <b>Photo</b>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/jpeg, image/png ,image/jpg,image/gif, image/webp"
                        ref={photoInputRef || ""}
                        name="photo"
                        id="photo"
                        // value={faculty.photo || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-12 ">
                      <label htmlFor="profile">
                        <b>About Faculty</b>
                      </label>
                      <JoditEditor
                        value={faculty.profile || ""}
                        name="profile"
                        id="profile"
                        onChange={(newContent) =>
                          setFaculty({ ...faculty, profile: newContent })
                        }
                        ref={editor}
                        config={config}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      {onEditing ? "Update" : "Submit"}
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
export default Faculty;
