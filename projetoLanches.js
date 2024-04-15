const btnEnviar = document.getElementById("btn_submit")
const precoProdutos = document.getElementsByName("preco")
const tableContainer = document.getElementById("table_container")
let infoForm = [] /*armazena todo conteudo do formulario*/ 
let indiceEdicao = -1;


btnEnviar.addEventListener("click", ()=>{
    adicionarDados()
})


function adicionarDados(){
    let totalValorProdutos; 
    let prodSelect = [] /*armazena todos o produtos selecionados*/
    let arrValorTotalProdu = []/* vetor que armazena o valor dos produtos selecionados */

    const produtos = document.getElementsByName("produto")
    const nomeUser = document.getElementById("nome").value


    if(validarDados(produtos, nomeUser)){
        
        for (let i = 0; i < produtos.length; i++) {
            if(produtos[i].checked){
                const element = produtos[i].value
                const cadaPreco = precoProdutos[i].value
                arrValorTotalProdu.push(parseFloat(precoProdutos[i].value)) /*Pega todos os valores dos produtos selecionados e joga na array*/
                prodSelect.push({"produto": element, "valor":cadaPreco})
            }
        }
        console.log(arrValorTotalProdu)
        totalValorProdutos = arrValorTotalProdu.reduce((a,b)=>{return  a+b})
        if(indiceEdicao >= 0){
            let obj = infoForm[indiceEdicao]
            obj.nome = nomeUser
            obj.item = prodSelect
            obj.valorTotal = totalValorProdutos
        }else{
            infoForm.push({"item": prodSelect, "nome": nomeUser, "valorTotal": totalValorProdutos})
        } 
    }

    console.log(infoForm)
    limparCampos(produtos, nomeUser)
    atualizarTabela()
    
    prodSelect = []
    arrValorTotalProdu = []
    indiceEdicao = -1
}


function validarDados(produto, userName){ /*funcao que verifica quantos produtos foram selecionados. Se nenhum for selecionado ou o input de usuário for menor 0 retorna falso*/
    let qtdcheck = 0
    for (let i = 0; i < produto.length; i++) {
        if(produto[i].checked){
            qtdcheck ++
        } 
    }
    if(qtdcheck <= 0 || userName.length <= 0){
        qtdcheck = 0
        alert("dados inválidos!")
        return false
    }else{
        qtdcheck = 0
        return true
    }
}


function limparCampos(produto, nameUser){
    // limpa os produtos
    for (let i = 0; i < produto.length; i++) {
        produto[i].checked = false
    }

    // limpa o input nome
    document.getElementById("nome").value = ""
}



function atualizarTabela(){

    const tableProdutos = document.getElementsByClassName("tbody_produto_lista")
    const tableInformacao = document.getElementsByClassName("tbody_informacao_lista")
    const tableAcoes = document.getElementsByClassName("tbody_acoes_lista")

    tableContainer.innerHTML = ""

    infoForm.forEach(()=>{
        criarEstruturaTabela()
        insereDados(tableProdutos, tableInformacao, tableAcoes)
    })
    
}

function editarItem(indice){
    indiceEdicao = indice
    let obj = infoForm[indice]
    document.getElementById("nome").value = obj.nome

    let produtos = document.getElementsByName("produto")
        obj.item.forEach((produtoValor) => {
            console.log(produtoValor.produto)
            for (const cada of produtos) {
                if(cada.value == produtoValor.produto){
                    cada.checked = true
                }
            }
        })
}   


function excluirItem(indice){
    let askRemove = confirm("deseja realmente remover da lista??")
    if(askRemove){
        infoForm.splice(indice, 1)  
        atualizarTabela()
    }
}



function criarEstruturaTabela(){
    let cadaTabelaContainer = document.createElement("div")
    cadaTabelaContainer.classList = "cada_tabela_container"

    tableContainer.appendChild(cadaTabelaContainer)

    let produtoTabela = document.createElement("div")
    produtoTabela.className = "produto_tabela cada_tabela"
    let infomacao_Tabela = document.createElement("div")
    infomacao_Tabela.className = "informacao_tabela cada_tabela"
    let acoes_Tabela = document.createElement("div")
    acoes_Tabela.className = "acoes_tabela cada_tabela"

    cadaTabelaContainer.appendChild(produtoTabela)
    cadaTabelaContainer.appendChild(infomacao_Tabela)
    cadaTabelaContainer.appendChild(acoes_Tabela)


    produtoTabela.innerHTML = ""
    infomacao_Tabela.innerHTML = ""
    acoes_Tabela.innerHTML = ""

    let table1 = document.createElement("table")
    let table2 = document.createElement("table") 
    let table3 = document.createElement("table")

    produtoTabela.appendChild(table1)
    infomacao_Tabela.appendChild(table2)
    acoes_Tabela.appendChild(table3)

    let tableHead1 = document.createElement("thead")
    let tableBody1 = document.createElement("tbody")
    let tableHead2 = document.createElement("thead")
    let tableBody2 = document.createElement("tbody")
    let tableHead3 = document.createElement("thead")
    let tableBody3 = document.createElement("tbody")

    table1.appendChild(tableHead1)
    table1.appendChild(tableBody1)
    tableBody1.classList = "tbody_produto_lista"

    table2.appendChild(tableHead2)
    table2.appendChild(tableBody2)
    tableBody2.classList = "tbody_informacao_lista"

    table3.appendChild(tableHead3)
    table3.appendChild(tableBody3)
    tableBody3.classList = "tbody_acoes_lista"

    let trHead1 = document.createElement("tr")
    let trHead2 = document.createElement('tr')

    tableHead1.appendChild(trHead1)
    tableHead2.appendChild(trHead2)

    let tdHead11 = document.createElement("td")
    let tdHead12 = document.createElement("td")
    let tdHead21 = document.createElement("td")
    let tdHead22 = document.createElement("td")

    trHead1.appendChild(tdHead11)
    trHead1.appendChild(tdHead12)
    tdHead11.innerText = "produto"
    tdHead12.innerText = "valor"

    trHead2.appendChild(tdHead21)
    trHead2.appendChild(tdHead22)
    tdHead21.innerText = "nome"
    tdHead22.innerText = "valor total"

}

function insereDados(tableProdutos, tableInformacao, tableAcoes){

    // insere os produtos selecionados na tabela
    for(let i = 0; i<tableProdutos.length; i++){
        const each = tableProdutos[i]
        each.innerHTML = ""
        for(let j = i;j<i+1; j++){
            infoForm[j].item.forEach(element => {
                let tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${element.produto}</td>
                    <td>R$ ${element.valor}</td>
                `
                each.appendChild(tr)
            });
        }
    }


    // insere as informacoes do usuário na tabela
    for(let i = 0; i<tableInformacao.length; i++){
        const each = tableInformacao[i]
        each.innerHTML = ""
        for(let j = i; j<i+1; j++){
            let tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${infoForm[j].nome}</td>
                <td class="td_info">R$ ${infoForm[j].valorTotal.toFixed(2)}</td>
            `
            each.appendChild(tr)
        }
    }


    // insere as informacoes de acoes na tabela
    for(let i = 0; i<tableAcoes.length; i++){
        const each = tableAcoes[i]
        each.innerHTML = ""
        let tr = document.createElement("tr")
        tr.classList = "table_row_info"
        tr.innerHTML = `
                <td>
                <button type="button" onclick="editarItem(${i})" class="btn btn_table btn_editar" id="">editar</button>
                <button type="button" onclick="excluirItem(${i})" class="btn btn_table btn_excluir" id="">entregue</button>
                </td>
            `
        each.appendChild(tr)    
    }
}
