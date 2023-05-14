import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
} from 'components/store/contacts/contacts-reducer';
import { setFilter } from 'components/store/filter/filter-reducer';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container, Title, SubTitle, MessageEmptyList } from './App.styled';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const deleteContactHandler = contactId => {
    dispatch(deleteContact(contactId));
  };

  const formSubmitHandler = contact => {
    dispatch(addContact(contact));
  };

  const changeFilterHandler = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={formSubmitHandler} />
      <SubTitle>Contacts</SubTitle>
      {!!contacts.length ? (
        <>
          <Filter value={filter} onChange={changeFilterHandler} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContactHandler}
          />
        </>
      ) : (
        <MessageEmptyList>
          Unfortunately, there is no contact here. Please enter your first
          contact
        </MessageEmptyList>
      )}
    </Container>
  );
};
