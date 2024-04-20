const BoardLayout = ({ children }) => {
  return (
    <div className="w-full flex">
      <div className={`transition-all w-full`}>{children}</div>
    </div>
  );
};

export default BoardLayout;
