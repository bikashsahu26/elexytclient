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
import { FaEdit, FaFileAlt, FaPause } from "react-icons/fa";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import { IoIosFastforward, IoIosRewind, IoMdPlay } from "react-icons/io";
import JoditEditor from "jodit-react";

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
    }),
    []
  );

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getAllCourseCategory());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCourseSubCategory());
  // }, [dispatch]);

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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setcourse({ ...course, [name]: value });
  // };
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
      // const regex = /^[A-Za-z\s]*$/;
      // if (regex.test(trimmedValue)) {
      //   setcourse({ ...course, [name]: trimmedValue });
      // }
      if (trimmedValue) {
        setcourse({ ...course, [name]: trimmedValue });
      } else {
        alert(
          "Invalid file type! Please select a video file (MP4, MKV, AVCHD)."
        );
        return;
      }

      // setcourse({ ...course, [name]: trimmedValue });
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
    //dispatch(getAllContent(courseDetails.id));
    setShowCard(true);
  };

  // Filter the courses to show only the selected one
  const selectedCourseData = getallCourse.find(
    (course) => course.courseName === selectedCourse
  );

  // const handleCourseSubmit = (e) => {
  //   e.preventDefault();

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: onEditing
  //       ? "You want to update the course?"
  //       : "Are you sure you want to add this course?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: onEditing ? "Yes, update it!" : "Yes, add it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleShow();

  //       const formData = new FormData();
  //       if (course.thumbnail) {
  //         formData.append("file", course.thumbnail);
  //       }

  //       // formData.append("file", course.thumbnail);
  //       formData.append(
  //         "courseDto",
  //         new Blob([JSON.stringify(course)], {
  //           type: "application/json",
  //         })
  //       );

  //       if (onEditing) {
  //         dispatch(updateCourse(fetchCourse.id, formData))
  //           .then(() => {
  //             Swal.fire({
  //               title: "Updated!",
  //               text: "Your course has been updated.",
  //               icon: "success",
  //             }).then(() => {
  //               handleClose();
  //               dispatch(getAllCourse());
  //               setonEditing(false);
  //               setcourse("");
  //               handleResetThumbnailfield();
  //             });
  //           })
  //           .catch(() => {
  //             Swal.fire({
  //               title: "Error!",
  //               text: "There was an error updating the course. Please try again.",
  //               icon: "error",
  //             });
  //           });
  //       } else {
  //         dispatch(addCourse(formData))
  //           .then(() => {
  //             Swal.fire({
  //               title: "Added!",
  //               text: "Your course has been added successfully.",
  //               icon: "success",
  //             }).then(() => {
  //               dispatch(getAllCourse());
  //               setShow(false);
  //               handleResetThumbnailfield();
  //             });
  //           })
  //           .catch(() => {
  //             Swal.fire({
  //               title: "Error!",
  //               text: "There was an error adding the course. Please try again.",
  //               icon: "error",
  //             });
  //           });
  //       }
  //     } else {
  //       Swal.fire({
  //         title: "Cancelled",
  //         text: "No changes were made.",
  //         icon: "info",
  //       });
  //     }
  //   });
  // };
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

  //course create show in card and edit end
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
        updatedContent[name] = file;
      } else {
        alert(
          "Invalid file type! Please select a video file (MP4, MKV, AVCHD)."
        );
        return;
      }
    } else if (name === "contentName") {
      let trimmedValue = value.replace(/^\s+/, ""); // remove leading spaces
      trimmedValue = trimmedValue.replace(/\s+$/, ""); // remove all trailing spaces

      // one trailing space if the original value had one
      if (value.endsWith(" ")) {
        trimmedValue += " ";
      }

      // const regex = /^[A-Za-z\s]*$/; //allow letters and spaces contentName

      if (trimmedValue) {
        updatedContent[name] = trimmedValue;
      } else {
        alert("Content name can't be empty.");
        return;
      }
    } else {
      // For other fields, update normally
      updatedContent[name] = value;
    }

    setCourseContent(updatedContent);
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
    setCourseContent("");

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

        formData.append("id", courseContent.id);
        formData.append("courseId", courseContent.courseId);
        formData.append("contentName", courseContent.contentName);
        formData.append("contentDuration", courseContent.contentDuration);
        formData.append("contentUploadPath", courseContent.contentUploadPath);
        formData.append("contentFilename", courseContent.contentFilename);
        formData.append("contentType", courseContent.contentType);

        const actionPromise = onEditing
          ? dispatch(updateCourseContent(courseContent.id, formData))
          : dispatch(addCourseContent(formData));

        actionPromise
          .then(() => {
            dispatch(getAllContent(courseContent.courseId));

            Swal.fire({
              title: onEditing ? "Updated!" : "Uploaded!",
              text: onEditing
                ? "Your course content has been updated."
                : "Your course content has been submitted.",
              icon: "success",
            }).then(() => {
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

  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = (videoPath) => {
    setSelectedVideo(videoPath);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };
  // Play/Pause functionality
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Rewind 10 seconds
  const handleRewind = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.getCurrentTime();
      videoRef.current.seekTo(Math.max(currentTime - 10, 0)); // Rewind 10 seconds
    }
  };

  // Forward 10 seconds
  const handleForward = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.getCurrentTime();
      videoRef.current.seekTo(currentTime + 10); // Forward 10 seconds
    }
  };

  // content fetch edit and to ply the vedio end
  // ================================material start===================================================
  const [showMeterialmodal, setShowMeterialmodal] = useState(false);

  const [courseDocument, setCourseDocument] = useState({
    id: "", //no
    courseId: "", //dropdown
    documentUploadPath: "",
    documentName: "", //input type text
    documentFilename: "",
    documentType: "", // pdf, img
    file: null,
  });
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

  const handleMeterialModalShow = () => {
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

      // const regex = /^[A-Za-z\s]*$/; //  alphabets and spaces allowed (no special characters)
      // if (regex.test(trimmedValue)) {
      //   setCourseDocument({
      //     ...courseDocument,
      //     [name]: trimmedValue,
      //   });
      // }
      if (trimmedValue) {
        setCourseDocument({
          ...courseDocument,
          [name]: trimmedValue,
        });
      } else {
        alert("Document name can't be Empty.");
      }
    } else {
      setCourseDocument({
        ...courseDocument,
        [name]: value,
      });
    }
  };

  // const handleMaterialChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   if (type === "file" || "") {
  //     setCourseDocument({
  //       ...courseDocument,
  //       [name]: files[0],
  //     });
  //   } else {
  //     setCourseDocument({
  //       ...courseDocument,
  //       [name]: value,
  //     });
  //   }
  // };
  const fileInputRef = useRef(null);

  const handleResetMaterialfield = () => {
    // Reset the file input field manually using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
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

        formData.append("id", courseDocument.id);
        formData.append("courseId", courseDocument.courseId);
        formData.append(
          "documentUploadPath",
          courseDocument.documentUploadPath
        );
        formData.append("documentName", courseDocument.documentName);
        formData.append("documentFilename", courseDocument.documentFilename);
        formData.append("documentType", courseDocument.documentType);

        if (onEditing) {
          dispatch(updateCourseMaterial(courseDocument.id, formData))
            .then(() => {
              Swal.fire({
                title: "Updated!",
                text: "The material has been updated successfully.",
                icon: "success",
              }).then(() => {
                dispatch(getAllMaterial(courseDocument.courseId));
                setShowMeterialmodal(false);
                setCourseDocument("");
                handleResetMaterialfield();
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error!",
                text: "There was an error updating the material. Please try again.",
                icon: "error",
              });
            });
        } else {
          dispatch(addCourseMaterial(formData))
            .then(() => {
              Swal.fire({
                title: "Uploaded!",
                text: "The material has been uploaded successfully.",
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
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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

  // useEffect(() => {
  //   if (courseFee && courseFee.courseId) {
  //     dispatch(getCourseFee(courseFee.courseId));
  //   }
  // }, [dispatch, courseFee]);

  const handleCloseFeeModal = () => {
    setshowFeeModal(false);
    setonEditing(false);
    setCourseFee("");
  };

  // const handelfetchFee = (courseId) => {
  //   dispatch(getCourseFeeById(courseId)).then(() => {
  //     if (fetchFeeById) {
  //       setCourseFee((prevData) => ({
  //         ...prevData,
  //         courseId: fetchFeeById.courseId || "",
  //         courseFeeId: fetchFeeById.courseFeeId || "",
  //         courseFee: fetchFeeById.courseFee || "",
  //         courseSubscriptionPeriod: fetchFeeById.courseSubscriptionPeriod || "",
  //       }));
  //       setonEditing(true);
  //       setshowFeeModal(true);
  //     }
  //   });
  // };

  const handelfetchFee = (courseId) => {
    if (courseId) {
      setonEditing(true);
      setshowFeeModal(true);
      dispatch(getCourseFeeById(courseId));
    }
  };
  const handleInputFeeChange = (e) => {
    const { name, value } = e.target;
    // setCourseFee({ ...courseFee, [name]: value });

    setCourseFee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleInputFeeChange = (e) => {
  //   const { name, value } = e.target;
  //   setCourseFee((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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

  const handleCourseChange = (event) => {
    const value = event.target.value;
    setSelectedCourse(value);

    // Find the selected course from the array
    const selectedCourseDetails = getallCourse.find(
      (course) => course.courseName === value
    );

    if (selectedCourseDetails) {
      setCourseDetails(selectedCourseDetails);
      setShowCard(true);
    } else {
      setShowCard(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="container">
          <div className="row justify-content-center mb-3">
            <div className="col-md-4">
              <select
                name="course"
                value={selectedCourse}
                onChange={handleCourseChange}
                id="course"
                className="form-select "
              >
                <option value="">Choose Course...</option>
                {getallCourse &&
                  getallCourse.map((course) => (
                    <option key={course.id} value={course.courseName}>
                      {`${course.courseName} - ${course.category} - ${course.subCategory}`}{" "}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary ms-2" onClick={handleShow}>
                CREATE COURSE
              </button>
            </div>
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
                        onClick={() => handelfetchCourse(courseDetails.id)}
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
                              // onClick={() =>handleVideoClick(content.contentUploadPath)}
                              onClick={() =>
                                handleVideoClick(
                                  "./videos/Java - Comments ( 360 X 640 ).mp4"
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
                  {selectedVideo && (
                    <div
                      className="video-player position-relative bg-white p-2 rounded shadow"
                      style={{
                        width: "100%", // Full width of the container
                        maxWidth: "800px", // Max width on larger screens
                        // margin: "0 auto",
                        position: "sticky",
                        //top: "20px",
                        //zIndex: 1000,
                      }}
                    >
                      <button
                        className="btn-close position-absolute top-0 end-0 m-1"
                        onClick={closeVideoPlayer}
                        aria-label="Close"
                      ></button>

                      <ReactPlayer
                        ref={videoRef}
                        //url={selectedVideo}
                        //src="./videos/Java - Comments ( 360 X 640 ).mp4"
                        url={"./videos/Java - Comments ( 360 X 640 ).mp4"}
                        playing={isPlaying}
                        controls={true}
                        width="95%"
                        height="auto"
                        volume={true}
                        muted={false}
                        //light={true}
                      />
                      <div
                        className="d-flex justify-content-center align-items-center"
                        // style={{ height: "100vh" }}
                      >
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={handleRewind}
                        >
                          <IoIosRewind />{" "}
                        </button>
                        {/* Play/Pause Button */}
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={togglePlayPause}
                        >
                          {isPlaying ? <FaPause /> : <IoMdPlay />}
                        </button>
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={handleForward}
                        >
                          <IoIosFastforward />{" "}
                        </button>
                      </div>
                      {selectedCourseData && (
                        <div>
                          <p>
                            <strong>Course Name:</strong>{" "}
                            {selectedCourseData.courseName}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {selectedCourseData.courseDesc}
                          </p>
                        </div>
                      )}
                      {fetchAllContent.map((content) => (
                        <div key={content.id} className="content-item">
                          <p>
                            <strong>Content Name:</strong> {content.contentName}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
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
                        {/* <th>Course</th> */}
                        <th>Document Name</th>
                        <th>Document Type</th>
                        <th>File</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchAllMaterial.map((material) => (
                        <tr key={material.id}>
                          {/* <td>{material.courseId}</td> */}
                          {/* <td>
                            {course[material.courseId]?.courseName ||
                              "Loading..."}
                          </td> */}
                          <td>{material.documentName}</td>
                          <td>{material.documentType}</td>
                          <td>
                            {material.file}
                            <FaFileAlt />
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
                      <button
                        className="btn btn-primary text-white  btn-sm"
                        onClick={handleFeeModalShow}
                      >
                        Add Fees
                      </button>
                    </div>
                  </div>
                  <br />
                  <table className="table table-hover">
                    <thead className="table-primary">
                      <tr>
                        {/* <th>Course</th> */}
                        <th>Fees</th>
                        <th>Period</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCourseData &&
                        getFee &&
                        getFee.courseId === selectedCourseData.id && (
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
                  {/* <b>
                    {onEditing ? "Update Course Content" : "Add Course Content"}
                  </b> */}
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
                    {/* <div className="col-md-6">
                      <label htmlFor="courseId" className="form-label">
                        <b> Course Name</b>
                      </label>
                      <div>
                        
                        <select
                          name="courseId"
                          value={courseContent.courseId || ""}
                          id="courseId"
                          className="form-select"
                          disabled
                          required
                        >
                          <option value={courseContent.courseId || ""}>
                            {selectedCourseContent
                              ? selectedCourseContent.courseName
                              : "Choose..."}
                          </option>
                        </select>
                      </div>
                    </div> */}

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
                          ref={contentInputRef || ""}
                          className="form-control"
                          type="file"
                          onChange={handleInputChangeContent}
                          name="file"
                          id="file"
                          required
                        />
                      </div>
                    </div>
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
                    <div className="form-group col-md-6 ">
                      <label htmlFor="creator">
                        <b>Creator</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="creator"
                        id="creator"
                        value={course.creator || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="creator">
                        <b>Thumbnail</b>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        ref={thumbnailInputRef || ""}
                        name="thumbnail"
                        id="thumbnail"
                        // value={course.thumbnail || ""}
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
                        <b>Description</b>
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
                        // config={{
                        //   showCharsCounter: false, // Hides the characters counter
                        //   showWordsCounter: false, // Hides the word counter
                        //   showPoweredBy: false, // Hides the "Powered by Jodit" footer
                        //   statusbar: false, // Hides the entire status bar
                        //   toolbar: true, // Keep toolbar visible
                        //   readonly: false,
                        // }}
                      />
                      {/* <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        value={course.description || ""}
                        onChange={handleInputChange}
                        required
                      /> */}
                    </div>
                  </div>
                  <br />
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
                  {/* <b>
                    {onEditing
                      ? "Update Course Material"
                      : "Add Course Material"}
                  </b> */}
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
                    {/* <div className="row g-3"> */}
                    <div className="col-md-4">
                      <label htmlFor="documentType" className="form-label">
                        <b>Type</b>
                      </label>
                      <select
                        name="documentType"
                        value={courseDocument.documentType || ""}
                        onChange={handleMaterialChange}
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
                        // value={courseDocument.file || ""}
                        onChange={handleMaterialChange}
                        name="file"
                        id="file"
                        required
                      />
                    </div>
                    {/* </div> */}
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
                  {/* <b>{onEditing ? "Update Course Fees" : "Add Course Fees"}</b> */}
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
                    {/* <div className="col-md">
                      <label htmlFor="courseId" className="form-label">
                        <b> Course Name</b>
                      </label>

                      <div>

                        
                        <select
                          name="courseId"
                          value={courseFee.courseId || ""}
                          id="courseId"
                          className="form-select"
                          disabled
                          required
                        >
                          <option value={courseFee.courseId || ""}>
                            {selectedCourseFee
                              ? selectedCourseFee.courseName
                              : "Choose..."}
                          </option>
                        </select>
                      </div>
                    </div> */}

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
export default Course;
