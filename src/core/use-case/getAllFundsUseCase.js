import fundRepository from '../../ports/fundRepository';

const getAllFundsUseCase = async () => {
    return await fundRepository.getAllFunds();
};

export default getAllFundsUseCase;
