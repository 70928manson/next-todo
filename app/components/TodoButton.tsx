"use client";

import React from 'react'
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TodoModal } from './TodoModal';

interface TodoButtonProps {
    trigger: React.ReactNode,
    title: string,
    icon: React.ReactNode,
    action: string,
}


export const TodoButton = ({ trigger, title, icon, action }: TodoButtonProps) => {

    return (
        <div className="text-black">
            <Dialog>
                <DialogTrigger className="bg-white rounded px-4 py-2 text-sm font-medium">
                    {trigger}
                </DialogTrigger>
                <TodoModal
                    title={title}
                    icon={icon}
                    action={action}
                />
            </Dialog>
        </div>
    )
}
