import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputIdUsuario = () => {
  const [identificacion, setIdentificacion] = useState("");

  const [uploadStatus, setUploadStatus] = useState(null); // Used to condition screen render based on success of response
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize Navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start Loading

    const formData = new FormData();
    formData.append("Identificación", identificacion);

    if (identificacion === "1000") {
      setUploadStatus({ success: true, message: "Valid code" });
      navigate("/calendario");
    } else {
      setUploadStatus({
        sucess: false,
        message: "Código de identificación inválido",
      });
    }
    setIsLoading(false); // Stop loading
  };
  /* try {
      const response = await axios.post(
        "https://portalentregas.com/EmbajadaApis/api/DocumentosClientes/CargarDocumento",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer ",
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
  }; */

  const handleBackToForm = () => {
    setUploadStatus(null);
  };

  return (
    <div className="grid content-center justify-items-center bg-white">
      <form
        className="grid h-[500px] w-[500px] content-center justify-items-center gap-10 rounded-xl bg-gray-300 pb-[50px] pl-[50px] pr-[50px] pt-[50px] drop-shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full justify-center rounded-lg bg-gray-200 pb-2 pl-1 pr-1 pt-2">
          <p className="text-lg font-medium">
            Ingrese su codigo de identificación
          </p>
        </div>
        <label
          className="absolute bottom-[240px] left-[30px] text-base font-semibold"
          htmlFor="identificacion"
        >
          <span className="text-red-500">*</span>
        </label>
        <input
          className="h-[50px] w-full rounded-lg pl-4 text-lg"
          type="text"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          placeholder="Código de Identificación"
        />
        {uploadStatus && !uploadStatus.success && (
          <p className="text-red-500">{uploadStatus.message}</p>
        )}
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
            "Continuar"
          )}
        </button>
      </form>
    </div>
  );
};

export default InputIdUsuario;
