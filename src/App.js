import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

function App() {

  const userData = [
    { id: uuidv4(), name: 'Tania', username: 'Butterfly'},
    { id: uuidv4(), name: 'Craig', username: 'Mr. Developer'},
    { id: uuidv4(), name: 'Ben', username: 'Beniphere'},
  ] 

  //Uso de State
  const [users, setUsers] = useState(userData);

  //Agregar usuario
  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([
      ...users,
      user
    ])
  }

  // Eliminar Usuario
  const deleteUser = (id) => {
  //console.log(id)

    const arrayFiltro = users.filter(user => user.id !== id);
    setUsers(arrayFiltro);
  }

  //Editar Usuario
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] =useState({
    id: null, name: '', username: ''
  });

  const editRow = (user) =>{
    setEditing(true);
    setCurrentUser({
      id: user.id, name: user.name, username: user.username
    })
  }

  //Actualizar datos

  const updateUser = (id, updateUser) =>{
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updateUser : user)))
  }

  return (
   <div className="container">
     <h1>Aplicación CRUD con Hooks</h1>
     <div className="flex-row">
       <div className="flex-large">

        {
          editing ? (
            <div> 
            <h2>Editar Usuario</h2>
            <EditUserForm
            currentUser={currentUser}
            updateUser={updateUser}/>
            </div>
          ) : (
            <div>
            <h2>Agregar Usuario</h2>
            <AddUserForm addUser={addUser} />
            </div>
          )
        }

       </div>
       <div className="flex-large">
         <h2>Ver usuarios</h2>
         <UserTable 
         users={users} 
         deleteUser={deleteUser}
         editRow={editRow}
         />
         </div>
     </div>
   </div>
  );
}

export default App;
