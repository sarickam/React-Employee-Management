import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, fetchUserProfile } from "../../api";
import { Form, Button, Container } from "react-bootstrap";
import Header from "../common/header";
import { toast } from "react-toastify";
import "../../assets/css/common.css";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
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
    {error && (
      <p className="text-danger" aria-live="polite">
        {error}
      </p>
    )}
    <Button variant="primary" type="submit">
      Login
    </Button>
  </Form>
);

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const { token, refreshToken } = await loginUser(username, password);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("loginTime", new Date().getTime());

      const profileResponse = await fetchUserProfile();
      const userProfile = profileResponse || {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
      };

      localStorage.setItem(
        "userName",
        `${userProfile.first_name || ""} ${userProfile.last_name || ""}`
      );

      toast.success("Login successful!");
      setUsername(""); // Clear the form after successful login
      setPassword(""); // Clear the form after successful login
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2>Login</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </Container>
    </>
  );
};

export default LoginPage;
