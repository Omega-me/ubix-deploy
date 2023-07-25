/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';
import { eApiRoutes, eHttpMethod, eQueryKeys } from 'common/enums';
import { IMuattionConfig, IQueryConfig } from 'common/interfaces';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
import { QueryFilters } from 'react-query/types/core/utils';
import { httpClient } from 'services';
import useAuth from './useAuth';

/**
 *
 * @param config
 * @returns
 */
export const useUserQuery = <TData = any>(config?: IQueryConfig<TData>) => {
  const auth = useAuth<{ token: string }>();
  const queryClient = useQueryClient();

  let hasAuthentication = true;
  let url: string = eApiRoutes.USERS;
  let keys: QueryKey = [eQueryKeys.USERS];

  if (config?.queryConfig?.queryUrl) {
    url = `${eApiRoutes.USERS}/${config.queryConfig.queryUrl}`;
    keys = [...keys, config.queryConfig.queryUrl];
  }
  if (config?.queryConfig?.queryParam) {
    url = `${eApiRoutes.USERS}/${config.queryConfig.queryParam}`;
    keys = [...keys, config.queryConfig.queryParam];
  }
  if (config?.queryConfig?.queryKey) {
    keys = [...keys, config?.queryConfig?.queryKey];
  }
  if (config?.queryConfig?.queryString) {
    keys = [...keys, config.queryConfig.queryString];
    url = `${eApiRoutes.USERS}?${config.queryConfig.queryString}`;
  }

  if (config?.httpConfig?.axiosConfig?.hasAuth) {
    hasAuthentication = config?.httpConfig?.axiosConfig?.hasAuth;
  }

  let axiosConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${auth?.data?.token}`,
      ...config?.httpConfig?.axiosConfig?.headers,
    },
    ...config?.httpConfig?.axiosConfig,
  };
  if (!hasAuthentication) {
    axiosConfig = {
      ...config?.httpConfig?.axiosConfig,
    };
  }

  const { data, ...query } = useQuery(
    keys,
    () =>
      httpClient(eHttpMethod.GET, url, {
        axiosConfig,
        message: config?.httpConfig?.message,
        ...config?.httpConfig,
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(eApiRoutes.USERS);
        if (config?.queryConfig?.queryOptions?.onSuccessFn) {
          config?.queryConfig?.queryOptions?.onSuccessFn(data);
        }
      },
      ...config?.queryConfig?.queryOptions,
    }
  );

  /**
   *
   * @param queryKey
   * @param filters
   * @returns
   */
  const getCachedData = <TData = unknown>(queryKey: QueryKey = keys, filters?: QueryFilters): TData | undefined => {
    return queryClient.getQueryData(queryKey, filters);
  };
  return {
    data: data,
    ...query,
    getCachedData,
  };
};

/**
 *
 * @param config
 * @returns
 */
export const useUserMutation = <TData = unknown>(config?: IMuattionConfig<TData>) => {
  const { data } = useAuth<{ token: string }>();
  const queryClient = useQueryClient();

  let hasAuthentication = true;
  let methode: eHttpMethod = eHttpMethod.POST;
  let url: string = eApiRoutes.USERS;
  let keys: QueryKey = [eQueryKeys.USERS];

  if (config?.queryConfig?.queryUrl) {
    url = `${eApiRoutes.USERS}/${config.queryConfig.queryUrl}`;
    keys = [...keys, config.queryConfig.queryUrl];
  }
  if (config?.queryConfig?.queryParam) {
    url = `${eApiRoutes.USERS}/${config.queryConfig.queryParam}`;
    keys = [...keys, config.queryConfig.queryParam];
    methode = eHttpMethod.PATCH;
  }
  if (config?.queryConfig?.queryKey) {
    keys = [...keys, config?.queryConfig?.queryKey];
  }
  if (config?.httpConfig?.methode) {
    methode = config.httpConfig.methode;
  }

  if (config?.httpConfig?.httpOptions?.axiosConfig?.hasAuth) {
    hasAuthentication = config?.httpConfig?.httpOptions?.axiosConfig?.hasAuth;
  }

  let axiosConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${data?.token}`,
      ...config?.httpConfig?.httpOptions?.axiosConfig?.headers,
    },
    ...config?.httpConfig?.httpOptions?.axiosConfig,
  };
  if (!hasAuthentication) {
    axiosConfig = {
      ...config?.httpConfig?.httpOptions?.axiosConfig,
    };
  }

  const mutation = useMutation(
    data =>
      httpClient(methode, url, {
        data,
        axiosConfig,
        message: config?.httpConfig?.httpOptions?.message,
      }),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(eApiRoutes.USERS);
        if (config?.queryConfig?.queryOptions?.onSuccessFn) {
          config?.queryConfig?.queryOptions?.onSuccessFn(data);
        }
      },
      ...config?.queryConfig?.queryOptions,
    }
  );

  /**
   *
   * @param queryKey
   * @param filters
   * @returns
   */
  const getCachedData = <TData = unknown>(queryKey: QueryKey = keys, filters?: QueryFilters): TData | undefined => {
    return queryClient.getQueryData(queryKey, filters);
  };
  return {
    ...mutation,
    getCachedData,
  };
};
