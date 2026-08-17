export default function Footer() {
  return (
    // 1. Container principal ocupando a tela inteira em coluna
    <div className="flex min-w-screen flex-col bg-[#040617] text-white">

      {/* 2. Conteúdo principal que cresce e ocupa o espaço disponível */}
      <main className="flex-1 flex items-center justify-center">
        {/* Todo o seu conteúdo de login e apresentação aqui */}
      </main>

      {/* 3. Rodapé posicionado corretamente no fluxo, indo para o final */}
      <footer className="w-full border-t border-white/[0.06] bg-linear-to-br from-brand-secondary to-brand-primary py-4 px-6 text-xs text-[#7c7c80]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 sm:flex-row">
          <p className="text-center text-white sm:text-left">
            © 2026 <span className="text-white font-medium">FINIQtech</span>. Todos os direitos reservados a <span className="text-white font-semibold">Nícolas</span>.
          </p>

          <a
            href="https://instagram.com/niquinjo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#6da6d7] transition-colors hover:text-white"
          >
            <span>@niquinjo.dev</span>
          </a>
        </div>
      </footer>
    </div>
  );
}