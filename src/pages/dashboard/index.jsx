import Feed from "@/components/Feed";
import styles from "../../styles/dashboard.module.css";
import SideMenu from "@/components/SideMenu";

const Dashboard = () => {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <SideMenu />
        <Feed />
      </div>
    </div>
  );
};
export default Dashboard;
