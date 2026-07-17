import { Link, useOutletContext } from "react-router-dom";
import { BarChart3, Cookie, Database, MessageCircle, ShieldCheck } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { openPrivacyConsent } from "@/lib/privacyConsent";

const sections = [
  {
    icon: Database,
    title: "Dados tratados",
    content:
      "Quando autoriza a medição de audiência, podem ser tratados dados técnicos como páginas visitadas, horário, origem aproximada da visita, tipo de dispositivo, navegador e interações de navegação. O site não solicita que forneça dados pessoais para fins de Analytics.",
  },
  {
    icon: BarChart3,
    title: "Google Analytics",
    content:
      "O Google Analytics é usado exclusivamente para compreender o desempenho do site e melhorar os conteúdos. A medição só é ativada após consentimento. O armazenamento publicitário, os sinais do Google e a personalização de anúncios permanecem desativados.",
  },
  {
    icon: Cookie,
    title: "Armazenamento local e cookies",
    content:
      "O site guarda localmente a preferência de tema e a decisão de consentimento. Se aceitar Analytics, o Google pode criar identificadores de medição no seu navegador. Se recusar ou retirar o consentimento, o site atualiza o estado para negado e tenta remover os cookies de Analytics do domínio.",
  },
  {
    icon: MessageCircle,
    title: "Comentários públicos",
    content:
      "Ao publicar um comentário, o nome escolhido, o texto e a data de publicação ficam visíveis publicamente. Não inclua email, telefone ou outros dados pessoais no comentário. O conteúdo pode ser removido quando necessário para segurança, prevenção de abuso ou cumprimento legal.",
  },
];

export default function Privacy() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Política de Privacidade | Rodrigo Póvoa"
        description="Saiba como o site de Rodrigo Póvoa trata preferências, comentários e dados de navegação, e como gerir o consentimento do Google Analytics."
        language="pt-PT"
      />

      <PageSection variant="gradient" className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Transparência sobre os dados utilizados neste site e controlo sobre a sua escolha de medição de audiência.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Última atualização: 17 de julho de 2026</p>
        </div>
      </PageSection>

      <PageSection className="pt-14">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-5">
            {sections.map(({ icon: Icon, title, content }) => (
              <section key={title} className="rounded-2xl border border-primary/15 bg-card/50 p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="h-fit rounded-lg bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{title}</h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{content}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-semibold">Finalidade e controlo</h2>
            <p className="leading-7 text-muted-foreground">
              O tratamento de dados de medição baseia-se no seu consentimento. Pode aceitar, recusar ou retirar essa autorização a qualquer momento através do botão abaixo. A recusa não limita o acesso ao site.
            </p>
            <button
              type="button"
              onClick={openPrivacyConsent}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Gerir preferências de privacidade
            </button>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-semibold">Os seus direitos</h2>
            <p className="leading-7 text-muted-foreground">
              Pode solicitar informação, correção ou eliminação de dados relacionados consigo, bem como retirar o consentimento. Para pedidos de privacidade, utilize a{" "}
              <Link to="/contact" className="font-semibold text-primary hover:underline">
                página de contacto
              </Link>.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-semibold">Serviços externos</h2>
            <p className="leading-7 text-muted-foreground">
              A medição é prestada pela Google. Consulte também a{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Política de Privacidade da Google
              </a>.
            </p>
          </section>
        </div>
      </PageSection>
    </MainLayout>
  );
}
