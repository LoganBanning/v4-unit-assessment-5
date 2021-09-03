import { createStore } from 'redux';
import reducer, { updateUser, logout } from './reducer';

export default createStore(reducer);