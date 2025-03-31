import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import GridModeButtons from './GridModeButtons';

type TProps = {
    numberColumns: number;
    setNumberColumns: (value: number) => void;
}

const DisplayOptions = ({ numberColumns, setNumberColumns }: TProps) => {
    const isList = numberColumns === 1;

    return (
        <div className='flex items-center justify-center gap-4'>
            <div className='relative group'>
                <button className='flex items-center gap-2 pb-1' onClick={() => { setNumberColumns(1); }}>
                    <FontAwesomeIcon className={`${isList ? "text-black" : "text-[#C0C0C0] hover:text-black"}`} icon={faList} />
                </button>
                {/* TRANSLATION */}
                <span className="bg-black rounded px-[15px] py-[7px] max-w-[360px] z-[100] absolute text-left text-white mb-[5px] bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap text-sm hidden group-hover:block">List</span>
            </div>
            <GridModeButtons numberColumns={numberColumns} setNumberColumns={setNumberColumns} />
        </div>
    )
}

export default DisplayOptions
