"use client";

import { Plus } from "lucide-react";
import { fetchWayiTodo } from "./actions/todoActions"
import { TodoListContainer } from "./components/TodoListContainer";
import { TodoModal } from "./components/TodoModal";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const getTodo = async () => {
    const data = await fetchWayiTodo(1, 'all');
    const todo = data.data
    setTodos(todo);
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
          {/*TODO: Selector */}
          {/* <div className="text-black">
          <Button variant="outline">...</Button>
        </div> */}
        </div>
        <TodoListContainer todos={todos} getTodo={getTodo} />
      </main>
      <TodoModal
        open={addModalOpen}
        setOpen={setAddModalOpen}
        type="Add"
        title="Add Todo"
        icon={<Plus size={16} color="white" />}
        action="Add"
        getTodo={getTodo}
      />
    </>
  )
}