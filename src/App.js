import React from "react";
import { AddTask, TaskList, Modal } from "./components/index";
import { useGlobalContext } from "./components/Context/TaskContext";

const App = () => {
  const { modal } = useGlobalContext();
  return (
    <center>
      {modal.isOpen && <Modal />}
      <AddTask />
      <TaskList />
    </center>
  );
};

export default App;
