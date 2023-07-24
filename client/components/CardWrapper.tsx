interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  className,
}) => (
  <div className={`overflow-hidden rounded-lg shadow bg-zinc-950 ${className}`}>
    <div className="px-4 py-5 sm:p-6">{children}</div>
  </div>
);
