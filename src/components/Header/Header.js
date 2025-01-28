import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import './style.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const logOutProfile = () => {
    user.loggedin = false
    logout(user)
    navigate('/Recipe-Book/login');
  }

  const routeToAddRecipe = () => {
    navigate('/Recipe-Book/addrecipe')
  }

  return (
    <div>
      <header>Recipe Book</header>
      {user && user.loggedin && window.location.pathname ==='/Recipe-Book/home' && <span onClick={routeToAddRecipe} className='addRecipe'>Recipe Form</span>}
      {user && user.loggedin && <span onClick={logOutProfile} className='logOut'>Log Out</span>}
    </div>
  )
}

export default Header;
