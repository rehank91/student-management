import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-center space-x-4 border-b pb-2">
        {["students", "teachers", "departments"].map((section) => (
          <Link
            key={section}
            to={`/${section}`}
            className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-blue-500"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </nav>
      {/* Render the appropriate component based on the active route */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
