import React, { useState, useEffect } from 'react'

const TaskM = () => {

    const [tasks, setTasks] = useState([]);
    const [task, setTask ] = useState ('');


    useEffect(() => {

        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks && Array.isArray(storedTasks)){
            setTasks(storedTasks);
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    
    const addTask = () => {
        if (task.trim ()) {
            setTasks((prevTaks) => [...prevTaks, task]);
            setTask('');
        }
    };

    const removeTask = (index) => {
        setTasks((prevTaks) => prevTaks.filter((_, i) => i !== index));
 
    };

    const updateTask = (index, newTask) => {
        setTasks((prevTaks) => prevTaks.map ((t, i) => (i === index ? newTask : t)));
       
    };


    return (
        <div>
          <h1>Manejador de tareas</h1>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTask}>Agregar tareas</button>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => updateTask(index, e.target.value)}
                />
                <button onClick={() => removeTask(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      );

};


export default TaskM;