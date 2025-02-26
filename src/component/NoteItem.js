import {body} from "core-js-compat";
import {deleteNote} from "../js/fetching";

class NoteItem extends HTMLElement{
    static get observedAttributes(){
        return ['id', 'title', 'body', 'createdAt', 'archive'];
    }
    constructor() {
        super();

        this.id = this.getAttribute("id");
        this.title = this.getAttribute("title");
        this.body = this.getAttribute("body");
        this.createdAt = this.getAttribute("createdAt");
        this.archive = this.getAttribute("archived");

        this._style = "ewq";
    }

    connectedCallback(){
        this.render();
        const buttonDelete = this.querySelector(".hapusNote");
        buttonDelete.addEventListener("click", event =>{
            this.buttonDelete()
        })
    }

    render(){
        this.updateStyle()
        this.innerHTML=`
        ${this._style.outerHTML}
    
                <div class="judul">
                    <h1>${this.title}</h1>
                </div>
                <div class="body">
                    <p>${this.body}</p>
                </div>
                <div class="action">
                    <button class="hapusNote">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fc031c" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </div>
       
        `;
    }

    attributeChangedCallback(){
        this.render();
    }

    updateStyle(){
        let style = document.createElement("style");
        style.textContent = `
    note-item{
        background: rgba(0, 200, 208, 0.06);
        border-radius: 20px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 200, 208, 1);
    }

    note-item .judul{
        border-bottom:1px solid rgba(0, 200, 208, 1) ;
        max-width:20rem;

    }
    
    note-item .judul h1{
        font-size: 1.5rem;
        word-wrap: break-word; 
        overflow-wrap: break-word;
    }
    
    note-item .body{
        text-align: justify;
        padding: 0 1.2rem;
        color: #c1c1c1;
        max-width:20rem;
    }
    .body p{
        word-wrap: break-word; 
        overflow-wrap: break-word;

    }
    .action{
        border-top:1px solid rgba(0, 200, 208, 1) ;
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 1rem 1rem;
    }
    .action .hapusNote{
        display: block;
        padding: .3rem 1rem;
        
        background: rgba(231, 67, 67, 0.19);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(3.6px);
        -webkit-backdrop-filter: blur(3.6px);
        border: 1px solid rgba(231, 67, 67, 1);
               
       transition:.3s ease;
    }
    
    .action .hapusNote:hover{
        background: rgba(251, 8, 8, 0.19);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(3.6px);
        -webkit-backdrop-filter: blur(3.6px);
        border: 1px solid rgba(251, 8, 8, 1);
    }
      `

        this._style = style;
    }

    buttonDelete(){
        console.log("menekan dengan id "+this.id)
        deleteNote(this.id);
    }

}

customElements.define('note-item', NoteItem);

