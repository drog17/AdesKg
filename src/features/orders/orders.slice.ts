import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/Data/store/store'

export interface IOrderData {
  id: string
  status: string
  dateCreated: string
  dateUpdated?: string
  hatch?: string
  isRead?: boolean
}

interface OrdersState {
  byId: Record<string, IOrderData>
  allIds: string[]
}

const initialState: OrdersState = {
  byId: {},
  allIds: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    upsetOrders(state, action: PayloadAction<IOrderData[]>) {
      for (const o of action.payload) {
        state.byId[o.id] = { ...(state.byId[o.id] || {}), ...o }
        if (!state.allIds.includes(o.id)) state.allIds.push(o.id)
      }
    },
    setOrderStatus(state, action: PayloadAction<{ id: string; status: string }>) {
      const item = state.byId[action.payload.id]
      if (item) item.status = action.payload.status
    },
    markAsRead(state, action: PayloadAction<string>) {
      const item = state.byId[action.payload]
      if (item) item.isRead = true
    },
    clearOrders(state) {
      state.byId = {}
      state.allIds = []
    },
  },
})

export const { upsetOrders, setOrderStatus, markAsRead, clearOrders } = ordersSlice.actions
export default ordersSlice.reducer

const selectOrdersState = (state: RootState) => state.orders

export const selectAllOrders = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.allIds.map(id => ordersState.byId[id])
)

export const selectOrderById = (state: RootState, id: string) => state.orders.byId[id]
