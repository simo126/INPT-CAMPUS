import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
export const Report = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      if (authChecked) {
        setIsLoading(false);
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

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
          setLoggedInUser(null);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          if (import.meta.env.DEV) {
            console.warn("Auth check timed out");
          }
        } else if (import.meta.env.DEV) {
          console.error("Auth check failed:", error.message);
        }
        setLoggedInUser(null);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [authChecked]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issueType: "",
    priority: "medium",
  });

  const issueTypes = [
    { value: "plumbing", label: "Plumbing", icon: "🚰" },
    { value: "electrical", label: "Electrical", icon: "⚡" },
    { value: "heating", label: "Heating/AC", icon: "🌡️" },
    { value: "furniture", label: "Furniture", icon: "🪑" },
    { value: "cleaning", label: "Cleaning", icon: "🧽" },
    { value: "security", label: "Security", icon: "🔒" },
    { value: "noise", label: "Noise", icon: "🔊" },
    { value: "internet", label: "Internet/WiFi", icon: "📶" },
    { value: "other", label: "Other", icon: "⚠️" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-700" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-700",
    },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-700" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const issueDescription = {
      issueType: formData.issueType,
      issuePriority: formData.priority,
      description: formData.description,
    };
    const issue = {
      title: formData.title,
      description: JSON.stringify(issueDescription),
      roomId: loggedInUser.room.id,
      studentId: loggedInUser.id,
    };

    // eslint-disable-next-line no-unused-vars
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/issues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(issue),
      }
    );

    setSubmitted(true);
  };

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
  useEffect(() => {
    if (!isLoading && !loggedInUser) {
      navigate("/auth/login");
    }
  }, [isLoading, loggedInUser, navigate]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar
          isActive={true}
          user={loggedInUser}
          onLogout={handleLogout}
          isLoading={false}
        />

        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Report Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your issue has been reported and assigned ticket #IR-
              {Date.now().toString().slice(-6)}.
            </p>
            <p className="text-sm text-gray-500">
              Our maintenance team will review your report and get back to you
              soon.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (loggedInUser && loggedInUser.role === "ADMIN") {
    navigate("/");
  }
  if (!loggedInUser || Object.keys(loggedInUser.room ?? {}).length <= 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar
          isActive={true}
          user={loggedInUser}
          onLogout={handleLogout}
          isLoading={false}
        />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You Need a Room First
            </h2>
            <p className="text-gray-600 mb-8">
              You cannot report an issue and u dont have room{" "}
            </p>
            <button
              onClick={() => navigate("/reserve")}
              className="bg-[#3337BF] text-xs md:text-sm  w-full sm:w-[170px]  hover:bg-[#2a2eb5] transition text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Go to Reserve
            </button>
          </div>
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
        isLoading={false}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report an Issue
          </h1>
          <p className="text-gray-600">
            Having problems with your room? Let us know and we'll fix it as soon
            as possible.
          </p>
        </div>

        {/* Room Info Card */}
        {loggedInUser.room && Object.keys(loggedInUser.room).length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your Room Information
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Room Number
                </label>
                <p className="text-gray-900 font-medium">
                  {loggedInUser.room.roomNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Building
                </label>
                <p className="text-gray-900 font-medium">
                  {loggedInUser.room.building.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Floor
                </label>
                <p className="text-gray-900 font-medium">
                  Floor {loggedInUser.room.building.numFloors}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Report Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What type of issue are you experiencing?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {issueTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex items-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      formData.issueType === type.value
                        ? "border-[#3337BF] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="issueType"
                      value={type.value}
                      checked={formData.issueType === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-xl mr-2">{type.icon}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {type.label}
                    </span>
                    {formData.issueType === type.value && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#3337BF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {priorities.map((priority) => (
                  <label
                    key={priority.value}
                    className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      formData.priority === priority.value
                        ? "border-[#3337BF] bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={formData.priority === priority.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${priority.color}`}
                    >
                      {priority.label}
                    </span>
                    {formData.priority === priority.value && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#3337BF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
            {/* Issue Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Issue Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3337BF] focus:border-transparent"
              />
            </div>
            {/* Detailed Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Please provide as much detail as possible about the issue..."
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3337BF] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    issueType: "",
                    priority: "medium",
                    title: "",
                    description: "",
                    location: "",
                  })
                }
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.issueType ||
                  !formData.description ||
                  !formData.title
                }
                className="px-6 py-2 bg-[#3337BF] text-white rounded-lg hover:bg-[#2a2eb5] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Need Immediate Help?
          </h3>
          <p className="text-blue-800 text-sm mb-4">
            For urgent issues that require immediate attention (like water
            leaks, electrical hazards, or security concerns), please contact our
            emergency hotline:
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-blue-900 font-medium">
                Emergency: +212606929996
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
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
              <span className="text-blue-900 font-medium">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
