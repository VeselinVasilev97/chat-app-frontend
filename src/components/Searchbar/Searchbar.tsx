import { useState } from "react";
import useUserSearch from "../../hooks/users/useUsers";
import classes from "./Searchbar.module.css";
import useClickOutside from "../../hooks/componentsHooks/useClickOutside";
import { useNavigate } from "react-router-dom";
// import { useModal } from "../../Providers/ModalContextProvider/ModalContext";

const Searchbar = () => {
  const {
    searchParam,
    setSearchParam,
    users,
    loading,
    error,
    findMatchingUsers,
    findUserByEmail,
  } = useUserSearch();

  const [dropdownVisible, setDropdownVisible] = useState(true);
  const dropdownRef = useClickOutside(() => setDropdownVisible(false));
  const navigate = useNavigate()


  const handleOpenDropdown = () => {
    if (users.length > 0) setDropdownVisible(true)
  }

  const handleFindSpecificUser = async (userId: string) => {
    try {
      const result = await findUserByEmail(userId)
      if (result) {
        navigate(`/main/user/${userId}`)
      } else {
        console.log('USER NOT FOUND');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.searchWrapper}>
      <div className={classes.searchWrapper}>
        <form onSubmit={findMatchingUsers} className={classes.searchBarAndBtn}>
          <input
            type="text"
            value={searchParam}
            onClick={handleOpenDropdown}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Search users..."
          />
          <button className={classes.searchBtn} type="submit" disabled={loading}>
            Search
          </button>
        </form>
      </div>



      {
        dropdownVisible && users.length > 0 && (
          <div className={classes.dropdown} ref={dropdownRef}>
            {users.map((user) => (
              <button onClick={() => handleFindSpecificUser(user.user_id)} key={user.email}>{user.username}</button>
            ))}
          </div>
        )
      }
    </div >
  );
};

export default Searchbar;
