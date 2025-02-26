import '../component/FormNote.js';
import '../component/NoteItem.js';
import '../component/NoteList.js';
import '../css/index.css'
import {renderData, postNote} from "./fetching";

renderData();

document.addEventListener("add-note", evt => {
    evt.preventDefault();
    console.log("tombol submit berhasil di tekan ");
    const note =  evt.detail;
    postNote({title : note.title, body : note.body});
    renderData();
})

document,addEventListener("BUTTON-DELETE", evt => {
    console.log("tombol hapus berhasil di tekan dengan id "+evt.detail.id);
})