import styles from "../../styles/signup.module.css";
import Background from "../../images/background.jpg";
import  Link  from "next/link";
import { useState } from "react";
import axios from "axios"; 
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend API
      const response = await axios.post(
        "/api/users/signup",
        {
          username,
          email,
          password,
        }
      );
        router.push("/")
      // Handle successful signup
      console.log("User signed up successfully:", response);
      
    } catch (error) {
      // Handle signup error
      console.error("Error signing up user:", error.response);
      // You can display an error message to the user
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupWrapper}>
        <h1>SignUp</h1>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          {" "}
          {/* Attach handleSubmit to form onSubmit event */}
          <label>User Name</label>
          <input
            placeholder="Last Name"
            type="text"
            size="15"
            name="username"
            value={username}
            onChange={(e) => setUserName(e?.target?.value)}
            required
          />
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            pattern="[/^\S+@\S+$/i]"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            required
          />
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            pattern="[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/]"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            required
          />
          <Button type="submit" children="Sign Up" variant="main" />
          <div>
            <Link href="/" className={styles.link}>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.imageWrapper}>
        <Image className={styles.img} src={Background} alt="Signup" />
      </div>
    </div>
  );
};
export default SignUp;
