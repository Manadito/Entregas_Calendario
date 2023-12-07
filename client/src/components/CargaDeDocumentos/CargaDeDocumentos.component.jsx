import React, { useState, useRef } from "react";
import axios from "axios";

const CargaDeDocumentos = () => {
  const [ciRucCliente, setCiRucCliente] = useState("");
  const [comentario, setComentario] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [fileName, setFileName] = useState("No has elegido un archivo");
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(null); // Used to condition screen render based on success of response
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setArchivo(file);
    setFileName(file ? file.name : "No file chosen");
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start Loading

    const formData = new FormData();
    formData.append("CiRucCliente", ciRucCliente);
    formData.append("Comentario", comentario);
    formData.append("Archivo", archivo);

    try {
      const response = await axios.post(
        "https://portalentregas.com/EmbajadaApis/api/DocumentosClientes/CargarDocumento",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer ",
          },
        },
      );
      console.log(response.data);
      if (
        response.data &&
        response.data.mensaje ===
          `Documento del cliente ${ciRucCliente} agregado exitosamente`
      ) {
        setUploadStatus({ success: true, message: response.data.mensaje });
      } else {
        setUploadStatus({ success: false, message: "Unexpected response" });
      }
      // Handle successful response
    } catch (error) {
      console.error("Error uploading document: ", error);
      setUploadStatus({ success: false, message: "An error occurred" });
      // Handle error
    }
    setIsLoading(false);
  };

  const handleBackToForm = () => {
    setUploadStatus(null);
  };

  return (
    <div className="grid content-center justify-items-center bg-white">
      {uploadStatus === null && (
        <form
          className="grid h-[500px] w-[500px] content-center justify-items-center gap-10 rounded-xl bg-gray-300 pb-[50px] pl-[50px] pr-[50px] pt-[50px] drop-shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full justify-center rounded-lg bg-gray-200 pb-2 pl-1 pr-1 pt-2">
            <p className="text-lg font-medium">
              Rellene los datos y suba su comprobante
            </p>
          </div>
          <label
            className="absolute bottom-[320px] left-[30px] text-base font-semibold"
            htmlFor="ciRucCliente"
          >
            <span className="text-red-500">*</span>
          </label>
          <input
            className="h-[50px] w-full rounded-lg pl-4 text-lg"
            type="text"
            value={ciRucCliente}
            onChange={(e) => setCiRucCliente(e.target.value)}
            placeholder="Ci Ruc Cliente"
          />
          <input
            className="h-[50px] w-full rounded-lg pl-4 text-lg"
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Comentario"
          />
          <label
            className="absolute bottom-[150px] left-[30px] text-base font-semibold"
            htmlFor="ciRucCliente"
          >
            <span className="text-red-500">*</span>
          </label>
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
          {/* Custom File Input Button */}
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="mr-4 rounded-lg bg-gray-400 pb-1 pl-3 pr-3 pt-1 text-white"
              onClick={handleButtonClick}
            >
              Elije el Archivo
            </button>
            <span>{fileName}</span>
          </div>

          <button
            className="h-[50px] w-full rounded-lg bg-orange-500  p-3 text-lg text-white hover:bg-orange-600"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div
                  className="spinner-border inline-block h-4 w-4 animate-spin rounded-full border-2"
                  role="status"
                >
                  <span className="hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Subir Archivos"
            )}
          </button>
        </form>
      )}
      {uploadStatus && uploadStatus.success && (
        <div className="grid h-[500px] w-[500px] justify-items-center gap-5 rounded-xl bg-gray-300 pb-[50px] pl-[50px] pr-[50px] pt-[50px]">
          <p>{uploadStatus.message}</p>
          <button>Continuar</button>
        </div>
      )}
      {uploadStatus && !uploadStatus.success && (
        <div className="grid h-[500px] w-[500px] justify-items-center gap-5 rounded-xl bg-gray-300 pb-[50px] pl-[50px] pr-[50px] pt-[50px]">
          <p>{uploadStatus.message}</p>
          <button
            /*           This function manages the return to the form page
             */ onClick={handleBackToForm}
            className="h-[50px] w-full rounded-lg bg-orange-500  p-3 text-lg text-white hover:bg-orange-600"
            type="button"
          >
            Regresar
          </button>
        </div>
      )}
    </div>
  );
};

export default CargaDeDocumentos;
