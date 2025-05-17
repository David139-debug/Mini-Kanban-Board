import type { Task } from '../../taskReducer'
import { useDraggable } from '@dnd-kit/core';

const DraggableTask = ({ task }: { task: Task }) => {
  
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id
    });

    const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
        transition: "transform 30ms ease",
        boxShadow: "0px 4px 8px -2px rgba(23, 23, 23, 0.10), 0px 2px 4px -2px rgba(23, 23, 23, 0.06)",
    };

    return (
      <div ref={setNodeRef} { ...listeners } { ...attributes } style={style} className="flex flex-col gap-4 p-3 bg-white rounded-3xl border border-[#E2E8F0] w-full" key={task.id}>
          <p className="leading-[22px] font-bold" style={{ fontFamily: "Plus Jakarta Sans" }}>{task.title}</p>
          <div>
              <p className="text-[#475569] text-sm font-medium" style={{ fontFamily: "Plus Jakarta Sans" }}>Status</p>
              <p>{task.completed === true ? "Done" : "Not completed"}</p>
          </div>
      </div>
  )
}

export default DraggableTask 