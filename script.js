const inputItem = document.getElementById('inputItem') // referencia dos campos mas sem os seus valores
const inputCategoria = document.getElementById('inputCategoria')

const inputItemRemover = document.getElementById('inputRemoverItem')

const areaLista = document.getElementById('mostrarLista')
const areaItensRemovidos = document.getElementById('mostarRemocao')

const bntAdcionar = document.getElementById('buttonAdcionar')
const bntMostrarLista = document.getElementById('buttonMostrarLista')

const bntRevomerItem = document.getElementById('buttonRemover')

const listaDeCompras = {
    frutas : [],
    laticinios: [],
    congelados: [],
    doces: []
}

function adcionarItens(itemDigitado,categoriaDigitada,objetoListaCompras){

    let categoriaTratada = categoriaDigitada.toLowerCase().trim()
    
    if(!objetoListaCompras[categoriaTratada]){
        objetoListaCompras[categoriaTratada] = []
    }

    return objetoListaCompras[categoriaTratada].push(itemDigitado)
}

function percorreLista(objetoListaCompras){
    areaLista.innerHTML = ''

    for(let categoria in objetoListaCompras){
        if(objetoListaCompras[categoria].length > 0 ){
            const p = document.createElement('p')
            p.textContent = `${categoria.toLocaleUpperCase()}: ${objetoListaCompras[categoria].join(', ')}`
            areaLista.appendChild(p)
        }
        
    }

}

function removerItens(itemRemover, objetoListaCompras){
    let itemTratado = itemRemover.toLowerCase().trim()
    let itemEncontrado = false

    for(let categoria in objetoListaCompras){

        let arrayOriginalCategoria = objetoListaCompras[categoria]
        let arrayNovo = []

        for(let i = 0; i < arrayOriginalCategoria.length; i++){
            if(arrayOriginalCategoria[i].toLowerCase() === itemTratado){
                itemEncontrado = true
            }else{
                arrayNovo.push(arrayOriginalCategoria[i]) 
            }
        }
        objetoListaCompras[categoria] = arrayNovo
    }

    if(!itemEncontrado){
        areaItensRemovidos.classList.remove('msg-sucesso')
        areaItensRemovidos.classList.add('msg-erro')
        exibirResultadoRemover('Item não encontrado !')
    }else{
        areaItensRemovidos.classList.remove('msg-erro')
        areaItensRemovidos.classList.add('msg-sucesso')
        exibirResultadoRemover('Item removido com sucesso !')
    }

    percorreLista(objetoListaCompras)
}

function exibirResultadoAdcionar(mensagem){
    areaLista.textContent = mensagem
}

function exibirResultadoRemover(mensagem){
    areaItensRemovidos.textContent = mensagem
}

bntAdcionar.addEventListener('click',() => {
    const valorItem = inputItem.value.trim()
    const valorCategoria = inputCategoria.value.trim()

    if(valorItem !== "" && valorCategoria !== ""){
        adcionarItens(valorItem,valorCategoria,listaDeCompras)

        inputCategoria.value = ''
        inputItem.value = ''
        exibirResultadoRemover('')
    }
})

bntMostrarLista.addEventListener('click',() => {
    percorreLista(listaDeCompras)
})

bntRevomerItem.addEventListener('click',() => {
    const valorParaRemover = inputItemRemover.value

    if(valorParaRemover !== ""){
        removerItens(valorParaRemover,listaDeCompras)
        inputItemRemover.value = ''
    }
})
