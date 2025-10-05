import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { NavBar } from "../components/NavBar";
import { NewsLetter } from "../components/NewsLetter";
import { OurBenefits } from "../components/OurBenefits";
import { TwoButtons } from "../components/TwoButtons";
import { DashBoard } from "../components/DashBoard";
import axios from "axios";

export const HomePage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        setLoggedInUser(res.data);
      } catch (error) {
        console.error("Unexpected auth check error:", error);
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      if (res.status === 200) {
        setLoggedInUser(null);
      } else {
        console.warn("Logout response:", res.status, res.statusText);
        setLoggedInUser(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Logout Axios error:", error.message);
      } else {
        console.error("Logout unexpected error:", error);
      }
      setLoggedInUser(null);
    }
  };
  const AuthenticatedNavBar = () => (
    <NavBar
      isActive={false}
      user={loggedInUser}
      onLogout={handleLogout}
      isLoading={isLoading}
    />
  );

  if (loggedInUser && loggedInUser.role === "ADMIN") {
    return (
      <>
        <NavBar
          isActive={true}
          admin={true}
          user={loggedInUser}
          isLoading={isLoading}
          onLogout={handleLogout}
        />
        <DashBoard />
      </>
    );
  }
  return (
    <div>
      <Hero NavBar={AuthenticatedNavBar} />
      <TwoButtons />
      <OurBenefits />
      <NewsLetter />
      <Footer />
    </div>
  );
};
