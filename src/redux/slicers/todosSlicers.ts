import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todosData,todosInitial } from "../../utils/interface";

// Initial state for the Todos
const initialState: todosInitial={
    todosList: []
}

const todosSlicer = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos:(state, { payload }: PayloadAction<todosData>) =>{

            // If ID is undefined, it means ADD NEW TODO
            if(payload.id === undefined){
                const date = new Date();
                // Generate a unique ID based on time
                payload = {...payload, id: date.getTime()}
                // Add the new TODO to the list
                state.todosList = [...state.todosList, payload]
            }else{
                // If ID exists, UPDATE the existing TODO
                state.todosList = state.todosList.map((data:any)=>{
                    if(data.id === payload.id){
                        return payload
                    }
                    return data // Keep the other records unchanged
                })
            }
        },
        // It takes an ID and removes the corresponding Todo
        deleteTodos: (state, { payload }: PayloadAction<any>)=>{
            state.todosList = state.todosList.filter((data:any)=> data.id !== payload);
        }
    }
})


export const { setTodos, deleteTodos} = todosSlicer.actions
export default todosSlicer.reducer