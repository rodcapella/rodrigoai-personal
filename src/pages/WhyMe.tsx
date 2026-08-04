import { Suspense, type ReactNode } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import CompactHighlightSection from "@/components/layout/CompactHighlightSection";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import SectionContent from "@/components/layout/SectionContent";
import DirectAnswersSection from "@/components/layout/DirectAnswersSection";
import { ProfilePageSchema } from "@/components/seo/ProfilePageSchema";
import { staticPageMetadata } from "@/data/siteMetadata";

import {
  Layers,
  Zap,
  Users,
  Target,
  Brain,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Cpu,
  Package,
  Database,
  Cloud,
  Network,
  MessageCircle,
} from "@/lib/icons";

const layers = ["layer-yellow", "layer-blue", "layer-purple", "layer-green"];

const CustomSectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

type SectionVariant = "default" | "muted" | "gradient" | "glass";

type Section =
  | {
      useNewLayout: true;
      title: string;
      icon: ReactNode;
      content: ReactNode;
      variant?: "default" | "gradient";
    }
  | {
      useNewLayout?: false;
      title?: string;
      icon?: ReactNode;
      content: ReactNode;
      variant?: SectionVariant;
    };

export default function WhyMe() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  const differentiators = [
    {
      icon: Layers,
      title: "Three Levels of Mastery",
      description:
        "From Enterprise BI to Analytics Engineering to Modern Data Platforms, I connect architecture with real business insight.",
    },
    {
      icon: Target,
      title: "Architecture Over Tools",
      description:
        "Tools change fast, but engineering principles last. I solve problems at the architectural and organizational level, where long-term value is created.",
    },
    {
      icon: Users,
      title: "Leadership That Scales",
      description:
        "I build autonomous teams through clear standards, mentoring, shared ownership and decisions that remain understandable beyond a single expert.",
    },
    {
      icon: ShieldCheck,
      title: "End-to-End Ownership",
      description:
        "I take responsibility from problem definition to production impact, ensuring solutions are built, adopted, trusted, and measurable.",
    },
    {
      icon: Sparkles,
      title: "Relentless Focus on Quality",
      description:
        "I don’t settle for working solutions. I push for robust, scalable, and elegant systems.",
    },
    {
      icon: BarChart3,
      title: "Business-Driven Engineering",
      description:
        "I translate complex data systems into clear business value, always aligning engineering decisions with measurable outcomes and strategic goals.",
    },
  ];

  const sections: Section[] = [
    {
      title: "My Data Journey",
      icon: <Network />,
      variant: "muted",
      content: (
        <PageGrid cols={4}>
          <PageCard
            title="Enterprise BI & Data Warehousing"
            icon={<Database />}
            description="ETL, dimensional modeling, semantic layers, Cognos, Microsoft BI and corporate reporting."
          />
          <PageCard
            title="Big Data & Distributed Platforms"
            icon={<Layers />}
            description="Hadoop, Hive, Elasticsearch, large-scale processing and multi-platform integration."
          />
          <PageCard
            title="Cloud & Lakehouse Modernization"
            icon={<Cloud />}
            description="Azure, Databricks, Delta Lake, PySpark, governance and analytics-ready data products."
          />
          <PageCard
            title="End-to-End Data Leadership"
            icon={<Users />}
            description="Architecture, engineering, analytics, multidisciplinary teams, stakeholders and business delivery."
          />
        </PageGrid>
      ),
    },
    {
      title: "Leadership Philosophy",
      icon: <Brain />,
      useNewLayout: true,
      content: (
        <div className="w-full space-y-6 text-muted-foreground text-lg leading-relaxed text-justify">
          <p>
            My leadership philosophy is grounded in an <strong>Engineering First</strong> mindset, where decisions are guided by strong principles, scalability, and long-term value. I believe that <strong>Data Drives Decisions</strong>, meaning data platforms are not just technical assets, but strategic infrastructure that should help shape how organizations operate and evolve.
          </p>

          <p>
            In high-pressure environments, I value <strong>Calm & Clarity Under Pressure</strong>, staying composed and thoughtful to support better decisions, stronger teams, and more sustainable outcomes. This is reinforced by <strong>Empathy & Understanding</strong>, because great systems are built by people, and good leadership starts with listening, context, and respect.
          </p>

          <p>
            Finally, <strong>Accountable Technical Judgment</strong> means making decisions that can be explained, challenged, and improved. Strong leadership creates clarity without removing ownership from the people closest to the work.
          </p>
        </div>
      ),
    },
    {
      title: "What sets me apart",
      icon: <Zap />,
      variant: "muted",
      content: (
        <PageGrid cols={3}>
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;

            return (
              <PageCard
                key={idx}
                icon={<Icon />}
                title={diff.title}
                description={diff.description}
                className={`${layers[idx % 4]} group`}
              />
            );
          })}
        </PageGrid>
      ),
    },
    {
      title: "Strategic Vision",
      icon: <Lightbulb />,
      content: (
        <PageGrid cols={3}>
          <PageCard
            title="Data as a Product"
            icon={<Package />}
            description="I treat data with the same rigor as software: contracts, SLAs, and discoverability."
          />
          <PageCard
            title="Composable Lakehouse Architecture"
            icon={<Cpu />}
            description="I design modular platforms that can evolve across ingestion, transformation, governance and analytics without unnecessary rework."
          />
          <PageCard
            title="Decision-Ready Analytics"
            icon={<Users />}
            description="I connect reliable data products to reporting and analytics that help teams make timely, confident decisions."
          />
          <PageCard
            title="Documentation by Design"
            icon={<Network />}
            description="I document data flows, operational processes, transformation rules and governance decisions across the entire pipeline, supported by clear models and maintainable technical documentation."
          />
          <PageCard
            title="Data Management as a Product Discipline"
            icon={<Database />}
            description="I manage data products through clear ownership, lifecycle practices, shared definitions, service expectations, metadata and continuous improvement so they remain usable, discoverable and accountable."
          />
          <PageCard
            title="Trust & Governance"
            icon={<ShieldCheck />}
            description="I embed security, access controls, lineage, quality controls, auditability and regulatory considerations into architecture and delivery from the start."
          />
        </PageGrid>
      ),
    },
    {
      title: "AI-Assisted Engineering, Human-Governed",
      icon: <Cpu />,
      variant: "muted",
      content: (
        <PageCard hover={false} className="mx-auto max-w-5xl">
          <p className="body-lg text-justify">
            I integrate AI-assisted engineering into technical research,
            solution design, documentation, code review, troubleshooting and
            workflow automation. I use LLMs and MCP-based integrations as
            accelerators for engineering and decision-making, while maintaining
            human validation, security controls and established quality
            standards.
          </p>
        </PageCard>
      ),
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Why Me?"
        description="Discover Rodrigo Póvoa's approach to end-to-end data leadership, AI-assisted engineering, MCP-based integrations and human-validated, governed technical delivery."
        keywords="Rodrigo Póvoa, AI-assisted engineering, MCP-based integrations, human-validated AI, data leadership, Azure Databricks, data architecture, data governance"
      />

      <ProfilePageSchema
        path="/why-me"
        name="Why Work With Rodrigo Póvoa"
        description="Rodrigo Póvoa's approach to data leadership, governed architecture, AI-assisted engineering and business-focused delivery."
        dateModified={staticPageMetadata["/why-me"].lastModified!}
      />

      <Helmet>
        <title>Why Me? | Rodrigo Póvoa</title>
      </Helmet>

      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <PageHero
          variant="page"
          title="WHY WORK WITH ME"
          subtitle="15+ years building data systems taught me one thing: architecture shapes how organizations think, decide, and scale."
          image="/rodrigo_why_me.webp"
        />
      </PageSection>

      {sections.map((section, index) => {
        const isNewLayout = section.useNewLayout;

        return (
          <Suspense key={index} fallback={<CustomSectionLoader />}>
            {isNewLayout && section.title ? (
              <SectionContent
                title={section.title}
                icon={section.icon}
                variant={section.variant}
                centered={false}
              >
                {section.content}
              </SectionContent>
            ) : (
              <PageSection
                title={section.title}
                icon={section.icon}
                variant={section.variant}
              >
                {section.content}
              </PageSection>
            )}
          </Suspense>
        );
      })}

      <DirectAnswersSection
        title="How I Work"
        icon={<MessageCircle />}
        variant="gradient"
        answers={[
          {
            question: "How do I turn strategy into delivery?",
            answer:
              "I translate business priorities into architecture, delivery standards and incremental outcomes that teams can implement, measure and improve.",
          },
          {
            question: "What distinguishes my leadership approach?",
            answer:
              "I combine hands-on technical depth with team mentoring, stakeholder alignment and responsibility for measurable business outcomes.",
          },
          {
            question: "How do I maintain trust and governance?",
            answer:
              "I establish clear ownership, access controls, data quality, lineage and engineering standards from design through production delivery.",
          },
        ]}
      />

      <CompactHighlightSection>
        <blockquote className="w-full max-w-4xl rounded-r-xl border-l-4 border-primary bg-primary/5 px-6 py-5 text-left text-lg font-semibold italic leading-relaxed text-foreground shadow-lg shadow-primary/5 sm:px-8 sm:py-6 md:text-2xl">
          My goal is simple: build data platforms that people trust, businesses
          rely on, and teams can scale with confidence.
        </blockquote>
      </CompactHighlightSection>
    </MainLayout>
  );
}
