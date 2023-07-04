interface CardWrapperProps {
  children: React.ReactNode;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">{children}</div>
  </div>
);
