import { useState } from "react"
import config from "../../config"
import classes from "./Searchbar.module.css"
const Searchbar = () => {
    const [search, setSearch] = useState('')
    const [users,setUsers] = useState({})
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }   
    const findUserByEmail = async() => {
      try {
        const response = await fetch(config.API_URL+ "/users/find",{
          method:"post",
          headers:{
            "content-type":'application/json'
          },
          credentials:'include',
          body:JSON.stringify({email:search})
        })

        if(response.status === 200){
          const result = await response.json();
          setUsers(result.user)
        }else{
          console.log("User not found");
          
        }
      } catch (error) {
        
      }
    }



  return (
    <div className={classes.searchWrapper}>
        <input type="text" value={search} onChange={handleSearch} />
        <button onClick={findUserByEmail}>Search</button>
        <div className={classes.dropdown}>
          {

              // <p>{users.username}</p>
          }
        </div>
    </div>
  )
}

export default Searchbar

// /users/find