const CountBox = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center w-[150px] rounded">
            <h4 className="font-epilogue font-bold text-[30px] text-gray-600 p-3 bg-white w-full text-center truncate rounded-t-xl">{value}</h4>
            <p className="font-epilogue font-semibold text-[16px] text-gray-600 bg-white px-3 py-2 w-full text-center rounded-b-xl">{title}</p>
        </div>
    )
}

export default CountBox
