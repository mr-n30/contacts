const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(
        `http://localhost:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("ERROR: Failed to DELETE contact in: ContactList");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="contacts-list">
      <h2>Contacts</h2>
      <p>First Name</p>
      <p>Last Name</p>
      <p>Email</p>
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-details-row">
          <span>{contact.firstName}</span>
          <span>{contact.lastName}</span>
          <span>{contact.email}</span>
          <button onClick={() => updateContact(contact)}>Update</button>
          <button onClick={() => onDelete(contact.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
