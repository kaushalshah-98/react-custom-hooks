import { IRestResponse } from '@models';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
import { get } from 'lodash';

export interface RequestHandlerType {
  method: 'PUT' | 'POST' | 'GET' | 'DELETE';
  url: string;
  extract: string | number | symbol;
  defaultValue?: [] | '' | null | undefined | '' | 0 | true | false | {};
}
const useFetch = (props: RequestHandlerType) => {
  const { method, url, extract, defaultValue } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData]: [any, any] = useState();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    console.log('calling');
    if (method === 'DELETE') {
      handleDeleteRequest();
    } else if (method === 'GET') {
      handleGetRequest();
    } else if (method === 'POST') {
      handlePostRequest();
    } else if (method === 'PUT') {
      handlePutRequest();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const refetch = (params?: string) => {
    if (method === 'DELETE') {
      handleDeleteRequest(params);
    } else if (method === 'GET') {
      handleGetRequest(params);
    } else if (method === 'POST') {
      handlePostRequest(params);
    } else if (method === 'PUT') {
      handlePutRequest(params);
    }
  };
  const handleGetRequest = async (params?: string): Promise<any> => {
    try {
      if (isMounted.current) setLoading(true);
      const finalUrl = BASE_URL + (params ?? url);
      console.log(finalUrl);
      const headers = {
        authorization: Cookies.get('token')
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.get(finalUrl, config);
      res = await get(res, extract, defaultValue || null);
      if (isMounted.current) setData(res);
      return res;
    } catch (err) {
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
    // const finalUrl = BASE_URL + url;
    // const headers = {
    //   authorization: Cookies.get('token')
    // };
    // const config: AxiosRequestConfig = { headers };
    // return axios
    //   .get(finalUrl, config)
    //   .then(setData)
    //   .catch((err) => setError(err))
    //   .finally(() => setLoading(false));
  };
  const handlePostRequest = async (params?: string): Promise<any> => {
    try {
      if (isMounted.current) setLoading(true);
      const finalUrl = BASE_URL + (params ?? url);
      const headers = {
        authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.post(finalUrl, config);
      res = get(res, extract, defaultValue || null);
      if (isMounted.current) setData(res);
      return res;
    } catch (err) {
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };
  const handlePutRequest = async (params?: string): Promise<any> => {
    try {
      if (isMounted.current) setLoading(true);
      const finalUrl = BASE_URL + (params ?? url);
      const headers = {
        authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.put(finalUrl, config);
      res = get(res, extract, defaultValue || null);
      if (isMounted.current) setData(res);
      return res;
    } catch (err) {
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };
  const handleDeleteRequest = async (params?: string): Promise<any> => {
    try {
      if (isMounted.current) setLoading(true);
      const finalUrl = BASE_URL + (params ?? url);
      const headers = {
        authorization: Cookies.get('token')
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.delete(finalUrl, config);
      res = get(res, extract, defaultValue || null);
      if (isMounted.current) setData(res);
      return res;
    } catch (err) {
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };
  return {
    loading,
    error,
    data,
    refetch,
    handleGetRequest,
    handleDeleteRequest,
    handlePostRequest,
    handlePutRequest
  };
};

export { useFetch };

// const { data, isLoading, hasError, handleRequest } = useRequestHandler();
