import { useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";
import ProdutoForm from "../components/ProdutoForm";

import camiseta480 from "../assets/products/camiseta-480.webp";
import camiseta960 from "../assets/products/camiseta-960.webp";
import tenis480 from "../assets/products/tenis-480.webp";
import tenis960 from "../assets/products/tenis-960.webp";

const mockProdutos = [
  {
    id: 1,
    nome: "Camiseta Oversized",
    preco: 89.9,
    descricao: "Camiseta confortável, estilo streetwear e tecido premium.",
    img: { src: camiseta480, srcSet: `${camiseta480} 480w, ${camiseta960} 960w` },
  },
  {
    id: 2,
    nome: "Tênis Urbano",
    preco: 249.9,
    descricao: "Tênis leve, bonito e perfeito para o dia a dia.",
    img: { src: tenis480, srcSet: `${tenis480} 480w, ${tenis960} 960w` },
  },
];

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Em produção, NÃO atrase o LCP com delay artificial
  const DELAY_MS = import.meta.env.DEV ? 1500 : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProdutos(mockProdutos);
      setCarregando(false);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, [DELAY_MS]);

  function adicionarProduto(novoProduto) {
    setProdutos((prev) => [{ ...novoProduto, id: Date.now() }, ...prev]);
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
            {produtos.map((produto, index) => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                descricao={produto.descricao}
                img={produto.img}
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}