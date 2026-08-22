# Uso de Inteligência Artificial

# acitivity-not-found

Durante o periodo de correção foi utilizado o ChatGPT, da OpenAI, como ferramenta de apoio. Ela fora usada em um erro identificado previamente por mim nos testes do backend e nos testes de front endrealizados pelo Abner.

O problema foi identificado de forma independente ao executar os testes e observar que uma consulta a uma atividade inexistente retornava HTTP `500`, enquanto o comportamento esperado era HTTP `404`.

A IA foi utilizada apenas para auxiliar na compreensão da causa do erro e nas possíveis formas de corrigir o tratamento da exceção no backend.

A sugestão adotada foi criar uma exceção específica para atividades não encontradas e tratá-la no `GlobalExceptionHandler`, retornando `HttpStatus.NOT_FOUND`. A solução foi revisada por mim e validada através da execução dos testes automatizados.

Arquivos influenciados:

* `ActivityService.java`
* `ActivityNotFoundException.java`
* `GlobalExceptionHandler.java`

Ferramenta utilizada: ChatGPT — OpenAI.
