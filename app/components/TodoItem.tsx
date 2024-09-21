import { Pencil } from 'lucide-react';
import React, { useState } from 'react';

import { Checkbox } from "@/components/ui/checkbox"
import { TodoModal } from './TodoModal';
import { DeleteModal } from './DeleteModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Todo } from '../types/todo';

interface TodoItemProps {
    todo: Todo,
    getTodo: () => void,
    type: string,
    currentPage: number,
    total: number,
    todoType: string,
}

export const TodoItem = ({ todo, getTodo, type, todoType, currentPage, total }: TodoItemProps) => {
    const { id, name, description, is_completed, created_at, updated_at } = todo;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [checked, setChecked] = useState(is_completed);

    const handleCheck = () => {
        const baseUrl = "https://wayi.league-funny.com/api/task";

        axios.patch(`${baseUrl}/${id}`).then((res) => {
            console.log("Update completed status check", res)
            toast.success('Update completed status success');
            getTodo();
        })

        setChecked(!checked)
    }

    return (
        <>
            <div className="p-2 bg-gray-100 text-black rounded flex justify-between">
                <div className="flex gap-2">
                    <div className="flex items-center" onClick={() => handleCheck()}>
                        <Checkbox className="w-5 h-5" checked={checked} />
                    </div>
                    <div>
                        <h2>Name: {name}</h2>
                        <p>Description: {description}</p>
                        <p>時間: {updated_at ? `${moment(updated_at).format("YYYY-MM-DD HH:mm")}` : moment(created_at).format("YYYY-MM-DD HH:mm")}</p>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="p-2 bg-gray-100 hover:bg-gray-300 hover:text-red-500 rounded cursor-pointer" onClick={() => setEditModalOpen(true)}>
                        <Pencil />
                    </div>
                    <DeleteModal
                        id={id}
                        getTodo={getTodo}
                        type={type}
                        currentPage={currentPage}
                        total={total}
                    />
                </div>
            </div>
            <TodoModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                title="Edit Todo"
                iconWithText={<><Pencil size={16} color="white" />Edit</>}
                getTodo={getTodo}
                todo={todo}
                todoType={todoType}
                currentPage={currentPage}
                total={total}
            />
        </>
    )
}
