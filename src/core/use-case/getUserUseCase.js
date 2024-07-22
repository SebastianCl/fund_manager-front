import userRepository from '../../ports/userRepository';

const getUserUseCase = async (userId) => {
    return await userRepository.getUserById(userId);
};

export default getUserUseCase;
