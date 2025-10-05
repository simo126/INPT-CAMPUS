import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      setLoggedInUser(null);

      if (!res.ok) {
        console.warn("Logout response:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("Logout network error:", error);
      setLoggedInUser(null);
    }
  };

  const handleRemoveIssue = (issueId) => {
    setIssues((prevIssues) =>
      prevIssues.filter((issue) => issue.id !== issueId)
    );
  };

  const parseIssueDescription = (description) => {
    try {
      const parsed = JSON.parse(description);
      return {
        issueType: parsed.issueType || "Unknown",
        issuePriority: parsed.issuePriority || parsed.priority || "medium",
        description: parsed.description || "No description provided",
      };
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return {
        issueType: "other",
        issuePriority: "medium",
        description: description,
      };
    }
  };

  const getIssueTypeIcon = (issueType) => {
    const icons = {
      plumbing: "🚰",
      electrical: "⚡",
      heating: "🌡️",
      furniture: "🪑",
      cleaning: "🧽",
      security: "🔒",
      noise: "🔊",
      internet: "📶",
      other: "⚠️",
    };
    return icons[issueType] || icons.other;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-orange-100 text-orange-700",
      urgent: "bg-red-100 text-red-700",
    };
    return colors[priority] || colors.medium;
  };
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
    const fetchIssues = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/issues/my`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();

          setIssues(Array.isArray(data) ? data : data.content || []);
        }
      } catch (err) {
        console.error("Failed to fetch issues:", err);
      }
    };
    checkAuth();
    fetchIssues();
  }, []);

  useEffect(() => {
    if (!isLoading && !loggedInUser) {
      navigate("/");
    }
  }, [isLoading, loggedInUser, navigate]);
  if (loggedInUser && loggedInUser.role === "ADMIN") {
    navigate("/");
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-[#3337BF] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">
            Loading your profile...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        isActive={true}
        user={loggedInUser}
        onLogout={handleLogout}
        isLoading={isLoading}
      />

      {loggedInUser && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-[#3337BF] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {loggedInUser.firstName?.charAt(0).toUpperCase()}
                {loggedInUser.lastName?.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {loggedInUser.firstName} {loggedInUser.lastName}
                </h1>
                <p className="text-gray-600 text-lg mb-1">
                  {loggedInUser.email}
                </p>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loggedInUser.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {loggedInUser.role}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      loggedInUser.gender === "FEMALE"
                        ? "bg-pink-100 text-pink-700"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {loggedInUser.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Academic Information
                </h2>
              </div>

              <div className="space-y-4">
                {loggedInUser.filiere && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Program
                    </label>
                    <p className="text-gray-900 font-medium">
                      {loggedInUser.filiere.name}
                    </p>
                    {loggedInUser.filiere.code && (
                      <p className="text-sm text-gray-600">
                        {loggedInUser.filiere.code}
                      </p>
                    )}
                  </div>
                )}

                {loggedInUser.currentStudyYear && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Study Year
                    </label>
                    <p className="text-gray-900 font-medium">
                      {loggedInUser.currentStudyYear}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Student ID
                  </label>
                  <p className="text-gray-900 font-medium">
                    #{loggedInUser.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Housing Information
                </h2>
              </div>

              <div className="space-y-4">
                {loggedInUser.room?.roomNumber ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Room Number
                      </label>
                      <p className="text-gray-900 font-medium">
                        {loggedInUser.room.roomNumber}
                      </p>
                    </div>

                    {loggedInUser.room.buildingName && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                          Building
                        </label>
                        <p className="text-gray-900 font-medium">
                          {loggedInUser.room.buildingName}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-green-700 text-sm font-medium">
                        Room Assigned
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 mb-4">No room assigned yet</p>
                    <button
                      onClick={() => navigate("/reserve")}
                      className="bg-[#3337BF] text-white px-4 py-2 rounded-lg hover:bg-[#2a2eb5] transition-colors duration-200 text-sm font-medium"
                    >
                      Reserve a Room
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Issues Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                My Reported Issues
              </h2>
            </div>

            {issues.length > 0 ? (
              <div className="space-y-4">
                {issues.map((issue) => {
                  const parsedIssue = parseIssueDescription(issue.description);
                  return (
                    <div
                      key={issue.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {getIssueTypeIcon(parsedIssue.issueType)}
                          </span>
                          <h3 className="text-lg font-medium text-gray-900">
                            {issue.title}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              issue.resolved
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {issue.resolved ? "Resolved" : "Pending"}
                          </span>
                          <button
                            onClick={() => handleRemoveIssue(issue.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-xs font-medium flex items-center"
                          >
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Type: {parsedIssue.issueType}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            parsedIssue.issuePriority
                          )}`}
                        >
                          {parsedIssue.issuePriority.charAt(0).toUpperCase() +
                            parsedIssue.issuePriority.slice(1)}{" "}
                          Priority
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {parsedIssue.description}
                      </p>

                      <div className="flex items-center text-xs text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Reported on{" "}
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No issues reported yet</p>
                <button
                  onClick={() => navigate("/report")}
                  className="bg-[#3337BF] text-white px-4 py-2 rounded-lg hover:bg-[#2a2eb5] transition-colors duration-200 text-sm font-medium"
                >
                  Report an Issue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
