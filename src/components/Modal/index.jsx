import { useState } from "react";
import axios from "axios";

export const Modal = ({ closeModal, defaultValue }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.title && formState.description) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        "/api/meetups/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Meetup created successfully:", response.data);

      setFormState({
        title: "",
        description: "",
      });
      setImages([]);
      closeModal();
    } catch (error) {
      console.error("Error creating meetup:", error);
      // Handle error
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              onChange={handleChange}
              value={formState.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images</label>
            <input type="file" name="images" onChange={handleImageChange} multiple />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
