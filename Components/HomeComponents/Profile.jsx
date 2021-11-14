import React, { useEffect, useState } from "react";
import isAuthenticated from "../../Authentication/authCheck";
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(async () => {
    const user = await isAuthenticated();
    console.log("Inside Profile Component !!!!!!!!!!");
    console.log(user);
    setCurrentUser(user);
  }, []);
  console.log(currentUser);
  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <div className={styles.title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="icon align-text-bottom"
          >
            <path d="M476 65H36C16.7 65 1 80.7 1 100v312c0 19.3 15.7 35 35 35h440c19.3 0 35-15.7 35-35V100c0-19.3-15.7-35-35-35zm5 347c0 2.8-2.2 5-5 5H36c-2.8 0-5-2.2-5-5V100c0-2.8 2.2-5 5-5h440c2.8 0 5 2.2 5 5v312z"></path>
            <path d="M135 161c-30.3 0-55 24.7-55 55s24.7 55 55 55 55-24.7 55-55-24.6-55-55-55zm0 80c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25zm289-80H248c-8.3 0-15 6.7-15 15s6.7 15 15 15h176c8.3 0 15-6.7 15-15s-6.7-15-15-15zm0 80H248c-8.3 0-15 6.7-15 15s6.7 15 15 15h176c8.3 0 15-6.7 15-15s-6.7-15-15-15zm-103.8 80H248c-8.3 0-15 6.7-15 15s6.7 15 15 15h72.2c8.3 0 15-6.7 15-15s-6.7-15-15-15z"></path>
          </svg>
          <p>PERSONAL DETAILS</p>
        </div>
        <div className={styles.userDetails}>
          <ul className={styles.singleField}>
            <li>
              <p>Name</p>
              <p></p>
            </li>
            <li>
              <p>Email</p>
              <p></p>
            </li>
            <li>
              <p>Phone Number</p>
              <p></p>
            </li>
            <li>
              <p>Session Expiry</p>
              <p></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
