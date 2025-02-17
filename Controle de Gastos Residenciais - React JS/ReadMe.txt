GastosResidenciais - Documentação do Projeto

Este documento reúne uma visão geral dos principais componentes do projeto, explicando como tudo foi pensado e desenvolvido, com os conceitos e boas práticas que utilizei.

Index (GastosResidenciais)  
Função: Este é o componente principal que configura toda a aplicação.  
Como funciona:  
- Cria as rotas e carrega os componentes Pessoas, Transações e ConsultaTotais.  
- Usa o contexto useTheme para aplicar os temas (claro/escuro) e o DataContext para gerenciar os dados.  
- Envolve a aplicação com o DataProvider, garantindo que os dados (pessoas, transações e totais) sejam salvos no localStorage.  
Interface:  
- Importa o module.css para estilizar a interface.  
- Organiza as seções do site, servindo como ponto de entrada da aplicação.

DataContext e DataProvider  
Função: Esses componentes armazenam e gerenciam os dados de pessoas, transações e IDs, utilizando o localStorage.  
Como funciona:  
- Na inicialização, os dados salvos (pessoas, transações e o último ID) são carregados do localStorage e definidos nos estados.  
- Disponibilizam funções para adicionar, editar e excluir pessoas e transações.  
- Sempre que os dados mudam, os estados são atualizados e os novos valores são salvos no localStorage.  
Uso:  
- Ao envolver a aplicação com o DataProvider, todos os componentes filhos podem acessar esses dados e funções através do DataContext.

CadastroPessoa  
Função: Permite cadastrar ou editar uma pessoa.  
Como funciona:  
- Usa estados locais para armazenar os valores dos campos "nome" e "idade".  
- Se uma pessoa for passada para edição, os campos já vêm pré-preenchidos (usando useEffect).  
- Ao enviar o formulário, são feitas validações simples (como verificar se o nome não está vazio, se está dentro do tamanho permitido e se a idade é numérica e válida).  
- Dependendo do caso, chama a função para cadastrar (addPessoa) ou atualizar (updatePessoa) no contexto.  
Interface:  
- Exibe um formulário com inputs para nome e idade, adaptado aos temas claro ou escuro conforme o contexto.

ListaPessoas  
Função: Mostra todas as pessoas cadastradas em uma tabela.  
Como funciona:  
- Pega a lista de pessoas do DataContext.  
- Exibe o ID, nome e idade de cada pessoa em uma tabela.  
- Tem botões para editar (que acionam uma função do componente pai) e excluir, com confirmação antes de remover.  
Interface:  
- A tabela é estilizada de acordo com o tema atual (claro ou escuro).

Pessoas  
Função: Junta os componentes de cadastro (CadastroPessoa) e listagem (ListaPessoas) de pessoas.  
Como funciona:  
- Gerencia os estados para controlar quando o modal de cadastro/edição aparece e guarda a pessoa que está sendo editada.  
- Possui um botão para abrir o modal de cadastro e, ao editar, passa os dados da pessoa para o formulário.  
- Exibe a lista de pessoas cadastradas e permite editar ou excluir um registro.  
Interface:  
- Combina os componentes de cadastro e listagem em um container estilizado e responsivo, adaptado ao tema atual.

CadastroTransacao  
Função: Responsável por cadastrar uma nova transação.  
Como funciona:  
- Tem campos para descrição, valor, tipo (receita ou despesa) e para selecionar a pessoa.  
- Realiza várias validações, como:  
  - Verificar se todos os campos foram preenchidos;  
  - Garantir que a descrição tenha no máximo 100 caracteres;  
  - Checar se o valor é numérico e positivo;  
  - Confirmar se a pessoa selecionada existe e, se for o caso de menores de 18 anos, garantir que a transação seja somente de despesa.  
- Após as validações, cria uma transação com um ID único (usando Date.now()) e chama a função addTransacao do DataContext para salvar.  
- Depois, reseta os campos e, se configurado, chama onTransacaoCadastrada para fechar o modal.  
Interface:  
- Adapta a aparência conforme o tema (claro ou escuro) e apresenta um formulário bem organizado.

ListaTransacoes  
Função: Exibe todas as transações cadastradas em uma tabela.  
Como funciona:  
- Pega as transações do DataContext e as lista em uma tabela com colunas para o id da pessoa, descrição, tipo e valor.  
- Os valores são formatados para exibição com vírgula (usando toLocaleString('pt-BR', ...)).  
- Permite editar ou excluir cada transação:  
  - Ao editar, abre um modal com os dados pré-preenchidos; o valor é convertido para string com vírgula para exibição e, ao salvar, volta para número.  
  - Excluir é feito com uma confirmação antes de remover o registro.  
Interface:  
- Tanto a tabela quanto o modal de edição seguem o tema atual (claro ou escuro).

Transações  
Função: Junta os componentes de cadastro (CadastroTransacao) e listagem (ListaTransacoes) de transações.  
Como funciona:  
- Tem um botão para abrir o modal de cadastro de transação.  
- Controla a abertura e fechamento do modal através de estados.  
- Exibe a lista de transações cadastradas.  
Interface:  
- Aplica o tema dinâmico (claro ou escuro) e organiza a interface de forma responsiva e intuitiva.

ConsultaTotais  
Função: Calcula e exibe os totais por pessoa e o total geral (receitas, despesas e saldo).  
Como funciona:  
- Para cada pessoa, filtra as transações e soma os valores conforme o tipo (receita ou despesa), calculando também o saldo.  
- Os totais são formatados para exibição com vírgula.  
Interface:  
- Mostra os totais em tabelas bem organizadas, com um layout que se adapta ao tema atual (claro ou escuro).

Espero que essa explicação ajude a entender melhor como o projeto foi estruturado e como cada componente contribui para a aplicação como um todo.