import UploadHeader from "./upload-header";

const UploadPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <UploadHeader />
      {children}
    </section>
  );
};

export default UploadPostLayout;
