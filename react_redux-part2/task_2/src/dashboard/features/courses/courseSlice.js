import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock async thunk for the fulfilled requirement
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch('/courses.json');
  const data = await response.json();
  return data;
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
  },
  reducers: {
    // 1. Create selectCourse action
    selectCourse: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.isSelected = true;
      }
    },
    // 2. Create unSelectCourse action
    unSelectCourse: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.isSelected = false;
      }
    },
    setCourses: (state, action) => {
      state.courses = action.payload.map(course => ({
        ...course,
        isSelected: false,
      }));
    }
  },
  extraReducers: (builder) => {
    // 3. Set isSelected defaulting to false once the API call is fulfilled
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload.map((course) => ({
        ...course,
        isSelected: false,
      }));
    });
  },
});

export const { selectCourse, unSelectCourse, setCourses } = courseSlice.actions;
export default courseSlice.reducer;
