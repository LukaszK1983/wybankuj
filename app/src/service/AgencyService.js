import http from '../http-common';

class AgencyDataService {

    getAll(bankId) {
        return http.get(`/agencies/${bankId}`);
    }

    get(id) {
        return http.get(`/agency/${id}`);
    }

    create(data) {
        return http.post("/agency/add", data);
    }

    update(id, data) {
        return http.put(`/agency/${id}`, data);
    }

    delete(id) {
        return http.delete(`/agencies/${id}`);
    }
}

export default new AgencyDataService();