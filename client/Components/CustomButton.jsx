const CustomButton = ({ btnType, title, handleClick, styles }) => {
    return (
      <button
        className={`font-epilogue font-semibold text-[15px] leading-[26px] text-white min-h-[40px] px-3 rounded-[10px] ${styles}`}>
        {title}
      </button>
    )
  }
  
  export default CustomButton