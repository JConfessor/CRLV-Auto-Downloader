
# Baixador Automático de CRLV

Automatize o processo de download do **Certificado de Registro e Licenciamento de Veículo (CRLV)** para veículos listados no **Portal de Serviços Senatran Serpro**. Este script facilita a obtenção dos PDFs do CRLV ao navegar pelas listas de veículos, filtrar com base nos finais das placas e gerenciar o download de forma eficiente.

## Características

- **Navegação Automatizada:** Percorre múltiplas páginas de listagem de veículos.
- **Filtragem Personalizada:** Escolha processar veículos com finais específicos de placas ou todos os veículos listados.
- **Download Automático:** Baixa automaticamente o CRLV Digital em PDF para cada veículo selecionado.
- **Logs Detalhados:** Monitora o progresso e identifica possíveis erros durante a execução.

## Pré-requisitos

- **Navegador Web:** Google Chrome ou qualquer navegador baseado em Chromium (ex.: Microsoft Edge).
- **Permissões de Acesso:** Acesso autorizado ao Portal Senatran Serpro para baixar documentos CRLV.
- **Conexão com a Internet:** Estável para garantir o funcionamento correto do script.
- **Extensões do Navegador:** Recomenda-se desativar extensões que possam interferir na execução do script, como bloqueadores de anúncios.

## Instalação

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/Baixador-Automatico-de-CRLV.git
   ```

2. **Navegue até o Diretório do Projeto:**

   ```bash
   cd Baixador-Automatico-de-CRLV
   ```

## Uso

1. **Acesse o Portal Senatran Serpro:**

   Vá para [Portal Senatran Serpro](https://portalservicos.senatran.serpro.gov.br/#/veiculos/meus-veiculos) e faça login com suas credenciais.

2. **Abra as Ferramentas de Desenvolvedor:**

   - Pressione `F12` ou `Ctrl+Shift+I` (Windows/Linux) ou `Cmd+Option+I` (Mac) para abrir as Ferramentas de Desenvolvedor.
   - Selecione a aba `Console`.

3. **Cole o Script:**

   Copie todo o script do **Baixador Automático de CRLV** e cole no console.

4. **Execute o Script:**

   Pressione `Enter` para rodar o script.

5. **Selecione os Finais das Placas:**

   - **Exemplo:** Para processar placas que terminam com `9`, `0` ou `1`, insira:
     ```
     9,0,1
     ```
   - **Processar Todas:** Deixe o campo em branco e pressione `OK`.

## Como Funciona

1. **Filtragem de Veículos:**

   O script percorre cada veículo listado no portal, extrai a placa e o Renavam, e verifica se o final da placa corresponde aos selecionados pelo usuário.

2. **Navegação e Download:**

   - Para cada veículo filtrado, o script navega diretamente para a página de detalhes utilizando a placa e o Renavam.
   - Clica no botão de download do CRLV Digital.
   - Aguarda a finalização do download antes de retornar à lista de veículos.

3. **Iteração:**

   Repete o processo para todos os veículos correspondentes em todas as páginas disponíveis.

## Solução de Problemas

### Problemas Comuns

1. **Botão "Voltar" Não Encontrado:**
   - **Sintomas:** Logs indicando que o botão "Voltar" não foi encontrado.
   - **Solução:** Verifique se o layout do site mudou e atualize os seletores no script conforme necessário.

2. **Spinner Permanece Visível:**
   - **Sintomas:** O script não prossegue após detectar o spinner.
   - **Solução:** Aumente os tempos de espera (`sleep`) no script para permitir mais tempo de carregamento.

3. **Página Não Muda Após o Clique:**
   - **Sintomas:** Logs indicando que a página não mudou após clicar no veículo.
   - **Solução:** Assegure-se de que o elemento correto está sendo clicado. Atualize os seletores ou a lógica de clique no script.

### Dicas para Depuração

- **Verifique os Seletores:** Use as Ferramentas de Desenvolvedor para confirmar que os seletores usados no script estão corretos.
- **Monitore os Logs:** Observe os logs no console para identificar em que etapa o script está falhando.
- **Ajuste os Intervalos de Espera:** Dependendo da velocidade da sua conexão, pode ser necessário aumentar os tempos de espera no script.

## Contribuindo

Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões de melhorias, siga os passos abaixo:

1. **Faça um Fork do Repositório**
2. **Crie uma Branch de Feature**

   ```bash
   git checkout -b feature/SuaFeature
   ```

3. **Commita Suas Alterações**

   ```bash
   git commit -m "Adiciona SuaFeature"
   ```

4. **Faça o Push para a Branch**

   ```bash
   git push origin feature/SuaFeature
   ```

5. **Abra um Pull Request**

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Disclaimer

**Use este script de forma responsável e assegure-se de que possui as permissões necessárias para acessar e baixar documentos CRLV.** O autor não se responsabiliza por qualquer uso indevido ou danos resultantes do uso deste script.

---
