type TaglineProps = {
  title?: string;
  className?: string;
};
export default function Tagline({ title, className = '' }: TaglineProps) {
  return <p className={`text-base uppercase tracking-widest text-primary ${className}`}>{title}</p>;
}
