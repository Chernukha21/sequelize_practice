import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phonesApi = createApi({
  reducerPath: 'phonesApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),

  tagTypes: ['Phone'],

  endpoints: (builder) => ({
    getPhones: builder.query({
      query: ({ limit = 6, offset = 0, brand = '' } = {}) => ({
        url: '/phones',

        params: {
          limit,
          offset,
          ...(brand && {
            brand,
          }),
        },
      }),

      transformResponse: (response) => ({
        phones: response.data,
        pagination: response.pagination,
      }),

      providesTags: (result) => [
        ...(result?.phones ?? []).map(({ id }) => ({
          type: 'Phone',
          id,
        })),
        {
          type: 'Phone',
          id: 'LIST',
        },
      ],
    }),
    getPhonePreorders: builder.query({
      query: (id) => `/phones/${id}/preorders`,

      transformResponse: (response) => response.data,
    }),
    createPhone: builder.mutation({
      query: (formData) => ({
        url: '/phones',
        method: 'POST',
        body: formData,
      }),

      transformResponse: (response) => response.data,

      invalidatesTags: [
        {
          type: 'Phone',
          id: 'LIST',
        },
      ],
    }),
    updatePhone: builder.mutation({
      query: ({ id, changes }) => ({
        url: `/phones/${id}`,
        method: 'PATCH',
        body: changes,
      }),

      transformResponse: (response) => response.data,

      invalidatesTags: (result, error, { id }) =>
        error
          ? []
          : [
              {
                type: 'Phone',
                id,
              },
              {
                type: 'Phone',
                id: 'LIST',
              },
            ],
    }),

    deletePhone: builder.mutation({
      query: (id) => ({
        url: `/phones/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, id) =>
        error
          ? []
          : [
              {
                type: 'Phone',
                id,
              },
              {
                type: 'Phone',
                id: 'LIST',
              },
            ],
    }),
  }),
});

export const {
  useGetPhonesQuery,
  useCreatePhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,
  useGetPhonePreordersQuery,
} = phonesApi;
