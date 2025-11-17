import { useUser } from '../../../context/UserContext';
import Home from './Home';
import HomeUser from './HomeUser';

const HomeRouter = () => {
  const { userData } = useUser();
  
  // Si es administrador, mostrar Home (admin), si no, mostrar HomeUser
  return userData.rol === 'Administrador' ? <Home /> : <HomeUser />;
};

export default HomeRouter;
