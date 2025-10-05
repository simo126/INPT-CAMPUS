import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Register = () => {
  const [filiers, setFiliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    filiereId: 1,
    gender: "MALE",
    currentStudyYear: 2023,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "filiereId" || name === "currentStudyYear"
          ? Number(value)
          : value,
    }));
    if (error) setError("");
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/filieres`)
      .then((res) => res.json())
      .then((data) => {
        setFiliers(data);
      })
      .catch((err) => console.error("Error fetching filieres:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to register");
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Form Section */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600">
                    Join INPTCampus and start managing your campus life
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters.
                    </p>
                  </div>

                  {/* Filiere */}
                  <div>
                    <label
                      htmlFor="filiereId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Field of Study (Filière)
                    </label>
                    <select
                      id="filiereId"
                      name="filiereId"
                      value={formData.filiereId}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                    >
                      {filiers.map((filiere) => (
                        <option key={filiere.id} value={filiere.id}>
                          {filiere.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Study Year & Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="currentStudyYear"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Study Year
                      </label>
                      <select
                        id="currentStudyYear"
                        name="currentStudyYear"
                        value={formData.currentStudyYear}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                      >
                        <option value={2023}>1st Year (INE1)</option>
                        <option value={2024}>2nd Year (INE2)</option>
                        <option value={2025}>3rd Year (INE3)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 text-gray-900"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#3337BF] text-white py-4 px-4 rounded-2xl hover:bg-[#2a2eb5] focus:outline-none focus:ring-2 focus:ring-[#3337BF] transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creating Account..." : "Create an account"}
                  </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-[#3337BF] hover:text-[#2a2eb5] font-medium hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="hidden lg:flex lg:flex-1 bg-white items-center justify-center p-12">
              <div className="max-w-md text-center">
                <img
                  src="/login-register.png"
                  alt="INPT Campus Registration"
                  className="w-full h-auto max-w-sm mx-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Join INPTCampus
                </h3>
                <p className="text-gray-600">
                  Start your journey with seamless campus life management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
