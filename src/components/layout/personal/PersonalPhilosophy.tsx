import { Heart } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

export default function PersonalPhilosophy() {
  return (
    <SectionContent
      title="Personal Philosophy"
      icon={<Heart className="w-6 h-6" />}
      variant="gradient"
    >
      <p className="text-lg text-muted-foreground leading-relaxed">
        Beyond data pipelines and architecture diagrams, I believe in the balance between high-tech and high-touch.
        Technology builds systems, but perspective builds impact.

        When I’m not designing data ecosystems, you’ll find me exploring the philosophy of AI,
        playing electric guitar, training for my next run or discovering new coffee spots and craft breweries.

        For me, a great engineer is not defined only by technical skill, but by curiosity,
        discipline and the ability to connect ideas across different worlds.
      </p>
    </SectionContent>
  );
}