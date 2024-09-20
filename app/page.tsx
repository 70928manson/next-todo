import { Plus } from "lucide-react";
import { fetchWayiTodo } from "./actions/todoActions"
import { TodoListContainer } from "./components/TodoListContainer";
import { TodoButton } from "./components/TodoButton";

export default async function Home() {
  const { status, total, data } = await fetchWayiTodo(1, "all");

  console.log("tasks", data)

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="text-center my-2 text-2xl font-bold">TODO LIST APP</h1>
      <div className="flex justify-between my-2">
        <TodoButton
          trigger="+ Add"
          title="Add Todo"
          icon={<Plus size={16} color="white" />}
          action="Add"
        />
        {/*TODO: Selector */}
        {/* <div className="text-black">
          <Button variant="outline">...</Button>
        </div> */}
      </div>
      <TodoListContainer todos={data} />
    </main>
  )
}