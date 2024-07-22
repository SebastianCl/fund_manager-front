import apiConfig from '../../config/apiConfig';

const fundGetAllRepositoryAPI = {
    getAllFunds: async () => {
        const response = await fetch(`${apiConfig.baseUrl}/funds`);
        if (!response.ok) {
            throw new Error('Error al cargar los fondos');
        }
        const fundsData = await response.json();
        fundsData.sort((a, b) => b.amount - a.amount);

        return fundsData;
    },
};

export default fundGetAllRepositoryAPI;
