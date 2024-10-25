import React, { useEffect, useState } from 'react'
import './Todo.css'

function Todo() {
    const [data, setdata] = useState({})
    const [todo, settodo] = useState([])
    const [doing, setdoing] = useState([])
    const [done, setdone] = useState([])
    let   [hob, setHob] = useState([]);
    const [options, setoptions] = useState("")

    // ===============================================useeffect
    useEffect(() => {
        let newwlist = JSON.parse(localStorage.getItem("tasks")) || []
        settodo(newwlist)
    }, [settodo])

    useEffect(() => {
        let newwlist1 = JSON.parse(localStorage.getItem("tasks1")) || []
        setdoing(newwlist1)
    }, [setdoing])

    useEffect(() => {
        let newwlist2 = JSON.parse(localStorage.getItem("tasks2")) || []
        setdone(newwlist2)
    }, [setdone])
    // ===================================================onchange
    let setinput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let hoData = [...hob];

        if (name == 'hobbies') {
            if (e.target.checked) {
                hoData.push(value);
            }
            else {
                let index = hoData.findIndex((v, i) => v == value);
                hoData.splice(index, 1);
            }
            value = hoData;
            setHob(value);
        }
        setdata({ ...data, [name]: value }) 
    }
    //    ==========================================option
    let setoption = (e) => {
        let value = e.target.value
        console.log(value);
        setoptions(value)
    }
    // ====================================================onsubmit
    let submit = (e) => {
        e.preventDefault()

        // setdata({ ...data, [name]: value })
        if (options == "todo") {
            let todos = [...todo, data]
            settodo(todos)
            localStorage.setItem("tasks", JSON.stringify(todos))
        }
        else if (options == "doing") {
            let doings = [...doing, data]
            setdoing(doings)
            localStorage.setItem("tasks1", JSON.stringify(doings))
        }
        else if (options == "done") {
            let dones = [...done, data]
            setdone(dones)
            localStorage.setItem("tasks2", JSON.stringify(dones))
        }
        setdata({})

    }
    // ================================delete
    let remove = (pos) => {
        let res = todo.filter((val, i) => {
            return pos != i
        })
        settodo(res)
        localStorage.setItem("tasks", JSON.stringify(res))
    }
    let remove1 = (pos) => {
        let res = doing.filter((val, i) => {
            return pos != i
        })
        setdoing(res)
        localStorage.setItem("tasks1", JSON.stringify(res))
    }

    let remove2 = (pos) => {
        let res = done.filter((val, i) => {
            return pos != i
        })
        setdone(res)
        localStorage.setItem("tasks2", JSON.stringify(res))
    }
    // ==========================================
    return (
        <>
            <div className="container">
                <form action="" method='post' onSubmit={(e) => { submit(e) }}>
                    <div>
                        <div style={{ marginBottom: "15px" }}>
                            <input type="text" placeholder='Enter your task' value={data.name?data.name:""} className='inputs' name='name' onChange={(e) => { setinput(e) }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <div style={{ display: "flex" }}>
                                <div className='checks'>
                                    <input type="checkbox" name='hobbies' value={"HTML"} checked={hob.includes('HTML') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span>HTML</span>
                                </div>
                                <div className='checks'>
                                    <input type="checkbox" name='hobbies' value={"CSS"} checked={hob.includes('CSS') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span>CSS</span>
                                </div>
                                <div className='checks'>
                                    <input type="checkbox" name='hobbies' value={"JAVASCRIPT"} checked={hob.includes('JAVASCRIPT') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span>JAVASCRIPT</span>
                                </div>
                                <div className='checks'>
                                    <input type="checkbox" name='hobbies' value={"REACT"} checked={hob.includes('REACT') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <span>REACT</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <div>
                                    <select name="option" id="" className='selection' onChange={(e) => { setoption(e) }}>
                                        <option value="">select</option>
                                        <option value="todo">TODO</option>
                                        <option value="doing">DOING</option>
                                        <option value="done">DONE</option>
                                    </select>
                                </div>
                                <div>
                                    {/* <button className='btn'>Add Task</button> */}
                                    <input type="submit" className='btn' value={"Add Task"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <hr />
            <div className="container-2">
                <div className='datas'>
                    <div className='col-4'>
                        <div >
                            <h2 style={{ margin: "0px 20px" }}>To do</h2>
                            {
                                todo.map((val, i) => {
                                    console.log(val);
                                    return (
                                        <>
                                            <div className='cols' key={i}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <h3>{val.name}</h3>
                                                    <button type='button' onClick={() => { remove(i) }}>delete</button>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <h4 className={`${val.hobbies ? "hobby" : "none"}`} >{val.hobbies[0]}</h4>
                                                    <h4 className={`${val.hobbies[1] ? "hobby1" : "none"}`} >{val.hobbies[1]}</h4>
                                                    <h4 className={`${val.hobbies[2] ? "hobby2" : "none"}`}>{val.hobbies[2]}</h4>
                                                    <h4 className={`${val.hobbies[3] ? "hobby3" : "none"}`} >{val.hobbies[3]}</h4>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-4'>
                        <div>
                            <h2 style={{ margin: "0px 20px" }}>Doing</h2>
                            {
                                doing.map((val, i) => {
                                    return (
                                        <>
                                            <div className='cols' key={i}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <h3>{val.name}</h3>
                                                    <button type='button' onClick={() => { remove1(i) }}>delete</button>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <h4 className={`${val.hobbies ? "hobby" : "none"}`} >{val.hobbies[0]}</h4>
                                                    <h4 className={`${val.hobbies[1] ? "hobby1" : "none"}`} >{val.hobbies[1]}</h4>
                                                    <h4 className={`${val.hobbies[2] ? "hobby2" : "none"}`}>{val.hobbies[2]}</h4>
                                                    <h4 className={`${val.hobbies[3] ? "hobby3" : "none"}`} >{val.hobbies[3]}</h4>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-4'>
                        <div style={{ margin: "0px 20px" }}>
                            <h2>Done</h2>
                            {
                                done.map((val, i) => {
                                    console.log(val.hob);
                                    return (
                                        <>
                                            <div className='cols' key={i}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <h3>{val.name}</h3>
                                                    <button type='button' onClick={() => { remove2(i) }}>delete</button>
                                                </div>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <h4 className={`${val.hobbies ? "hobby" : "none"}`} >{val.hobbies[0]}</h4>
                                                    <h4 className={`${val.hobbies[1] ? "hobby1" : "none"}`} >{val.hobbies[1]}</h4>
                                                    <h4 className={`${val.hobbies[2] ? "hobby2" : "none"}`}>{val.hobbies[2]}</h4>
                                                    <h4 className={`${val.hobbies[3] ? "hobby3" : "none"}`} >{val.hobbies[3]}</h4>
                                                </div>

                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo