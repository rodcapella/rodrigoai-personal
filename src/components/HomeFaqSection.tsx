import { Helmet } from "react-helmet-async";
import PageSection from "@/components/layout/PageSection";
import { ChevronRight, MessageCircle } from "@/lib/icons";

const questions = [
  {
    question: "What professional opportunities am I currently exploring?",
    answer:
      "I am currently exploring senior and leadership opportunities across Data Engineering, Data Architecture and Analytics, where I can combine hands-on technical delivery, governance, stakeholder alignment and team leadership.",
  },
  {
    question: "What is my core data specialization?",
    answer:
      "I specialize in end-to-end data platforms, from ingestion, transformation and orchestration through quality, security, governance and analytics, with strong experience in Azure Databricks Lakehouse architectures.",
  },
  {
    question: "How can recruiters and organizations contact me?",
    answer:
      "Use the Contact page to send me a message or connect with me directly on LinkedIn. Messages are normally answered within 48 business hours.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.rpovoadata.tech/#frequently-asked-questions",
  mainEntity: questions.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function HomeFaqSection() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageSection
        id="frequently-asked-questions"
        title="Frequently Asked Questions"
        icon={<MessageCircle />}
      >
        <div className="space-y-5 md:space-y-6">
          {questions.map(({ question, answer }) => (
            <details
              key={question}
              className="group overflow-hidden rounded-xl border border-border bg-card/50 transition-colors open:border-primary/30 open:bg-card/70"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-7 [&::-webkit-details-marker]:hidden">
                <ChevronRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-90"
                />
                <h3 className="text-base font-medium text-foreground sm:text-lg">
                  {question}
                </h3>
              </summary>

              <div className="border-t border-border/70 px-5 py-5 pl-14 sm:px-7 sm:pl-16">
                <p className="max-w-4xl leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </PageSection>
    </>
  );
}
