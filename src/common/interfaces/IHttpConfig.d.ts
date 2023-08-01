/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryOptions, UseMutationOptions, QueryKey } from 'react-query';
import { AxiosRequestConfig } from 'axios';
import { eHttpMethod } from 'common/enums';

interface IAxiosConfig extends AxiosRequestConfig {
  hasAuth?: boolean;
}
export interface IHttpConfig<TData = unknown> {
  data?: TData;
  axiosConfig?: IAxiosConfig;
  message?: string;
}

//TODO:fix
export interface IResponse<TData = unknown> {
  data: TData | null;
  count?: number | null;
  status: string;
}

interface IQueryOptions extends Omit<UseQueryOptions<TData, any, any, any>, 'queryKey' | 'queryFn'> {
  onSuccessFn?: (data: TData) => void;
}
interface IMutationOptions extends Omit<UseMutationOptions<TData, any, any, any>, 'mutationFn'> {
  onSuccessFn?: (data: TData) => void;
}
export interface IQueryConfig<TData = unknown> {
  httpConfig?: IHttpConfig<TData>;
  queryConfig?: {
    queryOptions?: IQueryOptions;
    queryKey?: QueryKey;
    queryParam?: string;
    queryString?: string;
    queryUrl?: string;
  };
}
export interface IMuattionConfig<TData = unknown> {
  httpConfig?: {
    methode?: eHttpMethod;
    httpOptions?: IHttpConfig<TData>;
  };
  queryConfig?: {
    queryOptions?: IMutationOptions;
    queryKey?: QueryKey;
    queryParam?: string;
    queryString?: string;
    queryUrl?: string;
  };
}

export interface IGlobalQueryConfig<TData = unknown> {
  httpConfig?: IHttpConfig<TData>;
  queryConfig: {
    queryOptions?: Omit<UseQueryOptions<TData, any, any, any>, 'queryKey' | 'queryFn'>;
    queryKey?: QueryKey;
    queryUrl: string;
  };
}

export interface IGlobalMutationConfig<TData = unknown> {
  httpConfig?: {
    methode?: eHttpMethod;
    httpOptions?: IHttpConfig<TData>;
  };
  queryConfig: {
    queryOptions?: Omit<UseMutationOptions<TData, any, any, any>, 'mutationFn'>;
    queryKey?: QueryKey;
    queryUrl: string;
  };
}
