import DraggableTask from "./Tasks/DraggableTask";
import type { Task } from "../taskReducer"
import { useDroppable } from "@dnd-kit/core"
import { useEffect } from "react";
import { type Status } from "../NewTaskModal/NewTask";

interface TodoProps {
    completedTasks: Task[];
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setStatus: React.Dispatch<React.SetStateAction<Status>>
}

const Completed = ({ completedTasks, setOpenModal, setStatus }: TodoProps) => {

    const { setNodeRef } = useDroppable({
        id: "done"
    });

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

  return (
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-4xl p-4">
          <div className="flex flex-col gap-3">
              <div className="flex gap-4 justify-between">
                  <div className="flex gap-2 items-center">
                      <strong className="w-2 h-2 rounded-full bg-[#22C55E]"></strong>
                      <h1 className="font-bold text-xl" style={{ fontFamily: "Plus Jakarta Sans" }}>Completed <span className="text-[#94A3B8]" style={{ fontFamily: "Plus Jakarta Sans" }}>({completedTasks.length})</span></h1>
                  </div>
                  <div onClick={() => {
                      setOpenModal(true)
                      setStatus("done");
                  }} className="flex justify-center items-center w-10 h-10 p-4 border border-[#CBD5E1] rounded-full cursor-pointer transition duration-100 hover:bg-[#e2ebf3]">
                      <button className="cursor-pointer">
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2.67188C12.2503 2.67188 12.4917 2.75873 12.6836 2.91602L12.7627 2.9873C12.9649 3.18949 13.0781 3.46406 13.0781 3.75V10.9219H20.25C20.5003 10.9219 20.7417 11.0087 20.9336 11.166L21.0127 11.2373C21.2149 11.4395 21.3281 11.7141 21.3281 12C21.3281 12.2503 21.2413 12.4917 21.084 12.6836L21.0127 12.7627C20.8105 12.9649 20.5359 13.0781 20.25 13.0781H13.0781V20.25C13.0781 20.5003 12.9913 20.7417 12.834 20.9336L12.7627 21.0127C12.5605 21.2149 12.2859 21.3281 12 21.3281C11.7497 21.3281 11.5083 21.2413 11.3164 21.084L11.2373 21.0127C11.0351 20.8105 10.9219 20.5359 10.9219 20.25V13.0781H3.75C3.49973 13.0781 3.25828 12.9913 3.06641 12.834L2.9873 12.7627C2.78512 12.5605 2.67188 12.2859 2.67188 12C2.67188 11.7497 2.75873 11.5083 2.91602 11.3164L2.9873 11.2373C3.18949 11.0351 3.46406 10.9219 3.75 10.9219H10.9219V3.75C10.9219 3.49972 11.0087 3.25828 11.166 3.06641L11.2373 2.9873C11.4395 2.78512 11.7141 2.67188 12 2.67188Z" fill="#475569" stroke="#475569" stroke-width="0.09375" />
                          </svg>
                      </button>
                  </div>
              </div>

              <div ref={setNodeRef} className="flex flex-col items-center gap-3">
                  {completedTasks.length === 0 ? (
                      <p className="text-[#94A3B8] text-sm">Drag Task here.</p>
                  ) : (
                      completedTasks.map((task) => <DraggableTask key={task.id} task={task} />)
                  )}
              </div>
          </div>
        </div>
    )
}

export default Completed