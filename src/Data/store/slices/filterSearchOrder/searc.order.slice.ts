import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrderData } from '../getStatusOrder/status.order.slice'

interface IOrderState {
  searchData: IOrderData[]
  status: string
}

const initialState: IOrderState = {
  searchData: [],
  status: '',
}

const orderSearchSlie = createSlice({
  name: 'ordersSearch',
  initialState,
  reducers: {
    setSearchOrder: (state, action: PayloadAction<IOrderData[]>) => {
      state.searchData = action.payload
    },
  },
})

export const { setSearchOrder } = orderSearchSlie.actions
export default orderSearchSlie.reducer
