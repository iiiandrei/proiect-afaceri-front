import React, { useState, useEffect } from "react";
import axios from "../../services/apiService";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";

const NewAnnouncement = (props) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (props?.announcement) {
      setTitle(props.announcement.title || "");
      setDetails(props.announcement.details || "");
      setPrice(props.announcement.price || "");
      setFile(null);
    }
  }, [props?.announcement]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("price", price);

    if (file) {
      formData.append("file", file);
      console.log(file)
    }

    if (props?.announcement?.id) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/announcements/${props.announcement.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(() => {
          props.closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/announcements`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          props.closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const deleteAnnouncement = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/announcements/${id}`);

    props.closeModal();
  }

  return (
    <CModal visible={props.visible} onClose={props.closeModal}>
      <CModalHeader onClose={props.closeModal}>
        <CModalTitle>
          {props?.announcement ? "Edit Announcement" : "Create Announcement"}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CFormInput
            type="text"
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <CFormTextarea
            id="details"
            label="Details"
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
          <CFormInput
            id="price"
            label="Price"
            rows="1"
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {props?.announcement?.file || file ? (
            <img
              src={file || props?.announcement?.file}
              style={{
                width: "auto",
                height: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              alt="no img"
            />
          ) : (
            <></>
          )}
          <CFormInput
            type="file"
            id="file"
            label="Upload File" // Updated: singular label
            onChange={handleFileChange} // Updated: single file handler
          />
          <CCol xs={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CButton type="submit" color="success">
                Save
              </CButton>
              {props?.announcement && (
                <CButton
                  color="danger"
                  onClick={() =>
                    deleteAnnouncement(props.announcement.id)
                  }
                >
                  Delete
                </CButton>
              )}
            </div>
          </CCol>
        </CForm>
      </CModalBody>
    </CModal>
  );
};

export default NewAnnouncement;
