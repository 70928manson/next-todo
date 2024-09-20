import React from 'react';
import { Trash2 } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';
import toast from 'react-hot-toast';

interface DeleteModalProps {
    id: number,
    getTodo: () => void
}

export const DeleteModal = ({ id, getTodo }: DeleteModalProps) => {
    const handleDelete = () => {
        const baseUrl = "https://wayi.league-funny.com/api/task";

        axios.delete(`${baseUrl}/${id}`).then((res) => {
            console.log("delete res check", res)
            toast.success('delete Todo success');
            getTodo();
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="p-2 bg-gray-100 hover:bg-gray-300 hover:text-red-500 rounded cursor-pointer"><Trash2 /></div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-black border-gray-700">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure delete this todo?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete from your todo data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => handleDelete()}>Delete</AlertDialogAction>
                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
