import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './sessions-reducer';


const store = configureStore({
  reducer: reducer
});
