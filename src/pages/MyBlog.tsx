import { useAuth } from '../context/AuthContext';

const MyBlog = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1>Hej och välkommen {user ? user.username : ""}</h1>
    </div>
  )
}

export default MyBlog