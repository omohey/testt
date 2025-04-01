"use client";
import { TProduct } from '@/types/Product';
import { TCategory } from '@/types/Categories';
import React, { useCallback, useMemo, useState } from 'react'
import ProductBox, { ProductBoxVariant } from './ListingPage/ProductBox'
import dynamic from 'next/dynamic';
import DisplayOptions from './ListingPage/DisplayOptions';
import { StylesConfig } from 'react-select';
import Modal from './ListingPage/Modal';
import Filters, { TCategoryFilter } from './ListingPage/Filters';
import Pagination from './ListingPage/Pagination';
import { PRODUCTS_PER_PAGE_OPTIONS, SORT_OPTIONS } from '@/config';
import { translations } from '@/translations';
const Select = dynamic(() => import('react-select'), { ssr: false });

const SelectStyles: StylesConfig = {
    control: (styles) => ({
        ...styles,
        width: "fit-content",
        border: "none",
        boxShadow: "none",
        cursor: "pointer",
        color: "#878787",
        fontSize: "14px",
        gap: "4px",
        direction: "ltr",
    }),

    indicatorSeparator: (styles) => ({
        ...styles,
        display: "none",
    }),

    dropdownIndicator: (styles) => ({
        ...styles,
        padding: "0",
    }),
    menu: (styles) => ({
        ...styles,
        marginTop: "8px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    }),
    option: (styles, { isSelected }) => ({
        ...styles,
        backgroundColor: isSelected ? "#F2F2F2" : "white",
        color: isSelected ? "black" : "#878787",
        cursor: "pointer",
        fontSize: "14px",
    }),
};

type TProps = {
    products: TProduct[];
    categories: TCategory[];
    currency: string;
    onAddToCartClick: (productId: string, count?: number) => void;
    onAddToWishlistClick: (productId: string) => void;
    isArabic?: boolean;
}
const ProductsGrid = ({ products, categories, currency, onAddToCartClick, onAddToWishlistClick, isArabic }: TProps) => {
    // States
    const [productsPerPage, setProductsPerPage] = useState(PRODUCTS_PER_PAGE_OPTIONS[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberColumns, setNumberColumns] = useState(3);
    const [sortOption, setSortOption] = useState({ ...SORT_OPTIONS[0], label: isArabic ? SORT_OPTIONS[0].labelAr : SORT_OPTIONS[0].labelEn });
    const [categoryFilter, setCategoryFilter] = useState<TCategoryFilter | null>(null);
    const [quickViewProduct, setQuickViewProduct] = useState<TProduct | null>(null);

    // Variables
    const productsWithCategories = useMemo(() => products.map((product) => ({
        ...product,
        category: categories.find((category) => category.id === product.categoryId)?.[isArabic ? "titleAr" : "title"],
    })), [products, categories, isArabic]);

    const isList = useMemo(() => numberColumns === 1, [numberColumns]);
    const shouldShowProductsPerPageDropdown = useMemo(() => productsWithCategories.length > PRODUCTS_PER_PAGE_OPTIONS.reduce((acc, curr) => Math.min(acc, curr), Infinity), [productsWithCategories]);
    const shouldShowPagination = useMemo(() => productsWithCategories.length > productsPerPage, [productsWithCategories, productsPerPage]);


    const renderedProducts = useMemo(() => productsWithCategories.filter(
        (product) => !categoryFilter || // If no filter is applied, show all products
            (categoryFilter.category === product.categoryId && // If category filter is applied, show products that match the category
                (!categoryFilter.subCategories?.length || // If no subcategories are selected, show all products in the category
                    product.subCategories?.some((subCategory) => categoryFilter.subCategories?.includes(subCategory.id))))) // If subcategories are selected, show products that match the subcategories
        .sort(sortOption.sortFn) // Sort products using sorting function from sort option
        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage) // Paginate products
        , [productsWithCategories, currentPage, productsPerPage, sortOption, categoryFilter]);

    const numberOfProductsOnPageText = useMemo(() => shouldShowPagination ?
        `${translations[isArabic ? "ar" : "en"].items} ${Math.min((currentPage - 1) * productsPerPage + 1, productsWithCategories.length)}-${Math.min(currentPage * productsPerPage, productsWithCategories.length)} ${translations[isArabic ? "ar" : "en"].of} ${productsWithCategories.length}`
        : `${renderedProducts.length} ${translations[isArabic ? "ar" : "en"].items}`, [currentPage, productsWithCategories, productsPerPage, renderedProducts.length, shouldShowPagination, isArabic]);

    const renderHeader = useCallback(() => (
        <div className='block justify-between items-center pb-5 sm:flex'>
            <p className='text-sm text-[#878787]'>{numberOfProductsOnPageText}</p>
            <div className='flex gap-4 justify-end'>
                <Select
                    options={SORT_OPTIONS.map((option) => ({ ...option, label: isArabic ? option.labelAr : option.labelEn }))}
                    value={sortOption}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(option: any) => {
                        if (!option) return;
                        setSortOption(option);
                    }}
                    isSearchable={false}
                    styles={SelectStyles}
                />
                <DisplayOptions numberColumns={numberColumns} setNumberColumns={setNumberColumns} isArabic={isArabic} />
            </div>
        </div>
    ), [numberOfProductsOnPageText, sortOption, numberColumns, isArabic]);

    const renderFooter = useCallback(() => (
        shouldShowProductsPerPageDropdown &&
        (
            <div className='flex items-center justify-between mt-4 flex-col md:flex-row md:gap-0 gap-4'>
                {shouldShowPagination &&
                    (
                        <Pagination
                            totalPages={Math.ceil(productsWithCategories.length / productsPerPage)}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    )
                }
                <div className='w-fit min-w-[100px] flex items-center gap-2 text-[#878787]'>
                    <Select
                        options={PRODUCTS_PER_PAGE_OPTIONS.map((option) => ({ value: option, label: option }))}
                        value={{ value: productsPerPage, label: productsPerPage }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(option: any) => {
                            if (!option) return;
                            setProductsPerPage(option.value);
                            setCurrentPage(1);
                        }}
                        isSearchable={false}
                        menuPlacement='top'
                        styles={SelectStyles}
                    />
                    {translations[isArabic ? "ar" : "en"]['per-page']}
                </div>
            </div>
        )
    ), [shouldShowPagination, shouldShowProductsPerPageDropdown, productsWithCategories, productsPerPage, currentPage, isArabic]);

    const onQuickViewClick = useCallback((product: TProduct) => {
        setQuickViewProduct(product);
    }, []);

    return (
        <div className='w-full flex gap-10'>
            <Filters categories={categories} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} isArabic={isArabic} />
            <div className='flex-1'>
                {renderHeader()}
                <div className={`grid ${isList ? "gap-0" : "gap-4"}`} style={{
                    gridTemplateColumns: `repeat(${numberColumns || 2}, 1fr)`,
                }}>
                    {renderedProducts.map((product) => (
                        <ProductBox key={product.id} data={product} variant={isList ? ProductBoxVariant.LIST : ProductBoxVariant.GRID} currency={currency} onAddToCartClick={onAddToCartClick} onAddToWishlistClick={onAddToWishlistClick} onQuickViewClick={onQuickViewClick} isArabic={isArabic} />
                    ))}
                </div>
                {renderFooter()}
            </div>
            <Modal isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)}>
                {quickViewProduct && <ProductBox data={quickViewProduct} variant={ProductBoxVariant.QUICK_VIEW} currency={currency} onAddToCartClick={onAddToCartClick} onAddToWishlistClick={onAddToWishlistClick} isArabic={isArabic} />}
            </Modal>
        </div >
    )
}



export default ProductsGrid
