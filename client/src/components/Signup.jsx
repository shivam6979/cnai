import styles from "./styles.module.css";
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

function Signup() {
    const [data, setData]=useState({
        firstName:"",
        number:"",
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const [error, setError]= useState("")

    const handleChange=({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
        console.log(setData)
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            console.log("hi 1")
            const url = "http://localhost:8000/api/users";
            console.log("hi 2")
            console.log("Data -------------", data )

            const {data:res} = await axios.post(url,data);//{ data: res } is object destructuring syntax, which extracts the
                                                        //  data property from the response object and renames it to res.
            console.log("hi 3")

            navigate("/login")
            console.log(res.message);
        }
        catch(e){
            console.log(e)
            if(error.response && error.response.status>=400 && error.response.status<=500){
                setError(error.response.data.message)
            }
        }
    }

  return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
{/* for left */}
    	<div className={styles.left}>
            <h1>welcome back</h1>
            <Link to="/login">
                <button type="button" className={styles.white_btn}>Sign In</button>
            </Link>
        </div>

{/* for right */}
        <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create account</h1>
                <input type="text" placeholder="Name" name="firstName" onChange={handleChange} value={data.firstName} required className={styles.input}/>
                <input type="tel" maxLength="10" placeholder="number" name="number" onChange={handleChange} value={data.number} required className={styles.input}/>
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input}/>
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input}/>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>Sign Up</button>
            </form>
        </div>
        </div>
    </div>
  )
}
export default Signup