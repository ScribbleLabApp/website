import Section from "./SCSection";

interface SectionDividerProps {
  className?: string;
  [key: string]: any;
}

const SCSectionDivider: React.FC<SectionDividerProps> = ({ className, ...props }) => {
  return (
    <Section {...props}>
      <hr className={`my-0 border-b border-separator ${className}`} />
    </Section>
  );
};

export default SCSectionDivider;