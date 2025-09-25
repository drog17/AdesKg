import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IOrderData {
  dateCreated: string
  dateUpdated: string
  hatch: string
  id: string
  status: string
  isRead?: boolean
}

interface IOrderState {
  data: IOrderData[]
}

const initialState: IOrderState = {
  data: [],
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<IOrderData[]>) => {
      state.data = action.payload
    },
  },
})

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer
