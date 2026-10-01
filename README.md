# SERPARTS Image Host

Hospedeiro simples de imagens para gerar URLs públicas sob um domínio Vercel.

## Uso

1. Publique o projeto na Vercel.
2. Abra a página inicial.
3. Cole uma URL direta de imagem aprovada.
4. Use o link gerado em `/api/image?url=...`.

A função valida HTTPS, restringe os hosts permitidos, exige `image/*`, limita a 10 MB e envia cache CDN longo.
