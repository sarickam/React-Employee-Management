// components/FormDetails.js
import { formatDateString, parseFormDate } from "../common/utils/dateUtils";
import Form from "react-bootstrap/Form";

// Define which fields are editable
export const editableFields = [
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "date_of_birth",
    "gender",
    "address",
    "city",
    "state",
    "country",
    "zip_code",
    "department",
    "job_title",
    "salary",
    "hire_date"
];


export const isFieldEditable = (fieldName, isEditing, hireDate) => {
    if (fieldName === "hire_date") {
        return isEditing && !hireDate;
    }
    return isEditing;
};

// Helper function to format date fields
export const formatFormData = (data) => {
    return {
        ...data,
        date_of_birth: formatDateString(data.date_of_birth),
        hire_date: formatDateString(data.hire_date),
    };
};

export const parseFormData = (data) => {
    return {
        ...data,
        date_of_birth: parseFormDate(data.date_of_birth),
        hire_date: parseFormDate(data.hire_date),
    };
};

const FormFields = ({ fields, errors, isEditing, handleChange, hireDate }) => {
    return (
        <>
            {Object.keys(fields).map((key) => {
                if (!editableFields.includes(key)) {
                    return null; // Skip fields that are not editable
                }

                // Determine if the field is editable
                const editable = isFieldEditable(key, isEditing, hireDate);

                return (
                    <Form.Group key={key} controlId={key}>
                        <Form.Label>{key.replace("_", " ").toUpperCase()}</Form.Label>
                        <Form.Control
                            type="text"
                            name={key}
                            value={fields[key]}
                            onChange={handleChange}
                            disabled={!editable}
                            isInvalid={!!errors[key]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[key]}
                        </Form.Control.Feedback>
                    </Form.Group>
                );
            })}
        </>
    );
};

export default FormFields;
