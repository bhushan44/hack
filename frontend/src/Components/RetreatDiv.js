import BGimg from '../images/BGimg.png';
function RetreatDiv({da,details}) {
    return (
        <div className="flex flex-col items-center border border-gray-300 rounded-lg overflow-hidden shadow-md w-400px m-5 p-5 bg-white text-center" >
            <div className="w-full max-w-[150px] border-b border-gray-300">
                <img src={da.images[0]} alt="Center" className="w-full h-auto" />
            </div>
            <div className="my-5">
                <h3 className="text-lg font-semibold">{da.name}</h3>
                <h4 className="text-lg font-semibold">{da.location}</h4>
                <p className="text-gray-700">{da.description}</p>
            </div>
            <div className="mt-2">
                <button className="px-5 py-2 border-none rounded bg-blue-500 text-white cursor-pointer transition-colors duration-300 hover:bg-blue-700" onClick={()=>{details(da._id)}}>
                    Show More
                </button>
            </div>
        </div>
    );
}

export default RetreatDiv;
