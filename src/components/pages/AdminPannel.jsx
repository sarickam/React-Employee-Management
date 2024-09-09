import React, { useState, useEffect } from "react";
import {
  fetchAllEmployees,
  updateEmployeeById,
  deleteEmployeeById,
} from "../../api"; // Adjust API imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchAllEmployees();
        setEmployees(data);
      } catch (error) {
        toast.error("Error fetching employees data.");
      }
    };

    loadEmployees();
  }, []);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Handling save changes");

      // Prepare the employee data, excluding unwanted fields
      const {
        id,
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth,
        gender,
        address,
        city,
        state,
        country,
        zip_code,
        department,
        job_title,
        salary,
        hire_date,
      } = selectedEmployee;

      const updatedEmployeeData = {
        id,
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth: new Date(date_of_birth).toISOString().slice(0, 10), // Ensure the date format is correct
        gender,
        address,
        city,
        state,
        country,
        zip_code,
        department,
        job_title,
        salary,
        hire_date: new Date(hire_date).toISOString().slice(0, 10), // Ensure the date format is correct
      };

      // Send the request to update the employee
      await updateEmployeeById(selectedEmployee.id, updatedEmployeeData);
      toast.success("Employee data updated successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error(
        `Save changes error: ${error.response?.data?.error || error.message}`
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployeeById(selectedEmployee.id);
      toast.success("Employee deleted successfully!");
      handleCloseModal();
      // Optionally refresh the employee list
      const updatedEmployees = await fetchAllEmployees();
      setEmployees(updatedEmployees);
    } catch (error) {
      toast.error("Error deleting employee.");
    }
  };
  const handleGoHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="admin-panel">
      <Button
        variant="primary"
        onClick={handleGoHome}
        style={{ position: "absolute", top: "15px", left: "90%", right: "5%" }} // Position the button on the left
      >
        Home
      </Button>
      <h1 style={{ textAlign: "center", top: "5%" }}>Admin Panel</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <Button onClick={() => handleEmployeeClick(employee)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing employee data */}
      {selectedEmployee && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="employee_id">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={selectedEmployee.id}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={selectedEmployee.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={selectedEmployee.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedEmployee.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  value={selectedEmployee.phone_number || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="date_of_birth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  value={
                    selectedEmployee.date_of_birth
                      ? selectedEmployee.date_of_birth.split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={selectedEmployee.gender || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={selectedEmployee.address || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={selectedEmployee.city || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={selectedEmployee.state || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={selectedEmployee.country || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="zip_code">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip_code"
                  value={selectedEmployee.zip_code || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={selectedEmployee.department || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="job_title">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="job_title"
                  value={selectedEmployee.job_title || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  value={selectedEmployee.salary || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group controlId="hire_date">
                <Form.Label>Hire Date</Form.Label>
                <Form.Control
                  type="date"
                  name="hire_date"
                  value={
                    selectedEmployee.hire_date
                      ? selectedEmployee.hire_date.split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button variant="success" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete Employee
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AdminPanel;
