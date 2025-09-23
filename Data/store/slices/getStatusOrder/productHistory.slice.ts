import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IProductHistory {
    id: string
    productCodes: string
    statusOld: string
    statusNew: string
    changedDateTime: string
    weight: number | null
    price: number | null
    quantity: number | null
}

interface ProductHistoryState {
    allHistory: IProductHistory[]  
}

const initialState: ProductHistoryState = {
    allHistory: [] 
}

const productHistorySlice = createSlice({
    name: 'productHistory',
    initialState,
    reducers: {
        setProductHistory(state, action: PayloadAction<IProductHistory[]>) {
            state.allHistory = action.payload  
        }
    }
})

export const { setProductHistory } = productHistorySlice.actions
export default productHistorySlice.reducer
