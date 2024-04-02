import Link from 'next/link';
import styles from './sidemenu.module.css'
import { AiOutlineTeam, AiOutlineUser, AiTwotoneBank  } from "react-icons/ai";



const SideMenu = () => {
  return (
    <aside className={styles.sidemenu}>
      <Link href="/" className={styles.asideLink}>
      <AiTwotoneBank /> Home</Link>
      <Link href="/profile" className={styles.asideLink}>
      <AiOutlineUser />Profile</Link>
      <Link href="/admin" className={styles.asideLink}>
      <AiOutlineTeam />Admin</Link>
    </aside>
  );
};

export default SideMenu;
