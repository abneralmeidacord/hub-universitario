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

## Responsabilidade

Declaro que compreendi, revisei e validei todo o conteúdo gerado com apoio de IA antes de incluí-lo neste repositório, e me responsabilizo integralmente pelo código e pelas decisões técnicas aqui entregues.