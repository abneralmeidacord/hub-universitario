# Declaração de uso de Inteligência Artificial

**Autor(a):** Leonardo Mendes Jorge Soares
**Usuário GitHub:** Leonardo-m-web

---

## Ferramenta e modelo utilizados
Chat GPT (OpenAI), via interface de chat.

---

## Etapas em que a IA foi utilizada

**Validação de email duplicado em inscrições:** solicitei à IA que implementasse uma validação para impedir que o mesmo email fosse cadastrado mais de uma vez na mesma atividade, uma vez que a rota de registro não possuía essa verificação.

**Diagnóstico e planejamento:** a IA analisou o código existente (`RegistrationService.java`, `RegistrationRepository.java`, `RegistrationController.java`) e identificou os pontos necessários para a implementação da validação, considerando a estrutura do projeto e os padrões já utilizados.

**Implementação:**
- Criação do método `existsByActivityIdAndStudentEmail` no `RegistrationRepository.java` para consultar se já existe um registro com aquele email para a atividade específica.
- Adição da validação no método `register` do `RegistrationService.java`, lançando uma exceção personalizada caso o email já esteja cadastrado.
- Criação da classe `EmailAlreadyRegisteredException` para representar essa regra de negócio.
- Adição do handler no `GlobalExceptionHandler.java` para capturar a exceção e retornar status HTTP 409 (Conflict) com a mensagem "Email já foi cadastrado na atividade".

**Revisão:** a IA revisou o código modificado para garantir que a integração com o fluxo existente estivesse correta, confirmando que os demais métodos e funcionalidades não foram afetados.

---

## Resumo dos principais prompts/objetivos

- "existe uma rota que registra um usuário em uma atividade mas ela não está validando se a atividade já possui um email igual ao enviado e eu preciso dessa validação"
- "na parte da exceção use a normal, eu só quero que a mensagem 'email já foi cadastrado na atividade' e o status code sejam enviados"
- "esse é o RegistrationService, como fica com a validação?"
- "esse é o GlobalExceptionHandler, como fica?"

---

## Sugestões aceitas, adaptadas ou rejeitadas

**Aceitas:** a estrutura da validação utilizando o método `existsByActivityIdAndStudentEmail` do Spring Data JPA, por seguir o padrão de nomenclatura que gera queries automaticamente.

**Aceitas:** o uso de `ResponseStatusException` com status `HttpStatus.CONFLICT` para retornar a mensagem de erro de forma simples e direta, conforme solicitado.

**Adaptadas:** a implementação inicial sugeria criar uma exception personalizada e um handler específico. No entanto, para manter a simplicidade, optei por utilizar `ResponseStatusException`, que já atende ao requisito sem a necessidade de criar novas classes.

**Aceitas:** a sugestão de posicionar a validação antes das demais verificações (atividade fechada, atividade lotada) para garantir que a verificação de email duplicado tenha prioridade e evite processamento desnecessário.

---

## Como o resultado foi revisado e validado

A implementação foi revisada através da leitura do código modificado, verificando que a validação foi inserida no local correto e que a mensagem de erro retornada está conforme solicitado. Foram realizados testes manuais via requisições à API para confirmar que:

1. O primeiro cadastro com um email em uma atividade é bem-sucedido (status 201).
2. Uma segunda tentativa com o mesmo email para a mesma atividade retorna status 409 com a mensagem "Email já foi cadastrado na atividade".
3. O mesmo email pode ser cadastrado em atividades diferentes sem conflito.

Nenhum teste automatizado foi quebrado com a alteração, uma vez que a validação é uma nova regra de negócio e não interfere nas validações já existentes.

---

# Uso de Inteligência Artificial

# acitivity-not-found

Durante o periodo de correção foi utilizado o ChatGPT, da OpenAI, como ferramenta de apoio. Ela fora usada em um erro identificado previamente por mim (Rafael) nos testes do backend e nos testes de front end realizados pelo Abner.

O problema foi identificado de forma independente ao executar os testes e observar que uma consulta a uma atividade inexistente retornava HTTP `500`, enquanto o comportamento esperado era HTTP `404`.

A IA foi utilizada apenas para auxiliar na compreensão da causa do erro e nas possíveis formas de corrigir o tratamento da exceção no backend.

