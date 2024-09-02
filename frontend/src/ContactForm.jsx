import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ContactForm = ({
  existingContact = {},
  updateCallback,
  contactState,
}) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length > 0;

  // Use useEffect to update the state when existingContact changes
  useEffect(() => {
    if (updating) {
      setFirstName(existingContact.firstName || "");
      setLastName(existingContact.lastName || "");
      setEmail(existingContact.email || "");
    } else {
      // Reset fields when creating a new contact
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [existingContact, updating]); // Dependency array

  // Handle <form> and <button> when it's clicked logic
  const onSubmit = async (e) => {
    e.preventDefault();

    // Set options for JS fetch
    const data = {
      firstName,
      lastName,
      email,
    };

    // Handle update or create contact
    const url =
      "http://localhost:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // Make the create request
    fetch(url, options)
      .then((response) => {
        if (response.status !== 201 && response.status !== 200) {
          return response.json().then((data) => {
            alert(data.message);
          });
        } else {
          alert("Your contact has been created!");
          updateCallback();
        }
      })
      .catch((error) => {
        // Catch any network or unexpected errors
        console.error("Error occurred:", error);
      });
  };

  // Actual contact <form>
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label htmlFor="firstName">
        <p>First Name</p>

        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label htmlFor="lastName">
        <p>Last Name</p>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        <p>Email</p>

        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => {
            contactState(true);
          }}
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>
          Save changes
        </button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  existingContact: PropTypes.object.isRequired,
  updateCallback: PropTypes.func.isRequired,
  contactState: PropTypes.func.isRequired,
};

export default ContactForm;
