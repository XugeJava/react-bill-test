//账单列表的store
import  { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const billStore=createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        setBillList(state,action){
            state.billList=action.payload
        },
        addBill(state,action){
            state.billList.push(action.payload)
        }
    }
});
//解构action
const { setBillList,addBill }=billStore.actions
//编写异步
const getList=()=>{
    return async (dispatch)=>{
        const res = await axios.get('http://localhost:8888/ka');
        dispatch(setBillList(res.data));
    }
}
//异步保存
const saveList=(data)=>{
    return async(dispatch)=>{
        const res = await axios.post('http://localhost:8888/ka',data);
        dispatch(addBill(res.data));
    }
}
export { getList, setBillList, saveList }
// 导出reducer
const reducer = billStore.reducer

export default reducer