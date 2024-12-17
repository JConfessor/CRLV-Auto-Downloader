(async () => {
  // Função para aguardar um tempo específico (em milissegundos)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Armazenar placas já processadas para evitar repetições
  const processedPlates = new Set();

  // Função para extrair a placa de um item de veículo
  const getPlate = (vehicleElement) => {
    const plateElement = vehicleElement.querySelector(".iconSne-placa + span");
    return plateElement ? plateElement.textContent.trim() : "";
  };

  // Função para extrair o Renavam de um item de veículo
  const getRenavam = (vehicleElement) => {
    const renavamElement = vehicleElement.querySelector(
      ".iconSne-veiculo02 + span"
    );
    return renavamElement ? renavamElement.textContent.trim() : "";
  };

  // Função para verificar se a lista de veículos está visível
  const isListVisible = () => {
    return (
      document.querySelectorAll(".card-list-item.mini.ng-star-inserted")
        .length > 0
    );
  };

  // Função para simular um clique mais robusto
  const robustClick = (element) => {
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  };

  // Função para construir a URL de detalhes do veículo
  const constructDetailURL = (plate, renavam) => {
    return `https://portalservicos.senatran.serpro.gov.br/#/veiculos/meus-veiculos/detalhes/${plate}/${renavam}/false`;
  };

  // Função para aguardar que a página de detalhes carregue
  const waitForDetailPageLoad = async () => {
    const maxRetries = 20;
    const interval = 1000; // 1 segundo
    for (let i = 0; i < maxRetries; i++) {
      // Verifique se o botão CRLV Digital está presente
      const crlvButton = Array.from(
        document.querySelectorAll("a.text-bold")
      ).find((el) => el.textContent.includes("CRLV Digital (.pdf)"));
      if (crlvButton) {
        console.log("Página de detalhes carregada.");
        return true;
      }
      await sleep(interval);
    }
    console.warn("Página de detalhes não carregou no tempo esperado.");
    return false;
  };

  // Função para aguardar o spinner desaparecer
  const waitForSpinnerToDisappear = async () => {
    const maxRetries = 30; // Tentativas máximas (30 * 500ms = 15 segundos)
    const interval = 500; // 0.5 segundos
    for (let i = 0; i < maxRetries; i++) {
      const spinner = document.querySelector(".ngx-spinner-overlay");
      if (
        !spinner ||
        spinner.style.display === "none" ||
        parseFloat(spinner.style.opacity) === 0
      ) {
        console.log("Spinner desapareceu.");
        return true;
      }
      await sleep(interval);
    }
    console.warn("Spinner ainda está visível após o tempo limite.");
    return false;
  };

  // Função para clicar no botão "Voltar" com verificação de mudança de página
  const clickVoltarButton = async () => {
    // Esperar o spinner desaparecer antes de clicar em "Voltar"
    await waitForSpinnerToDisappear();

    // Selecionar o botão "Voltar" com base na classe e no texto
    const voltarButton = Array.from(
      document.querySelectorAll(
        "button.br-button.primary.footer-button.no-print"
      )
    ).find((btn) => btn.textContent.trim() === "Voltar");
    if (voltarButton) {
      robustClick(voltarButton);
      console.log('Botão "Voltar" clicado.');
      await sleep(3000); // Aguardar 3 segundos após clicar em "Voltar"

      // Esperar o spinner desaparecer novamente após clicar em "Voltar"
      const spinnerGone = await waitForSpinnerToDisappear();
      if (!spinnerGone) {
        console.warn(
          'Spinner ainda está visível após clicar em "Voltar". Tentando novamente...'
        );
        return false;
      }

      // Verificar se a página mudou de volta para a lista
      if (isListVisible()) {
        console.log("Retornou à lista de veículos.");
        return true;
      } else {
        console.warn(
          'Não retornou à lista após clicar em "Voltar". Tentando novamente...'
        );
        return false;
      }
    }
    console.warn('Botão "Voltar" não encontrado. Tentando pressionar ESC.');
    // Se o botão "Voltar" não for encontrado, tentar pressionar a tecla ESC
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await sleep(3000); // Aguardar 3 segundos após pressionar ESC

    // Esperar o spinner desaparecer novamente após pressionar ESC
    const spinnerGone = await waitForSpinnerToDisappear();
    if (!spinnerGone) {
      console.warn(
        "Spinner ainda está visível após pressionar ESC. Tentando novamente..."
      );
      return false;
    }

    // Verificar se a página mudou de volta para a lista
    if (isListVisible()) {
      console.log("Retornou à lista de veículos após pressionar ESC.");
      return true;
    } else {
      console.warn("Não retornou à lista após pressionar ESC.");
      return false;
    }
  };

  // Função para navegar para a próxima página
  const goToNextPage = async () => {
    const nextButton = Array.from(
      document.querySelectorAll(".pagination-next a.page-link")
    ).find((el) => el.textContent.trim() === "›");
    if (
      nextButton &&
      !nextButton.parentElement.classList.contains("disabled")
    ) {
      robustClick(nextButton);
      console.log("Navegando para a próxima página...");
      // Aguardar o carregamento da nova página
      await sleep(4000); // Aguardar 4 segundos para garantir que a nova página carregue completamente
      return true;
    }
    return false;
  };

  // Função para solicitar ao usuário a seleção de finais de placa
  const getUserSelectedFinals = () => {
    const userInput = prompt(
      "Digite os finais das placas que deseja processar, separados por vírgula. Deixe em branco para processar todas:"
    );
    if (userInput) {
      // Separar por vírgula, remover espaços e filtrar apenas dígitos
      const finals = userInput
        .split(",")
        .map((d) => d.trim())
        .filter((d) => /^[0-9]$/.test(d));
      if (finals.length > 0) {
        console.log(`Finais de placa selecionados: ${finals.join(", ")}`);
        return finals;
      } else {
        console.warn("Entrada inválida. Todas as placas serão processadas.");
        return null;
      }
    } else {
      console.log(
        "Nenhum final de placa especificado. Todas as placas serão processadas."
      );
      return null;
    }
  };

  // Função principal para processar todas as páginas
  const processAllPages = async () => {
    // Obter os finais de placa selecionados pelo usuário
    const selectedFinals = getUserSelectedFinals();

    let hasNextPage = true;
    let currentPage = 1;

    while (hasNextPage) {
      console.log(`\nProcessando página ${currentPage}...`);
      // Selecionar todos os elementos de veículo na página atual
      const vehicleElements = document.querySelectorAll(
        ".card-list-item.mini.ng-star-inserted"
      );

      let foundMatch = false;

      for (let vehicle of vehicleElements) {
        const plate = getPlate(vehicle);
        const renavam = getRenavam(vehicle);
        if (!plate || !renavam) continue;

        // Verificar se a placa já foi processada
        if (processedPlates.has(plate)) {
          console.log(
            `Veículo com placa ${plate} já foi processado. Pulando...`
          );
          continue;
        }

        const lastChar = plate.slice(-1);
        // Verificar se deve processar este veículo
        if (!selectedFinals || selectedFinals.includes(lastChar)) {
          foundMatch = true;
          console.log(
            `Veículo encontrado com placa ${plate}. Iniciando download do CRLV...`
          );

          // Construir a URL de detalhes do veículo
          const detailURL = constructDetailURL(plate, renavam);
          console.log(`Navegando para a URL de detalhes: ${detailURL}`);
          window.location.href = detailURL;

          // Aguardar que a página de detalhes carregue
          const detailLoaded = await waitForDetailPageLoad();
          if (!detailLoaded) {
            console.warn(
              `Página de detalhes do veículo ${plate} não carregou. Tentando retornar à lista.`
            );
            const voltou = await clickVoltarButton();
            if (voltou) {
              console.log(
                `Retornou à lista após falha no carregamento do veículo ${plate}.`
              );
            } else {
              console.warn(
                `Não foi possível retornar à lista após falha no carregamento do veículo ${plate}.`
              );
            }
            // Marcar a placa como processada mesmo sem CRLV Digital
            processedPlates.add(plate);
            console.log(
              `Veículo com placa ${plate} marcado como processado (sem CRLV Digital).`
            );
            continue;
          }

          // Aguarde um pouco para garantir que todos os elementos estejam carregados
          await sleep(2000);

          // Clique no botão CRLV Digital
          const crlvButton = Array.from(
            document.querySelectorAll("a.text-bold")
          ).find((el) => el.textContent.includes("CRLV Digital (.pdf)"));
          if (crlvButton) {
            robustClick(crlvButton);
            console.log("Botão CRLV Digital clicado.");
            // Aguardar para garantir que o download seja iniciado
            await sleep(2000);
          } else {
            console.warn(
              `Botão CRLV Digital não encontrado para o veículo ${plate}.`
            );
          }

          // Aguardar o spinner desaparecer após o download
          await waitForSpinnerToDisappear();

          // Clicar no botão "Voltar" para retornar à lista de veículos
          const voltouComSucesso = await clickVoltarButton();
          if (voltouComSucesso) {
            // Marcar a placa como processada
            processedPlates.add(plate);
            console.log(`Veículo com placa ${plate} foi processado.`);
          } else {
            console.error(
              `Não foi possível retornar à lista para o veículo ${plate}.`
            );
            // Opcional: Adicionar a placa a um conjunto de falhas para revisão posterior
          }

          // Aguardar um curto período antes de processar o próximo veículo
          await sleep(2000);
        }
      }

      if (!foundMatch) {
        console.log(
          `Nenhum veículo com placa terminando em ${
            selectedFinals ? selectedFinals.join(", ") : "0 ou 9"
          } encontrado na página ${currentPage}.`
        );
      }

      // Tentar navegar para a próxima página
      hasNextPage = await goToNextPage();
      if (hasNextPage) {
        currentPage += 1;
        // Aguardar o carregamento da nova página
        await sleep(2000); // Aguardar 2 segundos antes de começar a processar a próxima página
      } else {
        console.log("Todas as páginas foram processadas.");
      }
    }

    console.log("Script concluído.");
  };

  // Iniciar o processamento
  await processAllPages();
})();
