const salvaRisposte = {};
const IMG_CHECKED = 'images/checked.png';
const IMG_UNCHECKED = 'images/unchecked.png';

function Check(event) {
    let container = event.currentTarget;
    let checkbox = container.querySelector('.checkbox');
    checkbox.src = IMG_CHECKED;
    if(!container.querySelector('.unchecked')) {
        container.classList.remove('unchecked'); 
    }
    container.classList.add('checked');
    Uncheck(container.dataset.choiceId, container.dataset.questionId);
    Controllo();
    salvaRisposte[container.dataset.questionId] = container.dataset.choiceId;
}

function Uncheck(id, num) {
    for(let div of divs) {
        if(div.dataset.choiceId != id && div.dataset.questionId == num) {
            div.classList.add('unchecked');
            div.classList.remove('checked');
            const boxcheck = div.querySelector('.checkbox');
            boxcheck.src = IMG_UNCHECKED;
        }
    }
}

function Elabora() {
    if(salvaRisposte.one !== salvaRisposte.two && salvaRisposte.one !== salvaRisposte.three && salvaRisposte.two !== salvaRisposte.three) {
        return salvaRisposte.one;
    }
    if(salvaRisposte.one === salvaRisposte.two && salvaRisposte.one !== salvaRisposte.three) {
        return salvaRisposte.two;
    }
    if(salvaRisposte.two === salvaRisposte.three && salvaRisposte.one !== salvaRisposte.three) {
        return salvaRisposte.three;
    }
}

function Resetta() {

    for (let div of divs) 
    {
        div.classList.remove('checked');
        let img = div.querySelector('.checkbox');
        img.src = IMG_UNCHECKED;
        div.classList.remove('unchecked');
        div.addEventListener('click', Check);
    }

    let risultato = document.querySelector('#risultato-test');
    risultato.classList.add('off');

    delete salvaRisposte.one;
    delete salvaRisposte.two;
    delete salvaRisposte.three;
}


function VisualizzaPersonalità() {
    let personalità = Elabora();
 
    let h1 = document.querySelector('#risultato-test h1');
    let p = document.querySelector('#risultato-test p');
    h1.textContent = RESULTS_MAP[personalità].title;
    p.textContent = RESULTS_MAP[personalità].contents;  

    const bottone = document.querySelector('#reset');
    bottone.addEventListener('click', Resetta); 
    
    let risultato = document.querySelector('#risultato-test');
    risultato.classList.remove('off');
}

function InterrompiRisposte() {
    for(let div of divs) {
        div.removeEventListener('click', Check);
    }
    VisualizzaPersonalità();
}

function Controllo() {
    let contatoreRisposte = 0;
    for(let div of divs) {
        if(div.className === 'checked') {
            contatoreRisposte++;
        }
        if(contatoreRisposte >= 3) {
            InterrompiRisposte();
        }
    }
}

const divs = document.querySelectorAll('.choice-grid div');
for (const div of divs) 
{
    div.addEventListener('click', Check);
}

