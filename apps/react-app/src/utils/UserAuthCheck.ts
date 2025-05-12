import { StorageKeys } from "../config";

export function isUserAuthenticated() {
    const token = localStorage.getItem(StorageKeys.userToken);

    if(!token)  return false;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.exp * 1000 > Date.now();
}