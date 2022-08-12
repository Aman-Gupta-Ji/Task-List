import { useCallback } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const url =
  "https://react-http-926be-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json";

const NewTask = (props) => {
  const { onAddTask } = props;

  const addTask = useCallback(
    (data, body) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: body.text };

      onAddTask(createdTask);
    },
    [onAddTask]
  );

  const { isLoading, error, sendRequest } = useHttp(addTask);

  const enterTaskHandler = (taskText) => {
    sendRequest({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText },
    });
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
