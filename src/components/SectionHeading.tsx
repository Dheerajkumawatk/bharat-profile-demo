export function SectionHeading({
  eyebrow,
  title,
  desc,
  dark = false,
  action,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  dark?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p
            className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
              dark ? "text-saffron" : "text-saffron-dark"
            }`}
          >
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            {eyebrow}
          </p>
        )}
        <h2
          className={`text-2xl font-bold sm:text-3xl ${dark ? "text-white" : "text-navy"}`}
        >
          {title}
        </h2>
        {desc && (
          <p className={`mt-2 max-w-xl text-sm sm:text-base ${dark ? "text-white/70" : "text-ink/60"}`}>
            {desc}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
