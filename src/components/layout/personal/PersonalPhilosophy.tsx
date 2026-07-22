import SectionContent from "@/components/layout/SectionContent";
import { Heart } from "@/lib/icons"; 

export default function PersonalPhilosophy() {
  return (
    <SectionContent
      title="Personal Philosophy"
      icon={<Heart className="w-6 h-6 opacity-80" />}
      variant="default"
    >
      <div className="space-content">
        <p className="body-md">
          Beyond data pipelines and architecture diagrams, I believe impact comes from balancing high-tech with 
          high-touch. Technology builds systems, but perspective shapes the value those systems create.
        </p>

        <p className="body-md">
        When I’m not designing data ecosystems, you’ll usually find me exploring the philosophy of AI, playing electric guitar, 
        training hard at the gym, running, or discovering new coffee spots and craft breweries. 
        Music is also a constant in my day. I’m almost always listening to something, whether through speakers or headphones.
        </p>

        <p className="body-md">
          For me, a great engineer is not defined only by technical skill, but by curiosity,
          discipline and the ability to connect ideas across different worlds.
        </p>
      </div>
    </SectionContent>
  );
}