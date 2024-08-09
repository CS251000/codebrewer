const Question = ({ user, language, content }) => (
  <div className="mt-8 ml-7">
    <div className="flex items-center space-x-2">
      <div className="bg-blue-500 h-6 w-6 rounded-full"></div>
      <div className="text-base text-gray-200">{user}</div>
    </div>
    <div className=" text-lg  text-justify mt-3 leading-6 lg:pr-6 md:pr-4 sm:pr-2">{content}</div>
    {
        language == 'C++' ? (<div className="mt-3 md:text-base sm:text-sm py-1 text-center border md:w-20 sm:w-16 md:rounded-2xl sm:rounded-xl text-yellow-500 ">{language}</div>) : (
                                <div className="mt-3 md:text-base sm:text-sm py-1 text-center border md:w-20 sm:w-16 md:rounded-2xl sm:rounded-xl  text-red-500 ">{language}</div>
        )
    }
    
  </div>
);

export default Question;
