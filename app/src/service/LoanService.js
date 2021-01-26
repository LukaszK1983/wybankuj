import http from '../http-common';

class LoanDataService {

    getAll(bankId) {
        return http.get(`/loans/${bankId}`);
    }

    get(id) {
        return http.get(`/loan/${id}`);
    }

    create(data) {
        return http.post("/loan/add", data);
    }

    update(id, data) {
        return http.put(`/loan/${id}`, data);
    }

    delete(id) {
        return http.delete(`/loans/${id}`);
    }
}

export default new LoanDataService();