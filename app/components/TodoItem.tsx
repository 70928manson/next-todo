import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

import { Checkbox } from "@/components/ui/checkbox"
import { TodoButton } from './TodoButton';

interface TodoItemProps {
    name: string,
    description: string,
    is_completed: boolean,
    created_at: string,
    updated_at: string
}

export const TodoItem = ({ name, description, is_completed, updated_at }: TodoItemProps) => {

    return (
        <div className="p-2 bg-white text-black rounded flex justify-between">
            <div className="flex gap-2">
                <div className="flex items-center">
                    <Checkbox className="w-5 h-5" />
                </div>
                <div>
                    <h2>Name: {name}</h2>
                    <p>Description: {description}</p>
                    <p>時間: {updated_at ? updated_at : is_completed}</p>
                </div>
            </div>
            <div className="flex gap-1 items-center">
                <TodoButton
                    type="Edit"
                    trigger={
                        <div className="p-2 bg-gray-100 hover:bg-gray-300 hover:text-red-500 rounded cursor-pointer">
                            <Pencil />
                        </div>
                    }
                    title="Edit Todo"
                    icon={<Pencil size={16} color="white" />}
                    action="Edit"
                />
                <div className="p-2 bg-gray-100 hover:bg-gray-300 hover:text-red-500 rounded cursor-pointer"><Trash2 /></div>
            </div>
        </div>
    )
}
