import styles from "../../styles/button.module.css";

const Button = ({variant = "primary", size = "large",fullwidth = true, type,children,
}) =>{
    return (
        <button
        data-variant = {variant}
        data-size = {size}
        data-fullwidth = {fullwidth}
        type={type}
        className={styles.btn}
        >
        {children}
        </button>
    )
}

export default Button;
