const ALLOWED_HOST_SUFFIXES = [
  'casteloautopecas.com.br','tcdn.com.br','walmartimages.com','walmartimages.cl','walmartimages.com.mx','mlstatic.com','susercontent.com','awsli.com.br','fbitsstatic.net','vtexassets.com','vteximg.com.br','blob.core.windows.net','googleapis.com','ebayimg.com','rapidauto.ro','olx.com.br','elecar.com.br','machadoautoparts.com.br','pkwteile.de','amautopartes.com','shopify.com','carrolandia.com.br','pegab.com.br','ofarolparts.com.br','estilorapai.com.py','ntxglow.com'
];

function allowedHost(hostname) {
  const h = hostname.toLowerCase();
  return ALLOWED_HOST_SUFFIXES.some(s => h === s || h.endsWith('.' + s));
}

module.exports = async function handler(req, res) {
  const url = req.query.url;
  if (!url || typeof url !== 'string') return res.status(400).send('Informe ?url=https://...');

  let target;
  try { target = new URL(url); } catch { return res.status(400).send('URL inválida'); }
  if (target.protocol !== 'https:') return res.status(400).send('Somente HTTPS');
  if (!allowedHost(target.hostname)) return res.status(403).send('Host não permitido');

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SERPARTS-ImageHost/1.0)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      redirect: 'follow'
    });

    if (!upstream.ok) return res.status(502).send(`Origem respondeu ${upstream.status}`);

    const contentType = upstream.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return res.status(415).send('A origem não retornou imagem');

    const declared = Number(upstream.headers.get('content-length') || 0);
    if (declared > 10 * 1024 * 1024) return res.status(413).send('Imagem acima de 10 MB');

    const data = Buffer.from(await upstream.arrayBuffer());
    if (data.length > 10 * 1024 * 1024) return res.status(413).send('Imagem acima de 10 MB');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(data);
  } catch {
    return res.status(502).send('Erro ao buscar imagem');
  }
};
