function populateUfs() {
    const UfsSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then((states) => {
            for (let state of states) {
                UfsSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city")
    citySelect.innerHTML = "<option value=''>Selecione uma cidade</option>"; // zera a lista de cidades
    citySelect.disabled = true;
    const stateInput = document.querySelector("input[name=state]")
    const id = event.target.value
    let indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`

    fetch(url).then((res) => { return res.json() }).then((cities) => {
        for (let city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
}


document.querySelector("select[name=uf]").addEventListener("change", getCities)

//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li") //armazena todos os items li em um array

for (const item of itemsToCollect) { //percorre o array.
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target
    //add or remove a class with js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id;
    //console.log(itemId);

    //verificar se existem itens selecionados e pega-los

    const alreadySelected = selectedItems.findIndex((item) => {
        return item == itemId;
    })

    //se já estiver selecionado, 
    if (alreadySelected >= 0) {
        //tirar da selecao
        const filteredItems = selectedItems.filter(item => {
            const filter = item != itemId
            return filter;
        })

        selectedItems = filteredItems
    } else {
        //se nao estiver selecionado, remover da selecao
        selectedItems.push(itemId)
    }

    //console.log(selectedItems);

    //atualizar o campo escondido
    collectedItems.value = selectedItems

}