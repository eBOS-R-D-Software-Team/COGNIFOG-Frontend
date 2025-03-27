import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import Card from "../components/Card";
import { FaChartBar, FaNetworkWired, FaClipboardList, FaDesktop } from "react-icons/fa";
import "../design/Home.css"; // Import custom CSS

const Home = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>
      <div className="card-grid">
        <Card icon={<FaNetworkWired />} title="Model Visualisation" onClick={() => navigate("/model-visualisation")} />
        <Card
  icon={<FaChartBar />}
  title="Data Visualisation"
  onClick={() =>
    window.open(
      "https://cognifog.kentyou.com/eye/ui/dashboard",
      "_blank",
      "noopener,noreferrer"
    )
  }
/>
       <Card icon={<FaDesktop />} title="Monitoring" onClick={() => navigate("/monitoring-manager")} />
        <Card icon={<FaClipboardList />} title="Service Request" onClick={() => navigate("/service-request")} />
        <Card icon={<FaClipboardList />} title="Reports" onClick={() => navigate("/reports")} />
      </div>
    </div>
  );
};

export default Home;
