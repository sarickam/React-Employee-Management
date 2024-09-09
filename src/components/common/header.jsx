import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { logoutUser, fetchUserProfile } from "../../api";
import { toast } from "react-toastify";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("profilePicture");
      setIsLoggedIn(false);
      setUserName("");

      // Show success toast
      toast.info("Logged out successfully!");

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const updateUserName = async () => {
    try {
      const profile = await fetchUserProfile();
      setUserName(profile.first_name + " " + profile.last_name);
      localStorage.setItem(
        "userName",
        profile.first_name + " " + profile.last_name
      );
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const loginTime = localStorage.getItem("loginTime");
    const currentTime = new Date().getTime();
    const sessionDuration = 5 * 60 * 1000; // 5 minutes

    if (token && loginTime && currentTime - loginTime < sessionDuration) {
      setIsLoggedIn(true);
      updateUserName();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Navbar bg="secondary" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/">Employee Management System</Navbar.Brand>
        <Nav className="ml-auto nav">
          <Nav.Item>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/about-us" className="nav-link">
              About Us
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/contact-us" className="nav-link">
              Contact Us
            </Link>
          </Nav.Item>
        </Nav>
        <Nav className="ml-auto">
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <Button variant="primary" className="me-2 btn-nav">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="success" className="btn-nav">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <>
              <span className="navbar-text text-white me-2">{userName}</span>
              <Link to="/profile">
                <Button variant="info" className="me-2">
                  Profile
                </Button>
              </Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
