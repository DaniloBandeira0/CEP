
function consultarCep() {
    const cep = document.getElementById("cep").value.trim(); 

    if (cep.length !== 8 || isNaN(cep)) {
        alert("Por favor, insira um CEP!");
        return;
    }
    const cepPattern = /^\d{8}$/;
    if (!cepPattern.test(cep)) {
        alert("Por favor, insira um CEP válido com 8 dígitos (somente números).");
        return;
    }
    
    fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("CEP não encontrado.");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert("CEP não encontrado ou inválido.");
                return;
            }

        
            document.getElementById("cep-result").textContent = data.cep;
            document.getElementById("rua-result").textContent = data.address;
            document.getElementById("bairro-result").textContent = data.district;
            document.getElementById("cidade-result").textContent = data.city;
            document.getElementById("estado-result").textContent = data.state;
        })
        .catch(error => {
      
            console.error("Erro ao buscar CEP:", error);
            alert("Erro ao buscar os dados do CEP. Tente novamente.");
        });
}


document.getElementById("btn-consultar").addEventListener("click", consultarCep);
