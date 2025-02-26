class FormNote extends HTMLElement {
    _bodyField;
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._style = document.createElement("style");
        this.render();

        this._judulField;
        this._bodyField;

        // form.addEventListener("submit", (e) => {
        //     e.preventDefault();
        //     document.dispatchEvent(new CustomEvent('add-note', {
        //     }))
        // })
    }



    connectedCallback() {
        this.render();
        const form  = this._shadowRoot.querySelector(".form-note");


        if (form) {
            const judul = form.elements.judul;
            this._judulField = judul;
            judul.addEventListener("input", (event) => this.customValidationUsernameHandler(event));
            judul.addEventListener("blur", (event) => this.validation(event));
            const body = form.elements.body;
            this._bodyField = body;
            body.addEventListener("input", (event) => this.customValidationUsernameHandler(event));
            body.addEventListener("blur", (event) => this.validation(event));


        }


        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.buttonSubmit(e);
        })

    }

    render() {
        this.updateStyle();

        this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <form class="form-note">
            <div>
                <label for="judul">Judul</label>
                <input required type="text" name="judul" id="judul" aria-describedby="usernameValidation" minlength="4">
                <p id="usernameValidation" class="validation-message"></p>
            </div>
            <div>
                <label for="body">ISI</label>
                <textarea required name="body" id="body" cols="30" rows="10" aria-describedby="bodyValidation"></textarea>
                <p id="bodyValidation" class="validation-message"></p>
            </div>
            <button type="submit" class="submitBtn">Kirim</button>
        </form>
        `;
    }

    updateStyle() {
        this._style.textContent = `
        :host {
            display: block;
            max-width: 40rem;
            background: rgba(0, 208, 98, 0.17);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8.8px);
            -webkit-backdrop-filter: blur(8.8px);
            border: 1px solid rgba(0, 208, 98, 0.93);
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
        }

        label {
            display: block;
            margin-bottom: .6rem;
            font-size:1.2rem;
            font-weight: bold;
            color:white;
        }

        input, textarea {
            display: block;
            margin: 0 auto;
            margin-bottom: 1rem;
            background-color: #004d24;
            border-radius: 0.8rem;
            color: white;
            padding: 0.5rem;
            outline: none;
            border: 1px solid white;
            font-size: 1rem;
            font-family: "Poppins", sans-serif;
        }
        
        input {
            width: 60%;
        }
        
        input:focus, textarea:focus {    
            outline: 2px solid #00d062;
            border: 1px solid #004d24;
        }
        
        .validation-message {
            color: red;
        }
        .submitBtn{
        margin-top: 1rem;
        padding: 0.6rem 6rem;
        border-radius: 0.8rem;
        }
        `;
    }

    validation(event) {

        const isValid = event.target.validity.valid;
        const errorMessage = event.target.validationMessage;

        const connectedValidationId = event.target.getAttribute('aria-describedby');
        const connectedValidationEl = connectedValidationId
            ? this._shadowRoot.getElementById(connectedValidationId)
            : null;

        if (connectedValidationEl) {
            connectedValidationEl.innerText = isValid ? '' : errorMessage;
        }
    }

    customValidationUsernameHandler(event) {

        event.target.setCustomValidity('');

        if (event.target.validity.valueMissing) {
            event.target.setCustomValidity('Wajib diisi.');
        } else if (event.target.validity.tooShort) {
            event.target.setCustomValidity('Minimal panjang adalah enam karakter.');
        }

        this.validation(event); // Update pesan error secara real-time
    }

    buttonSubmit(event){
        const title = this._judulField.value;
        const body = this._bodyField.value;
        const archive = false;
        let id = this.generateId();
        id = "note-"+id;
        const today = new Date();
        const createdAt = today.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

        this._judulField.value = "";
        this._bodyField.value = "";

        this.dispatchEvent(new CustomEvent("add-note", {
            detail: { title, body, id, createdAt, archive  },
            bubbles: true,
            composed: true
        }));
    }

    generateId(){
        return +new Date();
    }
}

customElements.define("form-note", FormNote);
