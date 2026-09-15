import FadeIn from "./FadeIn";
import { clients } from "@/lib/data";

export default function Clients() {
  return (
    <section id="clients">
      <FadeIn
        as="div"
        className="section-header"
        style={{ textAlign: "center" }}
      >
        <div className="section-tag" style={{ margin: "0 auto 14px" }}>
          Clients
        </div>
        <h2 className="section-title">Trusted By</h2>
      </FadeIn>
      <FadeIn className="clients-grid">
        {clients.map((client) => (
          <a
            key={client.alt}
            href={client.link}
            target={client.link !== "#" ? "_blank" : undefined}
            rel={client.link !== "#" ? "noopener" : undefined}
            className="client-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={client.image} alt={client.alt} />
          </a>
        ))}
      </FadeIn>
    </section>
  );
}
