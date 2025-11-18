import React from "react";

function Subscribe() {
  return (
    <section className="py-20 text-center px-4">
      <h2 className="text-3xl font-bold mb-3">
        Subscribe now & get <span className="text-pink-500">20% off</span>
      </h2>

      {/* Responsive paragraph */}
      <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none w-full sm:w-[32rem] focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button className="bg-black text-white px-8 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-pink-500 transition-colors duration-300 w-full sm:w-auto">
          SUBSCRIBE
        </button>
      </div>
    </section>
  );
}

export default Subscribe;


