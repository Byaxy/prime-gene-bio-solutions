interface ErrorWrapperProps {
  errorMessage: string | undefined;
  children: React.ReactNode;
}

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({
  errorMessage,
  children,
}) => {
  return (
    <div>
      {children}
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
    </div>
  );
};

export default ErrorWrapper;
