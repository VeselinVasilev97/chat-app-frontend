import { useState } from "react"
import config from "../../config"

const Searchbar = () => {
    const [search, setSearch] = useState('')

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
          console.log(result);
        }else{
          console.log("User not found");
          
        }
      } catch (error) {
        
      }
    }



  return (
    <div>
        <input type="text" value={search} onChange={handleSearch} />
        <button onClick={findUserByEmail}>Search</button>
    </div>
  )
}

export default Searchbar

// /users/find