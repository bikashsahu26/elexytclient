import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Course.css";

import {
  addCourse,
  addCourseContent,
  addCourseFee,
  addCourseMaterial,
  fetchContentbyId,
  fetchCoursebyId,
  getAllContent,
  getAllCourse,
  getAllCourseCategory,
  getAllMaterial,
  getCourseFee,
  getCourseFeeById,
  getCourseSubCategory,
  getMaterialbyId,
  updateCourse,
  updateCourseContent,
  updateCourseFee,
  updateCourseMaterial,
} from "../../Redux/Course/Action";

import Navbar from "../Navbar/Navbar";
import { SiAirplayvideo } from "react-icons/si";
import { FaEdit, FaEye, FaFileAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import { getAllFaculty } from "../../Redux/Auth/Action";
import DataTable from "react-data-table-component";
import PlayerSimple from "../Player/PlayerSimple";
import { BASE_API_URL } from "../../config/Api";

const Course = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [onEditing, setonEditing] = useState(false);

  const {
    getallCourse,
    getAllCourseCatagory,
    allCourseCategory,
    fetchCourse,
    fetchAllContent,
    fetchContentwithId,
    fetchAllMaterial,
    fetchMaterialById,
    getFee,
    fetchFeeById,
  } = useSelector((store) => store.course);

  const { allFaculty } = useSelector((store) => store.education);
  //course create show in card and edit start---------------------
  const [course, setcourse] = useState({
    id: "",
    courseName: "",
    courseDesc: "",
    category: "",
    subCategory: "",
    creator: "",
    liveSession: "",
    courseMaterial: "",
    thumbnail: "",
    description: "",
  });

  // Reference for Thumbnail
  const thumbnailInputRef = useRef(null);

  const handleResetThumbnailfield = () => {
    // Reset the file input field manually using the ref
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = ""; // Clear the file input
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

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCourseCategory());
    dispatch(getCourseSubCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllFaculty());
  }, [dispatch]);

  useEffect(() => {
    if (show) {
      dispatch(getAllCourseCategory());
      dispatch(getCourseSubCategory());
    }
  }, [dispatch, show]);

  useEffect(() => {
    if (fetchCourse) {
      const matchcategoryId = getAllCourseCatagory.find(
        (course) => course.category === fetchCourse.category
      );
      const matchsubCategory = allCourseCategory.find(
        (course) => course.subCategory === fetchCourse.subCategory
      );
      setcourse((prevData) => ({
        ...prevData,
        id: fetchCourse.id || "",
        courseName: fetchCourse.courseName || "",
        courseDesc: fetchCourse.courseDesc || "",
        category: matchcategoryId ? matchcategoryId.id : "",
        subCategory: matchsubCategory ? matchsubCategory.id : "",
        creator: fetchCourse.creator || "",
        thumbnail: fetchCourse.thumbnail || "",

        liveSession:
          fetchCourse.liveSession !== undefined
            ? fetchCourse.liveSession.toString()
            : "",
        courseMaterial:
          fetchCourse.courseMaterial !== undefined
            ? fetchCourse.courseMaterial.toString()
            : "",

        description: fetchCourse.description || "",
      }));
    } else {
      setcourse("");
    }
  }, [fetchCourse, getAllCourseCatagory, allCourseCategory]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files.length > 0) {
      const thumbnail = files[0];
      const validImageTypes = [
        "image/jpg", // JPEG image
        "image/jpeg", // JPEG image
        "image/png", // PNG image
        "image/gif", // GIF image
        "image/webp", // WEBP image
      ];

      // Valid selected file type
      if (validImageTypes.includes(thumbnail.type)) {
        setcourse({
          ...course,
          [name]: thumbnail,
        });
      } else {
        alert(
          "Invalid file type! Please select a JPEG, PNG, GIF, or WEBP image file."
        );
        e.target.value = null; // This clears the file input field
        setcourse({
          ...course,
          [name]: null, // Clear the course state for the file field
        });
      }
    } else if (
      name === "courseName" ||
      name === "courseDesc" ||
      name === "creator"
    ) {
      let trimmedValue = value.replace(/^\s+/, ""); // Remove leading spaces
      trimmedValue = trimmedValue.replace(/\s+$/, ""); // Remove all trailing spaces

      if (value.endsWith(" ")) {
        trimmedValue += " ";
      }
      if (trimmedValue) {
        setcourse({ ...course, [name]: trimmedValue });
      } else {
        alert(`${name} cannot be empty.`);
        return;
      }
    } else {
      setcourse({ ...course, [name]: value });
    }
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    if (!onEditing) {
      setShow(false);
      setcourse("");
      return;
    } else {
      setShow(false);
      setonEditing(false);
      setcourse("");
    }
  };

  const handelfetchCourse = (course) => {
    dispatch(fetchCoursebyId(course));
    setShow(true);
    setonEditing(true);
    setShowCard(true);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();

    const actionMessage = onEditing ? "update" : "add";
    const actionTitle = onEditing
      ? "Are you sure you want to update this course?"
      : "Are you sure you want to add this course?";
    const successMessage = onEditing
      ? "Course updated successfully."
      : "Course added successfully.";
    const errorMessage = onEditing
      ? "There was an error updating the course."
      : "There was an error adding the course.";

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
        if (course.thumbnail) {
          formData.append("file", course.thumbnail);
        }

        formData.append(
          "courseDto",
          new Blob([JSON.stringify(course)], { type: "application/json" })
        );
        if (onEditing) {
          dispatch(updateCourse(fetchCourse.id, formData))
            .then(() => {
              Swal.fire({
                title: "Updated!",
                text: successMessage,
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
              }).then(() => {
                handleClose();
                dispatch(getAllCourse());
                setonEditing(false);
                setcourse("");
                handleResetThumbnailfield();
                if (course.id === selectedCourseData?.id) {
                  setSelectedCourseData(course);
                  setShowCard(true);
                }
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
          dispatch(addCourse(formData))
            .then(() => {
              Swal.fire({
                title: "Added!",
                text: successMessage,
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
              }).then(() => {
                dispatch(getAllCourse());
                setShow(false);
                handleResetThumbnailfield();
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

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [faculty, setFaculty] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [filteredData, setFilteredData] = useState(getallCourse);
  const [selectedCourseData, setSelectedCourseData] = useState(null); // Stores course details for the card

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
    setCurrentPage(1);
  };

  // course based on category, subCategory, faculty, and search
  useEffect(() => {
    let filtered = getallCourse;

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (subCategory) {
      filtered = filtered.filter((item) => item.subCategory === subCategory);
    }

    if (faculty) {
      filtered = filtered.filter((item) => item.creator === faculty);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.courseName.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.creator.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [category, subCategory, faculty, search, getallCourse]);

  //course create show in card and edit end

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

  const dataToShow = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    {
      name: "CourseName",
      selector: (row) => row.courseName,
      sortable: true,
    },

    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },

    {
      name: "Creator",
      selector: (row) => row.creator,
      sortable: true,
    },

    {
      name: "SubCategory",
      selector: (row) => row.subCategory,
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
            onClick={() => handleViewDetails(row.id)}
          >
            <FaEye />
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

  // -------------------------------------------------------------------------------
  // content fetch and to play the vedio start
  const [showContentmodal, setShowContentmodal] = useState(false);
  const [courseContent, setCourseContent] = useState({
    id: "",
    courseId: "",
    contentDuration: "",
    contentUploadPath: "",
    contentFilename: "",
    contentName: "",
    contentType: "",
    file: null,
  });

  const selectedCourseContent = getallCourse.find(
    (course) => course.courseName === selectedCourse
  );
  // On open the content modal or when course is selected, it  store & set courseId in state
  useEffect(() => {
    if (selectedCourseContent) {
      setCourseContent((prevState) => ({
        ...prevState,
        courseId: selectedCourseContent.id, // Set the courseId in the state
      }));
    }
  }, [selectedCourseContent]); // to run whenever selectedCourseContent changes

  const handleContentModalShow = () => {
    setCourseContent({
      ...courseContent,
      courseId: selectedCourseData?.id || "", // Set the selected course ID
    });
    setShowContentmodal(true);
  };

  const handleInputChangeContent = (e) => {
    const { name, value, type, files } = e.target;
    const updatedContent = { ...courseContent };

    if (type === "file" && files.length > 0) {
      const file = files[0];

      const validFileTypes = [
        "video/mp4", // MP4 file type
        "video/x-matroska", // MKV file type
        "video/avi", // AVCHD file type
      ];

      if (validFileTypes.includes(file.type)) {
        updatedContent.file = file; // Store the actual file object
        updatedContent.contentFilename = file.name; // Set the file name to contentFilename
        updatedContent.contentType = file.type.split("/")[1]; // Set the file type (e.g., 'mp4')
      } else {
        alert(
          "Invalid file type! Please select a video file (MP4, MKV, AVCHD)."
        );
        return;
      }
    } else if (name === "contentName") {
      let trimmedValue = value.trim();
      if (trimmedValue) {
        updatedContent[name] = trimmedValue;
      } else {
        alert("Content name can't be empty.");
        return;
      }
    } else {
      updatedContent[name] = value;
    }

    setCourseContent(updatedContent);
  };
  const fileTypeMap = {
    mp4: "video/mp4",
    mkv: "video/x-matroska",
    avchd: "video/mp2t",
  };
  const getVedioFileAcceptType = () => {
    return fileTypeMap[courseContent.contentType] || "";
  };
  useEffect(() => {
    if (fetchContentwithId) {
      setCourseContent((prevData) => ({
        ...prevData,
        id: fetchContentwithId.id || "",
        contentName: fetchContentwithId.contentName || "",
        contentDuration: fetchContentwithId.contentDuration || "",
        contentType: fetchContentwithId.contentType || "",
        courseId: fetchContentwithId.courseId || "",
        contentFilename: fetchContentwithId.contentFilename || "",
        contentUploadPath: fetchContentwithId.contentUploadPath || "",
        file: fetchContentwithId.file || "",
      }));
    }
  }, [fetchContentwithId]);

  useEffect(() => {
    if (courseDetails && courseDetails.id) {
      dispatch(getAllContent(courseDetails.id));
    }
  }, [dispatch, courseDetails]);

  const handelfetchContent = (contentId) => {
    if (contentId) {
      setonEditing(true);
      setShowContentmodal(true);
      dispatch(fetchContentbyId(contentId));
    }
  };
  const contentInputRef = useRef(null);

  const handleResetContentForm = () => {
    setCourseContent((prevContent) => ({
      ...prevContent,
      contentName: "", // reset only content fields
      contentDuration: "",
      contentType: "",
      file: null, // clear file input
      contentFilename: "",
      contentUploadPath: "",
    }));

    // Reset the file input field manually using the ref
    if (contentInputRef.current) {
      contentInputRef.current.value = ""; // Clear the file input
    }
  };

  const resetFileInput = () => {
    // Reset the file input field by using the ref
    if (contentInputRef.current) {
      contentInputRef.current.value = "";
    }
  };

  const handleSubmitContent = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: onEditing
        ? "Do you want to update this content?"
        : "Are you sure you want to upload this content?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: onEditing ? "Yes, update it!" : "Yes, upload it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        if (courseContent.file) {
          formData.append("file", courseContent.file);
        }

        formData.append("id", courseContent.id || "");
        formData.append("courseId", courseContent.courseId || "");
        formData.append("contentName", courseContent.contentName || "");
        formData.append("contentDuration", courseContent.contentDuration || "");
        formData.append(
          "contentUploadPath",
          courseContent.contentUploadPath || ""
        );
        formData.append("contentFilename", courseContent.contentFilename || "");
        formData.append("contentType", courseContent.contentType || "");

        const actionPromise = onEditing
          ? dispatch(updateCourseContent(courseContent.id, formData))
          : dispatch(addCourseContent(formData));

        actionPromise
          .then(() => {
            Swal.fire({
              title: onEditing ? "Updated!" : "Uploaded!",
              text: onEditing
                ? "Your course content has been updated."
                : "Your course content has been submitted.",
              icon: "success",
            }).then(() => {
              dispatch(getAllContent(courseContent.courseId));
              setCourseContent("");
              setShowContentmodal(false);
              handleResetContentForm();
              resetFileInput();
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message || "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "No changes were made.",
          icon: "info",
        });
      }
    });
  };

  const handleCloseContent = () => {
    if (!onEditing) {
      setShowContentmodal(false);
      setCourseContent("");
      resetFileInput();
      return;
    } else {
      setShowContentmodal(false);
      setCourseContent("");
      resetFileInput();
      setonEditing(false);
    }
  };
  //===================================vedio player===============================
  const [videoSource, setVideoSource] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to show/hide modal

  const videoRef = useRef(null);

  useEffect(() => {
    if (playVideo && videoRef.current) {
      videoRef.current.play(); // the video when playVideo state is true
    }
  }, [playVideo]);
  const [contentName, setContentName] = useState(""); // Add this line to hold the content name

  const handleVideoClick = (contentId, contentName) => {
    setVideoSource(contentId); // Set the source URL or contentId
    setContentName(contentName); // Set the content name to display in the modal header
    setPlayVideo(true); // video play
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause(true);
    }
    setShowModal(false);
    setPlayVideo(false);
  };

  // content fetch edit and to ply the vedio end
  // ================================material start===================================================
  const [showMeterialmodal, setShowMeterialmodal] = useState(false);

  const [courseDocument, setCourseDocument] = useState({
    id: "", //no
    courseId: "",
    documentUploadPath: "",
    documentName: "", //input type text
    documentFilename: "",
    documentType: "", // pdf, img
    file: null,
  });

  const handleOpenPDF = () => {
    window.open("./image/leph101.pdf", "_blank");
  };
  // On open the meterial modal or when course is selected, it set courseId in state
  useEffect(() => {
    if (selectedCourseData) {
      setCourseDocument((prevState) => ({
        ...prevState,
        courseId: selectedCourseData.id, // Set the courseId in the state
      }));
    }
  }, [selectedCourseData]); // to run whenever selectedCourseData changes

  useEffect(() => {
    if (courseDetails && courseDetails.id) {
      dispatch(getAllMaterial(courseDetails.id));
    }
  }, [dispatch, courseDetails]);

  useEffect(() => {
    if (fetchMaterialById) {
      setCourseDocument((prevData) => ({
        ...prevData,
        id: fetchMaterialById.id || "",
        courseId: fetchMaterialById.courseId || "",
        documentUploadPath: fetchMaterialById.documentUploadPath || "",
        documentName: fetchMaterialById.documentName || "",
        documentFilename: fetchMaterialById.documentFilename || "",
        documentType: fetchMaterialById.documentType || "",
        file: fetchMaterialById.file || "",
      }));
    }
  }, [fetchMaterialById]);
  useEffect(() => {
    if (fetchMaterialById) {
      setCourseDocument({
        ...fetchMaterialById,
        file: fetchMaterialById.file || null,
      });
    }
  }, [fetchMaterialById]);

  const handleMeterialModalShow = () => {
    setCourseDocument({
      ...courseDocument,
      courseId: selectedCourseData?.id || "", // Set the selected course ID
    });
    setShowMeterialmodal(true);
  };
  const handleCloseMeterialModal = () => {
    if (!onEditing) {
      setShowMeterialmodal(false);
      handleResetMaterialfield();
      setCourseDocument("");
      return;
    } else {
      setShowMeterialmodal(false);
      setCourseDocument("");
      handleResetMaterialfield();
      setonEditing(false);
    }
  };

  const handelfetchMaterial = (materialId) => {
    if (materialId) {
      setonEditing(true);
      setShowMeterialmodal(true);
      dispatch(getMaterialbyId(materialId));
    }
  };
  const handleMaterialChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const validFileTypes = [
        "text/plain", // Notepad file (txt)
        "application/vnd.ms-excel", // Excel (xls)
        "application/pdf", // PDF file
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel (xlsx)
        "application/msword", // Word file (doc)
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Word file (docx)
      ];

      //  valid selected file type
      if (validFileTypes.includes(file.type)) {
        setCourseDocument({
          ...courseDocument,
          [name]: file,
        });
      } else {
        alert(
          "Invalid file type! Please select a Notepad, Excel, Word, or PDF file."
        );
      }
    } else if (name === "documentName") {
      let trimmedValue = value.replace(/^\s+/, ""); // Remove leading spaces only
      trimmedValue = trimmedValue.replace(/\s+$/, ""); // Remove all trailing spaces

      if (value.endsWith(" ")) {
        trimmedValue += " "; // only one trailing space
      }
      if (trimmedValue) {
        setCourseDocument({
          ...courseDocument,
          [name]: trimmedValue,
        });
      } else {
        alert("Document name can't be Empty.");
        return;
      }
    } else {
      setCourseDocument({
        ...courseDocument,
        [name]: value,
      });
    }
  };
  const handleDocumentTypeChange = (event) => {
    const { name, value } = event.target;
    setCourseDocument((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getFileAcceptType = (type) => {
    switch (type) {
      case "pdf":
        return ".pdf";
      case "xls":
        return ".xls";
      case "xlsx":
        return ".xlsx";
      case "doc":
        return ".doc";
      case "docx":
        return ".docx";
      case "txt":
        return ".txt";
      case "ppt":
        return ".ppt";
      case "pptx":
        return ".pptx";
      default:
        return ""; // no type is selected
    }
  };

  const fileInputRef = useRef(null);

  const handleResetMaterialfield = () => {
    setCourseDocument((prevDocument) => ({
      ...prevDocument,
      documentName: "",
      documentType: "",
      file: null,
      documentFilename: "",
      documentUploadPath: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMaterialSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: onEditing
        ? "Do you want to update this material?"
        : "Are you sure you want to upload this material?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: onEditing ? "Yes, update it!" : "Yes, upload it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        if (courseDocument.file) {
          formData.append("file", courseDocument.file);
        }

        formData.append("id", courseDocument.id || "");
        formData.append("courseId", courseDocument.courseId || "");
        formData.append(
          "documentUploadPath",
          courseDocument.documentUploadPath || ""
        );
        formData.append("documentName", courseDocument.documentName || "");
        formData.append(
          "documentFilename",
          courseDocument.documentFilename || ""
        );
        formData.append("documentType", courseDocument.documentType || "");

        const actionPromise = onEditing
          ? dispatch(updateCourseMaterial(courseDocument.id, formData))
          : dispatch(addCourseMaterial(formData));

        actionPromise
          .then(() => {
            Swal.fire({
              title: onEditing ? "Updated!" : "Uploaded!",
              text: onEditing
                ? "The material has been updated successfully."
                : "The material has been uploaded successfully.",
              icon: "success",
            }).then(() => {
              dispatch(getAllMaterial(courseDocument.courseId));
              setShowMeterialmodal(false);
              setCourseDocument("");
              handleResetMaterialfield();
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "There was an error uploading the material. Please try again.",
              icon: "error",
            });
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "No changes were made.",
          icon: "info",
        });
      }
    });
  };
  // ========================================fees start==================================================
  const [showFeeModal, setshowFeeModal] = useState(false);
  const [prevCourseId, setPrevCourseId] = useState(null);

  const [courseFee, setCourseFee] = useState({
    courseFeeId: "",
    courseId: "",
    courseFee: "",
    courseSubscriptionPeriod: "",
  });

  const handleFeeModalShow = () => {
    setshowFeeModal(true);
    setCourseFee({
      ...courseContent,
      courseId: selectedCourseData?.id || "", // Set the selected course ID
    });
  };

  const selectedCourseFee = getallCourse.find(
    (course) => course.courseName === selectedCourse
  );

  useEffect(() => {
    if (selectedCourseFee) {
      setCourseFee((prevState) => ({
        ...prevState,
        courseId: selectedCourseFee.id,
      }));
    }
  }, [selectedCourseFee]);

  useEffect(() => {
    if (courseFee.courseId && courseFee.courseId !== prevCourseId) {
      dispatch(getCourseFee(courseFee.courseId));
      setPrevCourseId(courseFee.courseId);
    }
  }, [courseFee.courseId, prevCourseId, dispatch]);

  useEffect(() => {
    if (fetchFeeById) {
      setCourseFee((prevData) => ({
        ...prevData,
        courseId: fetchFeeById.courseId || "",
        courseFeeId: fetchFeeById.courseFeeId || "",
        courseFee: fetchFeeById.courseFee || "",
        courseSubscriptionPeriod: fetchFeeById.courseSubscriptionPeriod || "",
      }));
    }
  }, [fetchFeeById]);

  const handleCloseFeeModal = () => {
    setshowFeeModal(false);
    setonEditing(false);
    setCourseFee("");
  };

  const handelfetchFee = (courseId) => {
    if (courseId) {
      setonEditing(true);
      setshowFeeModal(true);
      dispatch(getCourseFeeById(courseId));
    }
  };
  const handleInputFeeChange = (e) => {
    const { name, value } = e.target;
    setCourseFee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeeSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // on editing fee
        if (onEditing) {
          dispatch(updateCourseFee(fetchFeeById.courseFeeId, courseFee)).then(
            () => {
              dispatch(getCourseFee(courseFee.courseId));
              setCourseFee("");
            }
          );
        } else {
          // on adding a new course fee
          dispatch(addCourseFee(courseFee)).then(() => {
            dispatch(getCourseFee(courseFee.courseId));
            setCourseFee("");
          });
        }
        handleCloseFeeModal();
        Swal.fire({
          title: "Saved!",
          text: onEditing
            ? "Your course fee has been updated."
            : "Your new course fee has been added.",
          icon: "success",
        });
      }
    });
  };

  const [contentData, setContentData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
  const [CourseFeesData, setCourseFeesData] = useState([]);

  const handleViewDetails = (courseId) => {
    const courseDetails = getallCourse.find((course) => course.id === courseId);

    if (courseDetails) {
      setSelectedCourseData(courseDetails);
      setShowCard(true);

      dispatch(getCourseFeeById(courseId)).then((feeData) => {
        setCourseFeesData({ ...feeData, courseId: courseId });
      });

      dispatch(getAllContent(courseId)).then((response) => {
        if (response && Array.isArray(response)) {
          setContentData(response); // Only set if it's an array
        }
      });

      dispatch(getAllMaterial(courseId)).then((response) => {
        if (response && Array.isArray(response)) {
          setMaterialData(response);
        }
      });
    } else {
      setSelectedCourseData(null);
      setShowCard(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="container">
          <div>
            <div className="row mb-3 justify-content-between align-items-center">
              {/* Category Dropdown */}

              <div className="col-sm-3 d-flex align-items-center">
                <label className="custom-label me-2">
                  <b>Category</b>
                </label>
                <select
                  onChange={handleCategoryChange}
                  value={category}
                  className="form-select"
                >
                  <option value="">Choose...</option>
                  {getAllCourseCatagory &&
                    getAllCourseCatagory.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-sm-3 d-flex align-items-center">
                <label className="custom-label me-2">
                  <b>SubCategory</b>
                </label>
                <select
                  name="subCategory"
                  id="subCategory"
                  className="form-select"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <option value="">Choose...</option>
                  {allCourseCategory &&
                    allCourseCategory.map((subCategory, index) => (
                      <option key={index} value={subCategory.name}>
                        {subCategory.subCategory}
                      </option>
                    ))}
                </select>
              </div>

              {/* Faculty Dropdown */}
              <div className="col-sm-3 d-flex align-items-center">
                <label className="custom-label me-2">
                  <b>Faculty</b>
                </label>
                <select
                  name="faculty"
                  id="faculty"
                  className="form-select"
                  value={faculty}
                  onChange={handleFacultyChange}
                >
                  <option value="">Choose...</option>
                  {allFaculty &&
                    allFaculty.map((faculty, id) => (
                      <option key={id} value={faculty.name}>
                        {faculty.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Filter and Create Course Buttons */}

              <button
                className="btn col-auto btn-primary ms-2"
                onClick={handleShow}
              >
                Create Course
              </button>
            </div>
          </div>
        </div>

        {/* {dataToShow && */}
        <div className="card course-card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="left-header text-primary">Course List </h5>
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                className="form-control search-input w-25"
              />
            </div>
            {/* datatable */}
            {dataToShow && dataToShow.length > 0 ? (
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
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                <p>No data available, create the Education .</p>
              </div>
            )}
          </div>
        </div>

        {/* details table on change with card  */}
        {showCard && (
          <div className="col-md-12 mb-4">
            <div className="card p-3 shadow">
              <nav>
                <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Details
                  </button>
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Content
                  </button>
                  <button
                    className="nav-link"
                    id="nav-Material-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-Material"
                    type="button"
                    role="tab"
                    aria-controls="nav-Material"
                    aria-selected="false"
                  >
                    Material
                  </button>
                  <button
                    className="nav-link"
                    id="nav-Fees-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-Fees"
                    type="button"
                    role="tab"
                    aria-controls="nav-Fees"
                    aria-selected="false"
                  >
                    Fees
                  </button>
                  {/* <li className="nav-item ms-auto"> */}
                  <button
                    className="nav-link"
                    id="nav-all-details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-all-details"
                    type="button"
                    role="tab"
                    aria-controls="nav-all-details"
                    aria-selected="false"
                  >
                    Preview
                  </button>
                  {/* </li> */}
                </div>
              </nav>

              {/* Course Details card start */}
              <div
                className="tab-content p-3 border bg-light"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade active show"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <table className="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>Description</th>
                        <th>Course Name</th>
                        <th>Category</th>
                        <th>Creator</th>
                        <th>Subcategory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourseData ? (
                        <tr key={selectedCourseData.id}>
                          <td>{selectedCourseData.courseDesc}</td>
                          <td>{selectedCourseData.courseName}</td>
                          <td>{selectedCourseData.category}</td>
                          <td>{selectedCourseData.creator}</td>
                          <td>{selectedCourseData.subCategory}</td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="5">
                            Please select a course from the dropdown above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="row g-3 justify-content-center">
                    <div className="col-md-2 d-flex justify-content-center">
                      <button
                        className="btn btn-warning text-white  btn-sm"
                        onClick={() => handelfetchCourse(selectedCourseData.id)}
                      >
                        Modify
                      </button>
                    </div>
                  </div>
                </div>
                {/* Course Details card end */}

                {/* -------------Course content card start ------------*/}

                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="row g-3 justify-content-end">
                    <div className="col-md-2 d-flex justify-content-end">
                      <button
                        className="btn btn-primary text-white  btn-sm"
                        onClick={handleContentModalShow}
                      >
                        Add Content
                      </button>
                    </div>
                  </div>{" "}
                  <br />
                  <table className="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>Content Name</th>
                        <th>Content Duration</th>
                        <th>File Type</th>
                        <th>Video</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchAllContent.map((content) => (
                        <tr key={content.id}>
                          <td>{content.contentName}</td>
                          <td>{content.contentDuration}</td>
                          <td>{content.contentType}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                handleVideoClick(
                                  content.id,
                                  content.contentName
                                )
                              }
                            >
                              <SiAirplayvideo />{" "}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => handelfetchContent(content.id)}
                            >
                              <FaEdit />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* ---------------------vedioplayer start--------------*/}
                  <div
                    className={`modal fade ${showModal ? "show" : ""}`}
                    id="videoModal"
                    tabIndex="-1"
                    aria-labelledby="videoModalLabel"
                    style={{ display: showModal ? "block" : "none" }}
                    {...(showModal ? {} : { inert: "true" })}
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="videoModalLabel">
                            {contentName}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleCloseModal}
                          ></button>
                        </div>
                        <div className="modal-body">
                          {videoSource && (
                            <PlayerSimple
                              src={`${BASE_API_URL}/courseContent/video/${videoSource}`}
                            >
                              Your browser does not support the video tag.
                            </PlayerSimple>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*-------------------- vedioplayer end----------------*/}
                </div>
                {/* -------------------Course content card end --------*/}
                {/*------------- material card start -------------*/}
                <div
                  className="tab-pane fade"
                  id="nav-Material"
                  role="tabpanel"
                  aria-labelledby="nav-Material-tab"
                >
                  <div className="row g-3 justify-content-end">
                    <div className="col-md-2 d-flex justify-content-end">
                      <button
                        className="btn btn-primary text-white  btn-sm"
                        onClick={handleMeterialModalShow}
                      >
                        Add Material
                      </button>
                    </div>
                  </div>
                  <br />
                  <table className="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>Document Name</th>
                        <th>Document Type</th>
                        <th>File</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchAllMaterial.map((material) => (
                        <tr key={material.id}>
                          <td>{material.documentName}</td>
                          <td>{material.documentType}</td>
                          <td>
                            {material.file}
                            <button
                              className="btn btn-warning"
                              onClick={handleOpenPDF}
                            >
                              <FaFileAlt />
                            </button>{" "}
                          </td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => handelfetchMaterial(material.id)}
                            >
                              <FaEdit />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/*------------- fee card start -------------*/}

                <div
                  className="tab-pane fade"
                  id="nav-Fees"
                  role="tabpanel"
                  aria-labelledby="nav-Fees-tab"
                >
                  {" "}
                  <div className="row g-3 justify-content-end">
                    <div className="col-md-2 d-flex justify-content-end">
                      {!getFee || getFee.courseId !== selectedCourseData?.id ? (
                        <button
                          className="btn btn-primary text-white btn-sm"
                          onClick={handleFeeModalShow}
                        >
                          Add Fees
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <br />
                  <table className="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>Fees</th>
                        <th>Period</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourseData &&
                      getFee &&
                      getFee.courseId === selectedCourseData.id ? (
                        <tr key={getFee.courseId}>
                          <td>{getFee.courseFee}</td>
                          <td>{getFee.courseSubscriptionPeriod}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => handelfetchFee(getFee.courseId)}
                            >
                              <FaEdit />
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No fee data available for this course.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* ----------------------preview start------------- */}
                <div
                  className="tab-pane fade"
                  id="nav-all-details"
                  role="tabpanel"
                  aria-labelledby="nav-all-details"
                >
                  <div className="container">
                    <div className="course-details">
                      {selectedCourseData ? (
                        <table className="table table-bordered table-hover">
                          <tbody>
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Name:</strong>
                              </td>
                              <td>{selectedCourseData.courseName}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Description:</strong>
                              </td>
                              <td>{selectedCourseData.courseDesc}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Category:</strong>
                              </td>
                              <td>{selectedCourseData.category}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Creator:</strong>
                              </td>
                              <td>{selectedCourseData.creator}</td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Subcategory:</strong>
                              </td>
                              <td>{selectedCourseData.subCategory}</td>
                            </tr>
                            {getFee && (
                              <>
                                <tr>
                                  <td className="font-weight-bold left-column">
                                    <strong>Fee:</strong>
                                  </td>
                                  <td>{getFee.courseFee}</td>
                                </tr>
                                <tr>
                                  <td className="font-weight-bold left-column">
                                    <strong>Period:</strong>
                                  </td>
                                  <td>{getFee.courseSubscriptionPeriod}</td>
                                </tr>
                              </>
                            )}
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Content:</strong>
                              </td>
                              <td>
                                <table className="table table-hover">
                                  <thead className="table-primary">
                                    <tr className="contentTbl">
                                      <th>Content Name</th>
                                      <th>Content Duration</th>
                                      <th>File Type</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fetchAllContent.map((content) => (
                                      <tr key={content.id}>
                                        <td>{content.contentName}</td>
                                        <td>{content.contentDuration}</td>
                                        <td>{content.contentType}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td className="font-weight-bold left-column">
                                <strong>Material:</strong>
                              </td>
                              <td>
                                <table className="table table-hover">
                                  <thead className="table-primary">
                                    <tr className="contentTbl">
                                      <th>Document Name</th>
                                      <th>Document Type</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fetchAllMaterial.map((material) => (
                                      <tr key={material.id}>
                                        <td>{material.documentName}</td>
                                        <td>{material.documentType}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="row">
                          <div className="col-12">
                            Please select a course from the dropdown above.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* -----------------------preview end------------------ */}
              </div>
            </div>
          </div>
        )}
        {/* details table  on clicking datatable link */}
        {/* --------------------------modal for content ---------------------- */}
        {showContentmodal && <div className="modal-backdrop fade show"></div>}
        <div
          className={`modal fade ${showContentmodal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">
                  <b>
                    {onEditing
                      ? `Update ${
                          selectedCourseContent?.courseName || "Course"
                        } Content`
                      : `Add ${
                          selectedCourseContent?.courseName || "Course"
                        } Content`}
                  </b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseContent}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitContent}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      {/* Hidden input for courseId, passed to backend */}
                      <input
                        type="hidden"
                        name="courseId"
                        value={courseContent.courseId || ""}
                      />
                      <label htmlFor="contentName" className="form-label">
                        <b>Name</b>
                      </label>
                      <input
                        type="text"
                        name="contentName"
                        value={courseContent.contentName || ""}
                        onChange={handleInputChangeContent}
                        className="form-control"
                        id="contentName"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contentType" className="form-label">
                        <b>Type</b>
                      </label>
                      <select
                        name="contentType"
                        value={courseContent.contentType || ""}
                        onChange={handleInputChangeContent}
                        id="contentType"
                        className="form-select"
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="mp4">Mp4</option>
                        <option value="mkv">Mkv</option>
                        <option value="avchd">AVCHD</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="contentDuration" className="form-label">
                        <b>Duration</b>
                      </label>
                      <input
                        type="time"
                        name="contentDuration"
                        value={courseContent.contentDuration || ""}
                        onChange={handleInputChangeContent}
                        className="form-control"
                        id="contentDuration"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="file" className="form-label">
                          <b>Upload File</b>
                        </label>
                        <input
                          ref={contentInputRef}
                          className="form-control"
                          type="file"
                          onChange={handleInputChangeContent}
                          accept={getVedioFileAcceptType()} // Dynamically set the accept attribute
                          name="file"
                          id="file"
                          required
                        />
                      </div>
                    </div>
                  </div>
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
        {/* -------------------------Add course modal---------------- */}
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
                  <b>{onEditing ? "Update Course" : "Add Course"}</b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCourseSubmit}>
                  <div className="row g-3">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="courseName">
                        <b>Name</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="courseName"
                        value={course.courseName || ""}
                        onChange={handleInputChange}
                        id="courseName"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="courseDesc">
                        <b>Description</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="courseDesc"
                        id="courseDesc"
                        value={course.courseDesc || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="category">
                        <b>Category</b>
                      </label>

                      <select
                        name="category"
                        value={course.category || ""}
                        onChange={handleInputChange}
                        id="category"
                        className="form-select"
                        required
                      >
                        <option value="">Choose...</option>
                        {getAllCourseCatagory &&
                          getAllCourseCatagory.map((category, index) => (
                            <option key={index} value={category.id}>
                              {category.category}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group col-md-6 ">
                      <label htmlFor="subCategory">
                        <b>Sub Category</b>
                      </label>
                      <select
                        name="subCategory"
                        value={course.subCategory || ""}
                        onChange={handleInputChange}
                        id="subCategory"
                        className="form-select"
                        required
                      >
                        <option value="">Choose...</option>
                        {allCourseCategory &&
                          allCourseCategory.map((subCategory, index) => (
                            <option key={index} value={subCategory.id}>
                              {subCategory.subCategory}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-6">
                      <label htmlFor="creator">
                        <b>Creator</b>
                      </label>
                      <select
                        className="form-select"
                        name="creator"
                        id="creator"
                        value={course.creator || ""}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Choose...</option>
                        {allFaculty &&
                          allFaculty.map((faculty, id) => (
                            <option key={id} value={faculty.name}>
                              {faculty.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group col-md-6 ">
                      <label htmlFor="creator">
                        <b>Thumbnail</b>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        ref={thumbnailInputRef || ""}
                        accept="image/jpeg, image/png , image/jpg, image/gif, image/webp"
                        name="thumbnail"
                        id="thumbnail"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="liveSession">
                        <b>Live Session</b>
                      </label>

                      <select
                        name="liveSession"
                        value={course.liveSession || ""}
                        onChange={handleInputChange}
                        id="liveSession"
                        className="form-select"
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>

                    <div className="form-group col-md-6 ">
                      <label htmlFor="courseMaterial">
                        <b>Material</b>
                      </label>
                      <select
                        name="courseMaterial"
                        value={course.courseMaterial || ""}
                        onChange={handleInputChange}
                        id="courseMaterial"
                        className="form-select"
                        required
                      >
                        <option value="">Choose...</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="form-group col-md-12 ">
                      <label htmlFor="description">
                        <b>About This Course</b>
                      </label>
                      <JoditEditor
                        value={course.description || ""}
                        name="description"
                        id="description"
                        onChange={(newContent) =>
                          setcourse({ ...course, description: newContent })
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
        {/* ---------------------Course material modal---------------- */}
        {showMeterialmodal && <div className="modal-backdrop fade show"></div>}
        <div
          className={`modal fade ${showMeterialmodal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">
                  <b>
                    {onEditing
                      ? `Update ${
                          selectedCourseData?.courseName || "Course"
                        } Material`
                      : `Add ${
                          selectedCourseData?.courseName || "Course"
                        } Material`}
                  </b>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseMeterialModal}
                ></button>
              </div>
              <div className="modal-body">
                {/*---------------------------- form inputs--------------- */}
                <form onSubmit={handleMaterialSubmit}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      {/* Hidden input for courseId, passed to backend */}

                      <input
                        type="hidden"
                        name="courseId"
                        value={courseDocument.courseId || ""}
                      />

                      <label htmlFor="documentName" className="form-label">
                        <b>Name</b>
                      </label>
                      <input
                        type="text"
                        name="documentName"
                        value={courseDocument.documentName || ""}
                        onChange={handleMaterialChange}
                        className="form-control"
                        id="documentName"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="documentType" className="form-label">
                        <b>Type</b>
                      </label>
                      <select
                        name="documentType"
                        value={courseDocument.documentType || ""}
                        onChange={handleDocumentTypeChange}
                        id="documentType"
                        className="form-select"
                        required
                      >
                        <option value="">Choose Option...</option>
                        <option value="pdf">PDF</option>
                        <option value="txt">Text</option>
                        <option value="xls">Excel.xls</option>
                        <option value="xlsx">Excel.xlsx</option>
                        <option value="docx">Word.docx</option>
                        <option value="doc">Word.doc</option>
                        <option value="ppt">PowerPoint.ppt</option>
                        <option value="pptx">PowerPoint.pptx</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="file" className="form-label">
                        <b>Upload Material</b>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleMaterialChange}
                        accept={getFileAcceptType(courseDocument.documentType)} // dynamically set file accept based on document type
                        name="file"
                        id="file"
                        required
                      />
                    </div>
                  </div>

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
        {/* Course Fee modal */}
        {showFeeModal && <div className="modal-backdrop fade show"></div>}
        <div
          className={`modal fade ${showFeeModal ? "show d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">
                  <b>
                    {onEditing
                      ? `Update ${
                          selectedCourseFee?.courseName || "Course"
                        } Fees`
                      : `Add ${selectedCourseFee?.courseName || "Course"} Fees`}
                  </b>
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseFeeModal}
                ></button>
              </div>

              <div className="modal-body">
                {/*---------------------------- form inputs--------------- */}

                <form onSubmit={handleFeeSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      {/* Hidden input for courseId, passed to backend */}
                      <input
                        type="hidden"
                        name="courseId"
                        value={courseFee.courseId || ""}
                      />
                      <label htmlFor="courseFee" className="form-label">
                        <b>Fees</b>
                      </label>

                      <input
                        type="number"
                        name="courseFee"
                        value={courseFee.courseFee || ""}
                        onChange={handleInputFeeChange}
                        className="form-control"
                        id="courseFee"
                        step="0.01"
                        min="0" // Prevents negative values
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="courseSubscriptionPeriod"
                        className="form-label"
                      >
                        <b>Subscription Period</b>
                      </label>

                      <input
                        type="number"
                        name="courseSubscriptionPeriod"
                        value={courseFee.courseSubscriptionPeriod || ""}
                        onChange={handleInputFeeChange}
                        className="form-control"
                        id="courseSubscriptionPeriod"
                        min="1" // Ensures the value is at least 1
                        max="100" // Ensures the value is no more than 100
                        required
                      />
                    </div>
                  </div>

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
export default Course;
