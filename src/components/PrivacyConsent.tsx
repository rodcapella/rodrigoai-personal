import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Cookie, ShieldCheck, X } from "lucide-react";
import {
  disableAnalytics,
  enableAnalytics,
  getAnalyticsConsent,
  isAnalyticsConfigured,
  trackPageView,
} from "@/lib/analytics";
import { PRIVACY_CONSENT_EVENT } from "@/lib/privacyConsent";

export default function PrivacyConsent() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setOpen(getAnalyticsConsent() === null);
    const handleOpen = () => setOpen(true);
    window.addEventListener(PRIVACY_CONSENT_EVENT, handleOpen);
    return () => window.removeEventListener(PRIVACY_CONSENT_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const acceptAnalytics = () => {
    enableAnalytics();
    trackPageView(`${window.location.pathname}${window.location.search}`);
    setOpen(false);
  };

  const rejectAnalytics = () => {
    disableAnalytics();
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed bottom-5 left-5 z-[80] flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-background/90 p-2 shadow-lg shadow-primary/15 backdrop-blur-md transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
        aria-label="Abrir preferências de privacidade e cookies"
        title="Preferências de privacidade"
      >
        <img
          src="/cookie-privacy-button.webp"
          alt=""
          className="h-full w-full object-contain transition-transform duration-200 group-hover:rotate-[-7deg] group-hover:scale-105"
        />
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
    >
      <div ref={dialogRef} tabIndex={-1} className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-primary/20 bg-background/75 p-6 shadow-2xl backdrop-blur-xl outline-none sm:max-w-2xl sm:rounded-3xl sm:p-8">
        {getAnalyticsConsent() !== null && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="float-right rounded-lg p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
            aria-label="Fechar preferências de privacidade"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 id="privacy-consent-title" className="font-display text-2xl font-semibold sm:text-3xl">
          A sua privacidade importa
        </h2>
        <p id="privacy-consent-description" className="mt-4 leading-relaxed text-muted-foreground">
          Este site utiliza armazenamento estritamente necessário para guardar as suas preferências. Com a sua autorização, também usamos o Google Analytics para compreender a navegação e melhorar o conteúdo.
        </p>

        <button
          type="button"
          onClick={() => setShowDetails((value) => !value)}
          className="mt-5 text-sm font-semibold text-primary hover:underline"
          aria-expanded={showDetails}
        >
          {showDetails ? "Ocultar detalhes" : "Ver detalhes e preferências"}
        </button>

        {showDetails && (
          <div className="mt-5 space-y-3">
            <div className="flex gap-3 rounded-xl border border-primary/10 bg-card/50 p-4">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Armazenamento necessário</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Sempre ativo</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Guarda o tema escolhido e a decisão de privacidade. Não é usado para publicidade.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-primary/10 bg-card/50 p-4">
              <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Medição de audiência</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Mede páginas visitadas, origem aproximada da visita, dispositivo e interação técnica. Publicidade e personalização permanecem desativadas.
                </p>
              </div>
            </div>

            {!isAnalyticsConfigured() && (
              <p className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
                A medição de audiência ainda não está configurada neste ambiente.
              </p>
            )}
          </div>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          Pode alterar esta escolha a qualquer momento através do botão de cookies no canto inferior esquerdo. Consulte a{" "}
          <Link to="/privacy" onClick={() => setOpen(false)} className="font-semibold text-primary hover:underline">
            Política de Privacidade
          </Link>.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={acceptAnalytics}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Aceitar Analytics
          </button>
          <button
            type="button"
            onClick={rejectAnalytics}
            className="rounded-xl border border-primary/20 px-5 py-3 font-semibold transition hover:border-primary/40 hover:text-primary"
          >
            Apenas necessários
          </button>
        </div>
      </div>
    </div>
  );
}
