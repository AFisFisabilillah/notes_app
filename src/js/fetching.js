
export const renderData = () => {
    let container = document.querySelector('note-list');
    container.setloading()
    let data;
    fetch('https://notes-api.dicoding.dev/v2/notes')
        .then(response => response.json())
        .then(result => {
            container.setNotes(result.data)
            console.log(result)
        })

}

export const postNote = (data) => {
    fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if(result.status ==="success"){
                notification(`Berhasil menambhakan note \n title : ${ result.data.title } \n body : ${ result.data.body }`);
            }
        })
}

export const deleteNote= (id)=>{
    fetch('https://notes-api.dicoding.dev/v2/notes/'+id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(result => {
            if(result.status == "success"){
                notification("berhasil menghapus dengan id "+id)
                renderData()
            }
        })

}

function notification(message) {
    alert(message);
}