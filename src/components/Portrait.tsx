import Image from "next/image";

export function Portrait({ 
  className = "",
  src = "/images/leader-portrait.png",
  alt = "Sarpanch"
}: { 
  className?: string;
  src?: string | null;
  alt?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src || "/images/leader-portrait.png"}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80vw, 360px"
        className="object-cover object-top"
        unoptimized
        priority
      />
    </div>
  );
}
