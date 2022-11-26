const baseUrl = "https://www.breakingbadapi.com/api/"
const urlPersonaggi =  "https://www.breakingbadapi.com/api/characters?name"

const searchInput = document.querySelector(".input-search")
console.log(searchInput)
 function cercaPersonaggio(event){
    event.preventDefault();
    const datiOttenuti = ottieniDati(event.target)
    console.log(datiOttenuti) // array con l'input del form, ovvero cio che digita l'utente
    fetch(`${urlPersonaggi}=${datiOttenuti}`) //data[0] xke l'array restituito da  ottieniDati()
    .then(response => (response)) // risposta(stato ecc.) ma non corpo dellar isposta con dati
    .then(response => (response.json())) // cosi ottengo i dati in json accesibili e lavorabili    
    .then(bbDati=>console.log(bbDati[0])) // vedo il corpo della risposta    
    //.then(bbDati=>(bbDati)) // ottengo il corpo della risposta        
    .then(bbDati =>  mostraPersonaggi(bbDati))  
}; 

//crea la card del personaggio scelto
    function mostraPersonaggi(dati){
        
        const card = document.createElement('div');  
        //console.log(dati.occupation[0])                 
        card.classList.add('card', dati.name)
        card.insertAdjacentHTML('afterbegin', 
         `
          <div class="img-wrapper">
             <img src="${dati.img}" alt="${dati.name}"> 
           </div>    
                  
           `        
        );
        
    } 

    // questa funzione è poi assegnata alla variabile datiOttenuti
function ottieniDati(form){
    const personaggioCercato = new FormData(form);
    let personaggioTrovato= [];
    //ciclo for of, per ogni input (personaggioCercato) aggiungilo all'array
    //personaggio trovato
    for (let input of personaggioCercato.entries()){
        //personaggioTrovato.push(input[0]); // [0] è il tipo di dato (personaggio)
        personaggioTrovato.push(sanifica(input[1]));// è il nome del personaggio 
                                        //senza spazi e in minuscolo
    }

    return personaggioTrovato; //restituisce il valore del nome del personaggio
}

function sanifica(input){
    return input.trim().toLowerCase();
}

searchInput.addEventListener("submit", cercaPersonaggio)

//async- await
/*  function cercaPersonaggio(event){
        event.preventDefault();
        const datiOttenuti = ottieniDati(event.target);
        caricaPersonaggio(datiOttenuti)


    }
    async function caricaPersonaggio(){        
        const res =await fetch(`${urlPersonaggi}=${datiOttenuti}`);
        const bbDati = await res.json();
        mostraPersonaggi(bbDati)

    } */
//async await..