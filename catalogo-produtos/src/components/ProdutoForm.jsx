import { useState } from "react";

const initialForm = {
  nome: "",
  preco: "",
  descricao: "",
  imagem: "",
};

export default function ProdutoForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nome = form.nome.trim();
    const descricao = form.descricao.trim();
    const precoNum = Number(form.preco);

    if (!nome || !form.preco.trim() || !descricao) {
      setErro("Preencha nome, preço e descrição.");
      return;
    }

    if (!Number.isFinite(precoNum) || precoNum <= 0) {
      setErro("Digite um preço válido (maior que 0).");
      return;
    }

    onAdd({
      nome,
      preco: precoNum,
      descricao,
      imagem: form.imagem.trim(),
    });

    setForm(initialForm);
    setErro("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome do produto*"
        required
      />

      <input
        name="preco"
        value={form.preco}
        onChange={handleChange}
        placeholder="Preço (ex: 199.90)*"
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0.01"
        required
      />

      <textarea
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descrição*"
        rows={4}
        required
      />

      <input
        name="imagem"
        value={form.imagem}
        onChange={handleChange}
        placeholder="URL da imagem (opcional)"
      />

      {erro ? <p className="error">{erro}</p> : null}

      <button type="submit">Adicionar</button>
    </form>
  );
}