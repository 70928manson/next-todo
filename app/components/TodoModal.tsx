"use client";

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Todo } from '../types/todo';

const formSchema = z.object({
    name: z.string().min(1).max(10),
    description: z.string().max(30),
})

interface TodoModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    iconWithText: React.ReactNode,
    getTodo: (page: number, type: string) => void,
    todo?: Todo,
    todoType: string,
    currentPage: number,
    total: number
}

export const TodoModal = ({ open, setOpen, title, iconWithText, getTodo, todo, todoType, currentPage, total }: TodoModalProps) => {
    const { id, name, description } = todo || {};
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            description: description || ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add Edit Delete
        const { name, description } = values;
        const baseUrl = "https://wayi.league-funny.com/api/task";

        const data = {
            name,
            description,
            is_completed: title === "Add Todo" ? false : undefined, // 只在 "Add Todo" 時設置
            created_at: title === "Add Todo" ? moment().toISOString() : undefined,
            updated_at: title === "Add Todo" ? "" : moment().toISOString()
        };

        try {
            if (title === "Add Todo") {
                axios.post(`${baseUrl}`, data).then((res) => {
                    console.log("add res check", res)
                    toast.success('Add Success');

                    // 新增完後的總數量
                    const updatedTotal = total + 1;
                    // 計算新增完後應該顯示的頁碼
                    const nextPage = Math.ceil(updatedTotal / 10);

                    // 跳到計算好的頁碼
                    getTodo(nextPage, todoType);

                    setOpen(false);
                    form.reset({
                        name: '',
                        description: '',
                    });

                })
            } else if (title === "Edit Todo") {
                axios.put(`${baseUrl}/${id}`, data).then((res) => {
                    console.log("edit res check", res)
                    toast.success('Edit Success');

                    getTodo(currentPage, todoType);

                    setOpen(false);
                })
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error("Unexpected error", err);
            }
            toast.error("Error !")
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-black border-gray-700">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Todo Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2">
                            <Button type="submit" className="flex justify-center items-center gap-1">{iconWithText}</Button>
                            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
