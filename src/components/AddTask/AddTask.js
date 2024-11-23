import React from "react";
import { useGlobalContext } from "../Context/TaskContext";
import "./AddTask.css";

const AddTask = () => {
  const {
    task,
    setTask,
    tasks,
    setTasks,
    editItem,
    setEditItem,
    error,
    setError,
  } = useGlobalContext();

  const validateTask = () => {
    if (!task.title || !task.description || !task.dueDate || !task.status) {
      setError({ ...error, msg: "All fields are required!" });
      return false;
    }
    if (new Date(task.dueDate) < new Date()) {
      setError({ ...error, msg: "Due date cannot be in the past!" });
      return false;
    }
    setError({ ...error, msg: "" });
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateTask()) {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: new Date().getTime().toString(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      },
    ]);

    setTask({
      ...task,
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
    });
  };

  const formEditHandler = (e) => {
    e.preventDefault();

    if (!validateTask()) {
      return;
    }

    let newTasks = tasks.map((eachTask) => {
      if (eachTask.id === editItem.id) {
        return {
          ...eachTask,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          status: task.status,
        };
      } else {
        return eachTask;
      }
    });

    setTasks(newTasks);

    setTask({
      ...task,
      id: "",
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
    });
    setEditItem({ ...editItem, isEdit: false });
  };

  return (
    <div className="add-task-container">
      <form onSubmit={submitHandler}>
        <h3>Add Task</h3>
        <div
          className="label-input-container"
          style={{ display: "flex", gap: "10px" }}
        >
          <label>Title</label>
          <input
            type="text"
            placeholder="ENTER NAME"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div className="label-input-container">
          <label>Description</label>
          <textarea
            rows="4"
            cols="30"
            placeholder="ENTER DESCRIPTION"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          ></textarea>
        </div>
        <div className="label-input-container">
          <label>Due Date</label>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
        <div className="label-input-container">
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <p className="error-message">{error.msg}</p>
        {editItem.isEdit ? (
          <input
            type="submit"
            value="EDIT"
            onClick={formEditHandler}
            className="button edit-button"
          />
        ) : (
          <input type="submit" value="ADD" className="button add-button" />
        )}
      </form>
    </div>
  );
};

export default AddTask;
