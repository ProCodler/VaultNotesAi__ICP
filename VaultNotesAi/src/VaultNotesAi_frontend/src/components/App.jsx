import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import CreateArea from "./CreateArea";
import { VaultNotesAi_backend } from 'declarations/VaultNotesAi_backend';



function App() {

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    VaultNotesAi_backend.createNote(newNote.title, newNote.content)
    setNotes(prevNotes => {
      return [newNote, ...prevNotes]; 

    });
  }

  useEffect(() => {
    fetchData();
  }, []);


  async function fetchData() {
    const notesArray = await VaultNotesAi_backend.readNotes(); //changed
    setNotes(notesArray);
  }
  function deleteNote(id) {
    VaultNotesAi_backend.removeNote(id); //changed
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (<div>
    <Header />
    <CreateArea
      onAdd={addNote}
    />

    {notes.map((noteItem, index) => {
      return <Notes
        key={index}
        id={index}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={deleteNote}
      />
    })}
    <Footer />
  </div>);
}

export default App;
