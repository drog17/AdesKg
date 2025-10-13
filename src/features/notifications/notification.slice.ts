import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrderData } from '../orders/orders.slice'

interface NotificationState {
  items: IOrderData[]
}

const initialState: NotificationState = { items: [] }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<IOrderData[]>) {
      state.items = action.payload
    },
    pushNotification(state, action: PayloadAction<IOrderData>) {
      state.items.unshift(action.payload)
    },
    clearNotifications(state) {
      state.items = []
    },
  },
})

export const { setNotifications, pushNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer