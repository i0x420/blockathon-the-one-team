import { KEY_STORE } from "@/common/constants";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";

// import crypto from "crypto-js";
import { get } from "lodash";
import qs from "query-string";

// import { useWalletStore } from "stores/useWalletStore";

import {
  genErrorResponse,
  genSuccessResponse,
  getCookie,
} from "@/common/functions";
import { IGateway, REQUEST_TYPE } from "@/services/types/api";

type Config = AxiosRequestConfig & {
  headers: {
    signature?: string;
    onChainSignature?: string;
  };
};

let xhrPool: CancelTokenSource[] = [];

export class ApiService {
  static async getData<T>({
    endpoint,
    queryBody,
    linkServer,
    options,
  }: Omit<IGateway, "body">) {
    return this.postGateway<T>({
      method: REQUEST_TYPE.GET,
      endpoint,
      linkServer,
      queryBody,
      options,
    });
  }

  static async postData<T>({
    endpoint,
    body,
    linkServer,
    options,
  }: Omit<IGateway, "queryBody">) {
    return this.postGateway<T>({
      method: REQUEST_TYPE.POST,
      endpoint,
      body,
      linkServer,
      options,
    });
  }

  static async putData<T>({
    endpoint,
    body,
  }: Pick<IGateway, "endpoint" | "body">) {
    return this.postGateway<T>({
      method: REQUEST_TYPE.PUT,
      endpoint,
      body,
    });
  }

  static async deleteData<T>({
    endpoint,
    queryBody,
  }: Pick<IGateway, "endpoint" | "queryBody">) {
    return this.postGateway<T>({
      method: REQUEST_TYPE.DELETE,
      endpoint,
      queryBody,
    });
  }

  static async postGateway<T>({
    endpoint,
    method = REQUEST_TYPE.GET,
    body,
    linkServer,
    queryBody,
    options,
  }: IGateway) {
    try {
      let token: string;
      let signature: string;
      let queryStr = "";
      let passwordHash = "";

      try {
        if (typeof window !== "undefined") {
          // const activeWallet = useWalletStore.getState().activeWallet;
          // const activeAddress = activeWallet ? activeWallet.address : "";
          // signature = getSignatureByWallet(activeAddress);
          token = getCookie(KEY_STORE.JWT_TOKEN);
        } else {
          signature = "";
          token = "";
        }
      } catch (error) {}

      const serverUrl = linkServer || process.env.NEXT_PUBLIC_BASE_URL;

      const cancelTokenSource = axios.CancelToken.source();
      xhrPool.push(cancelTokenSource);

      const config: Config = {
        timeout: 60000,
        headers: {
          os: "extension",
          Accept: "application/json",
          // 'User-Agent': `DM Mozilla/5.0, KR dagora/1.0.1 ID (Macintosh ; Intel Mac OS X 10_15_7 web-dagora) Iphone-dagora DMKRIDKWE`,
          // 'Content-Type': 'application/json',
          // Version: "1",
          // Source: source[type],
          Authorization: `Bearer ${token}`,
        },
        cancelToken: cancelTokenSource.token,
      };

      if (signature) {
        config.headers.onChainSignature = signature;
      }

      if (queryBody) {
        let qsOptions = {} as qs.StringifyOptions;
        if (get(options, "disableEncodeQS", false)) {
          qsOptions = { encode: false };
        }
        queryStr = `?${qs.stringify(queryBody, {
          skipNull: true,
          ...qsOptions,
        })}`;
      }

      if (method !== REQUEST_TYPE.GET && method !== REQUEST_TYPE.DELETE) {
        passwordHash = JSON.stringify(body || {});
      } else {
        passwordHash = queryStr;
      }

      // const hashPassword = crypto.HmacSHA256(passwordHash, SPAM_TOKEN || "");
      // config.headers.signature = hashPassword;

      const axiosInstance = this.setupInterceptors(axios.create(config));

      const response: AxiosResponse = await axiosInstance[method](
        serverUrl + endpoint + queryStr,
        body
      );

      let finalData = get(response, "data");

      if (typeof finalData === "object" && finalData.success) {
        finalData = finalData.data;
      }

      return genSuccessResponse<T>(finalData);
    } catch (err) {
      return Promise.reject(
        genErrorResponse(
          err.response?.data?.data?.errMess || err.message || "error_system"
        )
      );
    }
  }

  static setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(
      this.onRequest,
      this.onErrorResponse
    );
    axiosInstance.interceptors.response.use(
      this.onResponse,
      this.onErrorResponse
    );
    return axiosInstance;
  }

  static onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  static onResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  static onErrorResponse(error: AxiosError | Error): Promise<AxiosError> {
    console.log("error: ", error);
    return Promise.reject(error);
  }

  static async cancelAllRequest() {
    if (xhrPool.length > 0) {
      xhrPool.forEach((cancelSource) => cancelSource.cancel());
      xhrPool = [];
    }
  }
}
