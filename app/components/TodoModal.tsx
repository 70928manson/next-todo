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

const formSchema = z.object({
    name: z.string().min(1).max(10),
    description: z.string().max(30),
})

interface TodoModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    type: string,
    title: string,
    icon: React.ReactNode,
    action: string,
    getTodo: () => void,
    id?: number,
    name?: string,
    description?: string
}

export const TodoModal = ({ open, setOpen, type, title, icon, action, getTodo, id, name, description }: TodoModalProps) => {
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
        try {
            if (type === "Add") {
                const data = {
                    name: name,
                    description: description,
                    is_completed: false,
                    created_at: moment().toISOString(),
                    updated_at: ""
                };
                axios.post(`${baseUrl}`, data).then((res) => {
                    console.log("add res check", res)
                    toast.success('Add Todo success');
                    getTodo();
                    setOpen(false);
                    form.reset({
                        name: '',
                        description: '',
                    });

                })
            } else if (type === "Edit") {
                const data = {
                    name: name,
                    description: description,
                    updated_at: moment().toISOString(),
                };
                axios.put(`${baseUrl}/${id}`, data).then((res) => {
                    console.log("edit res check", res)
                    toast.success('edit Todo success');
                    getTodo();
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
                            <Button type="submit" >{icon}{action}</Button>
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
