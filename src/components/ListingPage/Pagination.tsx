type TPagination = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: TPagination) => {
    return (
        <div className="flex justify-center space-x-2">
            <button
                className="w-10 h-10 border border-[#ddd] rounded-full disabled:opacity-50 items-center justify-center cursor-pointer hover:not-disabled:border-black hidden sm:flex"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <p className='translate-y-[-1px]'>«</p>
            </button>

            {[...Array(totalPages)].map((_, index) => (
                index !== 0 && index + 1 !== totalPages && (index + 1 < currentPage - 1 || index + 1 > currentPage + 1) ? index + 1 === currentPage - 2 || index + 1 === currentPage + 2 ? (
                    <button
                        key={index}
                        className="w-10 h-10 border border-[#ddd] rounded-full cursor-pointer"
                        disabled
                    >
                        ...
                    </button>
                )
                    : null
                    :
                    <button
                        key={index}
                        className={`w-10 h-10 border border-[#ddd] rounded-full cursor-pointer hover:border-black ${currentPage === index + 1 ? "border-black" : ""
                            }`}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </button>

            ))}

            <button
                className="w-10 h-10 border border-[#ddd] rounded-full disabled:opacity-50 items-center justify-center cursor-pointer hover:not-disabled:border-black hidden sm:flex"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <p className='translate-y-[-1px]'>»</p>
            </button>
        </div>
    );
};

export default Pagination;