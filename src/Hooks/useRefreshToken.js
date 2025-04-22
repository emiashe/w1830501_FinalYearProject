import axios from '../axios';
import useAuth from '../Hooks/useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
          const response = await axios.get('/refresh');
          setAuth(prev => ({
            ...prev,
            roles: response.data.roles,
            accessToken: response.data.accessToken
          }));
          return response.data.accessToken;
        } catch (err) {
          setAuth({});
          throw err;
        }
    }
    return refresh;
};

export default useRefreshToken;