import { memo, useCallback, useState } from "react";

const initialForm = Object.freeze({
  nome: "",
  preco: "",
  descricao: "",
  imagem: "",
});

function ProdutoForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [erro, setErro] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prev) => (prev[name] === value ? prev : { ...prev, [name]: value }));
    // limpa o erro assim que o usuário começa a corrigir
    setErro((prev) => (prev ? "" : prev));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nome = form.nome.trim();
      const descricao = form.descricao.trim();
      const precoStr = String(form.preco).trim();
      const precoNum = Number(precoStr);

      if (!nome || !precoStr || !descricao) {
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
    },
    [form, onAdd]
  );

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

export default memo(ProdutoForm);