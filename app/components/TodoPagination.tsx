"use client";

import React from 'react'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface TodoPaginationProps {
    type: string,
    total: number,
    getTodo: (page: number, type: string) => void,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
}

export const TodoPagination = ({ type, total, getTodo, currentPage, setCurrentPage }: TodoPaginationProps) => {
    const totalPages = Math.ceil(total / 10);
    const visiblePages = 5; // 控制顯示的頁數範圍

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        getTodo(currentPage - 1, type);
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        getTodo(currentPage + 1, type);
    };

    const handlePageClick = (page: string | number) => {
        if (typeof page === "number") {
            setCurrentPage(page);
            getTodo(page, type);
        }
    };

    const getPages = () => {
        if (totalPages <= visiblePages) {
            // 若總頁數少於或等於 5，顯示所有頁碼
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        } else if (currentPage <= 3) {
            // 當前頁面靠前時顯示前 3 頁
            return [1, 2, 3, 4, 'ellipsis', totalPages];
        } else if (currentPage >= totalPages - 2) {
            // 當前頁面靠後時顯示最後 3 頁
            return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            // 中間情況顯示當前頁左右的 2 頁
            return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrevious}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={
                            currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                </PaginationItem>

                {getPages().map((page, index) => (
                    page === 'ellipsis' ? (
                        <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={() => handlePageClick(page)}
                                className={currentPage === page ? "active" : ""}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        aria-disabled={currentPage >= totalPages}
                        tabIndex={currentPage >= totalPages ? -1 : undefined}
                        className={
                            currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
