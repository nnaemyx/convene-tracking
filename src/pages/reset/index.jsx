import Button from "@/components/Button";
import styles from "../../styles/reset.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Reset = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        // Password and confirmation password do not match
        toast.error("Passwords do not match");
        return;
      }
      // Send a request to your "Reset Password" API route
      const response = await fetch("/api/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          resetToken: router.query.token, // Get the reset token from the URL
        }),
      });

      if (response.ok) {
        // Password reset successful, you can redirect the user to a success page
        toast.success("Password reset successful");
        router.push("/");
      } else {
        // Handle password reset error, e.g., display an error message to the user
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.reset}>
      <h1>Recover Password</h1>
      <h3>
        To reset your password, enter the email address linked to your convene
        account.
      </h3>
      <form onSubmit={resetPassword}>
        <div>
          <input
            name="newPassword"
            placeholder="Password"
            label="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e?.target.value)}
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e?.target.value)}
          />
        </div>
        <Button
          children="Reset password"
          fullwidth="false"
          variant="secondary"
        />
      </form>
      <div className={styles.link}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 448 512"
          style={{ fill: "#008000", width: "2rem", height: "-2rem" }}
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
        <Link href="/login">
          <p>Back to login</p>
        </Link>
      </div>
    </div>
  );
};

export default Reset;
