import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Menu, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import brandAsset from "@/assets/acaidoleni.png";
import produto1 from "@/assets/produto1.jpeg";
import produto2 from "@/assets/produto2.jpeg";
import produto3 from "@/assets/produto3.jpeg";
import produto4 from "@/assets/produto4.jpeg";

const MENU_URL = "https://cardapio.ai/online/acai-do-leni";

const products = [
  {
    name: "Morango",
    description: "Açaí batido com morango e mousse de morango.",
    image: produto1,
    alt: "Garrafa de açaí batido com morango e mousse de morango",
    tone: "bg-fruit",
  },
  {
    name: "Maracujá",
    description: "Açaí batido com mousse de maracujá.",
    image: produto2,
    alt: "Garrafa de açaí batido com mousse de maracujá",
    tone: "bg-highlight",
  },
  {
    name: "Creme Ninho",
    description: "Açaí batido com creme ninho.",
    image: produto3,
    alt: "Garrafa de açaí batido com creme ninho",
    tone: "bg-leaf",
  },
  {
    name: "Tradicional",
    description: "Açaí batido, leite condensado e leite ninho.",
    image: produto4,
    alt: "Garrafa de açaí tradicional com leite condensado e leite ninho",
    tone: "bg-violet",
  },
];

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Complementos", href: "#complementos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Açaí do Leni | Açaí na garrafa em Goiana" },
      {
        name: "description",
        content:
          "Açaí na garrafa em Goiana, PE. Conheça os sabores da Açaí do Leni e faça seu pedido pelo cardápio online.",
      },
      { property: "og:title", content: "Açaí do Leni | Açaí na garrafa em Goiana" },
      {
        property: "og:description",
        content: "Açaí na garrafa, sabor que conquista. Escolha seu sabor e peça online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function MenuLink({ href, children, onClick }: { href: string; children: string; onClick?: () => void }) {
  return (
    <a className="nav-link" href={href} onClick={onClick}>
      {children}
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="site-header">
        <a href="#inicio" className="brand-lockup" aria-label="Açaí do Leni — início">
          <img src={brandAsset} alt="Açaí do Leni" />
          <span>açaí do Leni</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(({ label, href }) => (
            <MenuLink key={href} href={href}>{label}</MenuLink>
          ))}
        </nav>

        <Button asChild variant="menu" size="menu" className="hidden sm:inline-flex">
          <a href={MENU_URL} target="_blank" rel="noreferrer">Ver cardápio</a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-button text-cream"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            {navItems.map(({ label, href }) => (
              <MenuLink key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</MenuLink>
            ))}
            <Button asChild variant="menu" size="menu" className="mt-3 w-full">
              <a href={MENU_URL} target="_blank" rel="noreferrer">Abrir cardápio</a>
            </Button>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow text-highlight">Feito em Goiana, Pernambuco</p>
            <h1>Açaí na garrafa, <em>sabor que conquista.</em></h1>
            <p className="hero-description">
              Cremoso, geladinho e pronto para acompanhar seu dia. Escolha seu sabor favorito e receba a energia da Açaí do Leni.
            </p>
            <div className="hero-actions">
              <Button asChild variant="menu" size="menu">
                <a href={MENU_URL} target="_blank" rel="noreferrer">
                  Pedir agora <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <a className="text-link" href="#produtos">Conhecer sabores</a>
            </div>
          </div>

          <div className="hero-product" data-reveal>
            <div className="hero-photo-wrap">
              <img
                src={produto4}
                alt="Garrafa de açaí da Açaí do Leni"
                fetchPriority="high"
              />
              <span className="hero-stamp">Na garrafa<br />do seu jeito</span>
            </div>
          </div>

          <div className="hero-word" aria-hidden="true">AÇAÍ</div>
        </section>

        <section id="produtos" className="products-section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow text-violet">Os queridinhos da casa</p>
              <h2>Quatro sabores.<br /><em>Uma vontade só.</em></h2>
            </div>
            <p>Garrafas preparadas para entregar cremosidade, sabor e aquela pausa boa que o dia pede.</p>
          </div>

          <div className="product-list">
            {products.map((product, index) => (
              <article className={`product-feature ${index % 2 ? "product-reverse" : ""}`} key={product.name} data-reveal>
                <div className={`product-photo ${product.tone}`}>
                  <span className="product-number">0{index + 1}</span>
                  <img src={product.image} alt={product.alt} loading={index > 0 ? "lazy" : "eager"} />
                </div>
                <div className="product-copy">
                  <p className="eyebrow">Açaí na garrafa</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a className="order-link" href={MENU_URL} target="_blank" rel="noreferrer">
                    Escolher no cardápio <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="complementos" className="extras-section">
          <div className="extras-copy" data-reveal>
            <p className="eyebrow text-highlight">Complete sua garrafa</p>
            <h2>Mais sabor em cada gole.</h2>
            <p>
              Combine o seu açaí com frutas e complementos. Monte um pedido com a sua cara e descubra novas misturas a cada escolha.
            </p>
            <Button asChild variant="menu" size="menu">
              <a href={MENU_URL} target="_blank" rel="noreferrer">Montar meu pedido</a>
            </Button>
          </div>
          <div className="extras-list" data-reveal>
            {[
              ["Nutella", "cremosidade intensa"],
              ["Oreo", "crocância no ponto"],
              ["Paçoca", "sabor brasileiro"],
            ].map(([name, detail], index) => (
              <div className="extra-row" key={name}>
                <span>0{index + 1}</span>
                <div><strong>{name}</strong><small>{detail}</small></div>
                <Plus aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        <section id="sobre" className="about-section">
          <div className="about-mark" data-reveal>
            <img src={brandAsset} alt="Marca Açaí do Leni" loading="lazy" />
          </div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow text-violet">Açaí do Leni</p>
            <h2>Da nossa garrafa para o seu momento.</h2>
            <p>
              Em Goiana, a gente prepara açaí para quem gosta de sabor de verdade e liberdade para combinar. Das frutas aos cremes, cada garrafa chega com personalidade e pronta para conquistar.
            </p>
          </div>
        </section>

        <section id="localizacao" className="location-section">
          <div className="location-city" data-reveal>
            <p className="eyebrow text-highlight">Onde encontrar</p>
            <h2>Goiana,<br /><em>Pernambuco.</em></h2>
          </div>
          <div className="location-details" data-reveal>
            <MapPin aria-hidden="true" />
            <div>
              <strong>Boa Vista, Goiana — PE</strong>
              <p>Rua Professor Mário Rodrigues do Nascimento, 9<br />CEP 55900-000</p>
              <p className="service-note">Atendimento todos os dias, das 13h às 22h.</p>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div data-reveal>
            <p className="eyebrow text-highlight">Sua próxima garrafa começa aqui</p>
            <h2>Escolha o sabor.<br /><em>A gente capricha.</em></h2>
            <Button asChild variant="menu" size="menu">
              <a href={MENU_URL} target="_blank" rel="noreferrer">
                Acessar cardápio <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer>
        <a href="#inicio" className="footer-brand">açaí do Leni</a>
        <p>Açaí na garrafa, sabor que conquista.</p>
        <p>Goiana, PE</p>
      </footer>
    </div>
  );
}