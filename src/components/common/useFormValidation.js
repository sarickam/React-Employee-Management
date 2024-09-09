// hooks/useFormValidation.js
import { useState } from "react";

export default function useFormValidation() {
    const [errors, setErrors] = useState({});

    const validateForm = (fields) => {
        const newErrors = {};

        // Add your validation rules here
        if (!fields.first_name) newErrors.first_name = "First Name is required";
        if (!fields.email) newErrors.email = "Email is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e, setFields) => {
        setFields((prevFields) => ({
            ...prevFields,
            [e.target.name]: e.target.value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
    };

    return { errors, validateForm, handleInputChange };
}
