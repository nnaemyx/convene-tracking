import styles from "./error.module.css";
import { useRouteError } from "react-router-dom";

const ErrorPage = () =>{
    const error = useRouteError();
    console.error(error);
    return(
        <div className={styles.error}>
          <p>Ooops!</p>
          <p>Sorry, an unexpected error has occured.</p>
          <p>
          <i>{error.statusText || error.message}</i>
          </p>
        </div>
    )
}


export default ErrorPage;