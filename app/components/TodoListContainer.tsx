"use client";

import React from 'react'
import { TodoItem } from './TodoItem';

import { TodoPagination } from './TodoPagination';

import ClipLoader from "react-spinners/ClipLoader";
import { Todo } from '../types/todo';

interface TodoListContainerProps {
    todos: Todo[],
    todoType: string,
    total: number,
    getTodo: () => void,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    loading: boolean
}

export const TodoListContainer = ({ todos, todoType, total, getTodo, currentPage, setCurrentPage, loading }: TodoListContainerProps) => {

    return (
        <div className="p-6 bg-[#333333] rounded flex flex-col gap-4">
            {
                loading && (
                    <div className="flex justify-center items-center">
                        <ClipLoader
                            color="#ffffff"
                            loading={loading}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )
            }
            {
                todos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            getTodo={getTodo}
                            type={todoType}
                            currentPage={currentPage}
                            total={total}
                            todoType={todoType}
                        />
                    )
                })
            }
            <TodoPagination
                type={todoType}
                total={total}
                getTodo={getTodo}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