A sugestão adotada foi criar uma exceção específica para atividades não encontradas e tratá-la no `GlobalExceptionHandler`, retornando `HttpStatus.NOT_FOUND`. A solução foi revisada por mim e validada através da execução dos testes automatizados.

Arquivos influenciados:

* `ActivityService.java`
* `ActivityNotFoundException.java`
* `GlobalExceptionHandler.java`

Ferramenta utilizada: ChatGPT — OpenAI.

# Declaração de uso de Inteligência Artificial

**Autor(a):** Juia Michetti
**Usuário GitHub:** https://github.com/juliaagainagain

## Ferramenta e modelo utilizados

Claude (Anthropic), via interface de chat.

## Etapas em que a IA foi utilizada

- **Configuração do ambiente:** apoio na configuração de `JAVA_HOME` no Windows e organização dos comandos de execução do backend (Maven Wrapper) e frontend (Vite) que estava dando erro e eu nao entendi o porque.
- **Organização do Git:** eu pedi para ela criar os nomes para não ter que ficar pensando neles muito tempo
- **Investigação e descoberta dos bugs:** rodei a suíte de testes automatizados do backend (`./mvnw test`) e usei o apoio da IA para interpretar a saída. Isso revelou dois testes falhando, que usei para identificar e nomear os problemas:
  - `shouldReturn404ForUnknownActivity` → atividade inexistente retornava `500` em vez de `404`.
  - `shouldPreventRegistrationWhenActivityIsFull` → atividade lotada aceitava nova inscrição (retornava `201` em vez de `409`).
- **Diagnóstico de bug:** leitura assistida do código-fonte (`RegistrationService.java`, `Activity.java`, `GlobalExceptionHandler.java`) para localizar a causa raiz do bug de inscrição em atividade lotada: ausência de validação de capacidade/status antes de persistir a inscrição.
- **Implementação:**
  - Criação da classe `RegistrationNotAllowedException`.
  - Adição de um handler em `GlobalExceptionHandler` para traduzir essa exceção em resposta `409 Conflict`.
  - Adição da validação de capacidade/status em `RegistrationService.register()`.
  - Adição de `maxLength` nos campos de nome e e-mail em `RegistrationForm.tsx`, alinhando o frontend aos limites já validados pelo backend (`@Size(max = 100)` e `@Size(max = 160)`).
- **Revisão:** apoio na leitura da saída dos testes após a correção, confirmando que `shouldPreventRegistrationWhenActivityIsFull` passou a ser aprovado.

## Resumo dos principais prompts/objetivos

- "Por que o contador de inscritos não atualiza?"
- "Me ajude a rodar e interpretar os testes do backend?"
- "Aponta pra mim os erros que os testes revelaram."
- "Corrija o bug de inscrição em atividade lotada seguindo o padrão do projeto, e me diga o que mudou para eu validar aqui depois."
- "O e-mail aceita muitos caracteres, isso precisa ser validado?"

## Sugestões aceitas, adaptadas ou rejeitadas

- **Aceitas:** a estrutura da exceção de negócio (`RegistrationNotAllowedException`) e do handler HTTP, por seguirem o mesmo padrão já usado no projeto para `IllegalArgumentException`.
- **Aceitas:** a validação de `maxLength` no frontend, por já existir validação equivalente no backend (evitando divergência de regra entre as camadas).
- **Adaptadas:** mensagens de erro, nomes de branch e de commit foram ajustados manualmente por mim para seguir a convenção já usada pelo restante da equipe.


## Como o resultado foi revisado e validado

Cada bug foi encontrado e nomeado por mim a partir da leitura da saída real dos testes automatizados, relacionando as falhas às regras de negócio descritas no `PROJECT.md`. As mudanças de código sugeridas pela IA foram lidas e compreendidas por mim antes de serem aplicadas. A correção do bug de capacidade foi validada rodando `./mvnw test` antes e depois da mudança, confirmando que o teste relacionado passou a ser aprovado sem quebrar os demais testes que já passavam. A limitação de caracteres no formulário foi validada visualmente no navegador.

## Responsabilidade

Declaro que compreendi, revisei e validei todo o conteúdo gerado com apoio de IA antes de incluí-lo neste repositório, e me responsabilizo integralmente pelo código e pelas decisões técnicas aqui entregues.