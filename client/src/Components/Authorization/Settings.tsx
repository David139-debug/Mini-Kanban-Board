import { useEffect, useState } from "react";
import api from "../../api";

interface User {
  fullname: string;
  email: string;
}

const Settings = () => {

  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("http://localhost:5000/api/getUser");
      setUser([response.data]);
    };

    fetchUser();
  }, [])

  return (
    <article>
      <h1 className="text-center">Guarded Route</h1>
      <ul>
        {user.map((user, index) => (
          <div key={index} className="flex flex-col h-[100vh] justify-center items-center">
              <li>{user.fullname}</li>
              <li>{user.email}</li>
          </div>
        ))}
      </ul>
    </article>
  )
}

export default Settings