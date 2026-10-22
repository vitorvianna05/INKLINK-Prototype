# InkLink

Protótipo navegável em React e Vite, inspirado nas cinco telas de referência. Dados fictícios, sem backend e sem autenticação.

## Executar

```sh
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para gerar a versão estática: `npm run build`. Para conferir a versão compilada: `npm run preview`.

## Fluxos

- Descobrir: apresentação e artistas em destaque.
- Explorar: filtros por nome, estilo, cidade, preço e favoritos.
- Perfil do artista: apresentação e solicitação de orçamento.
- Perfil com abas de tatuagens realizadas, flashes e histórico de conversa.
- Meu espaço: propostas, solicitações enviadas e favoritos.
- Mensagens: envio local de mensagens e aceite simulado da proposta.
- Encerramento do serviço: histórico preservado e envio bloqueado até confirmar um novo agendamento.
- Área do artista: indicadores fictícios, pedidos e portfólio.

Favoritos, pedidos, mensagens e aceite ficam no localStorage do navegador. Limpe os dados do site para reiniciar a demonstração. As edições de perfil e disponibilidade são demonstrativas. Imagens do Unsplash e fontes do Google requerem internet. As fotografias são ilustrativas e não representam pessoas ou portfólios reais.
