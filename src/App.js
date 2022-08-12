import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

const url =
  "https://react-http-926be-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json";

function App() {
  const [tasks, setTasks] = useState([]);

  const tranformTasks = useCallback((data, body) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp(tranformTasks);

  useEffect(() => {
    fetchTasks({ url });
  }, [fetchTasks]);

  const taskAddHandler = useCallback((task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }, []);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
