import { IoSearch } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { useState } from "react";

const SecondaryNav = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="pt-16 w-full flex justify-center z-50">
      <div className="border-b-2 w-full pb-6 border-muted">
        <div className="flex justify-between items-center w-full gap-x-2 lg:gap-x-6 md:gap-x-4 sm:gap-x-3">
          {/* Buttons only visible on medium and larger screens */}
          <button className="hidden md:inline-block rounded-3xl border border-gray-500 lg:py-2 md:py-1 px-1 lg:w-36 md:w-32 sm:w-28 text-base lg:text-lg md:text-base text-gray-100 font-normal hover:text-black hover:bg-gray-100 ">
            Following
          </button>
          <button className="hidden md:inline-block rounded-3xl border border-gray-500 lg:py-2 md:py-1 px-1 lg:w-36 md:w-32 sm:w-28 text-base lg:text-lg md:text-base text-gray-100 font-normal hover:text-black hover:bg-gray-100">
            Unanswered
          </button>
          <button className="hidden md:inline-block rounded-3xl border border-gray-500 lg:py-2 md:py-1 px-1 lg:w-36 md:w-32 sm:w-28 text-base lg:text-lg md:text-base text-gray-100 font-normal hover:text-black hover:bg-gray-100">
            Relevant
          </button>
          <button className="hidden md:inline-block rounded-3xl border border-gray-500 lg:py-2 md:py-1 px-1 lg:w-36 md:w-32 sm:w-28 text-base lg:text-lg md:text-base text-gray-100 font-normal hover:text-black hover:bg-gray-100">
            Popular
          </button>
          {/* Search bar and Ask a Question button always visible */}
          <form
            onSubmit={handleSearch}
            className="rounded-3xl flex items-center border border-gray-500 py-2 lg:gap-5 md:gap-3 sm:gap-2 px-2 w-full md:w-96 sm:w-40 justify-between"
          >
            <IoSearch size={20} className="text-gray-100" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, problem..."
              className="flex-1 text-gray-100 outline-none md:text-lg sm:text-base bg-transparent font-normal"
            />
            {/* <FiAlignJustify size={20} className="text-gray-500" /> */}
          </form>
          <div className="rounded-3xl flex items-center border border-gray-500 lg:py-2 md:py-1 px-2">
            <button className="text-white lg:text-lg md:text-base sm:text-sm lg:w-36 md:w-32 sm:w-28 font-normal">
              Ask a Question
            </button>
            <HiOutlinePencil size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
