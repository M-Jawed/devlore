import UploadHeader from "../../upload/post/upload-header";

const EditPostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <UploadHeader type="update" />
      {children}
    </section>
  );
};

export default EditPostLayout;
