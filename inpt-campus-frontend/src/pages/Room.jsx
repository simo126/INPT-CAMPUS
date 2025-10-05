import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";

export const Room = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          const user = await res.json();
          setLoggedInUser(user);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(
            "Auth check failed:",
            error.name === "AbortError" ? "Timeout" : error
          );
        }
        setLoggedInUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  return (
    <div>
      <NavBar isActive={true} />
      {loggedInUser && (
        <>
          <p>
            {loggedInUser.firstName} {loggedInUser.lastName}
          </p>
          <p>{loggedInUser.email}</p>
          <p>{loggedInUser.role}</p>
        </>
      )}
    </div>
  );
};
