import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: {},
  subjectIndex: 0,
  questionIndex: 0,
}

const mocktestslice = createSlice({
  name: "mocktest",
  initialState,
  reducers:{
    setMockTestData(state, action){
      state.data = action.payload;
    },
    selectOption(state, action) {
      const { subIndex, questionIndex, option } = action.payload;
      state.data.sections[subIndex].questions[questionIndex].selectedOption = option;
    },
    clearOption(state, action) {
      const { subIndex, questionIndex } = action.payload;
      state.data.sections[subIndex].questions[questionIndex].selectedOption = "";
    },
    setSubindex(state, action){
      state.subjectIndex = action.payload.subIndex;
    },
    setQuestionindex(state, action){
      state.questionIndex = action.payload.questionIndex;
    },
    resetTestData(state){
      state.data = {};
      state.subjectIndex = 0;
      state.questionIndex = 0;
      state.status = false;
    }
  },
});

export const {setMockTestData, selectOption, clearOption, setSubindex, setQuestionindex, resetTestData} = mocktestslice.actions;
export default mocktestslice.reducer;