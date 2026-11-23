const pillars = [
  {
    title: "Arquitectura",
    description:
      "Diseño contemporáneo y dirección técnica de proyectos residenciales, comerciales e institucionales.",
  },
  {
    title: "Productos TOSCANA",
    description:
      "Mobiliario exterior, pérgolas, cubrimientos y cerramientos integrados en cada proyecto.",
  },
  {
    title: "Servicios CEYA",
    description:
      "Impermeabilización, mantenimiento integral y arquitectura premium con respaldo técnico.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="h-12 w-1.5 bg-[#D62027]" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#8A95A5]">
            CEYA Arquitectura
          </p>
        </div>

        <h1 className="mt-10 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
          Construimos con rigor técnico y precisión milimétrica.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
          Plataforma en construcción. Aquí reuniremos el catálogo, los proyectos,
          los servicios y las cotizaciones de CEYA Arquitectura.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center rounded bg-[#D62027] px-5 py-3 text-sm font-semibold text-white">
            Sitio en preparación
          </span>
          <span className="inline-flex items-center rounded border border-[#8A95A5]/40 bg-[#262A33] px-5 py-3 text-sm font-medium text-[#CBD5E1]">
            FASE 2 · Monorepo
          </span>
        </div>

        <dl className="mt-20 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded border border-[#CBD5E1]/10 bg-[#CBD5E1]/10 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-[#16181D] p-6">
              <dt className="font-display text-lg font-semibold text-white">
                {pillar.title}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-[#8A95A5]">
                {pillar.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="border-t border-[#CBD5E1]/10 px-6 py-6 text-xs text-[#8A95A5] sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© CEYA Arquitectura. Todos los derechos reservados.</p>
          <p>Next.js · Fastify · TypeScript · PostgreSQL</p>
        </div>
      </footer>
    </main>
  );
}
