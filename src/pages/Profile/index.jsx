import styles from './profile.module.css';
import NavBar from '../../NavBar';
const Profile =() => {
  return (
    <>
    <NavBar/>
    <div className={styles.profileContainer}>
      <h1 className={styles.animatedHeading}>Welcome, Eniola</h1>
      {/* profile picture */}
      <ul>
        You have:
        <li>Suggested: 6 topics</li>
        <li>Upvoted: 80 times</li>
        <li>Downvoted: 21 times</li>
      </ul>
    </div>
    </>
    
  )
}

export default Profile
