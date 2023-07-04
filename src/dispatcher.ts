import { URL } from 'url';
import axios from 'axios';
import {AxiosError} from 'axios';
import {TempData} from "./deviceInfo";
interface DispatchParams {
    payload: Array<TempData>;
    targetUrl: URL;
}

export class Dispatcher {
    static async dispatch({payload, targetUrl}: DispatchParams): Promise<void>{
        async function postData() {
            try {
                console.log('Posting:', payload);
                const response = await axios.post(targetUrl.href, payload);
                console.log('Response:', response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handle Axios-related errors
                    const axiosError = error as AxiosError;
                    console.error('Axios Error:', axiosError.message);
                    console.error('Axios Response:', axiosError.response?.data);
                } else {
                    // Handle other types of errors
                    console.error('Error:', error);
                }
            }
        }
    };
}
