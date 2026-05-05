const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/dados_imoveis', (req, res) => {
  const db = new sqlite3.Database('imagens_links.db');

  db.all('SELECT alt, link AS src, preco FROM imagens', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      const dadosImoveis = rows.map(row => ({
        alt: row.alt,
        src: row.src,
        preco: row.preco
      }));
      res.json(dadosImoveis);
    }

    db.close();
  });
});

app.get('/exportar_json', (req, res) => {
  const db = new sqlite3.Database('imagens_links.db');

  db.all('SELECT alt, link AS src, preco FROM imagens', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro ao exportar dados' });
    } else {
      res.json(rows);
    }

    db.close();
  });
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
