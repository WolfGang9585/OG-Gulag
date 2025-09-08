// THE GULAG — Minimal server for drag-and-drop
const http=require('http'), fs=require('fs'), path=require('path'), url=require('url');
const PORT=process.env.PORT||5000, HOST='0.0.0.0';
function serve(req,res){
  let p=url.parse(req.url).pathname; if(p==='/') p='/front-end.html';
  const f=path.join(__dirname,p);
  if(!f.startsWith(__dirname)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(f,(e,c)=>{
    if(e){ res.writeHead(404); return res.end('Not found'); }
    const map={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png'};
    res.writeHead(200,{'Content-Type': map[path.extname(f)]||'application/octet-stream'});
    res.end(c);
  });
}
http.createServer((req,res)=>{
  if(req.url==='/health'){ res.writeHead(200,{'Content-Type':'application/json'}); return res.end(JSON.stringify({ok:true, app:'THE GULAG'})); }
  serve(req,res);
}).listen(PORT,HOST,()=>console.log(`THE GULAG live on http://${HOST}:${PORT}`));
