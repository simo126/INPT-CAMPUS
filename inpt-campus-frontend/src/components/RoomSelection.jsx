import { useState, useEffect } from "react";

export const RoomSelection = ({ onRoomSelect, selectedRoom, loggedInUser }) => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [clickedBuilding, setClickedBuilding] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/buildings`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();

          setBuildings(data);
        } else {
          console.warn("Failed to fetch buildings:", res.status);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    const fetchRooms = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/rooms/available`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();

          setRooms(data);
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setFilteredRooms(shuffled.slice(0, 8));
        } else {
          console.warn("Failed to fetch rooms:", res.status);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchBuildings();
    fetchRooms();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      const shuffled = [...rooms].sort(() => 0.5 - Math.random());
      setFilteredRooms(shuffled.slice(0, 8));
    } else {
      const filtered = rooms.filter((r) =>
        r.roomNumber
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase().trim())
      );
      setFilteredRooms(filtered.slice(0, 8));
    }
  }, [query, rooms]);

  const handleRoomSelect = (room) => {
    onRoomSelect(room);
  };

  const handleBackToBuildings = () => {
    setClickedBuilding(null);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {!clickedBuilding
              ? "Select a Building"
              : `Select a Room in ${clickedBuilding.name}`}
          </h1>
          <p className="text-gray-600 mb-6">
            {!clickedBuilding
              ? "Choose your preferred building to see available rooms"
              : "Pick the perfect room for your stay"}
          </p>

          {clickedBuilding && (
            <button
              onClick={handleBackToBuildings}
              className="mb-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 inline-flex items-center gap-2 text-sm"
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
              Back to Buildings
            </button>
          )}
        </div>

        {/* Search Box - Only show when a building is selected */}
        {clickedBuilding && (
          <div className="flex justify-center mb-6">
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
                placeholder="Search by room number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3337BF] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Selected Room Display */}
        {selectedRoom && (
          <div className="mb-6 flex justify-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-sm">
              <div className="text-center">
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
                  Room Selected
                </h3>
                <p className="text-sm text-green-700">
                  Room {selectedRoom.roomNumber} in {selectedRoom.buildingName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buildings Grid */}
        {!clickedBuilding && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loggedInUser &&
              buildings
                .filter((b) => b.gender === loggedInUser.gender)
                .map((building) => (
                  <div
                    key={building.id}
                    onClick={() => setClickedBuilding(building)}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg cursor-pointer transition-shadow duration-200 hover:border-gray-300"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#3337BF] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {building.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm">
                        {building.address}
                      </p>
                      <div className="flex justify-center">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                          {building.numFloors} Floors
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}

        {/* Rooms Grid - Show only 8 rooms */}
        {clickedBuilding && (
          <div>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                {
                  filteredRooms.filter(
                    (r) => r.buildingName === clickedBuilding.name
                  ).length
                }{" "}
                available rooms
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRooms
                .filter((r) => r.buildingName === clickedBuilding.name)
                .map((room) => (
                  <div
                    key={room.roomNumber}
                    className={`bg-white border rounded-lg p-4 cursor-pointer transition-all duration-200 text-center relative ${
                      selectedRoom?.roomNumber === room.roomNumber
                        ? "border-[#3337BF] bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    {selectedRoom?.roomNumber === room.roomNumber && (
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

                    <div className="w-8 h-8 bg-[#3337BF] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-medium text-sm">
                        {room.roomNumber}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 mb-3">
                      Room {room.roomNumber}
                    </h3>

                    <button
                      onClick={() => handleRoomSelect(room)}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedRoom?.roomNumber === room.roomNumber
                          ? "bg-[#3337BF] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-[#3337BF] hover:text-white"
                      }`}
                    >
                      {selectedRoom?.roomNumber === room.roomNumber
                        ? "Selected"
                        : "Select"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {clickedBuilding &&
          filteredRooms.filter((r) => r.buildingName === clickedBuilding.name)
            .length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                No rooms found
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {query
                  ? `No rooms match "${query}"`
                  : "No available rooms in this building"}
              </p>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};
