import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { Reserve } from "./pages/Reserve";
import { Report } from "./pages/Report";
import { Profile } from "./pages/Profile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reserve" element={<Reserve />} />
      <Route path="/report" element={<Report />} />
      <Route path="/profile" element={<Profile />} />
      {/* Auth routes using Layout */}
      <Route path="/auth" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      {/* Catch-all 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
