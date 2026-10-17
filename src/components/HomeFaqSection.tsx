import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageSection from "@/components/layout/PageSection";
import { ChevronRight, MessageCircle } from "@/lib/icons";

const questions = [
  {
    id: "faq-professional-opportunities",
    link: { to: "/contact", label: "Discuss an opportunity" },
    question: "What professional opportunities am I currently exploring?",
    answer:
      "Rodrigo Póvoa is currently exploring senior and leadership opportunities across Data Engineering, Data Architecture and Analytics. He is particularly interested in roles that combine hands-on technical delivery, governed platform design, stakeholder alignment, team leadership and measurable business outcomes.",
  },
  {
    id: "faq-data-specialization",
    link: { to: "/professional", label: "Explore professional experience" },
    question: "What is my core data specialization?",
    answer:
      "Rodrigo Póvoa specializes in end-to-end data platforms, covering ingestion, transformation, orchestration, quality, security, governance and analytics delivery. His recent work focuses on scalable Azure Databricks Lakehouse architectures that turn complex source data into reliable, analytics-ready data products.",
  },
  {
    id: "faq-engineering-and-leadership",
    link: { to: "/professional", label: "Review engineering and leadership experience" },
    question: "Do I combine hands-on engineering with technical leadership?",
    answer:
      "Yes. Rodrigo Póvoa combines hands-on architecture and engineering with technical leadership. He contributes to engineering standards, solution and code reviews, troubleshooting and delivery decisions while leading multidisciplinary teams, mentoring professionals, documenting technical practices and aligning stakeholders around practical outcomes.",
  },
  {
    id: "faq-technologies",
    link: { to: "/professional", label: "View technology stack and experience" },
    question: "Which technologies are most relevant to my recent work?",
    answer:
      "Rodrigo Póvoa’s recent work focuses on Azure Databricks, Delta Lake, PySpark, Python, SQL, ADLS, Unity Catalog and Power BI. These technologies are supported by practical experience in data quality, lineage, orchestration, access control, performance optimization, security and governance.",
  },
  {
    id: "faq-organizations-and-environments",
    link: { to: "/professional", label: "Explore career history" },
    question: "What types of organizations and environments have I worked in?",
    answer:
      "Rodrigo Póvoa’s experience spans large enterprises, consulting engagements, international banking and retail projects, digital businesses and technology startups across Brazil and Europe. This variety supports effective work in regulated corporate environments as well as fast-moving organizations that require ownership and adaptability.",
  },
  {
    id: "faq-contact",
    link: { to: "/contact", label: "Contact Rodrigo Póvoa" },
    question: "How can recruiters and organizations contact me?",
    answer:
      "Recruiters and organizations can use the Contact page to send Rodrigo Póvoa a structured message about a role, project or professional conversation. They can also connect with him directly on LinkedIn. Messages submitted through the website are normally answered within 48 business hours.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.rpovoadata.tech/#frequently-asked-questions",
  mainEntity: questions.map(({ id, question, answer, link }) => ({
    "@type": "Question",
    "@id": `https://www.rpovoadata.tech/#${id}`,
    url: `https://www.rpovoadata.tech/#${id}`,
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: `${answer} <a href="https://www.rpovoadata.tech${link.to}">${link.label}</a>`,
    },
  })),
};

export default function HomeFaqSection() {
  useEffect(() => {
    const openLinkedQuestion = () => {
      const question = questions.find(({ id }) => window.location.hash === `#${id}`);
      if (!question) return;
      const details = document.getElementById(question.id);
      if (details instanceof HTMLDetailsElement) {
        details.open = true;
        details.scrollIntoView({ block: "start" });
      }
    };
    openLinkedQuestion();
    window.addEventListener("hashchange", openLinkedQuestion);
    return () => window.removeEventListener("hashchange", openLinkedQuestion);
  }, []);

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
          {questions.map(({ id, question, answer, link }) => (
              <details key={question} id={id} className="group scroll-mt-28 overflow-hidden rounded-xl border border-border bg-card/50 transition-colors open:border-primary/30 open:bg-card/70">
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
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    <Link to={link.to} className="font-semibold text-primary underline underline-offset-4">
                      {link.label}
                    </Link>
                    <a href={`#${id}`} aria-label={`Direct link: ${question}`} className="text-primary underline underline-offset-4">
                      Link to this question
                    </a>
                  </div>
                </div>
              </details>
          ))}
        </div>
      </PageSection>
    </>
  );
}
