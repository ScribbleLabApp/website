type SCContentUnavailabilityProps = {
    title?: string;
    message?: string;
    className?: string;
    [key: string]: any;
  };
  
  export function SCContentUnavailability({
    title = "Content Unavailable",
    message = "The content you are looking for is currently unavailable.",
    className,
    ...props
  }: SCContentUnavailabilityProps) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen gap-0 font-[family-name:var(--font-geist-sans)] ${className}`}
        {...props}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-center">{message}</p>
        </div>
      </div>
    );
  }