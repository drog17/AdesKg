import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IProductHistory {
  id: string
  productCodes: string
  statusOld: string
  statusNew: string
  changedDateTime: string
  weight?: number | null
  price?: number | null
  quantity?: number | null
}

interface ProductHistoryState {
  byOrderId: Record<string, IProductHistory[]>
}

const initialState: ProductHistoryState = { byOrderId: {} }

const productHistorySlice = createSlice({
  name: 'productHistory',
  initialState,
  reducers: {
    setHistoryForOrder(state, action: PayloadAction<{ orderId: string; history: IProductHistory[] }>) {
      state.byOrderId[action.payload.orderId] = action.payload.history
    },
    clearHistoryForOrder(state, action: PayloadAction<string>) {
      delete state.byOrderId[action.payload]
    },
  },
})

export const { setHistoryForOrder, clearHistoryForOrder } = productHistorySlice.actions
export default productHistorySlice.reducer
