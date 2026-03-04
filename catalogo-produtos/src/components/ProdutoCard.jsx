import { memo, useMemo } from "react";

function ProdutoCard({ nome, preco, descricao, img, priority = false }) {
  const precoFormatado = useMemo(
    () =>
      Number(preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    [preco]
  );

  const src = img?.src ?? "";
  const srcSet = img?.srcSet;

  return (
    <article className="card">
      <img
        src={src}
        {...(srcSet ? { srcSet } : null)}
        sizes="(max-width: 600px) 100vw, 400px"
        alt={nome}
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "auto"}
        decoding="async"
        width="400"
        height="250"
      />

      <div className="card-body">
        <h3>{nome}</h3>
        <strong>{precoFormatado}</strong>
        <p>{descricao}</p>
      </div>
    </article>
  );
}

export default memo(ProdutoCard);