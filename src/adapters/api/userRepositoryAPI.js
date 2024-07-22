import apiConfig from '../../config/apiConfig';
import User from '../../core/entities/User';

const userRepositoryAPI = {
  getUserById: async (userId) => {
    const response = await fetch(`${apiConfig.baseUrl}/users/${userId}`);
    const userData = await response.json();
    return new User(userData.user_id, userData.name, userData.amount);
  },
};

export default userRepositoryAPI;
