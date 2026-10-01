# SERPARTS Image Host

Hospedeiro simples de imagens para gerar URLs públicas sob um domínio Vercel.

## Publicar na Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjuliaseranini%2Fserparts-image-host&project-name=serparts-image-host&repository-name=serparts-image-host)

## Uso

1. Publique o projeto na Vercel pelo botão acima.
2. Abra a página inicial.
3. Cole uma URL direta de imagem aprovada.
4. Use o link gerado em `/api/image?url=...`.

A função valida HTTPS, restringe os hosts permitidos, exige `image/*`, limita a 10 MB e envia cache CDN longo.
