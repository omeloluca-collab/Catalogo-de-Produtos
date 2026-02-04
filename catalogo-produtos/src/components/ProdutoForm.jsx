import { useState } from "react";

export default function ProdutoForm({ onAdd }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nome.trim() || !preco.trim() || !descricao.trim()) {
      setErro("Preencha nome, preço e descrição.");
      return;
    }

    const precoNum = Number(preco);
    if (Number.isNaN(precoNum) || precoNum <= 0) {
      setErro("Digite um preço válido (maior que 0).");
      return;
    }

    onAdd({
      nome: nome.trim(),
      preco: precoNum,
      descricao: descricao.trim(),
      imagem: imagem.trim(),
    });

    // limpa
    setNome("");
    setPreco("");
    setDescricao("");
    setImagem("");
    setErro("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do produto*"
      />

      <input
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        placeholder="Preço (ex: 199.90)*"
      />

      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição*"
        rows={4}
      />

      <input
        value={imagem}
        onChange={(e) => setImagem(e.target.value)}
        placeholder="URL da imagem (opcional)"
      />

      {erro && <p className="error">{erro}</p>}

      <button type="submit">Adicionar</button>
    </form>
  );
}
