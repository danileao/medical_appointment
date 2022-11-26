# Agendamento de consulta médica

### **Funcionalidades**

---

### **Cadastro de Usuário**

- [x] Deve ser possível o usuário realizar um cadastro
  - [x] O usuário não precisa estar autenticado na aplicação para se cadastrar
  - [x] Não deve ser possível realizar o cadastro de um usuário sem username e senha.
  - [x] Não deve ser possível realizar um cadastro de username já existente.
  - [x] Não deve ser possível o usuário cadastrar a permissão de administrador.

---

### **Cadastro de Especialidade**

- [] Deve ser possível um usuário cadastrar uma especialidade
  - [x] O usuário precisa estar autenticado na aplicação.
  - [x] Não deve ser possível realizar o cadastro de uma especialidade já existente, ou seja, com o mesmo nome.
  - [x] O usuário precisa ter permissão de administrador.
  - [x] Não deve ser possível cadastrar uma especialidade com nome vazio.

### **Cadastro de Médico**

- [x] Deve ser possível cadastrar um médico
  - [x] O médico deve possuir um CRM com 6 dígitos
  - [x] O médico deve estar atrelado a um usuário
  - [x] O médico deve ter uma e somente uma especialidade
  - [x] Não deve ser possível cadastrar um médico sem CRM.
  - [x] Não deve ser possível cadastrar o mesmo CRM mais de uma vez.

### **Cadastro de Informações do médico**

- [ ] Deve ser possível cadastrar a informação de um médico
  - [ ] O médico ele deve estar cadastrado
  - [ ] O médico deve estar autenticado na aplicação (ROUTES)
  - [ ] Não deve ser possível ter mais de um registro de informação por médico
  - [ ] O horário de término não deve ser menor que o horário de início de atendimento
  - [ ] A duração da consulta não pode ser menor ou igual a zero
