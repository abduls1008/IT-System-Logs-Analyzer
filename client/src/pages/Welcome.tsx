import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { GiServerRack } from "react-icons/gi";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen gradient-header flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-white rounded-full shadow-lg">
            <GiServerRack className="text-5xl text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          IT System Log Analyzer
        </h1>
        <p className="text-xl text-blue-700 mb-8 max-w-lg mx-auto italic">
          Monitor, analyze, and manage your system logs with ease. Real-time
          insights into your IT infrastructure.
        </p>
        <Button
          onClick={() => navigate("/logs")}
          sx={{
            backgroundColor: "#ffffff",
            color: "#1e40af",
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: "12px 48px",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f0f9ff",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            },
            transition: "all 0.3s ease",
          }}
          variant="contained"
          size="large"
        >
          View Logs →
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
