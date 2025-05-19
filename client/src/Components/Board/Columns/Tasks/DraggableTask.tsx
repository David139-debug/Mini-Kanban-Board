import axios from 'axios';
import { type Task } from '../../taskReducer'
import { useDraggable } from '@dnd-kit/core';
import { type Dispatch } from 'react';
import type { Action } from "../../taskReducer"

interface TaskProps {
    task: Task;
    dispatch: Dispatch<Action>
    setEditModal: Dispatch<React.SetStateAction<{ open: boolean; id: string | null }>>;
}

const DraggableTask = ({ task, dispatch, setEditModal }: TaskProps) => {
  
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id
    });

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteTask/${id}`);
            dispatch({ type: "DELETE_TASK", payload: { id } });
        } catch (err) {
            console.error(err);
        }
    };

    const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
        transition: "transform 30ms ease",
        boxShadow: "0px 4px 8px -2px rgba(23, 23, 23, 0.10), 0px 2px 4px -2px rgba(23, 23, 23, 0.06)",
    };

    return (
      <div ref={setNodeRef} style={style} className="flex justify-between flex-row-reverse items-center gap-4 p-3 bg-white rounded-3xl border border-[#E2E8F0] w-full" key={task.id}>
        <div className='right-3 flex flex-col gap-5 justify-between items-end'>
            <svg onClick={() => handleDelete(task.id)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M20.0459 17.954C20.2572 18.1653 20.376 18.452 20.376 18.7509C20.376 19.0497 20.2572 19.3364 20.0459 19.5477C19.8346 19.7591 19.5479 19.8778 19.249 19.8778C18.9501 19.8778 18.6635 19.7591 18.4521 19.5477L12.5 13.5937L6.5459 19.5459C6.33455 19.7572 6.04791 19.8759 5.74902 19.8759C5.45014 19.8759 5.16349 19.7572 4.95215 19.5459C4.7408 19.3345 4.62207 19.0479 4.62207 18.749C4.62207 18.4501 4.7408 18.1635 4.95215 17.9521L10.9062 11.9999L4.95402 6.04586C4.74268 5.83451 4.62395 5.54787 4.62395 5.24898C4.62395 4.9501 4.74268 4.66345 4.95402 4.45211C5.16537 4.24076 5.45201 4.12203 5.7509 4.12203C6.04978 4.12203 6.33643 4.24076 6.54777 4.45211L12.5 10.4062L18.454 4.45117C18.6654 4.23983 18.952 4.12109 19.2509 4.12109C19.5498 4.12109 19.8364 4.23983 20.0478 4.45117C20.2591 4.66251 20.3778 4.94916 20.3778 5.24804C20.3778 5.54693 20.2591 5.83358 20.0478 6.04492L14.0937 11.9999L20.0459 17.954Z" fill="#475569" />
            </svg>
            <svg onClick={() => setEditModal({ open: true, id: task.id })} xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 576 512">
                <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
            </svg>
            <svg className='absoulute outline-none' {...listeners} {...attributes}  xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 512 512">
                <path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 96-96 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 96 0 0 96-32 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0 0-96 96 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 32-96 0 0-96 32 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z" />
            </svg>
        </div>
          <div>
            <p className="leading-[22px] font-bold" style={{ fontFamily: "Plus Jakarta Sans" }}>{task.title}</p>
            <p className="text-[#475569] text-sm font-medium" style={{ fontFamily: "Plus Jakarta Sans" }}>Status</p>
            <p>{task.completed === true ? "Done" : "Not completed"}</p>
          </div>
      </div>
  )
}

export default DraggableTask 