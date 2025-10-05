import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      // Avoid double-checking auth on strict mode re-renders
      if (authChecked) {
        setIsLoading(false);
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            credentials: "include",
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (res.ok) {
          const user = await res.json();
          setLoggedInUser(user);
        } else if (res.status === 401) {
          // Expected when not logged in - no logging needed
          setLoggedInUser(null);
        } else {
          // Only log unexpected status codes in development
          if (import.meta.env.DEV) {
            console.warn("Unexpected auth response:", res.status);
          }
          setLoggedInUser(null);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
         
        setLoggedInUser(null);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [authChecked]);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        setLoggedInUser(null);
      } else {
        console.warn("Logout response:", res.status, res.statusText);
        // Still clear user state even if logout endpoint fails
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Logout network error:", error.message);
      // Clear user state even on network error
      setLoggedInUser(null);
    }
  };
  if (loggedInUser && loggedInUser.role === "ADMIN") {
    navigate("/");
  }
  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <NavBar
        isActive={true}
        user={loggedInUser}
        onLogout={handleLogout}
        isLoading={isLoading}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
