import PropTypes from "prop-types";

const ContactList = ({
  contacts,
  updateContact,
  updateCallback,
  contactState,
}) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };

      fetch(`http://localhost:5000/delete_contact/${id}`, options).then(
        (response) => {
          if (response.status === 200) {
            updateCallback();
          } else {
            alert("ERROR: Failed to DELETE contact in: ContactList");
          }
        }
      );
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="contacts-list-container container-fluid ">
      <h2 className="contacts-list-h2-title">Contacts</h2>

      <div className="contacts-list-p-title">
        <p>First Name</p>
        <p>Last Name</p>
        <p>Email</p>
        <p>Action</p>
      </div>
      {contacts.map((contact) => (
        <div key={contact.id} className="contacts-list-row-data">
          <div className="contacts-list-row-data-details">
            <span className="contact-detail">{contact.firstName}</span>
            <span className="contact-detail">{contact.lastName}</span>
            <span className="contact-detail">{contact.email}</span>
          </div>

          <div className="contacts-list-row-data-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-target="#exampleModal"
              data-bs-toggle="modal"
              onClick={() => {
                contactState(false);
                updateContact(contact);
              }}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(contact.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  updateContact: PropTypes.func.isRequired,
  updateCallback: PropTypes.func.isRequired,
  contactState: PropTypes.func.isRequired,
};

export default ContactList;
