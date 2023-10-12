/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from 'react-router-dom';

import { QueryClient } from '@tanstack/react-query';

import { MutationErrorResponse } from '@/types';

import type {
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const queryConfig: DefaultOptions<AxiosError<ErrorResponse | MutationErrorResponse<any>>> = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
    suspense: true,
  },
  mutations: {
    useErrorBoundary: (error: AxiosError<ErrorResponse | MutationErrorResponse<any>>) => {
      // Custom error handling
      return error.response?.status !== 400;
    },
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig as DefaultOptions });

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  ReturnType<FnType> extends Promise<infer T> ? T : ReturnType<FnType>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError<MutationErrorResponse<Parameters<MutationFnType>[0]['data']>>,
  Parameters<MutationFnType>[0]
>;
