import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'
const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(
    {
      baseUrl: process.env.NODE_ENV === 'production' ? '' : process.env.EXPO_PUBLIC_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token
        if (token) headers.set('authorization', token)
        return headers
      },
    }
  ),
  tagTypes: ['User', 'Review', 'Details', 'Order', 'Product', 'Category', 'Slider', 'Banner'],
  endpoints: (builder) => ({
    
  }),
})

export default apiSlice;