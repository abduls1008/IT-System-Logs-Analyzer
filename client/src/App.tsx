import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { LogContext } from "./Context";
import LogDetails from "./components/LogDetails";
import LogTable from "./components/LogTable";
import Welcome from "./pages/Welcome";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(LogContext);
  
  if (!context) return null;
  
  const { userRole } = context;
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/logs" element={<ProtectedRoute><LogTable /></ProtectedRoute>} />
        <Route path="/logs/:id" element={<ProtectedRoute><LogDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App