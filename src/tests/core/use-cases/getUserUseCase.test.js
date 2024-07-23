import getUserUseCase from '../../../core/use-case/getUserUseCase';
import userRepository from '../../../ports/userRepository';

jest.mock('../../../ports/userRepository');

test('debería buscar el usuario por id', async () => {
    const user = { id: 2, name: 'Sebastian', amount: 500000 };
    userRepository.getUserById.mockResolvedValue(user);

    const fetchedUser = await getUserUseCase(2);
    expect(fetchedUser).toEqual(user);
});
