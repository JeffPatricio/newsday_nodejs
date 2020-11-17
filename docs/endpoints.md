# POST (/news) (Multipart form)
* Cadastrar notícias

- title: título da notícia
- content: texto da notícia
- file: imagem da notícia



# POST (/comments) (JSON)
* Comentar notícias

- news_id: id da notícia a ser comentada
- text: texto do comentário



# GET (/news)
* Lista todas as notícias ordenadas por cadastro



# GET (/news/:id)
* Lista os detalhes e comentários da notícia

- id: id da notícia recebido na URL