import React from "react";
import Header from "./components/common/header";
import "./App.css"; // Ensure App.css includes styles for background and overlay

const App = () => {
  return (
    <>
      <Header />
      {/* Background Image with Overlay and Content */}
      <div className="background-image">
        <div className="background-overlay"></div>

        <div className="content pt-15">
          <h1>Welcome to Employee Management System</h1>
          <p>Manage your employees efficiently and effectively.</p>
        </div>
      </div>
    </>
  );
};

export default App;
