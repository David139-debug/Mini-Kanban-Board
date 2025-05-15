import Navbar from "../Navbar/Navbar"
import ProjectInfo from "../ProjectInfo/ProjectInfo"
import Sidebar from "../Sidebar/Sidebar"
import Completed from "./Completed"
import InProgress from "./InProgress"
import ToDo from "./ToDo"

const Board = () => {
  return (
    <section className="flex">
      <Sidebar />
        <div className="flex flex-col w-full">
            <Navbar />
            <ProjectInfo />

        <article className="justify-center flex flex-wrap gap-6 p-8 
                    flex-col 
                    md:flex-row md:flex-wrap 
                    lg:flex-nowrap">
          <div className="flex-1 min-w-[300px]"><ToDo /></div>
          <div className="flex-1 min-w-[300px]"><InProgress /></div>
          <div className="flex-1 min-w-[300px]"><Completed /></div>
        </article>
        </div>
    </section>
  )
}

export default Board