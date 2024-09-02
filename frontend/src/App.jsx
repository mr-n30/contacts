import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({});
  const [isCreateOrUpdate, setIsCreateOrUpdate] = useState(true); // True means create False means update

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    // const response = await fetch("http://localhost:5000/contacts");
    // const data = await response.json();
    // setContacts(data.contacts);

    fetch("http://localhost:5000/contacts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `[ERROR] Error in "fetchContacts()", Message=>HTTP error! Status: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        setContacts(data.contacts);
      });
  };

  // Handle modal when it gets updated
  const onUpdate = () => {
    fetchContacts();
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={setCurrentContact}
        updateCallback={onUpdate}
        contactState={setIsCreateOrUpdate}
      />
      <button
        type="button"
        className="btn btn-success create-new-contact-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => setCurrentContact({})}
      >
        Create New Contact
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 modal-contact-title" id="exampleModalLabel">
                {isCreateOrUpdate ? "Create New Contact" : "Update Contact"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ContactForm
                updateCallback={onUpdate}
                existingContact={currentContact}
                contactState={setIsCreateOrUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
