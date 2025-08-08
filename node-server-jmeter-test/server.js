const http = require('http');

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from www.duhotest.com\n");
  }

  else if (url === '/status' && method === 'GET') {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", timestamp: new Date() }));
  }

  else if (url === '/echo' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk });
    req.on('end', () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ you_sent: body }));
    });
  }

  else if (url === '/delay' && method === 'GET') {
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Delayed response after 2 seconds");
    }, 2000);
  }

  else if (url === '/random-error' && method === 'GET') {
    const fail = Math.random() < 0.1; // 10% 확률 실패
    if (fail) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error (random)");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Success!");
    }
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.post('/echo', (req, res) => {
  res.json({ received: req.body.message });
});

app.get('/delay', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  res.send('Delayed Response');
});

app.get('/random-error', (req, res) => {
  const ok = Math.random() > 0.5;
  if (ok) {
    res.send('OK');
  } else {
    res.status(500).send('Random Error!');
  }
});
