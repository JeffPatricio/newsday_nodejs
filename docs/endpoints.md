# POST (/news) (Multipart form)
* Cadastrar notícias

Entrada (body):
- title (*): título da notícia
- content (*): texto da notícia
- file (*): imagem da notícia
- user_id (*): id do usuário criador da notícia

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- news { id, title, content, image, user_id }: dados da notícia

============================================================

# POST (/comments) (JSON)
* Comentar notícias

Entrada (body):
- news_id (*): id da notícia a ser comentada
- user_id (*): id do usuário que está comentando
- text (*): texto do comentário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- comment { id, news_id, text }: dados do comentário

============================================================

# GET (/news?search)
* Lista todas as notícias ordenadas por cadastro

Entrada (URL):
- search: Busca de notícias por título ou conteúdo

Entrada (headers):
- user_id: Busca de notícias por id do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- news [ { id, title, content, image } ]: lista de notícias

============================================================

# GET (/news/:id)
* Lista os detalhes e comentários da notícia

Entrada (URL):
- id (*): id da notícia recebido na URL

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- news { id, title, content, image, comments: [] } : detalhes da notícia

============================================================

# POST (/users) (JSON)
* Cadastrar usuários

Entrada (body):
- name (*): nome do usuário
- email (*): email do usuário
- password (*): senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user { id, name, email }: dados do usuário

============================================================

# POST (/sessions) (JSON)
* Fazer login

Entrada (body):
- email (*): email do usuário
- password (*): senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user { id, name, email, photo }: dados do usuário

============================================================

# PUT (/users) (Multipart form)
* Atualizar os dados do usuário

Entrada (body):
- user_id (*): id do usuário
- name (*): nome do usuário
- email (*): email do usuário
- file: imagem do usuário
- removePhoto: flag para definir se é pra remover a foto ou não
- currentPassword: senha atual do usuário
- newPassword: nova senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user { id, name, email, photo }: dados do usuário

============================================================

# PUT (/news) (Multipart form)
* Atualizar os dados da notícia

Entrada (body):
- title (*): título da notícia
- content (*): conteúdo da notícia
- news_id (*): id da notícia
- file : imagem da notícia

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- news { id, title, content, image } : detalhes da notícia

============================================================
