import { useMemo, useCallback } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdPreview } from "react-icons/md";
import { LuLogs } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  Stack,
  Pagination,
} from "@mui/material";
import { LogContext } from "../Context";

function LogsTable() {
  const context = useContext(LogContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { logs, setSelectedLog, userRole, setUserRole } = context;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const formatDate = useCallback(
    (timestamp: string) => new Date(timestamp).toLocaleDateString(),
    [],
  );

  const formatTime = useCallback(
    (timestamp: string) => new Date(timestamp).toLocaleTimeString(),
    [],
  );

  const handleView = useCallback(
    (logId: string) => {
      const log = logs.find((l) => l.id === logId);
      if (log) {
        setSelectedLog(log);
        navigate(`/logs/${log.id}`);
      }
    },
    [logs, navigate, setSelectedLog],
  );

  const tableHeaders = useMemo(
    () => userRole === "viewer" 
      ? ["Id", "Date", "Time", "Logs Level", "Source", "Message"]
      : ["Id", "Date", "Time", "Logs Level", "Source", "Message", "Action"],
    [userRole],
  );

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity.toUpperCase()) {
      case "ERROR":
        return "#dc2626";
      case "WARN":
        return "#ea580c";
      case "INFO":
        return "#0284c7";
      case "DEBUG":
        return "#6366f1";
      default:
        return "#475569";
    }
  }, []);

  const [filterValue, setFilterValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterClick = (severity: string) => {
    setFilterValue(severity);
    setCurrentPage(1);
  };

  const handleFilterClickResolved = (status: string) => {
    setFilterValue(status);
    setCurrentPage(1);
  };

  const handleFilterDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const formatToInputDate = useCallback((timestamp: string) => {
    const d = new Date(timestamp);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const filteredLogs = useMemo(() => {
    let items = logs;

    if (filterValue) {
      const lowerFilter = filterValue.toLowerCase();
      items = items.filter(
        (log) =>
          log.id.toLowerCase().includes(lowerFilter) ||
          log.source.toLowerCase().includes(lowerFilter) ||
          log.message.toLowerCase().includes(lowerFilter) ||
          log.severity.toLowerCase().includes(lowerFilter) ||
          log.type.toLowerCase().includes(lowerFilter) ||
          log.hostName.toLowerCase().includes(lowerFilter) ||
          log.ipAddress.toLowerCase().includes(lowerFilter) ||
          log.environment.toLowerCase().includes(lowerFilter) ||
          log.user?.toLowerCase().includes(lowerFilter) ||
          false ||
          log.module.toLowerCase().includes(lowerFilter) ||
          log.eventCode.toLowerCase().includes(lowerFilter) ||
          (filterValue.toUpperCase() === "RESOLVED" && log.resolved) ||
          (filterValue.toUpperCase() === "UNRESOLVED" && !log.resolved),
      );
    }

    if (selectedDate) {
      items = items.filter(
        (log) => formatToInputDate(log.timestamp) === selectedDate,
      );
    }

    return items;
  }, [filterValue, selectedDate, logs, formatToInputDate]);

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLogs.slice(startIndex, endIndex);
  }, [filteredLogs, currentPage, itemsPerPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleLogout = () => {
    setUserRole(null);
    navigate("/");
  };

  if (logs.length === 0) {
    return (
      <Box className="min-h-screen gradient-header p-6">
        <Box className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <span className="text-4xl">
              <LuLogs className="text-blue-400" />
            </span>
            No Logs Available
          </h1>
          <p className="text-blue-100 mt-2">
            There are currently no logs to display. Please check back later.
          </p>
        </Box>
      </Box>
    );
  }

  if (filteredLogs.length === 0 && filterValue) {
    return (
      <Box className="min-h-screen gradient-header p-6">
        <Box className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <span className="text-4xl">
              <LuLogs className="text-white" />
            </span>
            No Logs Found
          </h1>
          <Box
            sx={{
              mt: 2,
              fontWeight: 600,
              fontSize: { xs: "0.95rem", md: "1.125rem" },
              backgroundColor: "#fee2e2",
              color: "#0f172a",
              width: { xs: "100%", sm: "400px" },
              mx: "auto",
              p: 2,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Box component="span" sx={{ display: "block", wordBreak: "break-word" }}>
              No logs match the search term: "{filterValue}"
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" onClick={() => setFilterValue("")}>Clear Filter</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen gradient-header p-6">
      <Box className="max-w-7xl mx-auto">
        <Box className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Box className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-6">
            <Box className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-4xl">
                    <LuLogs className="text-white" />
                  </span>
                  IT System Logs Dashboard
                </h1>
                <p className="text-blue-100 mt-2">
                  Total Logs:{" "}
                  <span className="font-bold text-white">{logs.length}</span>
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#1e40af",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  "&:hover": { backgroundColor: "#f0f9ff" },
                }}
                endIcon={<FiLogOut />}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {userRole !== "viewer" && (
            <Box className="p-4 bg-gray-50 border-b border-gray-200">
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box className="flex-1 min-w-0 w-full">
                  <TextField
                    fullWidth
                    label="Search Logs"
                    placeholder="Type to search..."
                    variant="outlined"
                    value={filterValue}
                    onChange={handleSearch}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        "&:hover fieldset": {
                          borderColor: "#1e40af",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1e40af",
                        },
                      },
                    }}
                  />
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems="center"
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    justifyContent={{
                      xs: "flex-start",
                      sm: "flex-start",
                      md: "flex-start",
                    }}
                  >
                    <Button
                      sx={{
                        borderRadius: "20px",
                        height: 36,
                        minWidth: { xs: 72, sm: 84 },
                      }}
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleFilterClick("INFO")}
                    >
                      Info
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "20px",
                        height: 36,
                        minWidth: { xs: 72, sm: 84 },
                      }}
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleFilterClick("ERROR")}
                    >
                      Error
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "20px",
                        height: 36,
                        minWidth: { xs: 72, sm: 84 },
                      }}
                      size="small"
                      variant="contained"
                      onClick={() => handleFilterClick("WARN")}
                    >
                      Warning
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "20px",
                        height: 36,
                        minWidth: { xs: 84, sm: 96 },
                        backgroundColor: "#92b3b8",
                        color: "white",
                      }}
                      size="small"
                      variant="contained"
                      onClick={() => handleFilterClickResolved("UNRESOLVED")}
                    >
                      Unresolved
                    </Button>
                  </Stack>

                  <Box>
                    <input
                      type="date"
                      className="border p-2 rounded-md"
                      value={selectedDate}
                      onChange={handleFilterDate}
                      style={{ height: 36 }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          )}
          <TableContainer sx={{ overflowX: "auto" }}>
            {!isSmallScreen ? (
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                    {tableHeaders.map((head) => (
                      <TableCell
                        key={head}
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          color: "#1e293b",
                          fontSize: "0.95rem",
                          padding: "16px",
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedLogs.map((log, index) => (
                    <TableRow
                      key={log.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f8fafc" : "white",
                        "&:hover": {
                          backgroundColor: "#eff6ff",
                          transition: "background-color 0.2s ease",
                        },
                      }}
                    >
                      <TableCell align="center" sx={{ fontWeight: "500" }}>
                        {log.id}
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell align="center">
                        {formatTime(log.timestamp)}
                      </TableCell>
                      <TableCell align="center">
                        {(() => {
                          const color = getSeverityColor(log.severity);
                          return (
                            <span
                              className="severity-badge"
                              style={{
                                backgroundColor: color + "22",
                                color: color,
                                border: `1px solid ${color}`,
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                              }}
                            >
                              {log.severity}
                            </span>
                          );
                        })()}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "500" }}>
                        {log.source}
                      </TableCell>
                      <TableCell align="left" sx={{ maxWidth: "300px" }}>
                        <span
                          title={log.message}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                          }}
                        >
                          {log.message}
                        </span>
                      </TableCell>
                      {userRole !== "viewer" && (
                        <TableCell align="center">
                          <Button
                            onClick={() => handleView(log.id)}
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#0284c7",
                              "&:hover": { backgroundColor: "#0369a1" },
                              textTransform: "none",
                            }}
                            startIcon={<MdPreview />}
                          >
                            View
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Box sx={{ p: 2 }}>
                {paginatedLogs.map((log) => {
                  const color = getSeverityColor(log.severity);
                  return (
                    <Box
                      key={log.id}
                      sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                        backgroundColor: "white",
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{log.id}</div>
                          <div className="text-sm text-gray-600">
                            {formatDate(log.timestamp)} •{" "}
                            {formatTime(log.timestamp)}
                          </div>
                        </div>
                        <div>
                          <span
                            style={{
                              backgroundColor: color + "22",
                              color: color,
                              border: `1px solid ${color}`,
                              padding: "4px 10px",
                              borderRadius: 12,
                              fontWeight: 600,
                              textTransform: "uppercase",
                            }}
                          >
                            {log.severity}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium">
                        {log.source}
                      </div>
                      <div
                        className="mt-2 text-sm text-gray-700 truncate"
                        style={{ maxWidth: "100%" }}
                        title={log.message}
                      >
                        {log.message}
                      </div>
                      {userRole !== "viewer" && (
                        <div className="mt-3 flex justify-end">
                          <Button
                            onClick={() => handleView(log.id)}
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#0284c7",
                              "&:hover": { backgroundColor: "#0369a1" },
                              textTransform: "none",
                            }}
                            startIcon={<MdPreview />}
                          >
                            View
                          </Button>
                        </div>
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </TableContainer>

          {/* Pagination Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              py: 4,
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Box>
              <span className="text-gray-600 font-medium">
                Showing {filteredLogs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
              </span>
            </Box>
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LogsTable;
