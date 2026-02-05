import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LogDetails from "./components/LogDetails";
import LogTable from "./components/LogTable";
import Welcome from "./pages/Welcome";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/logs" element={<LogTable />} />
        <Route path="/logs/:id" element={<LogDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App