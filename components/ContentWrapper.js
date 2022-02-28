const ContentWrapper = ({ children }) => {
  return (
    <>
      <div className="content-wrapper">{children}</div>
      <style jsx>{`
        .content-wrapper {
          width: 100%;
          min-height: 100vh;

          padding-top: 6rem;
          padding-bottom: 6rem;
        }
      `}</style>
    </>
  );
};

export default ContentWrapper;
