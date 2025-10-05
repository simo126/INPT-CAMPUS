import { useState, useEffect } from "react";

export const Hero = ({ NavBar }) => {
  const fullText = "INPTCAMPUS";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 50 : 150;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) setDeleting(true);
      } else {
        setText(fullText.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) setDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, deleting]);
  return (
    <section className="relative bg-[#0F1139] h-96 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-full w-64 h-8 bg-blue-300/20 rounded-b-full blur-xl pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 w-64 h-8 bg-blue-300/20 rounded-b-full blur-xl pointer-events-none"></div>

      <div className="absolute bottom-0 left-1/2 w-256 h-8 bg-blue-300/20 rounded-t-full transform -translate-x-1/2 blur-xl pointer-events-none"></div>

      <div className="relative z-10">
        <NavBar />
      </div>
      <div className="text-white text-center h-80 flex justify-center items-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Welcome to <span className="font-bold">{text}🚀</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mt-4 max-w-3xl mx-auto">
            Your all-in-one platform for room reservations and dormitory
            management. Simplify your student living experience today!
          </p>
        </div>
      </div>
    </section>
  );
};
