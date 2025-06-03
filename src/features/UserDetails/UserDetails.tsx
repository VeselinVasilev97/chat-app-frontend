import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../services/apiService';
import { formatDate } from '../../utils/functions';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import classes from './UserDetails.module.css';
const UserDetails = () => {
  const params = useParams()
  const userId = params.userid;
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const getSpecificUserData = async () => {
    if (!loading) {
      setLoading(true)
    }
    const reponse = await apiService.get(`/api/user/${userId}`)
    if (!reponse.data) {
      console.log("No user found")
    } else {
      setCurrentUser(reponse.data)
    }
    setLoading(false);
  }



  useEffect(() => {
    getSpecificUserData()
  }, [userId])

  if (loading) { <LoadingComponent /> }
  return (
    currentUser && (
      <div className={classes.column}>
        <h1 className={classes.username}>{currentUser.username}</h1>
        <div className={classes.row}>
          <div className={classes.profileImageContainer}>
            {currentUser.profile_picture_url
              ?
              <img className={classes.profileImage} src={currentUser.profile_picture_url} alt="Profile" />
              :
              <div className={classes.profileImage}>
                <p>asd</p>
              </div>
            }
          </div>
          <div>
            <h2>{currentUser.name}</h2>
            <div>
              <button className={classes.followButton}>Send friend request</button>
              <button className={classes.followButton}>Message</button>
            </div>
            <div className={classes.profileInfoTextPair}>
              <p className={classes.profileInfoKeyText}>Email:</p><p className={classes.profileInfoValueText}> {currentUser.email}</p>
            </div>
            <div className={classes.profileInfoTextPair}>
              <p className={classes.profileInfoKeyText}>Joined:</p><p className={classes.profileInfoValueText}> {formatDate(currentUser.created_at)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default UserDetails