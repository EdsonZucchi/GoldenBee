# GoldenBee

## Sobre o Projeto

GoldenBee é uma aplicação web desenvolvida para organizar e acompanhar tours gastronômicos realizados entre colaboradores da empresa.

O objetivo é centralizar o planejamento dos encontros, facilitar a confirmação de presença dos participantes, manter um histórico dos locais visitados e coletar avaliações para auxiliar na escolha dos próximos destinos.

## Principais Funcionalidades

* Cadastro e autenticação de usuários.
* Agendamento de novos tours gastronômicos.
* Integração com Google Places para pesquisa de restaurantes e obtenção automática de informações como endereço, fotos e localização.
* Confirmação de participação pelos usuários.
* Envio de convites de calendário por e-mail (formato ICS).
* Registro de avaliações após a realização do tour.
* Histórico completo dos locais visitados.
* Ranking e estatísticas de locais mais bem avaliados.
* Sugestão e votação de futuros destinos (funcionalidade futura).

## Tecnologias

### Frontend

* React
* Material UI
* React Query

### Backend / Infraestrutura

* Firebase Authentication
* Firestore Database
* Firebase Hosting

### Integrações Externas

* Google Places API
* Google Maps API
* Serviço de envio de e-mails (Resend)

## Objetivos Técnicos

O projeto foi concebido para possuir arquitetura simples, baixo custo operacional e rápida evolução, utilizando serviços serverless para minimizar a necessidade de infraestrutura própria.

A aplicação deve ser responsiva, intuitiva e de fácil utilização tanto em dispositivos móveis quanto em desktop.

## Estrutura Conceitual

### Usuário

Representa um participante dos tours gastronômicos.

Informações principais:

* Nome
* E-mail
* Celular

### Tour

Representa um evento gastronômico agendado.

Informações principais:

* Local escolhido
* Data e horário
* Participantes confirmados
* Avaliações recebidas

### Avaliação

Representa o feedback de um participante após a realização do tour.

Informações principais:

* Nota
* Comentário
* Data da avaliação

## Futuras Evoluções

* Sistema de votação para escolha do próximo local.
* Ranking de participantes mais ativos.
* Dashboard com estatísticas dos tours.

## Filosofia do Projeto

GoldenBee busca incentivar a integração entre equipes por meio de experiências gastronômicas compartilhadas, tornando o processo de organização simples, transparente e divertido.
