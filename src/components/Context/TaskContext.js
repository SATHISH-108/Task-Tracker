import React, { createContext, useContext, useEffect, useState } from "react";
export const taskContext = createContext();
export const useGlobalContext = () => {
  return useContext(taskContext);
};

const TaskContext = ({ children }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [tasks, setTasks] = useState([]);
  const [editItem, setEditItem] = useState({ isEdit: false, id: "" });
  const [modal, setModal] = useState({ isOpen: false });
  const [error, setError] = useState({ msg: "" });
  const savedTasks = localStorage.getItem("tasks");
  const deleteTask = (id) => {
    const filteredItems = tasks.filter((item) => item.id !== id);
    setTasks(filteredItems);
  };
  const openModal = () => {
    setTasks([]);
    closeModal();
  };
  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div>
      <taskContext.Provider
        value={{
          task,
          setTask,
          tasks,
          setTasks,
          deleteTask,
          editItem,
          setEditItem,
          modal,
          setModal,
          savedTasks,
          openModal,
          closeModal,
          error,
          setError
        }}
      >
        {children}
      </taskContext.Provider>
    </div>
  );
};

export default TaskContext;
