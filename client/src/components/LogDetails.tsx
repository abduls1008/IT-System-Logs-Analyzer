
import { useContext, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogContext } from "../Context";
import { Box, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import {
  FiSearch,
  FiClock,
  FiFile,
  FiTool,
  FiTag,
  FiServer,
  FiGlobe,
  FiRadio,
  FiActivity,
  FiZap,
  FiUser,
  FiCheck,
  FiLogOut,
} from "react-icons/fi";

const LogDetails = () => {
  const context = useContext(LogContext);
  const navigate = useNavigate();
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  if (!context) return null;

  const { selectedLog, userRole, setUserRole } = context;

  // Viewer role cannot access details
  if (userRole === "viewer") {
    return (
      <Box className="min-h-screen gradient-header flex items-center justify-center p-4">
        <Box className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            Your role (Viewer) does not have permission to view log details. You can only view the log table.
          </p>
          <Button
            onClick={() => navigate("/logs")}
            variant="contained"
            startIcon={<IoArrowBack />}
            sx={{
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#1e3a8a" },
            }}
          >
            Back to Logs
          </Button>
        </Box>
      </Box>
    );
  }

  if (!selectedLog) {
    return (
      <Box className="min-h-screen gradient-header flex items-center justify-center p-4">
        <Box className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Log Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select a log from the dashboard to view its details
          </p>
          <Button
            onClick={() => navigate("/logs")}
            variant="contained"
            startIcon={<IoArrowBack />}
            sx={{
              backgroundColor: "#1e40af",
              "&:hover": { backgroundColor: "#1e3a8a" },
            }}
          >
            Back to Logs
          </Button>
        </Box>
      </Box>
    );
  }

  const formattedDate = useMemo(() => new Date().toLocaleString(), []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity.toUpperCase()) {
      case "ERROR":
        return { bg: "#fee2e2", text: "#991b1b", border: "#dc2626" };
      case "WARN":
        return { bg: "#fef3c7", text: "#92400e", border: "#ea580c" };
      case "INFO":
        return { bg: "#dbeafe", text: "#0c4a6e", border: "#0284c7" };
      case "DEBUG":
        return { bg: "#e4e4f7", text: "#3f3f7f", border: "#6366f1" };
      default:
        return { bg: "#f1f5f9", text: "#1e293b", border: "#64748b" };
    }
  }, []);

  const severityStyle = getSeverityColor(selectedLog.severity);

  const handleOpenStatusDialog = () => {
    setOpenStatusDialog(true);
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleStatusUpdate = (newStatus: boolean) => {
    // Update the log status - in a real app, this would call an API
    selectedLog.resolved = newStatus;
    setOpenStatusDialog(false);
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate("/");
  };

  const DetailRow = ({ label, value, icon: Icon }: { label: string; value: string | boolean; icon?: React.ReactNode }) => (
    <Box className="flex items-center justify-between py-3 px-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
      <Box className="flex items-center gap-3 text-gray-700 font-medium">
        {Icon && <span className="text-blue-600 text-lg">{Icon}</span>}
        {label}
      </Box>
      <Box>
        {typeof value === "boolean" ? (
          <Chip
            label={value ? "Resolved" : "Unresolved"}
            color={value ? "success" : "error"}
            size="small"
            variant="outlined"
          />
        ) : (
          <span className="text-gray-800 font-semibold">{value}</span>
        )}
      </Box>
    </Box>
  );

  return (
    <Box className="min-h-screen gradient-header p-6">
      <Box className="max-w-4xl mx-auto">
        <Box className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <Button
            onClick={() => navigate("/logs")}
            variant="contained"
            startIcon={<IoArrowBack />}
            sx={{
              backgroundColor: "white",
              color: "#1e40af",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#f0f9ff" },
            }}
          >
            Back to Logs
          </Button>
          <span className="text-white text-sm font-medium flex items-center gap-2">
            <FiClock /> {formattedDate}
          </span>
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#1e40af",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#f0f9ff" },
            }}
            endIcon={<FiLogOut />}
          >
            Logout
          </Button>
        </Box>

        <Box className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Box className="flex items-start justify-between gap-4">
            <Box flex={1}>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Log #{selectedLog.id}
              </h1>
              <p className="text-gray-600 leading-relaxed">{selectedLog.message}</p>
            </Box>
            <Box
              sx={{
                backgroundColor: severityStyle.bg,
                border: `2px solid ${severityStyle.border}`,
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              <span
                style={{
                  color: severityStyle.text,
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                {selectedLog.severity}
              </span>
            </Box>
          </Box>
        </Box>
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Box className="bg-white rounded-lg shadow-md overflow-hidden">
            <Box className="bg-blue-600 text-white px-6 py-4">
              <h2 className="text-lg font-bold">Log Information</h2>
            </Box>
            <Box>
              <DetailRow label="ID" value={selectedLog.id} icon={<FiSearch />} />
              <DetailRow label="Timestamp" value={new Date(selectedLog.timestamp).toLocaleString()} icon={<FiClock />} />
              <DetailRow label="Type" value={selectedLog.type} icon={<FiFile />} />
              <DetailRow label="Module" value={selectedLog.module} icon={<FiTool />} />
              <DetailRow label="Event Code" value={selectedLog.eventCode} icon={<FiTag />} />
            </Box>
          </Box>
          <Box className="bg-white rounded-lg shadow-md overflow-hidden">
            <Box className="bg-cyan-600 text-white px-6 py-4">
              <h2 className="text-lg font-bold">System Information</h2>
            </Box>
            <Box>
              <DetailRow label="Host Name" value={selectedLog.hostName} icon={<FiServer />} />
              <DetailRow label="IP Address" value={selectedLog.ipAddress} icon={<FiGlobe />} />
              <DetailRow label="Source" value={selectedLog.source} icon={<FiRadio />} />
              <DetailRow label="Environment" value={selectedLog.environment} icon={<FiActivity />} />
              <DetailRow label="Duration (ms)" value={selectedLog.durationMs.toString()} icon={<FiZap />} />
            </Box>
          </Box>
          <Box className="bg-white rounded-lg shadow-md overflow-hidden">
            <Box className="bg-indigo-600 text-white px-6 py-4">
              <h2 className="text-lg font-bold">User Information</h2>
            </Box>
            <Box>
              <DetailRow label="User" value={selectedLog.user || "N/A"} icon={<FiUser />} />
              <Box className="flex items-center justify-between py-3 px-4 border-b border-gray-200 hover:bg-gray-50">
                <Box className="flex items-center gap-3 text-gray-700 font-medium">
                  <span className="text-blue-600 text-lg">{selectedLog.resolved ? <FiCheck className="text-green-600" /> : <FiTag className="text-orange-600" />}</span>
                  Status
                </Box>
                <Box className="flex items-center gap-3">
                  <Chip
                    label={selectedLog.resolved ? "Resolved" : "Unresolved"}
                    color={selectedLog.resolved ? "success" : "error"}
                    size="small"
                    variant="outlined"
                  />
                  {userRole === "admin" && (
                    <Button
                      onClick={handleOpenStatusDialog}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "#1e40af",
                        "&:hover": { backgroundColor: "#1e3a8a" },
                        textTransform: "none",
                        fontSize: "0.875rem",
                      }}
                    >
                      Update
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Status Update Dialog */}
        <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            Update Log Status
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Box sx={{ mb: 2 }}>
              <p className="text-gray-700 mb-4">
                Current Status: <strong>{selectedLog.resolved ? "Resolved" : "Unresolved"}</strong>
              </p>
              <p className="text-gray-600 text-sm">
                Select the new status for this log:
              </p>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => handleStatusUpdate(false)}
                variant={selectedLog.resolved === false ? "contained" : "outlined"}
                color="error"
                fullWidth
                sx={{
                  fontWeight: "bold",
                }}
              >
                Mark as Unresolved
              </Button>
              <Button
                onClick={() => handleStatusUpdate(true)}
                variant={selectedLog.resolved === true ? "contained" : "outlined"}
                color="success"
                fullWidth
                sx={{
                  fontWeight: "bold",
                }}
              >
                Mark as Resolved
              </Button>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseStatusDialog}
              sx={{
                color: "#1e40af",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LogDetails;
