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