"use client";

const CardContent = ({ title, desc, icon }) => {
  return (
    <div className="flex items-center justify-between h-full gap-10">
      {/* LEFT */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <img src={icon} className="w-10 h-10" />

          <h3 className=" text-black leading-snug">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed max-w-md">{desc}</p>

        <button
          className="mt-6 px-5 py-2 rounded-full text-sm"
          style={{
            background: "var(--blue-3)",
            color: "#fff",
          }}
        >
          Learn More
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-50 h-50 rounded-xl overflow-hidden bg-gray-100">
        <img src="/placeholder.png" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default CardContent;
