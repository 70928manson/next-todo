"use client";

import { Plus } from "lucide-react";
import { fetchWayiTodo } from "./actions/todoActions"
import { TodoListContainer } from "./components/TodoListContainer";
import { TodoModal } from "./components/TodoModal";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [todoType, setTodoType] = useState("all");
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const getTodo = async (page = 1, type = "all") => {
    setLoading(true);
    const wayiTodo = await fetchWayiTodo(page, type);
    setTodos(wayiTodo.data);
    setTotal(wayiTodo.total)
    setLoading(false);
  };

  const handleTypeChange = (e: string) => {
    const todoTypeMapping: { [key: string]: string } = {
      "All": "all",
      "Completed": "completed",
      "Uncompleted": "uncompleted",
    };

    const todoType = todoTypeMapping[e];

    if (todoType) {
      getTodo(1, todoType);
      setTodoType(todoType);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <main className="max-w-4xl mx-auto mt-4">
        <h1 className="text-center my-2 text-2xl font-bold">TODO LIST APP</h1>
        <div className="flex justify-between my-2">
          <div className="flex items-center gap-2 bg-white text-black rounded px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-300" onClick={() => setAddModalOpen(true)}>
            <Plus size={16} /> Add Todo
          </div>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todo Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Uncompleted">Uncompleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TodoListContainer
          todos={todos}
          todoType={todoType}
          total={total}
          getTodo={getTodo}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
        />
      </main>
      <TodoModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        title="Add Todo"
        iconWithText={<><Plus size={16} color="white" />Add</>}
        getTodo={getTodo}
        todoType={todoType}
        currentPage={currentPage}
        total={total}
      />
    </>
  )
}