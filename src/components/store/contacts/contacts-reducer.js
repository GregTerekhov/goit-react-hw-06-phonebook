import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      const isExist = state.some(
        ({ name }) => name.toLowerCase() === payload.name.toLowerCase()
      );

      if (isExist) {
        alert(`${payload.name} is already in contacts.`);
        return;
      }
      state.push({ id: nanoid(), ...payload });
    },
    deleteContact: (state, { payload }) => {
      const index = state.findIndex(contact => contact.id === payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
