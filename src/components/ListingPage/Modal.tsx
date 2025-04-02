"use client";

import { useIsMobile } from '@/app/hooks/useIsMobile';
import React, { useRef } from 'react'
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Transitions.css';

type TProps = {
    onClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
}


const Modal = ({ onClose, isOpen, children }: TProps) => {
    const bodyLock = "body { overflow: hidden; }";
    const nodeRef = useRef(null);

    const isMobile = useIsMobile();

    if ([typeof window, typeof document].includes('undefined'))
        return null;

    return (
        <>
            {createPortal(
                <>
                    {isOpen && <style>{bodyLock}</style>}
                    <CSSTransition
                        in={isOpen}
                        timeout={300}
                        unmountOnExit
                        nodeRef={nodeRef}
                        classNames="modal"
                    >
                        <div className='fixed inset-0 flex justify-center items-center z-100' onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            <div className='w-full h-full fixed inset-0 bg-black opacity-50'
                                onClick={onClose}></div>
                            <div ref={nodeRef} className={`flex w-full h-full justify-center ${isMobile ? "items-end" : "items-center"}`}>
                                <div className={`bg-white overflow-y-auto px-4 py-12 z-80 relative max-w-10/12 max-h-9/12 ${isMobile ? "h-fit w-full max-w-full max-h-full" : ""}`}>
                                    <button className='absolute top-0 ltr:right-0 rtl:left-0 text-gray-500 p-3' onClick={onClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </>,
                document.body
            )
            }
        </>
    )
}

export default Modal
