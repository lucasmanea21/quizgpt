interface CardWrapperProps {
  children: React.ReactNode;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => (
  <div className="overflow-hidden bg-black rounded-lg shadow">
    <div className="px-4 py-5 sm:p-6">{children}</div>
  </div>
);
