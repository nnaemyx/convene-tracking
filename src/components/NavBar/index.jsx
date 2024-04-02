import styles from "./navbar.module.css";
import logo from "./logo.png";
import Button from "../Button";
import { useRouter } from "next/router";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "@/utils/Localstorage";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const loggedinUser = getUserFromLocalStorage();

  const handleLogout = () => {
    //  Remove user Data from local storage
    removeUserFromLocalStorage();
    router("/login");
  };

  return (
    <nav className={styles.nav}>
      <Image src={logo} alt="convene logo" className={styles.navImg} />

      <div className={`${styles.navBtn} ${styles.show}`}>
        {loggedinUser ? (
          <>
            <p className={styles.userName}>
              Welcome, {loggedinUser?.user?.username}
            </p>
            <Button
              children="Logout"
              fullwidth="false"
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <Link href="/login">
            <Button
              children="Login"
              fullwidth="false"
             
            />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
