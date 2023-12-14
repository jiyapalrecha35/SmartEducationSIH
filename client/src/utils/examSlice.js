import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const examSlice = createSlice({
    name : 'exam', 
    initialState : {
        answers : new Map(),
        options : Array(100).fill(-1)
    }, 
    reducers : {
        addAnswer : (state, action) =>{
            // state.answers = [...state.answers,{
            //     questionId : action.payload.questionId,
            //     optedChoice : action.payload.answer
            // }];
            state.answers.set(action.payload.questionId,{
                questionId : action.payload.questionId,
                optedChoice : action.payload.answer
            })
        },
        clearAnswer : (state) => {
            state.answers = new Map()
        },
        modifyOption : (state,action) => {
            state.options[action.payload.question] = action.payload.answer;
        },
        clearOption : (state) => {
            state.options = Array(100).fill(-1)
        }
    }
});

export default examSlice.reducer;

export const { addAnswer, modifyOption, clearAnswer, clearOption } = examSlice.actions;