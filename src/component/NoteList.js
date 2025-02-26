class NoteList extends HTMLElement{
    constructor() {
        super();

        this._notes = [];
        this._style = document.createElement("style");
        this.render();
    }

    connectedCallback() {
        this.render();
    }


    render(){
        this.updateStyle();
        this.innerHTML = `
        <style>${this._style.textContent}</style>
        <h1>My Note List</h1>
        <div class="container-note">
            ${this._notes.map(note => `
                <note-item 
                    id="${note.id}" 
                    title="${note.title}" 
                    body="${note.body}" 
                    createdAt="${note.createdAt}" 
                    archived="${note.archived}">
                </note-item>
            `).join('')}
        </div>
    `;
    }

    updateStyle(){
        this._style.textContent=`
        note-list{
            display: block;
            background: rgba(0, 208, 98, 0.1);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(3.2px);
            -webkit-backdrop-filter: blur(3.2px);
            border: 1px solid rgba(0, 208, 98, 1);
            
            max-width:70rem;
        
            margin: 8rem auto;
        }
         h1{
            text-align: center;
            font-size: 2rem;
            color : white;
            margin-bottom:2rem;
        }
        
        .container-note{
        width: 100%;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            padding: 0.8rem;
            box-sizing: border-box;
        }
        
        @media (max-width: 480px) {
            .container-note{
                grid-template-columns:repeat(1, 1fr) ;
            }
        }
        
        
        @media (min-width: 481px) and (max-width: 767px) {
            .container-note{
                grid-template-columns:repeat(2, 1fr) ;
            }
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
            .container-note{
                grid-template-columns:repeat(3, 1fr) ;
            }     
        }

       
        
        `
    }

    setNotes(notes){
        this._notes = notes;
        this.render()
    }

}

customElements.define("note-list", NoteList);