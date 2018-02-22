import {USER_LOGGED_IN} from '../types';
import api from '../api';
import store from '../store';

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
});

export const login = (credentials) => () =>
    api.user.login(credentials).then(user => store.dispatch(userLoggedIn(user)));
