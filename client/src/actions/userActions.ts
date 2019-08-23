import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from "./types";
import axios from 'axios';

export const getUsers = () => (dispatch: any) => {
  dispatch(setUsersLoading);
  axios
    .get('/api/users')
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
}

export const addUser = (user: any) => (dispatch: any) => {
  dispatch(setUsersLoading);

  const _user = {
    name: user.name,
    sin: user.sin,
    deed: user.deed,
    dateOfBirth: user.dateOfBirth,
    file: user.file ? user.file.name : null
  }

  axios
    .post('/api/users', _user)
    .then((res) => {

      const formData = new FormData();
      formData.append('file', user.file);

      axios.post(`/api/users/${res.data._id}/upload/`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then((_res) => {

        dispatch({ type: ADD_USER, payload: res.data })

      });


    });
}

export const deleteUser = (_id: string) => (dispatch: any) => {
  dispatch(setUsersLoading);
  axios
    .delete(`/api/users/${_id}`)
    .then((res: any) => dispatch({ type: DELETE_USER, payload: res.data }))
}

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  }
}