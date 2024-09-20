"use client";

import React, { useState } from 'react'
import { TodoItem } from './TodoItem';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface TodoListContainerProps {
    todos: Todo[]
}

type Todo = {
    id: number;
    name: string;
    description: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export const TodoListContainer = ({ todos }: TodoListContainerProps) => {
    const [page, setPage] = useState(1);
    
    return (
        <div className="p-6 bg-[#333333] rounded flex flex-col gap-4">
            {
                todos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            name={todo.name}
                            description={todo.description}
                            is_completed={todo.is_completed}
                            created_at={todo.created_at}
                            updated_at={todo.updated_at}
                        />
                    )
                })
            }
            {/*TODO: 分頁 */}
            <Pagination>
                <PaginationContent>
                    onclick page -1
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>

                    頁數
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    onclick page +1
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
