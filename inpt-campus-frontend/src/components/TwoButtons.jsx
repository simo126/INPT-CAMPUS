import { ArrowRight } from "iconoir-react";
import { useNavigate } from "react-router-dom";

export const TwoButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[40vh] bg-[#F6F6F6] py-8 md:py-16">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-0 px-4 sm:px-8 md:px-16 lg:px-28 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 px-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Find a Room
          </h1>
          <p className="text-[#505050] mt-2 mb-4 text-sm md:text-base">
            Need a study dorm room? INPTCampus lets you easily browse and
            reserve available rooms on campus, making it simple to plan ahead
            and stay organized.
          </p>
          <button
            className="bg-[#3337BF] text-white text-xs md:text-sm rounded-[6px] px-4 py-3 w-full sm:w-[170px] flex items-center justify-center gap-2 hover:bg-[#2a2eb5] transition"
            onClick={() => navigate("/reserve")}
          >
            Reserve a Room <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Do you have an issue? Report it
          </h1>
          <p className="text-[#505050] mt-2 mb-4 text-sm md:text-base">
            Facing a problem in your dorm or on campus? With INPTCampus, you can
            quickly report issues and track their resolution, ensuring a better
            living and learning experience.
          </p>
          <button
            className="bg-[#3337BF] text-white text-xs md:text-sm rounded-[6px] px-4 py-3 w-full sm:w-[170px] flex items-center justify-center gap-2 hover:bg-[#2a2eb5] transition"
            onClick={() => navigate("/report")}
          >
            Report an Issue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
