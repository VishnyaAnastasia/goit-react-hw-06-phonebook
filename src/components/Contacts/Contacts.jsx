import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import { deleteContact } from 'redux/contacts/contactsSlice';

import styles from './Contacts.module.css';

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <ul>
      {filteredContacts.map(({ id, number, name }) => (
        <li className={styles.contactInfo} key={id}>
          <div className={styles.contactLine}>
            {name}: {number}
          </div>
          <button
            className={styles.btnDelete}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
