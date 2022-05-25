import { ChangeEvent, FC, useState } from "react";
import "./styles.css";
import { ITask } from "./Interfaces";
import TodoTask from "../src/components/TodoTask";
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadLine: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskToRemove: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskToRemove;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            name="task"
            value={task}
            onChange={handleChange}
            placeholder="Task..."
            type="text"
          />
          <input
            value={deadline}
            onChange={handleChange}
            placeholder="Deadline (Days)"
            type="number"
            name="due"
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList?.map((task: ITask, key: number) => (
          <TodoTask completeTask={completeTask} key={key} task={task} />
        ))}
      </div>
    </div>
  );
};
export default App;
