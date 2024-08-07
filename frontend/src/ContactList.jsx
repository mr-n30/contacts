// import React from "react"
// import { useEffect, useState } from "react";

const ContactList = ({ contacts }) => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");

  // useEffect(() => {
  //   if (contacts.length > 0) {
  //     contacts.map((c) => {
  //       setFirstName(c.firstName);
  //       setLastName(c.lastName);
  //       setEmail(c.email);
  //     });
  //   }
  // }, [contacts]);

  return (
    <form className="contacts-list">
      <h2>Contacts</h2>
      <p>First Name</p>
      <p>Last Name</p>
      <p>Email</p>
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-details-row">
          <label htmlFor="firstName">
            <input
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={contact.firstName}
              // onChange={(e) => {
              //   setFirstName(e.target.value);
              // }}
            />
          </label>
          <label htmlFor="lastName">
            <input
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={contact.lastName}
              // onChange={(e) => {
              //   setLastName(e.target.value);
              // }}
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={contact.email}
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
            />
          </label>
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}
    </form>
  );
};

export default ContactList;
