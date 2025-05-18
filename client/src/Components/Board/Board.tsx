import Navbar from "../Navbar/Navbar"
import ProjectInfo from "../ProjectInfo/ProjectInfo"
import Sidebar from "../Sidebar/Sidebar"
import Completed from "./Columns/Completed"
import InProgress from "./Columns/InProgress"
import ToDo from "./Columns/ToDo"
import { useState, useEffect, useReducer } from "react";
import axios from "axios"
import type { Task } from "./taskReducer"
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import { taskReducer } from "./taskReducer"
import { SortableContext } from "@dnd-kit/sortable"
import DraggableTask from "./Columns/Tasks/DraggableTask"
import NewTask, { type Status } from "./NewTaskModal/NewTask"
import PhoneNavbar from "../Navbar/PhoneNavbar"

const Board = () => {

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("todo");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        /* Fetchanje podataka preko vašeg fake apija zadanog u dokumentu
        let fakeResponse = await axios.get<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=12");
        let fakeData = fakeResponse.data;

        const mappedTasks = fakeData.map((task): Task => ({
          id: task.id,
          userId: task.userId,
          title: task.title,
          completed: task.completed,
          status: task.completed
            ? "done"
            : task.id % 3 === 0
              ? "todo"
              : "inProgress",
        })); */
        
        //Fetchanje preko mojeg backenda
        let response = await axios.get<Task[]>("http://localhost:5000/api/getTasks");
        let data = response.data;
        const myTasks = data.map((task): Task => ({
          title: task.title,
          status: task.status,
          completed: task.completed,
          id: task.id,
        }));
        dispatch({ type: "GET_TASKS", payload: { tasks: myTasks } });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [openModal])

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const progressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "done");

  const handleDragStart = ({ active }: DragStartEvent) => {
    const draggedTask = tasks.find((task) => task.id === active.id);
    setActiveTask(draggedTask || null);
  };

const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    const taskId = active.id as string; 
    const newStatus = over.id as Task["status"];

    dispatch({
      type: "MOVE_TASK",
      payload: { taskId, newStatus },
    });

    try {
        await axios.put(`http://localhost:5000/api/updateTask/`, {
          id: taskId,
          status: newStatus,
        });
      } catch (err) {
        console.error(err);
    }
};

  return (
    <section className="flex">
      <Sidebar />
        <div className="flex flex-col w-full">
        <div className=" lg:hidden">
          <PhoneNavbar />
        </div>
            <Navbar />
            <ProjectInfo tasks={tasks} />

        <article className="justify-center flex flex-wrap gap-6 p-8 
                    flex-col 
                    md:flex-row md:flex-wrap 
                    lg:flex-nowrap">
          {openModal && (
            <>
              <div className="fixed inset-0 bg-[rgba(8,8,8,0.8)] z-50 pointer-events-auto"></div>
              <NewTask status={status} dispatch={dispatch} setOpenModal={setOpenModal} />
            </>
          )}
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={todoTasks.map(task => task.id)}>
              <div className="flex-1 min-w-[300px]"><ToDo setStatus={setStatus} setOpenModal={setOpenModal} todoTasks={todoTasks} /></div>
            </SortableContext>
            <SortableContext items={progressTasks.map(task => task.id)}>
              <div className="flex-1 min-w-[300px]"><InProgress setStatus={setStatus} setOpenModal={setOpenModal} progressTasks={progressTasks} /></div>
            </SortableContext>
            <SortableContext items={completedTasks.map(task => task.id)}>
              <div className="flex-1 min-w-[300px]"><Completed setStatus={setStatus} setOpenModal={setOpenModal} completedTasks={completedTasks} /></div>
            </SortableContext>
            <DragOverlay>
              {activeTask ? <DraggableTask task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </article>
        </div>
    </section>
  )
}

export default Board