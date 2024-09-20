import { Pencil } from 'lucide-react';
import React, { useState } from 'react';

import { Checkbox } from "@/components/ui/checkbox"
import { TodoModal } from './TodoModal';
import { DeleteModal } from './DeleteModal';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TodoItemProps {
    id: number,
    name: string,
    description: string,
    is_completed: boolean,
    created_at: string,
    updated_at: string
    getTodo: () => void
}

export const TodoItem = ({ id, name, description, is_completed, updated_at, getTodo }: TodoItemProps) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [checked, setChecked] = useState(is_completed);

    const handleCheck = () => {
        const baseUrl = "https://wayi.league-funny.com/api/task";

        axios.patch(`${baseUrl}/${id}`).then((res) => {
            console.log("update completed status check", res)
            toast.success('update completed status success');
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
                        <p>時間: {updated_at ? updated_at : is_completed}</p>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="p-2 bg-gray-100 hover:bg-gray-300 hover:text-red-500 rounded cursor-pointer" onClick={() => setEditModalOpen(true)}>
                        <Pencil />
                    </div>
                    <DeleteModal
                        id={id}
                        getTodo={getTodo}
                    />
                </div>
            </div>
            <TodoModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                type="Edit"
                title="Edit Todo"
                icon={<Pencil size={16} color="white" />}
                action="Edit"
                getTodo={getTodo}
                id={id}
                name={name}
                description={description}
            />
        </>
    )
}
