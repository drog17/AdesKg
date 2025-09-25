import { configureStore } from '@reduxjs/toolkit'
import statusOrderSlice from './slices/getStatusOrder/status.order.slice'
import searcOrderSlice from './slices/filterSearchOrder/searc.order.slice'
import notificationDeliverdSlice from './slices/notificationDelivered/notificationDeliverd.slice'
import productHostorySlice from './slices/getStatusOrder/productHistory.slice'
export const store = configureStore({
  reducer: {
    orders: statusOrderSlice,
    productHistory: productHostorySlice,
    searchOrder: searcOrderSlice,
    notification: notificationDeliverdSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
