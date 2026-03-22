import { Compass } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

export default function LifeRelocation() {
  return (
    <SectionContent
      title="Life & Relocation"
      icon={<Compass className="w-6 h-6 opacity-80" />}
      variant="default"
    >
      <div className="space-content">
        <p className="body-md">
          In 2019, I made a defining decision: relocating to Portugal with my
          family in search of a better quality of life, stronger security and
          new professional challenges.
        </p>

        <p className="body-md">
          The move was driven by the ambition to work on international projects,
          explore more mature data ecosystems and expand both technical and
          personal horizons.
        </p>

        <p className="body-md">
          Today, Portugal is home. The family has grown, now with two dogs, and
          the balance between career evolution and personal life became a
          reality, not just a goal.
        </p>

        <p className="body-md">
          This journey reflects how I approach life: intentional decisions,
          aligned with long-term vision, continuous growth and purpose.
        </p>
      </div>
    </SectionContent>
  );
}
