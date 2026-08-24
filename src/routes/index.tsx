import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const TITLE = "Spazio Perdizes — Salão de beleza em Perdizes, São Paulo";
const DESC =
  "Cabelo, unhas, maquiagem e cuidados na Rua Tucuna, 710 — Perdizes, São Paulo. 4,7 estrelas e mais de 300 avaliações no Google.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Spazio Perdizes — Beleza, do seu jeito." },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/**
 * O protótipo é 100% HTML/CSS/JS estático e vive em `public/site/`.
 * Esta rota apenas envia o visitante para lá.
 */
function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a href="/site/index.html" className="text-sm underline">
        Abrir o protótipo do Spazio Perdizes
      </a>
    </div>
  );
}
