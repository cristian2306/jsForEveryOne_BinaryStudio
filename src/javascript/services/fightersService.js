import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getFighterDetails(id) {
        const endPoint = `detail/fighter/${id}.json`;
        const apiResult = await callApi(endPoint, 'GET');
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
        return apiResult;
    }
}

const fighterService = new FighterService();

export default fighterService;
