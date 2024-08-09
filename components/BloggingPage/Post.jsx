import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

export const PostComponent = ({ user, date, language, content, code }) => (
  <div className="pt-4 pb-2 px-4 rounded-3xl border mb-10">
    <div className="flex items-center space-x-2 mb-2">
      <div className="flex justify-between w-full h-full">
        <div className="flex justify-between w-full">
          <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4">
            <div className="flex items-center gap-x-2">
              <div className="bg-blue-500 h-10 w-10 rounded-full"></div>
              <div className="text-base sm:text-lg text-gray-100">
                {user}
              </div>
            </div>
            <div className="text-sm sm:text-base text-green-400 px-2 py-1 rounded-3xl border text-center">
              {language}
            </div>
          </div>
          <div className="text-sm sm:text-base text-gray-400">
            {date}
          </div>
        </div>
      </div>
    </div>
    <div className="text-base sm:text-lg mt-5 leading-6 text-gray-200">
      {content}
    </div>
    <div className="text-sm sm:text-base mt-5 w-full sm:w-11/12 text-blue-900 border py-2 px-3 rounded-2xl whitespace-pre-wrap">
      {code}
    </div>
    <div className="flex justify-between mt-6">
      <div className="flex gap-x-2 sm:gap-x-3">
        <button>
          <AiOutlineLike size={20} className="text-gray-300"/>
        </button>
        <button>
          <BiCommentDetail size={20} className="text-gray-300"/>
        </button>
      </div>
      <div className="flex gap-x-2 sm:gap-x-3">
        <button>
          <CiLocationArrow1 size={20} className="text-gray-300"/>
        </button>
        <button>
          <CiBookmark size={20} className="text-gray-300"/>
        </button>
      </div>
    </div>
  </div>
);
