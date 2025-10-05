import { NavBar } from "../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoomSelection } from "../components/RoomSelection";
import { StudentSelection } from "../components/StudentSelection";

export const Reserve = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]); // Changed to array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/students/available`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();

          setStudents(data);
        } else {
          console.warn("Failed to fetch students:", res.status);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const checkAuth = async () => {
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

    fetchStudents();
    checkAuth();
  }, []);

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

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleStudentSelect = (students) => {
    setSelectedStudents(students); // Now receives array of students
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReservation = async () => {
    if (!selectedRoom) {
      alert("Please select a room");
      return;
    }

    if (!loggedInUser || !loggedInUser.id) {
      alert("User authentication error. Please log in again.");
      return;
    }

    try {
      const reservationData = {
        studentId: loggedInUser.id,
        roomId: selectedRoom.id,
        roommateEmails: selectedStudents.map((student) => student.email),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/students/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        let result;

        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          // eslint-disable-next-line no-unused-vars
          result = await response.text();
        }

        alert("Reservation created successfully!");

        setCurrentStep(1);
        setSelectedRoom(null);
        setSelectedStudents([]);

        // navigate("/profile");
      } else {
        const errorData = await response.text();
        console.error("Reservation failed:", response.status, errorData);
        alert(`Failed to create reservation: ${errorData || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert(
        "Failed to create reservation. Please check your connection and try again."
      );
    }
  };
  if (loggedInUser && loggedInUser.role === "ADMIN") {
    navigate("/");
  }
  if (loggedInUser && loggedInUser.room && loggedInUser.room.roomNumber) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar
          isActive={true}
          user={loggedInUser}
          onLogout={handleLogout}
          isLoading={isLoading}
        />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You Already Have a Room
            </h2>
            <p className="text-gray-600 mb-8">
              You cannot reserve another room since you are already assigned to{" "}
              <span className="font-semibold">{loggedInUser.roomNumber}</span>.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-[#3337BF] text-xs md:text-sm  w-full sm:w-[170px]  hover:bg-[#2a2eb5] transition text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Go to HomePage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!loggedInUser && !isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar
          isActive={true}
          user={loggedInUser}
          onLogout={handleLogout}
          isLoading={isLoading}
        />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Please Log In
            </h2>
            <p className="text-gray-600 mb-8">
              You need to be logged in to make a reservation.
            </p>
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#3337BF] text-xs md:text-sm  w-full sm:w-[170px]  hover:bg-[#2a2eb5] transition text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar
        isActive={true}
        user={loggedInUser}
        onLogout={handleLogout}
        isLoading={isLoading}
      />

      {/* Progress Bar */}
      <div className="bg-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= step
                      ? "bg-[#3337BF] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <div className="ml-3 mr-6">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step ? "text-[#3337BF]" : "text-gray-500"
                    }`}
                  >
                    {step === 1 && "Select Room"}
                    {step === 2 && "Choose Roommate"}
                    {step === 3 && "Confirm Reservation"}
                  </p>
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      currentStep > step ? "bg-[#3337BF]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <RoomSelection
          onRoomSelect={handleRoomSelect}
          selectedRoom={selectedRoom}
          loggedInUser={loggedInUser}
        />
      )}

      {currentStep === 2 && (
        <StudentSelection
          students={students}
          onStudentSelect={handleStudentSelect}
          selectedStudents={selectedStudents}
          selectedRoom={selectedRoom}
          currentUser={loggedInUser}
        />
      )}

      {currentStep === 3 && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Confirm Your Reservation
            </h1>
            <p className="text-gray-600">
              Review your selection and confirm your reservation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Selected Room */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Selected Room
              </h3>
              {selectedRoom ? (
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Room Number:</span>{" "}
                    {selectedRoom.roomNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Building:</span>{" "}
                    {selectedRoom.buildingName}
                  </p>
                </div>
              ) : (
                <p className="text-red-500 text-sm">No room selected</p>
              )}
            </div>

            {/* Selected Roommates */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Selected Roommates ({selectedStudents.length})
              </h3>
              {selectedStudents.length > 0 ? (
                <div className="space-y-4">
                  {selectedStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className="border-b border-gray-100 pb-3 last:border-b-0"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-[#3337BF] rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
                          {index + 1}
                        </div>
                        <p className="text-sm font-medium">
                          {student.firstName} {student.lastName}
                        </p>
                      </div>
                      <div className="ml-8 space-y-1">
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Program:</span>{" "}
                          {student.filiere.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Year:</span>{" "}
                          {student.currentStudyYear}
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Email:</span>{" "}
                          {student.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-2">
                    No roommates selected
                  </p>
                  <p className="text-xs text-gray-400">
                    You can reserve a room by yourself or with roommates
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReservation}
              disabled={!selectedRoom}
              className="bg-[#3337BF] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2a2eb5] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 3 && (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && !selectedRoom}
              className="bg-[#3337BF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a2eb5] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
