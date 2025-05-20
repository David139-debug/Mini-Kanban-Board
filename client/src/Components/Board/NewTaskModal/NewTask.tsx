import { type Dispatch } from "react";
import { type Action } from "../taskReducer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../../api";
import { v4 as uuid } from "uuid";

interface ModalState {
    setOpenModal: Dispatch<React.SetStateAction<boolean>>;
    dispatch: Dispatch<Action>;
    status: Status;
}

export type Status = "todo" | "inProgress" | "done";

interface FormState {
    name: string;
    status?: Status
}

const schema: yup.ObjectSchema<FormState> = yup.object({
    name: yup
        .string()
        .required("Task name is required.")
        .min(3, "Task name must be at least 3 characters"),
    
    status: yup
        .mixed<Status>()
        .oneOf(["todo", "inProgress", "done"])
});

const NewTask = ({ setOpenModal, dispatch, status }: ModalState) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormState>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            status: status,
        }
    });

    const onSubmit = async (data: FormState) => {
        try {
            const generatedId = uuid();

            await api.post("http://localhost:5000/api/createTask", {
                title: data.name,
                status: data.status,
                completed: data.status === "done" ? true : false,
                id: generatedId
            });
            dispatch({
                type: "ADD_TASK",
                payload: {
                    id: generatedId,
                    title: data.name,
                    newStatus: data.status || "todo",
                    completed: data.status === "done" ? true : false 
                }
            });
            reset();
            setOpenModal(false);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

  return (
      <form onSubmit={handleSubmit(onSubmit)} style={{
          boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)"
      }} className="bg-white p-6 rounded-[32px] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 fixed z-50 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
              <div className="flex justify-between">
                  <div className="bg-[#EEF2FF] rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path d="M10.625 7.875C10.625 7.57833 10.713 7.28832 10.8778 7.04165C11.0426 6.79497 11.2769 6.60271 11.551 6.48918C11.8251 6.37565 12.1267 6.34594 12.4176 6.40382C12.7086 6.4617 12.9759 6.60456 13.1857 6.81434C13.3954 7.02412 13.5383 7.29139 13.5962 7.58236C13.6541 7.87334 13.6244 8.17494 13.5108 8.44903C13.3973 8.72311 13.205 8.95738 12.9584 9.1222C12.7117 9.28703 12.4217 9.375 12.125 9.375C11.7272 9.375 11.3456 9.21696 11.0643 8.93566C10.783 8.65436 10.625 8.27282 10.625 7.875ZM22.625 12C22.625 14.0025 22.0312 15.9601 20.9186 17.6251C19.8061 19.2902 18.2248 20.5879 16.3747 21.3543C14.5246 22.1206 12.4888 22.3211 10.5247 21.9305C8.56066 21.5398 6.75656 20.5755 5.34055 19.1595C3.92454 17.7435 2.96023 15.9393 2.56955 13.9753C2.17888 12.0112 2.37939 9.97543 3.14572 8.12533C3.91206 6.27523 5.20981 4.69392 6.87486 3.58137C8.5399 2.46882 10.4975 1.875 12.5 1.875C15.1844 1.87798 17.758 2.94567 19.6562 4.84383C21.5543 6.74199 22.622 9.3156 22.625 12ZM20.375 12C20.375 10.4425 19.9131 8.91992 19.0478 7.62488C18.1825 6.32985 16.9526 5.32049 15.5136 4.72445C14.0747 4.12841 12.4913 3.97246 10.9637 4.27632C9.43607 4.58017 8.03288 5.3302 6.93154 6.43153C5.8302 7.53287 5.08018 8.93606 4.77632 10.4637C4.47246 11.9913 4.62841 13.5747 5.22445 15.0136C5.82049 16.4526 6.82985 17.6825 8.12489 18.5478C9.41993 19.4131 10.9425 19.875 12.5 19.875C14.5879 19.8728 16.5896 19.0424 18.066 17.566C19.5424 16.0896 20.3728 14.0879 20.375 12ZM13.625 15.4387V12.375C13.625 11.8777 13.4275 11.4008 13.0758 11.0492C12.7242 10.6975 12.2473 10.5 11.75 10.5C11.4843 10.4996 11.2271 10.5932 11.0238 10.7643C10.8206 10.9354 10.6844 11.173 10.6395 11.4348C10.5946 11.6967 10.6438 11.966 10.7784 12.195C10.913 12.4241 11.1244 12.5981 11.375 12.6863V15.75C11.375 16.2473 11.5725 16.7242 11.9242 17.0758C12.2758 17.4275 12.7527 17.625 13.25 17.625C13.5157 17.6254 13.7729 17.5318 13.9762 17.3607C14.1794 17.1896 14.3156 16.952 14.3605 16.6902C14.4054 16.4283 14.3562 16.159 14.2216 15.93C14.087 15.7009 13.8756 15.5269 13.625 15.4387Z" fill="#4F46E5" />
                      </svg>
                  </div>
                  <svg onClick={() => setOpenModal(false)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path d="M20.0459 17.954C20.2572 18.1653 20.376 18.452 20.376 18.7509C20.376 19.0497 20.2572 19.3364 20.0459 19.5477C19.8346 19.7591 19.5479 19.8778 19.249 19.8778C18.9501 19.8778 18.6635 19.7591 18.4521 19.5477L12.5 13.5937L6.5459 19.5459C6.33455 19.7572 6.04791 19.8759 5.74902 19.8759C5.45014 19.8759 5.16349 19.7572 4.95215 19.5459C4.7408 19.3345 4.62207 19.0479 4.62207 18.749C4.62207 18.4501 4.7408 18.1635 4.95215 17.9521L10.9062 11.9999L4.95402 6.04586C4.74268 5.83451 4.62395 5.54787 4.62395 5.24898C4.62395 4.9501 4.74268 4.66345 4.95402 4.45211C5.16537 4.24076 5.45201 4.12203 5.7509 4.12203C6.04978 4.12203 6.33643 4.24076 6.54777 4.45211L12.5 10.4062L18.454 4.45117C18.6654 4.23983 18.952 4.12109 19.2509 4.12109C19.5498 4.12109 19.8364 4.23983 20.0478 4.45117C20.2591 4.66251 20.3778 4.94916 20.3778 5.24804C20.3778 5.54693 20.2591 5.83358 20.0478 6.04492L14.0937 11.9999L20.0459 17.954Z" fill="#475569" />
                  </svg>
              </div>
              <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">Task Add</h1>
                  <p className="text-[#475569]">Please add information about this task</p>
              </div>
              <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                      <label className="text-[#1E293B] font-bold text-sm">TaskName</label>
                      <input { ...register("name") } className="p-3 border rounded-full border-[#CBD5E1] placeholder-[#475569] font-medium" placeholder="Enter name" type="text" />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                      <label className="text-[#1E293B] font-bold text-sm">Task Status</label>
                      <select { ...register("status") } name="status" className="p-3 border border-[#CBD5E1] rounded-full placeholder-[#475569] font-medium">
                          <option value="todo">To Do</option>
                          <option value="inProgress">In Progress</option>
                          <option value="done">Completed</option>
                      </select>
                  </div>
              </div>

              <div className="flex gap-2 justify-end">
                  <button onClick={() => setOpenModal(false)} className="cursor-pointer border rounded-full font-bold border-[#CBD5E1] py-2.5 px-4">Cancel</button>
                  <button type="submit" className="cursor-pointer bg-[#4F46E5] text-white font-bold border rounded-full border-[#CBD5E1] py-2.5 px-4">Add</button>
              </div>
        </div>
    </form>
  )
}

export default NewTask