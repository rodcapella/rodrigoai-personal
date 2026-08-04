import type { ReactNode } from "react";
import PageCard from "@/components/layout/PageCard";
import PageGrid from "@/components/layout/PageGrid";
import PageSection from "@/components/layout/PageSection";

interface DirectAnswer {
  question: string;
  answer: string;
}

interface DirectAnswersSectionProps {
  title: string;
  icon: ReactNode;
  answers: DirectAnswer[];
  variant?: "default" | "muted" | "gradient" | "glass";
}

export default function DirectAnswersSection({
  title,
  icon,
  answers,
  variant = "default",
}: DirectAnswersSectionProps) {
  return (
    <PageSection title={title} icon={icon} variant={variant}>
      <PageGrid cols={3} gap="md">
        {answers.map(({ question, answer }) => (
          <PageCard key={question} hover={false}>
            <article className="space-y-3">
              <h3 className="heading-sm text-foreground">{question}</h3>
              <p className="body-md">{answer}</p>
            </article>
          </PageCard>
        ))}
      </PageGrid>
    </PageSection>
  );
}
