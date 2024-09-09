import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../../api";
import { Form, Button, Container } from "react-bootstrap";
import Header from "../common/header";
import { toast } from "react-toastify";
import "../../assets/css/common.css";

const SignupForm = ({
  username,
  password,
  confirmPassword,
  setUsername,
  setPassword,
  setConfirmPassword,
  handleSubmit,
  error,
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="Username"
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Password"
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        aria-label="Confirm Password"
        required
      />
    </Form.Group>
    {error && (
      <p className="text-danger" aria-live="polite">
        {error}
      </p>
    )}
    <Button variant="primary" type="submit">
      Sign Up
    </Button>
  </Form>
);

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signupUser(username, password);
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2>Sign Up</h2>
        <SignupForm
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          setUsername={setUsername}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </Container>
    </>
  );
};

export default SignupPage;
