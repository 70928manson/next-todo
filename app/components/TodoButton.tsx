"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TodoModal } from './TodoModal';

interface TodoButtonProps {
    type: string,
    trigger: React.ReactNode,
    title: string,
    icon: React.ReactNode,
    action: string,
}


export const TodoButton = ({ type, trigger, title, icon, action }: TodoButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-black">
            <Dialog open={open}>
                <DialogTrigger className="bg-white rounded px-4 py-2 text-sm font-medium">
                    {trigger}
                </DialogTrigger>
                <TodoModal
                    type={type}
                    title={title}
                    icon={icon}
                    action={action}
                    setOpen={setOpen}
                />
            </Dialog>
        </div>
    )
}
