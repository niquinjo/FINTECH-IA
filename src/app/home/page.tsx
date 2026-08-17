import { getUser } from '@/lib/auth';
import GoogleLoginButton from './_components/google-login-button';
import { LoginContent } from './_components/login';
import { RegisterContent } from './_components/register';
import { redirect } from 'next/navigation';
import Footer from './_components/footer';

export default async function AuthPage() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-linear-to-br from-brand-secondary to-brand-primary">
      
      <div className="flex flex-col lg:flex-row flex-1 w-full">

        <div className="relative z-10 w-full lg:w-[40%] flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-0 bg-gradient-to-br from-brand-accent to-brand-muted rounded-b-[3rem] lg:rounded-b-none lg:rounded-r-[4rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] lg:shadow-[15px_0_40px_-15px_rgba(0,0,0,0.5)]">
          <div className="w-full max-w-sm mx-auto space-y-6">

            <LoginContent />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-brand-dark/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-brand-dark font-semibold">
                </span>
              </div>
            </div>

            <GoogleLoginButton />

            <div className="mt-8 text-center">
              <RegisterContent />
            </div>

          </div>
        </div>

        <div className="flex w-full lg:w-[60%] items-center justify-center p-8 py-16 lg:p-20 relative z-0">
          <div className="text-white max-w-2xl space-y-10">

            <div className="space-y-3 text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">FINIQtech</h2>
              <p className="text-brand-accent text-lg lg:text-xl font-medium">Sua vida financeira elevada a outro nível.</p>
            </div>

            <p className="text-gray-200 text-base lg:text-lg leading-relaxed text-center lg:text-left">
              Esqueça as planilhas complexas. Nós criamos um ecossistema completo para você retomar o controle do seu dinheiro com inteligência, segurança e design de ponta.
            </p>

            <div className="space-y-8 pt-4">

              <div className="flex items-start space-x-5">
                <div className="bg-white/10 p-4 rounded-xl shadow-inner shrink-0">
                  <span className="text-3xl lg:text-4xl">📊</span>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-white">Dashboard Intuitivo</h4>
                  <p className="text-sm lg:text-base text-gray-300 mt-1">Tenha uma visão 360º das suas receitas, despesas e saldos atualizados em tempo real, em uma interface limpa.</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-white/10 p-4 rounded-xl shadow-inner shrink-0">
                  <span className="text-3xl lg:text-4xl">🎯</span>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-white">Metas e Orçamentos</h4>
                  <p className="text-sm lg:text-base text-gray-300 mt-1">Crie limites de gastos por categoria, defina objetivos e acompanhe seu progresso para alcançar suas metas mais rápido.</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-white/10 p-4 rounded-xl shadow-inner shrink-0">
                  <span className="text-3xl lg:text-4xl">✨</span>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-white">Agente de IA Integrado: O NIQ </h4>
                  <p className="text-sm lg:text-base text-gray-300 mt-1">Converse com nossa Inteligência Artificial para tirar dúvidas sobre seus gastos e receber insights personalizados sobre seu orçamento.</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-white/10 p-4 rounded-xl shadow-inner shrink-0">
                  <span className="text-3xl lg:text-4xl">🚀</span>
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold text-white flex flex-wrap items-center gap-2">
                    Evolução Contínua
                    <span className="text-xs bg-brand-accent text-brand-dark px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Em Breve</span>
                  </h4>
                  <p className="text-sm lg:text-base text-gray-300 mt-1">Novidades estão a caminho: gráficos avançados interativos (charts) e um Agente IA com ainda mais autonomia para otimizar sua vida financeira.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Footer agora fora do bloco flex-row, garantindo que fique embaixo de tudo */}
      <Footer />
    </div>
  );
}