import { useState } from "react";

export const StudentSelection = ({
  students = [],
  onStudentSelect,
  selectedStudents = [], // Changed from selectedStudent to selectedStudents array
  selectedRoom, // Add selectedRoom to get capacity info
  currentUser,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const defaultStudents = [
    {
      id: 1,
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@campus.com",
      gender: "MALE",
      currentStudyYear: 3,
      reservationStatus: false,
      active: true,
      filiere: {
        id: 1,
        name: "Computer Science",
      },
      roomNumber: null,
      roomId: null,
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Chen",
      email: "sarah.chen@campus.com",
      gender: "FEMALE",
      currentStudyYear: 2,
      reservationStatus: false,
      active: true,
      filiere: {
        id: 2,
        name: "Business Administration",
      },
      roomNumber: null,
      roomId: null,
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Rodriguez",
      email: "mike.rodriguez@campus.com",
      gender: "MALE",
      currentStudyYear: 4,
      reservationStatus: false,
      active: true,
      filiere: {
        id: 3,
        name: "Engineering",
      },
      roomNumber: null,
      roomId: null,
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@campus.com",
      gender: "FEMALE",
      currentStudyYear: 1,
      reservationStatus: false,
      active: true,
      filiere: {
        id: 4,
        name: "Art & Design",
      },
      roomNumber: null,
      roomId: null,
    },
  ];

  const studentsToUse = students.length > 0 ? students : defaultStudents;

  const filteredStudents = searchTerm.trim()
    ? studentsToUse.filter(
        (student) =>
          student.email !== currentUser?.email &&
          student.gender === currentUser?.gender &&
          (student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.filiere.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleStudentSelect = (student) => {
    const isSelected = selectedStudents.some((s) => s.id === student.id);

    if (isSelected) {
      // Remove student if already selected
      const updatedStudents = selectedStudents.filter(
        (s) => s.id !== student.id
      );
      onStudentSelect(updatedStudents);
    } else {
      // Add student if not selected and room has capacity
      const roomCapacity = selectedRoom?.roomType === "QUADRUPLE" ? 4 : 2 || 2; // Default to 2 if no capacity specified
      const maxRoommates = roomCapacity - 1; // Subtract 1 for the current user

      if (selectedStudents.length < maxRoommates) {
        const updatedStudents = [...selectedStudents, student];
        onStudentSelect(updatedStudents);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Find Your Perfect Roommate
          </h1>
          <p className="text-gray-600 mb-6">
            Search for compatible roommates based on your study program and
            preferences
          </p>

          {/* Search Box */}
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, program, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3337BF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Selected Students Display */}
        {selectedStudents.length > 0 && (
          <div className="mb-6 flex justify-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl w-full">
              <div className="text-center mb-3">
                <div className="text-green-600 mb-1">
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-green-800 mb-1">
                  {selectedStudents.length} Roommate
                  {selectedStudents.length > 1 ? "s" : ""} Selected
                </h3>
                <p className="text-xs text-green-600">
                  Room capacity:{" "}
                  {selectedRoom?.roomType === "QUADRUPLE" ? 4 : 2 || 2} (
                  {(selectedRoom?.roomType === "QUADRUPLE" ? 4 : 2 || 2) -
                    1 -
                    selectedStudents.length}{" "}
                  spots remaining)
                </p>
              </div>
              <div className="space-y-2">
                {selectedStudents.map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between bg-white rounded p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-green-700">
                        {student.firstName} {student.lastName}
                      </span>
                      <span className="text-xs text-green-600">
                        ({student.filiere.name})
                      </span>
                    </div>
                    <button
                      onClick={() => handleStudentSelect(student)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Prompt - Show when no search term */}
        {!searchTerm.trim() && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Find Your Roommates (Optional)
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto text-sm">
              You can reserve a room by yourself or search for compatible
              roommates. Room capacity:{" "}
              {selectedRoom?.roomType === "QUADRUPLE" ? 4 : 2 || 2} people (you
              + {(selectedRoom?.roomType === "QUADRUPLE" ? 4 : 2 || 2) - 1}{" "}
              roommates max)
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                Try: "Computer Science"
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                Try: "Engineering"
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                Try: "Alex"
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                Try: "Art"
              </span>
            </div>
          </div>
        )}

        {/* Students Grid - Only show when there are results */}
        {filteredStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredStudents.map((student) => {
              const isSelected = selectedStudents.some(
                (s) => s.id === student.id
              );
              const roomCapacity =
                selectedRoom?.roomType === "QUADRUPLE" ? 4 : 2 || 2;
              const maxRoommates = roomCapacity - 1;
              const canSelect = selectedStudents.length < maxRoommates;

              return (
                <div
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className={`bg-white border rounded-lg p-4 cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? "border-[#3337BF] bg-blue-50 shadow-md"
                      : canSelect
                      ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#3337BF] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  )}

                  {!canSelect && !isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#3337BF] flex items-center justify-center text-white font-medium text-sm mr-3">
                      {student.firstName.charAt(0)}
                      {student.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Year {student.currentStudyYear} • {student.filiere.name}
                      </p>
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">
                        Email:
                      </span>
                      <span className="text-xs text-gray-600 truncate ml-2">
                        {student.email}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">
                        Gender:
                      </span>
                      <span className="text-xs text-gray-600">
                        {student.gender}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">
                        Status:
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          student.reservationStatus
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {student.reservationStatus ? "Reserved" : "Available"}
                      </span>
                    </div>
                  </div>

                  {/* Program Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {student.filiere.name}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStudentSelect(student);
                      }}
                      disabled={!canSelect && !isSelected}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isSelected
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : canSelect
                          ? "bg-[#3337BF] text-white hover:bg-[#2a2eb5]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isSelected
                        ? "Remove"
                        : canSelect
                        ? "Select"
                        : "Room Full"}
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results - Show only when user has searched but no matches found */}
        {searchTerm.trim() && filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">😔</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              No students found
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              No matches for "{searchTerm}". Try different keywords or browse
              with broader terms.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
