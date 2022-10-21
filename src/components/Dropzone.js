import react from "react";
import { useDropzone } from "react-dropzone";
function Dropzone({ onDrop, accept, open, multiple }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
      multiple
    });
  
  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input  className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">
              Release to drop the files here
            </p>
          ) : (
            <p className="dropzone-content">
              Выберите изображение
            </p>
          )}
          <button type="button" onClick={open} className="btn">
            Click to select files
          </button>
        </div>
      </div>
      
      
    </div>
  );
}
export default Dropzone;