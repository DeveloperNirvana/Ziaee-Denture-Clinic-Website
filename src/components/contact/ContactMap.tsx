interface ContactMapProps {
  data: {
    title: string;
    embedUrl: string;
  };
}
export default function ContactMap({ data }: ContactMapProps) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <iframe
        title={data.title}
        src={data.embedUrl}
        width="100%"
        height="450"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-70 md:h-100"
      />
    </div>
  );
}
