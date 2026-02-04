import { useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";
import ProdutoForm from "../components/ProdutoForm";

const mockProdutos = [
  {
    id: 1,
    nome: "Camiseta Oversized",
    preco: 89.9,
    descricao: "Camiseta confortável, estilo streetwear e tecido premium.",
    imagem:
      "https://plus.unsplash.com/premium_photo-1756085509463-59d0110430ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtaXNhJTIwb3ZlcnNpemVkfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    nome: "Tênis Urbano",
    preco: 249.9,
    descricao: "Tênis leve, bonito e perfeito para o dia a dia.",
    imagem:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=60",
  },
];

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Simula carregamento inicial (API)
  useEffect(() => {
    setCarregando(true);

    const timer = setTimeout(() => {
      setProdutos(mockProdutos);
      setCarregando(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  function adicionarProduto(novoProduto) {
    setProdutos((prev) => [
      { ...novoProduto, id: Date.now() },
      ...prev,
    ]);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Catálogo de Produtos</h1>
      </header>

      <section className="box">
        <h2>Cadastrar produto</h2>
        <ProdutoForm onAdd={adicionarProduto} />
      </section>

      <section className="box">
        <h2>Produtos</h2>

        {carregando ? (
          <p className="loading">carregando...</p>
        ) : (
          <div className="grid">
            {produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                imagem={produto.imagem}
                descricao={produto.descricao}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
