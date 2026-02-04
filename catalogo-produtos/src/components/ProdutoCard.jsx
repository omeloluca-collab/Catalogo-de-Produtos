export default function ProdutoCard({ nome, preco, imagem, descricao }) {
  const precoFormatado = Number(preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <article className="card">
      <img
        src={imagem || "https://via.placeholder.com/400x250?text=Sem+imagem"}
        alt={nome}
      />
      <div className="card-body">
        <h3>{nome}</h3>
        <strong>{precoFormatado}</strong>
        <p>{descricao}</p>
      </div>
    </article>
  );
}
