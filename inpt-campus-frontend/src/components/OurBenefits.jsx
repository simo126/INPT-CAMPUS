export const OurBenefits = () => {
  return (
    <div className="min-h-[40vh] py-8 md:py-12">
      <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-xl md:text-2xl font-semibold mb-4">
            Our Benefits
          </h1>
          <p className="text-[#505050] px-4 sm:px-8 md:px-16 lg:px-40 text-sm md:text-base">
            INPTCampus simplifies campus life by giving students quick access to
            essential services. From reserving study or dorm rooms to reporting
            issues, everything is centralized in one easy-to-use platform.
          </p>
        </div>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <li className="text-center">
              <img
                src="/Benefit1.png"
                alt="Benefit1"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h1 className="text-lg md:text-2xl font-semibold mb-2">
                Room Reservation
              </h1>
              <p className="text-xs md:text-sm text-[#505050] px-2">
                Quickly reserve classrooms and labs across the campus for your
                lectures or study sessions.
              </p>
            </li>
            <li className="text-center">
              <img
                src="/Benefit2.png"
                alt="Benefit2"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h1 className="text-lg md:text-2xl font-semibold mb-2">
                Report Issues
              </h1>
              <p className="text-xs md:text-sm text-[#505050] px-2">
                Report maintenance or technical issues in any room, so the
                campus team can fix them promptly.
              </p>
            </li>
            <li className="text-center">
              <img
                src="/Benefit1.png"
                alt="Benefit3"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h1 className="text-lg md:text-2xl font-semibold mb-2">
                Availability Tracking
              </h1>
              <p className="text-xs md:text-sm text-[#505050] px-2">
                See real-time availability of rooms to plan your schedule
                without conflicts.
              </p>
            </li>
            <li className="text-center">
              <img
                src="/Benefit2.png"
                alt="Benefit4"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h1 className="text-lg md:text-2xl font-semibold mb-2">
                Service Notifications
              </h1>
              <p className="text-xs md:text-sm text-[#505050] px-2">
                Get updates when your reported issues are resolved or when
                reserved rooms have changes.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
