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
    getTodo: (page: number, type: string) => void,
    type: string,
    currentPage: number,
    total: number
}

export const DeleteModal = ({ id, getTodo, type, currentPage, total }: DeleteModalProps) => {
    const handleDelete = () => {
        const baseUrl = "https://wayi.league-funny.com/api/task";

        axios.delete(`${baseUrl}/${id}`).then((res) => {
            console.log("Delete res check", res)
            toast.success('Delete Success');
            const totalPages = Math.ceil((total - 1) / 10); // 刪除後的總頁數
            const nextPage = currentPage > totalPages ? Math.max(currentPage - 1, 1) : currentPage;
            getTodo(nextPage, type);
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
                    <AlertDialogAction onClick={() => handleDelete()} className="flex justify-center items-center gap-1">
                        <Trash2 size={16} />
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
