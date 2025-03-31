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
}
const ProductsGrid = ({ products, categories, currency, onAddToCartClick, onAddToWishlistClick }: TProps) => {
    // States
    const [productsPerPage, setProductsPerPage] = useState(PRODUCTS_PER_PAGE_OPTIONS[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberColumns, setNumberColumns] = useState(3);
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
    const [categoryFilter, setCategoryFilter] = useState<TCategoryFilter | null>(null);
    const [quickViewProduct, setQuickViewProduct] = useState<TProduct | null>(null);

    // Variables
    const isList = useMemo(() => numberColumns === 1, [numberColumns]);
    const shouldShowProductsPerPageDropdown = useMemo(() => products.length > PRODUCTS_PER_PAGE_OPTIONS.reduce((acc, curr) => Math.min(acc, curr), Infinity), [products]);
    const shouldShowPagination = useMemo(() => products.length > productsPerPage, [products, productsPerPage]);

    const renderedProducts = useMemo(() => products.filter(
        (product) => !categoryFilter || // If no filter is applied, show all products
            (categoryFilter.category === product.categoryId && // If category filter is applied, show products that match the category
                (!categoryFilter.subCategories?.length || // If no subcategories are selected, show all products in the category
                    product.subCategories?.some((subCategory) => categoryFilter.subCategories?.includes(subCategory.id))))) // If subcategories are selected, show products that match the subcategories
        .sort(sortOption.sortFn) // Sort products using sorting function from sort option
        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage) // Paginate products
        , [products, currentPage, productsPerPage, sortOption, categoryFilter]);

    // TRANSLATION
    const numberOfProductsOnPageText = useMemo(() => shouldShowPagination ?
        `Items ${Math.min((currentPage - 1) * productsPerPage + 1, products.length)}-${Math.min(currentPage * productsPerPage, products.length)} of ${products.length}`
        : `${renderedProducts.length} items`, [currentPage, products, productsPerPage, renderedProducts.length, shouldShowPagination]);

    const renderHeader = useCallback(() => (
        <div className='block justify-between items-center pb-5 sm:flex'>
            <p className='text-sm text-[#878787]'>{numberOfProductsOnPageText}</p>
            <div className='flex gap-4 justify-end'>
                <Select
                    options={SORT_OPTIONS}
                    value={sortOption}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(option: any) => {
                        if (!option) return;
                        setSortOption(option);
                    }}
                    isSearchable={false}
                    styles={SelectStyles}
                />
                <DisplayOptions numberColumns={numberColumns} setNumberColumns={setNumberColumns} />
            </div>
        </div>
    ), [numberOfProductsOnPageText, sortOption, numberColumns]);

    const renderFooter = useCallback(() => (
        shouldShowProductsPerPageDropdown &&
        (
            <div className='flex items-center justify-between mt-4 flex-col md:flex-row md:gap-0 gap-4'>
                {shouldShowPagination &&
                    (
                        <Pagination
                            totalPages={Math.ceil(products.length / productsPerPage)}
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
                    {/* TRANSLATION */}
                    per page
                </div>
            </div>
        )
    ), [shouldShowPagination, shouldShowProductsPerPageDropdown, products, productsPerPage, currentPage]);

    const onQuickViewClick = useCallback((product: TProduct) => {
        setQuickViewProduct(product);
    }, []);

    return (
        <div className='w-full flex gap-10'>
            <Filters categories={categories} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
            <div className='flex-1'>
                {renderHeader()}
                <div className={`grid ${isList ? "gap-0" : "gap-4"}`} style={{
                    gridTemplateColumns: `repeat(${numberColumns || 2}, 1fr)`,
                }}>
                    {renderedProducts.map((product) => (
                        <ProductBox key={product.id} data={product} variant={isList ? ProductBoxVariant.LIST : ProductBoxVariant.GRID} currency={currency} onAddToCartClick={onAddToCartClick} onAddToWishlistClick={onAddToWishlistClick} onQuickViewClick={onQuickViewClick} />
                    ))}
                </div>
                {renderFooter()}
            </div>
            <Modal isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)}>
                {quickViewProduct && <ProductBox data={quickViewProduct} variant={ProductBoxVariant.QUICK_VIEW} currency={currency} onAddToCartClick={onAddToCartClick} onAddToWishlistClick={onAddToWishlistClick} />}
            </Modal>
        </div >
    )
}



export default ProductsGrid
