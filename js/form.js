var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPaciente(form); 
    

    var erros = validaPaciente(paciente); 
    console.log(erros); 

    if(erros.length > 0){
        exibeMensagem(erros); 
        return; 
    }

    adicionaPacienteNaTabela(paciente); 
   

    var mensagemErro = document.querySelector("#mensagens-erro");
    mensagemErro.innerHTML = ""; 
    form.reset();
    
});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = MontaTr(paciente); 
    var tabela = document.querySelector("#tabela-pacientes")
    tabela.appendChild(pacienteTr); 
    
}

function exibeMensagem(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = ""; 
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro; 
        ul.appendChild(li);
    });

}

function obtemPaciente(form){
    paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value , form.altura.value)
    }

    return paciente; 
};

function MontaTr(paciente){
    
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    var nomeTd = MontaTd(paciente.nome , "info-nome");
    var pesoTd = MontaTd(paciente.peso , "info-peso");
    var alturaTd = MontaTd(paciente.altura , "info-altura");
    var gorduraTd = MontaTd(paciente.gordura , "info-gordura");
    var imcTd = MontaTd(paciente.imc , "info-imc");

    nomeTd.textContent = paciente.nome; 
    pesoTd.textContent = paciente.peso;
    alturaTd.textContent = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent = paciente.imc; 

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr; 
    
}

function MontaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado; 
    td.classList.add(classe);

    return td; 
}



function validaPaciente(paciente){

    var erros = []; 

    if(paciente.nome.length == 0){
        erros.push("O nome não pode ficar em branco"); 
    }

    if(paciente.gordura.length == 0){
        erros.push("Insira a % de gordura"); 
    }

    if(paciente.peso.length == 0){
        erros.push("Insira o peso"); 
    }

    if(paciente.altura.length == 0){
        erros.push("Insira a altura"); 
    }

    if(!validaPeso(paciente.peso)){
       erros.push("Peso inválido, verifique novamente"); 
    }
       if(!validaAltura(paciente.altura)){
        erros.push("Altura inválida, verifique novamente");
       }
    return erros; 
}
