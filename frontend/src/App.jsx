import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  return <ContactList contacts={contacts} />;
}

export default App;
