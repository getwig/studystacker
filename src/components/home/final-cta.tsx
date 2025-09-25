import { CTAButtons } from "./cta-buttons";
import { Section } from "./section";

export function FinalCTA() {
  return (
    <Section>
      <div className="flex flex-col items-center md:gap-8 gap-4">
        <h2 className="text-2xl md:text-4xl text-center">
          <span className="text-muted-foreground">Jetzt einrichten, </span>
          <span className="text-primary block sm:inline">
            täglich Zeit sparen
          </span>
        </h2>
        <CTAButtons
          buttonIds={["signup", "contact"]}
          className="sm:w-xs flex flex-col sm:flex-row gap-2"
          buttonClassName="w-full sm:flex-1"
        />
      </div>
    </Section>
  );
}
