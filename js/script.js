$('.dinheiro').mask('000000000,00', {reverse: true});
let btn =  document.getElementById('btn');
btn.addEventListener('click',function(e){
e.preventDefault();
let valor = document.getElementById('valorDesejado').value.replace(",",".");
let prazo =  document.getElementById('prazo').value;

if(valor){
    if(prazo){
    const data = { "valorDesejado": valor, "prazo": prazo};
    fetch("https://apphackaixades.azurewebsites.net/api/Simulacao",{
        method: "POST",
        headers: {
            "accept": "text/plain",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response)=>response.json())
    .then((data)=>{
      //verifica  se  a simulacao foi aceita altera texto
        if(data.Codigo == 400){
           document.getElementById('msg_H2').innerHTML = "Oferta indiponivel para o criterio selecionado."
           document.getElementById('simulacao').innerHTML = data.Mensagem;
           document.getElementById('simulacao').style.color = "red";
           document.getElementById("form").style.display= 'none';
           let a = document.createElement('a');
           a.href="index.html";
           a.innerText = "Tentar Novamente!";
           a.classList.add('tentarNovamente');
           simulacao.appendChild(a);
        }else{
        document.getElementById('msg_H2').innerHTML = "Oferta de credito disponivel"
          
        document.getElementById("form").style.display= 'none';
  
        let parcelas = data.resultadoSimulacao[0].parcelas
        parcelas.forEach((item)=>{
          const texto = `<p>Prestação: ${item.numero}  Valor amortizado: ${item.valorAmortizacao} Juros: ${item.valorJuros} Valor da prestacao: ${item.valorPrestacao} </p>`;
          const list = document.getElementById("resultado");
          const node = document.createElement("li");
          node.innerHTML = texto;
          list.appendChild(node);
          
        })
        //verifica parcela e cria  botao
        if(parcelas.length > 1){
          const simulacao = document.getElementById('simulacao');
          const lista = document.querySelectorAll('#simulacao ul li');
          lista.forEach((item,index)=>{
            console.log(item,index)
            if(index > 0){
              item.style.display = "none";
            }
          })
          //cria link voltar simulacao
          const link = document.createElement('a');
          link.href = 'index.html';
          link.innerText = "Refazer simulacao"
          simulacao.appendChild(link);
          //cria botao ver demais parcelas
          if(lista.length > 0){
            const btn = document.createElement('button');
            btn.classList.add('btn_leia');
            btn.innerText = "Veja as demais parcelas";
            simulacao.appendChild(btn);
            const btnLeiaMenos = document.createElement('button');
            btnLeiaMenos.classList.add('btn_leia_menos');
            btnLeiaMenos.innerText = "Veja menos parcelas";
            let btnLeia = document.querySelector('.btn_leia');
            btnLeia.addEventListener('click',function(){
              btn.remove()
             simulacao.appendChild(btnLeiaMenos);
              lista.forEach((item)=>{
                item.style.display = "block";
              })            
              btnLeiaMenos.addEventListener('click',function(){
                btnLeiaMenos.remove();
                simulacao.appendChild(btn);
                lista.forEach((item,index)=>{
					if(index > 0){
					  item.style.display = "none"
					}
                })
              })
            })
          }

        }
      }

    })
    .catch((error)=>{
        console.log(error);
    })
    }else{
        alert("Por favor Verique o *Prazo Desejado , e tente novamente!");
    }
}else{
    alert("Por favor Verique o *Valor Desejado , e tente novamente!");
}
    e.preventDefault();
});

    

