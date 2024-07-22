import userRepository from '../../../ports/userRepository';

const getUser = async (userId) => {
    return await userRepository.getUserById(userId);
};

export default getUser;
