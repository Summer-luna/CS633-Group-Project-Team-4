export const Actions = {
  ADD_COURSE: 'ADD_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  SET_COURSES: 'SET_COURSES'
};

export const courseReducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_COURSES:
      return action.payload;
    case Actions.ADD_COURSE:
      return [...state, action.payload];
    case Actions.DELETE_COURSE: {
      return state.filter((course) => course.courseId !== action.payload);
    }
  }
};
