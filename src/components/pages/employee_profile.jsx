import React, { useState, useEffect } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
  deleteEmployee,
  logoutUser,
} from "../../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Header from "../common/header";
import ProfileImage from "../../components/common/ProfileImage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormFields from "../common/FormFields";
import { parseFormDate } from "../common/utils/dateUtils";
import { formatFormData, editableFields } from "../common/FormDetails"; // Adjust path if necessary

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    department: "",
    job_title: "",
    salary: "",
    hire_date: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hireDateEditable, setHireDateEditable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const data = await fetchUserProfile();
        setEmployeeData(data);
        if (!data.hire_date) {
          setHireDateEditable(true);
        }
      } catch (error) {
        toast.error("Error fetching employee data.");
      }
    };

    loadEmployeeData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exclude 'profile_picture' and other unwanted fields
    const { profile_picture, created_at, updated_at, ...filteredData } =
      employeeData;

    const formattedData = formatFormData({
      ...filteredData,
      date_of_birth: parseFormDate(employeeData.date_of_birth),
      hire_date: parseFormDate(employeeData.hire_date),
    });

    try {
      await updateUserProfile(formattedData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      ); // Improved error logging
      toast.error(
        `Error updating employee data: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeData.id);
      await logoutUser();
      toast.success("Profile deleted successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(`Error deleting profile: ${error.message}`);
    }
  };

  const profilePictureUrl = employeeData.profile_picture
    ? `http://localhost:3000/${employeeData.profile_picture}` // Ensure this matches your server setup
    : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  return (
    <Container className="profile-container">
      <Header />
      <div className="profile-content">
        <ProfileImage src={profilePictureUrl} alt="Profile" />

        <Form onSubmit={handleSubmit} className="employee-form">
          <Form.Group controlId="id">
            <Form.Label>EMPLOYEE ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={employeeData.id}
              disabled
            />
          </Form.Group>

          {/* Removed hire_date from the form fields */}

          <FormFields
            fields={employeeData}
            errors={{}} // Assuming you handle errors elsewhere
            isEditing={isEditing}
            handleChange={(e) => {
              if (editableFields.includes(e.target.name)) {
                setEmployeeData({
                  ...employeeData,
                  [e.target.name]: e.target.value,
                });
              }
            }}
            hireDate={employeeData.hire_date} // Pass hireDate to FormFields
          />

          <div className="button-con">
            <Button
              variant={isEditing ? "secondary" : "primary"}
              className="edit-button"
              onClick={isEditing ? handleDoneClick : handleEditClick}
            >
              {isEditing ? "Done" : "Edit"}
            </Button>
            {isEditing && (
              <Button variant="success" type="submit" className="submit-button">
                Save Changes
              </Button>
            )}
            <Button
              variant="danger"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Profile
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EmployeeProfile;
