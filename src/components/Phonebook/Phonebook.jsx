import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsSlice';
import { getContacts } from 'redux/contacts/contacts-selectors';

import styles from './Phonebook.module.css';

Notify.init({
  useIcon: false,
  fontSize: '20px',
  position: 'right-top',
  width: '350px',
  height: '35px',
  clickToClose: true,
});

export const Phonebook = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch(getContacts);
  const contacts = useSelector(getContacts);

  const inputHandler = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }

    if (event.target.name === 'number') {
      setNumber(event.target.value);
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    const rename = contacts.find(
      contacts => contacts.name.toLowerCase() === name.toLowerCase()
    );
    if (rename) {
      Notify.warning(`Oppps.. ${name} is already in contacts`);
      event.target.reset();
      return;
    }

    const id = nanoid();
    const newContact = { id: id, name: name, number: number };

    dispatch(addContact(newContact));
    event.target.reset();
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        <h3 className={styles.titleName}>Name</h3>
        <input
          className={styles.inputView}
          onInput={inputHandler}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Anastasia Vishnyakova"
          required
        />
      </label>
      <label>
        <h3 className={styles.titleName}>Number</h3>
        <input
          className={styles.inputView}
          onInput={inputHandler}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="555-05-55"
          required
        />
      </label>
      <div className={styles.btnContainer}>
        <button className={styles.btnAdd} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};
