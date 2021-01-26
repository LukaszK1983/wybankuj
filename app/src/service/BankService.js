import http from '../http-common';

class BankDataService {

    getAll() {
        return http.get("/bank");
    }

    get(id) {
        return http.get(`/bank/${id}`);
    }

    create(data) {
        return http.post("/bank/add", data);
    }

    update(id, data) {
        return http.put(`/bank/${id}`, data);
    }

    delete(id) {
        return http.delete(`/bank/${id}`);
    }
}

export default new BankDataService();