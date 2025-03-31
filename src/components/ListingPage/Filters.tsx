import React, { useCallback, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import './Transitions.css';
import { TCategory, TSubCategory } from '@/types/Categories';
import { translations } from '@/translations';

export type TCategoryFilter = {
    category: string;
    subCategories?: string[] | null;
}

type TProps = {
    categoryFilter: TCategoryFilter | null;
    setCategoryFilter: React.Dispatch<React.SetStateAction<TCategoryFilter | null>>;
    categories: TCategory[];
    isArabic?: boolean;
}

const Filters = ({ categoryFilter, setCategoryFilter, categories, isArabic }: TProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const nodeRef = useRef(null);

    const onClose = useCallback(() => {
        setIsFilterOpen(false);
    }, []);

    const renderMobileHeader = useCallback(() => (
        <div className='border-b border-[#eee] mb-5 py-[9px] px-[30px] sm:hidden'>

            <h3 className='text-xl text-[#222]'>{translations[isArabic ? "ar" : "en"].filters}</h3>
            <button className='absolute top-0 ltr:right-0 rtl:left-0 text-gray-500 p-3' onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>), [onClose, isArabic]);

    const renderCategoryFilter = useCallback(() => (
        <div className='flex flex-col gap-4 px-[30px] pb-5 sm:p-0 flex-1'>
            <button className='flex justify-between gap-4 items-center' onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                <span className='text-lg text-[#222]'>
                    {translations[isArabic ? "ar" : "en"].categories}
                </span>
                <span>
                    {isCategoryOpen ? <FiMinus /> : <FiPlus />}
                </span>
            </button>
            <CSSTransition
                in={isCategoryOpen}
                timeout={500}
                nodeRef={nodeRef}
                classNames="category-filter"
                unmountOnExit
            >
                <div ref={nodeRef} className='flex flex-col gap-4 items-start w-fit'>
                    {categories.map((category) => <Category key={category.id} category={category} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} isArabic={isArabic} />)}
                </div>
            </CSSTransition>
        </div>
    ), [categories, categoryFilter, setCategoryFilter, isCategoryOpen, isArabic]);


    return (
        <>
            <div className={`overflow-y-auto flex flex-col gap-4 sm:min-w-[250px] sm:static fixed z-20 bg-white left-0 right-0 top-0 bottom-0 w-full h-full sm:w-auto sm:h-auto ${isFilterOpen ? "translate-x-0 duration-300" : "-translate-x-full transition-transform duration-300 sm:translate-x-0"}`}>
                {renderMobileHeader()}
                {renderCategoryFilter()}
                <div className='w-full p-5 sticky bottom-0 bg-white sm:hidden'>
                    <button className='bg-[#333] text-white text-lg w-full py-2 active:opacity-60' onClick={onClose}>
                        {translations[isArabic ? "ar" : "en"].done}
                    </button>
                </div>
            </div>

            {!isFilterOpen && <aside className='sm:hidden absolute left-0 top-1/2 bg-[#333] text-white shadow-md z-20 px-5 py-[5px] flex justify-center -rotate-90 rounded-sm' style={{ transformOrigin: 0, transform: "translateY(50%)" }} >
                <button onClick={() => setIsFilterOpen(true)}>
                    <p className='text-md text-center uppercase'>
                        {translations[isArabic ? "ar" : "en"].filters}
                    </p>
                </button>
            </aside >}
        </>

    )
}

export default Filters;

const Category = ({ category, categoryFilter, setCategoryFilter, isArabic }: {
    category: TCategory; categoryFilter: TCategoryFilter | null;
    setCategoryFilter:
    React.Dispatch<React.SetStateAction<TCategoryFilter | null>>;
    isArabic?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null);

    const isCategoryActive = categoryFilter?.category === category.id;

    const onCategoryClick = useCallback(() =>
        setCategoryFilter((prev) => {
            if (prev?.category === category.id) {
                return null;
            }
            return { category: category.id, subCategories: null };
        }
        ), [category, setCategoryFilter]
    )

    const onSubCategoryClick = useCallback((subCategoryId: string) =>
        setCategoryFilter((prev) => {
            if (prev?.category === category.id && prev.subCategories?.find(
                (selectedSubCategory) => selectedSubCategory === subCategoryId
            )) {
                return {
                    category: category.id, subCategories: prev.subCategories.filter(
                        (selectedSubCategory) => selectedSubCategory !== subCategoryId
                    )
                };
            }
            if (prev?.category === category.id) {
                return { category: category.id, subCategories: [...prev.subCategories ?? [], subCategoryId] };
            }
            return { category: category.id, subCategories: [subCategoryId] };
        })
        , [category.id, setCategoryFilter]
    );

    const renderCategoryHeader = useCallback(() => (
        <div className='flex gap-2 items-center'>
            <button onClick={onCategoryClick}>
                {isCategoryActive ? <MdCheckBox size={18} /> : <MdCheckBoxOutlineBlank size={18} />}
            </button>
            <button className='flex justify-between gap-8 items-center flex-1' onClick={() => setIsOpen(!isOpen)}>
                <span className='flex items-center gap-2 justify-between'>
                    <p className='text-lg text-[#222]'>{isArabic ? category.titleAr : category.title}</p>
                    {isCategoryActive && !!categoryFilter?.subCategories?.length && <p className='text-sm text-[#666]'>{`(${categoryFilter?.subCategories?.length})`}</p>}
                </span>
                <span>
                    {isOpen ? <FiMinus /> : <FiPlus />}
                </span>
            </button>
        </div>
    ), [category, categoryFilter?.subCategories, isCategoryActive, isOpen, onCategoryClick, isArabic]);

    const renderSubCategory = useCallback((subCategory: TSubCategory) => (
        <button className='flex gap-4 items-center py-1' key={subCategory.id} onClick={() => onSubCategoryClick(subCategory.id)}>
            {isCategoryActive && categoryFilter.subCategories?.find(
                (subCategoryId) => subCategoryId === subCategory.id
            ) ? <MdCheckBox size={14} /> : <MdCheckBoxOutlineBlank size={14} />}
            <p className='text-sm text-[#333]'>{isArabic ? subCategory.nameAr : subCategory.name}</p>
        </button>
    ), [categoryFilter, isCategoryActive, onSubCategoryClick, isArabic]);


    return (
        <div className='flex flex-col gap-4 w-full'>
            {renderCategoryHeader()}
            <CSSTransition
                in={isOpen}
                timeout={500}
                nodeRef={nodeRef}
                classNames="category-filter"
                unmountOnExit
            >
                <div className='flex flex-col gap-2 pl-2' ref={nodeRef}>
                    {category.subCategories.map((subCategory) => renderSubCategory(subCategory))}
                </div>
            </CSSTransition>
        </div>
    )
}
