import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {

  // EMPTY ARRAY OF USERS TO START
  let users = []

  // STATE TO KEEP TRACK OF USER LIST
  const [ usersList, setUsersList ] = useState(users)

  // FUNCTION TO ADD NEW USERS TO LIST FROM FORM DATA
  const userFormHandler = (user) => {
    console.log(user)

    setUsersList((prevUsers) =>
      [ user, ...prevUsers ]
    )
  }

  return (

    <div>

      <AddUser onAddUser = { userFormHandler } />

      <UsersList users = { usersList }/>

    </div>

  );
}

export default App;
