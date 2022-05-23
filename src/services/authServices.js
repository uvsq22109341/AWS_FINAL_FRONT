import axios from "axios";
import jwtDecode from "jwt-decode";
const apiUrl = "http://localhost:28001/api";

export function login(data) {
    return axios.post(apiUrl + '/login', data);
}

export function registre(data) {
    return axios.post(apiUrl + '/users', data);
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem("token");
}