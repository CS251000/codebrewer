const GroupComponent = ({ name }) => (
    <div className=" border text-green-500 rounded-3xl mt-4 flex justify-between items-center ml-5">
      <div className="text-xl py-2 pl-4">{name}</div>
      <div className="pr-3">
      <button className="text-base text-white border rounded-3xl px-1 w-14 h-8">Join</button>
      </div>
    </div>
    );

export default GroupComponent;