import React from "react";
import "./TaskList.css";
import { useGlobalContext } from "../Context/TaskContext";
const TaskList = () => {
  const {
    tasks,
    deleteTask,
    modal,
    setModal,
    editItem,
    setEditItem,
    task,
    setTask,
  } = useGlobalContext();
  const editHandler = (id) => {
    setEditItem({ ...editItem, isEdit: true, id: id });
    const editableItem = tasks.find((item) => item.id === id);
    console.log(editableItem);
    setTask({
      ...task,
      id: editableItem.id,
      title: editableItem.title,
      description: editableItem.description,
      dueDate: editableItem.dueDate,
      status: editableItem.status,
    });
  };
  return (
    <div>
      <h3>Task List</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => {
            const { id, title, description, dueDate, status } = item;
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>{description}</td>
                <td>{dueDate}</td>
                <td>{status}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap:"10px"
                    }}
                  >
                    <button onClick={() => deleteTask(id)}>Delete</button>
                    <button onClick={() => editHandler(id)}>Edit</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="footer-clear-button-container">
        <button
          className="clear-button"
          onClick={() => {
            setModal({ ...modal, isOpen: true });
          }}
        >
          Clear Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskList;
