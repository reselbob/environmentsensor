import { URL } from 'url';
import axios from 'axios';
import {AxiosError} from 'axios';
import {TemperatureData} from "./deviceInfo";
interface DispatchParams<T> {
    payload: Array<T>;
    targetUrl: URL;
}

/**
 * This class implements dispatch behavior to
 * an external service
 */
export class Dispatcher {
    /**
     * The class method that executes dispatch behavior
     * @param payload, the data in JSON format to dispatch
     * @param targetUrl, the URL of the external service receiving
     * the payload data
     */
    static async dispatch<T>({payload, targetUrl}: DispatchParams<T>): Promise<void>{
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
    };
}
