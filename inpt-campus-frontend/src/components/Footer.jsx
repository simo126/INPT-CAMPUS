export const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 px-4 sm:px-8 md:px-16 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 max-w-7xl mx-auto">
        {/* About Section */}
        <div className="md:w-1/3">
          <h1 className="text-lg md:text-xl font-semibold mb-4">
            What is INPTCampus?
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            INPTCampus is a platform designed for INPT students to easily manage
            their campus life. From reserving a room to reporting issues in
            dorms, we make student services faster and more accessible.
          </p>
        </div>

        {/* Links Section */}
        <div className="md:w-2/3 flex flex-col sm:flex-row justify-between gap-6 sm:gap-4">
          <div className="flex-1">
            <h2 className="font-semibold mb-1 text-base md:text-lg">
              Room Reservations
            </h2>
            <div className="bg-gray-600 h-px mb-2"></div>
            <p className="text-gray-500 text-xs md:text-sm">
              Reserve study rooms or dorm spaces with just a few clicks.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold mb-1 text-base md:text-lg">
              Issue Reporting
            </h2>
            <div className="bg-gray-600 h-px mb-2"></div>
            <p className="text-gray-500 text-xs md:text-sm">
              Report maintenance issues in dorms and track their resolution.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold mb-1 text-base md:text-lg">
              Campus Support
            </h2>
            <div className="bg-gray-600 h-px mb-2"></div>
            <p className="text-gray-500 text-xs md:text-sm">
              Get quick access to student services and campus assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 my-6 md:my-8"></div>

      {/* Contact Section */}
      <div className="text-center max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg font-semibold mb-2">Contact</h2>
        <p className="text-gray-500 text-xs md:text-sm">
          Email: support@inptcampus.com | Phone: +212 600 123 456
        </p>
      </div>
    </footer>
  );
};
