import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderData } from '../getStatusOrder/status.order.slice'

interface INotificationState {
  notificationData: IOrderData[]
}

const initialState: INotificationState = {
  notificationData: [],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<IOrderData[]>) => {
      state.notificationData = action.payload.map((el) => ({
        ...el,
        isRead: true,
      }))
    },
  },
})

export const { setNotifications } = notificationSlice.actions
export default notificationSlice.reducer
