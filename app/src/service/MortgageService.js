import http from '../http-common';

class MortgageDataService {

    getAll(bankId) {
        return http.get(`/mortgages/${bankId}`);
    }

    get(id) {
        return http.get(`/mortgage/${id}`);
    }

    create(data) {
        return http.post("/mortgage/add", data);
    }

    update(id, data) {
        return http.put(`/mortgage/${id}`, data);
    }

    delete(id) {
        return http.delete(`/mortgages/${id}`);
    }
}

export default new MortgageDataService();