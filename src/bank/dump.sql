CREATE DATABASE LOJA;

CREATE TABLE usuarios (
	id serial primary key,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR (255) NOT NULL
)

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);

INSERT INTO categorias (descricao) VALUES 
('Informática'),
('Celulares'),
('Beleza'),
('Perfumaria'),
('Mercado'),
('Livros'),
('Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    categoria_id INT REFERENCES categorias(id) ON DELETE CASCADE,
    produto_imagem VARCHAR(255)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    observacao TEXT,
    valor_total DECIMAL(10, 2)
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade_produto INTEGER,
    valor_produto INTEGER
);


CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cep VARCHAR(10) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL
);

