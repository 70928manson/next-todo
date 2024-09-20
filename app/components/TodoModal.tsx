"use client";

import React from 'react'
import {
    DialogClose,
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

const formSchema = z.object({
    name: z.string().min(1).max(10),
    description: z.string().max(30),
})

interface TodoModalProps {
    type: string,
    title: string,
    icon: React.ReactNode,
    action: string,
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoModal = ({ type, title, icon, action, setOpen }: TodoModalProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add Edit Delete
        console.log(values)

        if (type === "Add") {
            const data = {
                name: values.name,
                description: values.description,
                is_completed: false,
                created_at: moment().toISOString(),
                updated_at: ""
            };
            axios.post(`https://wayi.league-funny.com/api/task`, data).then((res) => {
                console.log("res", res)
                setOpen(false);
            })
        }

    }
    return (
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
                        <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    </div>
                </form>
            </Form>
        </DialogContent>
    )
}
