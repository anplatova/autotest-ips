import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method, AxiosResponse } from 'axios'
import { token } from "../../credential"

type APIProviderPArameter = {
    isSuccesfulResponce: boolean,
}

class GitAPIProvider {
    protected isSuccesfulResponce: boolean
    protected headers: AxiosRequestHeaders
    protected personalToken = token

    constructor(parameter?: APIProviderPArameter) {
        this.isSuccesfulResponce = parameter?.isSuccesfulResponce ?? true
        this.headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${this.personalToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }

    protected configureRequest(
        url: string,
        method: Method,
        data?: string | FormData,
    ): AxiosRequestConfig {
        return {
            data,
            headers: this.headers,
            method,
            url: `https://api.github.com${url}`,
        }
    }

    protected sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (!this.isSuccesfulResponce) {
            config['validateStatus'] = status => Boolean(status)
        }

        return axios(config)
    }
}

export {
    GitAPIProvider,
}