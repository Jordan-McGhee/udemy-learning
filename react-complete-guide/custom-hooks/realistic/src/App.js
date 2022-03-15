import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function App() {

  // states to track if we're fetching data, there was an error, or we found tasks in our DB
  // STATES COMMENTED OUT BC OF CUSTOM HOOK

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // // async function to fetch from db
  // const fetchTasks = async (taskText) => {

  //   // update state to give response to user
  //   setIsLoading(true);
  //   setError(null);

  //   // try/catch block to fetch data
  //   try {
  //     const response = await fetch(
  //       'https://react-hooks-practice-d5b6a-default-rtdb.firebaseio.com/tasks.json'
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const loadedTasks = [];

  //     // iterating through each object from our response and add it to our array of tasks that we display
  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }

  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };
  
  const transformTasks = useCallback((tasksObj) => {
    const loadedTasks = [];

      // iterating through each object from our response and add it to our array of tasks that we display
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
  }, [])

  // state to manage list of tasks
  const [tasks, setTasks] = useState([]);

  // storing result of using custom hook
  const httpData = useFetch(transformTasks)

  // using object destructuring to bring these variables into App.js
  const { isLoading, error, sendRequest: fetchTasks } = httpData

  // useEffect to run our fetchTasks function when the site loads
  useEffect(() => {
    fetchTasks({
      // request object
      url: "https://react-hooks-practice-d5b6a-default-rtdb.firebaseio.com/tasks.json",
      method: "GET"
    });
  }, [ fetchTasks ]);

  // function that updates our tasks state and adds another task when a user enters one
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

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
