async function consultarLoteria() {
    const loteria = document.getElementById('loteria').value;
    const concurso = document.getElementById('concurso').value;

    if (!concurso) {
        alert('Por favor, insira o número do concurso.');
        return;
    }

    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${loteria}/${concurso}`;

    try {
        const response = await fetch(url);
        if (response.status === 429) {
            alert('Limite de requisições excedido. Tente novamente mais tarde.');
            return;
        }

        if (!response.ok) {
            alert('Erro ao consultar a API. Verifique o número do concurso ou a loteria selecionada.');
            return;
        }

        const data = await response.json();

        document.getElementById('dataApuracao').value = data.dataApuracao || 'N/A';
        document.getElementById('dezenasSorteadas').value = (data.dezenasSorteadasOrdemSorteio || []).join(", ") || 'N/A';
        document.getElementById('localSorteio').value = data.localSorteio || 'N/A';
        document.getElementById('valorAcumuladoProximoConcurso').value = data.valorAcumuladoProximoConcurso || 'N/A';
        document.getElementById('premiacao').value = (data.listaRateioPremio && data.listaRateioPremio[0]) ? `${data.listaRateioPremio[0].numeroDeGanhadores} ganhadores - R$ ${data.listaRateioPremio[0].valorPremio.toFixed(2)}` : 'N/A';
        document.getElementById('proximoConcurso').value = data.dataProximoConcurso || 'N/A';
    } catch (error) {
        console.error('Erro ao consultar a API:', error);
        alert('Erro ao consultar a API.');
    }
}
