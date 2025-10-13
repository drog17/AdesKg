import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import ordersReducer from '../features/orders/orders.slice'
import productHistoryReducer from '../features/orders/productHistory.slice'
import searchReducer from '../features/search/search.slice'
import notificationReducer from '../features/notifications/notification.slice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    productHistory: productHistoryReducer,
    search: searchReducer,
    notifications: notificationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
