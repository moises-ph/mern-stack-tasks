import React, { useState, useEffect } from "react";


function App() {

    const [tittle, setTittle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [id, setId] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "tittle") {
            setTittle(value);
        }
        else if (name === "description") {
            setDescription(value);
        }
    }

    const fetchTasks= () =>{
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(e => [...data]);
            });
    }

    const deleteTask = async (id) => {
        if(confirm('Are you sure you wante to delete it?')){
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task Deleted'});
                    fetchTasks();
                });
        }
    }

    const editTask = (id) => {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTittle(data.tittle);
                setDescription(data.description);
                setId(data._id);
            });
    }

    const addTask = (e) => {
        if(id){
            fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    tittle: tittle,
                    description: description
                })
            }).then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task Updated'});
                    fetchTasks();
                })
        }
        else{
            const data = {
                tittle : tittle,
                description : description
            }
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    M.toast({html: 'Task Added Successfully'});
                    setTittle("");
                    setDescription("");
                    fetchTasks();
                })
                .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            {/* Navegacion */}
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className="brand-logo" href="/">MERN STACK</a>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={addTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input value={tittle} onChange={handleChange} name="tittle" type='text' placeholder="Task Tittle"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea value={description} onChange={handleChange} name="description" className="materialize-textarea" placeholder="Task Description"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task =>{
                                    return <tr key={task._id}>
                                        <td>{task.tittle}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <button style={{margin: '4px'}} className="btn light-blue darken4" onClick={() => deleteTask(task._id)}>
                                                <i className="material-icons">delete</i>
                                            </button>
                                            <button style={{margin: '4px'}} className="btn light-blue darken4" onClick={() => editTask(task._id)}>
                                                <i className="material-icons">edit</i>
                                            </button>    
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
    
};

export default App;