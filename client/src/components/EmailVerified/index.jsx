import styles from "./styles.module.css";
import {useState, useEffect, Fragment} from "react";
import axios from "axios"
import {Link, useParams} from "react-router-dom"
const EmailVerified =()=>{
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(()=>{
        const verifyEmailUrl = async ()=>{
            try{
                const url = `http://localhost:8000/api/users/${param.id}/verify/${param.token}`
                const {data} = await axios.get(url);
                console.log(data)
                setValidUrl (true)
            }
            catch(e){
                console.log(e)
                setValidUrl(false)
            }
        }
        verifyEmailUrl()
    },[param])//call these function only once when param changed

    return(
        <Fragment>
            {validUrl?(
                <div className={styles.container}>
                    <h1>Success</h1>
                    <Link to="/login"><button className={styles.green_btn}>Login</button></Link>
                </div>
            ):(
                <h1>404 ERROR</h1>
            )}
        </Fragment>
    )
}
export default EmailVerified
