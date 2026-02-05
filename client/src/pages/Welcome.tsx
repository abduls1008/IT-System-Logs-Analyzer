import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { GiServerRack } from "react-icons/gi";
import { FaCrown, FaTools, FaEye } from "react-icons/fa";
import { useContext } from "react";
import { LogContext } from "../Context";

function Welcome() {
  const navigate = useNavigate();
  const context = useContext(LogContext);

  if (!context) return null;

  const { userRole, setUserRole } = context;

  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: FaCrown,
      description: "Full system access and control",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      hoverColor: "hover:shadow-red-200",
    },
    {
      id: "operator",
      label: "Operator",
      icon: FaTools,
      description: "Manage and monitor systems",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      hoverColor: "hover:shadow-blue-200",
    },
    {
      id: "viewer",
      label: "Viewer",
      icon: FaEye,
      description: "View logs and reports only",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      hoverColor: "hover:shadow-green-200",
    },
  ];

  const handleAccessLogs = () => {
    if (userRole) {
      navigate("/logs");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
      <div className="w-full max-w-2xl h-screen max-h-[100vh] flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6">
          <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center">
            <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-2xl">
              <GiServerRack className="text-3xl sm:text-4xl md:text-5xl text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-purple-900 mb-1 sm:mb-2">
            IT System Log Analyzer
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-0.5 sm:mb-1 max-w-xl mx-auto px-2">
            Monitor, analyze, and manage your system logs with ease.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto italic px-2">
            Real-time insights into your IT infrastructure.
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 mb-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-800 mb-3 sm:mb-4">
            Choose Your Role to Get Started
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            {roles.map((role) => {
              const IconComponent = role.icon;
              const isSelected = userRole === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => setUserRole(role.id as "admin" | "operator" | "viewer")}
                  className={`cursor-pointer transform transition-all duration-300 ${
                    isSelected ? "scale-105" : "scale-100 hover:scale-102"
                  }`}
                >
                  <div
                    className={`${
                      isSelected
                        ? "ring-4 ring-offset-2 ring-purple-500"
                        : "ring-2 ring-offset-0"
                    } ${role.borderColor} ${role.bgColor} rounded-xl p-3 sm:p-4 md:p-4 h-full shadow-lg transition-all duration-300 ${role.hoverColor} ${
                      isSelected ? "shadow-2xl" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex justify-center mb-1.5 sm:mb-2 text-2xl sm:text-3xl bg-gradient-to-br ${role.color} text-white p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 mx-auto items-center justify-center shadow-lg`}
                    >
                      <IconComponent />
                    </div>

                    {/* Label */}
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1 text-center">
                      {role.label}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center text-xs mb-1.5 sm:mb-2">
                      {role.description}
                    </p>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="flex justify-center">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Selected
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Access Button */}
        <div className="flex justify-center flex-shrink-0">
          <Button
            onClick={handleAccessLogs}
            disabled={!userRole}
            sx={{
              background: userRole
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "#d1d5db",
              color: "#ffffff",
              fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
              fontWeight: "bold",
              padding: { xs: "10px 32px", sm: "11px 40px", md: "12px 48px" },
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: userRole
                ? "0 15px 40px rgba(102, 126, 234, 0.4)"
                : "none",
              "&:hover": userRole
                ? {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 50px rgba(102, 126, 234, 0.6)",
                  }
                : {},
              transition: "all 0.3s ease",
              cursor: userRole ? "pointer" : "not-allowed",
            }}
            variant="contained"
            size="large"
          >
            {userRole ? "Access Log Table →" : "Select a Role to Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
