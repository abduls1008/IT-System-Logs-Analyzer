import { useMemo, useCallback } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdPreview } from "react-icons/md";
import { LuLogs } from "react-icons/lu";
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
} from "@mui/material";
import { LogContext } from "../Context";

function LogsTable() {
  const context = useContext(LogContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { logs, setSelectedLog } = context;

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
    () => ["Id", "Date", "Time", "Logs Level", "Source", "Message", "Action"],
    [],
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleFilterClick = (severity: string) => {
    setFilterValue(severity);
  };

  const handleFilterClickResolved = (status: string) => {
    setFilterValue(status);
  };

  const handleFilterDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
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
          (filterValue.toUpperCase() === "UNRESOLVED" && !log.resolved)
      );
    }

    if (selectedDate) {
      items = items.filter((log) => formatToInputDate(log.timestamp) === selectedDate);
    }

    return items;
  }, [filterValue, selectedDate, logs, formatToInputDate]);

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
          <p className="text-blue-900 mt-2 font-semibold text-lg bg-red-100 w-[400px] mx-auto p-4 rounded-lg">
            No logs match the search term: "{filterValue}"
            <Button
              sx={{ ml: 2, marginTop: 2 }}
              variant="outlined"
              onClick={() => setFilterValue("")}
            >
              Clear Filter
            </Button>
          </p>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen gradient-header p-6">
      <Box className="max-w-7xl mx-auto">
        <Box className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Box className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-6">
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
          </Box>

          <Box className="p-4 bg-gray-50 border-b border-gray-200">
            <TextField
              fullWidth
              label="Search Logs (ID, Source, Message, Type, Host, IP, Environment, Module, Event Code)"
              placeholder="Type to search..."
              variant="outlined"
              value={filterValue}
              onChange={handleSearch}
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
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <Button
                sx={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "100px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                }}
                size="medium"
                variant="contained"
                onClick={() => handleFilterClick("INFO")}
              >
                Info
              </Button>
              <Button
                sx={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "100px",
                  backgroundColor: "#ef4444",
                  color: "white",
                }}
                size="medium"
                variant="contained"
                onClick={() => handleFilterClick("ERROR")}
              >
                Error
              </Button>
              <Button
                sx={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "100px",
                  backgroundColor: "#f59e0b",
                  color: "white",
                }}
                size="medium"
                variant="contained"
                onClick={() => handleFilterClick("WARN")}
              >
                Warning
              </Button>
              <Button
                sx={{
                  borderRadius: "20px",
                  height: "30px",
                  width: "120px",
                  backgroundColor: "#92b3b8",
                  color: "white",
                }}
                size="medium"
                variant="contained"
                onClick={() => handleFilterClickResolved("UNRESOLVED")}
              >
                Unresolved
              </Button>
            </div>
            <div className="pt-2">
              <input type="date" className="border p-2 rounded-md mb-4" onChange={handleFilterDate} />
            </div>
          </div>
          <TableContainer>
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
                {filteredLogs.map((log, index) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default LogsTable;
