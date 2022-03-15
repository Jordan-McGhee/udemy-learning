import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useFetch from '../../hooks/use-fetch';

const NewTask = (props) => {

  // CODE BEFORE HOOK
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://react-hooks-practice-d5b6a-default-rtdb.firebaseio.com/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };
  
  const { isLoading, error, sendRequest: sendTaskRequest } = useFetch()

  const enterTaskHandler = async (taskText) => {

    const createTask = taskData => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
  
      props.onAddTask(createdTask)
    }

    sendTaskRequest({
      url: 'https://react-hooks-practice-d5b6a-default-rtdb.firebaseio.com/tasks.json',
      method: "POST",
      headers: {
        "Content-Type": "applications/json"
      },
      body: { text: taskText }
    }, createTask)
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
