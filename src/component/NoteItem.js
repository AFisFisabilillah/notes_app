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
      `

        this._style = style;
    }




}

customElements.define('note-item', NoteItem);

