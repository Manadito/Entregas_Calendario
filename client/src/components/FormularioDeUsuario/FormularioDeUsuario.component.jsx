import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.context";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const FormularioDeUsuario = () => {
  // I) HOOKS AND VARIABLES
  const { guiaMasterData, setGuiaMasterData } = useAppContext();
  const { guiaHijaData, setGuiaHijaData } = useAppContext();
  const [cantones, setCantones] = useState();
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [callePrincipal, setCallePrincipal] = useState("");
  const [calleSecundaria, setCalleSecundaria] = useState("");
  const [numero, setNumero] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [credentialType, setCredentialType] = useState("");
  const sortedCantones = _.orderBy(cantones, ["CantonNombre"], ["asc"]);
  const navigate = useNavigate(); // Initialize Navigate
  // CHECK VALUE LOGS OF USERDATA
  useEffect(() => {
    console.log(guiaMasterData); // This will log the updated state
    console.log(guiaHijaData);
    console.log(cantones);
    if (cantones) {
      console.log(cantones[2].CantonNombre);
    }
  }, [guiaMasterData, guiaHijaData, cantones]); // Dependency array ensures this runs when userData changes

  // Synchronizing states
  useEffect(() => {
    setGuiaHijaData((prevGuiaHijaData) => ({
      ...prevGuiaHijaData,
      destinatarioNombre: guiaMasterData.personaContacto,
      personalizado1: guiaMasterData.descripcion,
    }));
  }, [guiaMasterData, setGuiaHijaData]);

  // Fetching cantones from the cantones API
  useEffect(() => {
    const fetchCantones = async () => {
      const url =
        "https://portalentregas.com/eLogisticsApis/api_ObtenerCantones/?token=Entregas23&clienteid=234&proyectoid=366";
      try {
        const response = await axios.get(url);
        setCantones(response.data); // Assuming the response data is the array of cantones
      } catch (error) {
        console.error("Error fetching Cantones: ", error);
      }
    };

    fetchCantones();
  }, []);

  const onSubmitUserDataForm = async (e) => {
    e.preventDefault();

    // Get the current date and time
    const now = new Date();
    const fechaHoraEntrega = `${now.getFullYear()}${String(
      now.getMonth() + 1,
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
      now.getHours(),
    ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

    // Update the userData state with the current date and time
    setGuiaMasterData((prevUserData) => ({
      ...prevUserData,
      fechaHoraEntrega: fechaHoraEntrega,
    }));

    const baseUrl =
      "https://portalentregas.com/eLogisticsApis/api_insertarGuiaMaster/";
    const queryParams =
      "token=Entregas23&clienteid=234&proyectoid=366&centrocostoid=1&instrucciones=test&comentario=test&personaContacto=test&descripcion=test&tipopaqueteid=194&fechaHoraEntrega=20230601&usuario=CSECUADOR";

    /* `token=Entregas23&clienteid=234&proyectoid=366&centrocostoid=1&instrucciones=${encodeURIComponent(userData.instrucciones)}&comentario=${encodeURIComponent(userData.comentario)}&personaContacto=${encodeURIComponent(userData.personaContacto)}&descripcion=${encodeURIComponent(userData.descripcion)}&tipopaqueteid=194&fechaHoraEntrega=${userData.fechaHoraEntrega}&usuario=CSECUADOR`; */
    const url = baseUrl + "?" + queryParams;

    try {
      const response = await axios.get(url);
      console.log(response.data); // Process the response as needed
      const guiaMasterId = response.data.guiaMasterId;
      /* console.log(guiaMasterId); */
      // Check if guiaMasterId is received before making the POST request
      if (guiaMasterId) {
        // Construct the POST URL with guiaMasterId
        const postUrl = `https://portalentregas.com/eLogisticsApis/shipments/?token=Entregas23&usuario=CSECUADOR&guiaMasterId=${guiaMasterId}`;

        // Make the POST request
        const postData = [guiaHijaData];

        console.log("POST URL:", postUrl);
        console.log("POST Data", postData);

        const postResponse = await axios.post(
          postUrl,
          JSON.stringify(postData),
          {
            headers: {
              "Content-Type": "application/json",
              // Other headers if necessary
            },
          },
        );
        console.log(postResponse.data); // Handle the POST response */
        navigate("/pago");
      }
    } catch (error) {
      console.error("Error in API requests: ", error);
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  const handleOnChangeGuiaMasterFields = (e) => {
    let guiaMasterDataToUpdate = { ...guiaMasterData };

    guiaMasterDataToUpdate = {
      ...guiaMasterDataToUpdate,
      [e.target.name]: e.target.value,
    };
    setGuiaMasterData(guiaMasterDataToUpdate);
  };

  const handleOnChangeGuiaHijaFields = (e) => {
    let guiaHijaDataToUpdate = { ...guiaHijaData };
    guiaHijaDataToUpdate = {
      ...guiaHijaDataToUpdate,
      [e.target.name]: e.target.value,
    };
    setGuiaHijaData(guiaHijaDataToUpdate);
  };

  const updatePersonaContacto = (currentNombre, currentApellido) => {
    const newPersonaContacto = `${currentNombre}, ${currentApellido}`;
    setGuiaMasterData({
      ...guiaMasterData,
      personaContacto: newPersonaContacto,
    });
  };

  const updateDireccionEntrega = (
    currentCallePrincipal,
    currentNumero,
    currentInterseccion,
    currentDomicilio,
  ) => {
    const newDireccion = `${currentCallePrincipal}, ${currentNumero}, ${currentInterseccion}, ${currentDomicilio}`;
    setGuiaHijaData({ ...guiaHijaData, direccionEntrega: newDireccion });
  };

  const fetchPostalCode = async (address, canton) => {
    if (!address || !canton) {
      // Maybe show an error or a message asking for both fields
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Ensure to prefix with REACT_APP_
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      guiaHijaData.direccionEntrega + ", " + canton + ", ECUADOR",
    )}&region=EC&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      let postalCode = null;

      // Check if the second result has the postal code
      if (results.length > 1) {
        postalCode = results[1].address_components.find((component) =>
          component.types.includes("postal_code"),
        )?.long_name;
      }

      // Fall back to the first result if necessary
      if (!postalCode && results.length > 0) {
        postalCode = results[0].address_components.find((component) =>
          component.types.includes("postal_code"),
        )?.long_name;
      }

      if (postalCode) {
        setGuiaHijaData({ ...guiaHijaData, codigoPostalEntrega: postalCode });
      } else {
        // Handle case where postal code is not found
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Postal Code: ", error);
      // Handle error
    }
  };

  return (
    <div className="grid content-center justify-items-center bg-white">
      <form
        className="grid h-[600px] w-[500px] content-center justify-items-center gap-3 rounded-xl bg-gray-300 drop-shadow-md"
        onSubmit={onSubmitUserDataForm}
      >
        <div className="flex h-[18px] w-full items-center justify-center pl-5 pr-5">
          <p className=" text-lg font-semibold">
            Formulario de Datos de Usuario
          </p>
        </div>
        <div className="mb-2 flex w-full items-center justify-center pl-5 pr-5">
          <p className="text-base font-normal">
            Por favor llene el siguiente formulario con sus datos
          </p>
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            className="mr-[5px] w-1/2 rounded-md border border-black pl-4"
            placeholder="Nombre"
            id="nombre"
            name="nombre" // This "nombre" needs to match "nombre" in property value
            value={nombre}
            onChange={(e) => {
              const currentValue = e.target.value;
              setNombre(currentValue);
              updatePersonaContacto(currentValue, apellido);
            }}
          />
          <input
            type="text"
            className=" ml-[5px] w-1/2 rounded-md border border-black pl-4"
            placeholder="Apellido"
            id="apellido"
            name="apellido" // This "apellido" needs to match "apellido" in prop value
            value={apellido}
            onChange={(e) => {
              const currentValue = e.target.value;
              setApellido(currentValue);
              updatePersonaContacto(nombre, currentValue);
            }}
          />
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <select
            className="mr-[5px] w-1/2 rounded-md border border-black pl-2"
            value={credentialType}
            onChange={(e) => setCredentialType(e.target.value)}
          >
            <option value="" disabled>
              Credencial
            </option>
            <option value="Cédula">Cédula</option>
            <option value="RUC">RUC</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {(credentialType === "" || credentialType === "Cédula") && (
            <input
              type="text"
              placeholder="Cedula"
              className="ml-[5px] w-1/2 rounded-md  border border-black pl-4"
              id="destinatarioRuc"
              name="destinatarioRuc" // This "nombre" needs to match "nombre" in prop value
              value={guiaHijaData?.destinatarioRuc}
              onChange={handleOnChangeGuiaHijaFields}
            />
          )}
          {credentialType === "RUC" && (
            <input
              type="text"
              placeholder="RUC"
              className="ml-[5px] w-full  rounded-md border border-black"
              id="destinatarioRuc"
              name="destinatarioRuc" // This "nombre" needs to match "nombre" in prop value
              value={guiaHijaData?.destinatarioRuc}
              onChange={handleOnChangeGuiaHijaFields}
            />
          )}
          {credentialType === "Pasaporte" && (
            <input
              type="text"
              placeholder="Pasaporte"
              className="ml-[5px] w-full  rounded-md border border-black"
              id="destinatarioRuc"
              name="destinatarioRuc" // This "nombre" needs to match "nombre" in prop value
              value={guiaHijaData?.destinatarioRuc}
              onChange={handleOnChangeGuiaHijaFields}
            />
          )}
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            placeholder="Empresa"
            className="w-full rounded-md border border-black pl-4"
            id="destinatarioEmpresa"
            name="destinatarioEmpresa" // This "nombre" needs to match "nombre" in prop value
            value={guiaHijaData?.destinatarioEmpresa}
            onChange={handleOnChangeGuiaHijaFields}
          />
        </div>

        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="email"
            placeholder="Correo"
            className="mr-[5px] w-1/2 rounded-md border border-black pl-4"
            id="destinatarioCorreo"
            name="destinatarioCorreo" // This "nombre" needs to match "nombre" in prop value
            value={guiaHijaData?.destinatarioCorreo}
            onChange={handleOnChangeGuiaHijaFields}
          />
          <input
            type="tel"
            placeholder="Teléfono"
            className="ml-[5px] w-1/2 rounded-md border border-black pl-4"
            id="destinatarioTelefono"
            name="destinatarioTelefono" // This "nombre" needs to match "nombre" in prop value
            value={guiaHijaData?.destinatarioTelefono}
            onChange={handleOnChangeGuiaHijaFields}
          />
        </div>

        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            className="w-full rounded-md border border-black"
            id="descripcion"
            name="descripcion" // This "nombre" needs to match "nombre" in prop value
            value={guiaMasterData?.descripcion}
            onChange={handleOnChangeGuiaMasterFields}
          />
        </div>

        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            placeholder="Dirección - Calle 1"
            className="mr-[5px] w-1/2 rounded-md border border-black pl-4"
            id="callePrincipal"
            name="callePrincipal" // This "nombre" needs to match "nombre" in prop value
            value={callePrincipal}
            onChange={(e) => {
              const currentValue = e.target.value;
              setCallePrincipal(currentValue);
              updateDireccionEntrega(
                currentValue,
                numero,
                calleSecundaria,
                domicilio,
              );
            }}
          />
          <input
            type="text"
            placeholder="Dirección - Numeración"
            className="ml-[5px] w-1/2 rounded-md border border-black pl-4"
            id="numero"
            name="numero" // This "nombre" needs to match "nombre" in prop value
            value={numero}
            onChange={(e) => {
              const currentValue = e.target.value;
              setNumero(currentValue);
              updateDireccionEntrega(
                callePrincipal,
                currentValue,
                calleSecundaria,
                domicilio,
              );
            }}
          />
        </div>

        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            className="mr-[5px] w-1/2 rounded-md border border-black pl-4"
            placeholder="Dirección - Calle 2"
            id="calleSecundaria"
            name="calleSecundaria" // This "nombre" needs to match "nombre" in prop value
            value={calleSecundaria}
            onChange={(e) => {
              const currentValue = e.target.value;
              setCalleSecundaria(currentValue);
              updateDireccionEntrega(
                callePrincipal,
                numero,
                currentValue,
                domicilio,
              );
            }}
          />
          <input
            type="text"
            placeholder="Dirección - Domicilio"
            className="ml-[5px] w-1/2 rounded-md border border-black pl-4"
            id="domicilio"
            name="domicilio" // This "nombre" needs to match "nombre" in prop value
            value={domicilio}
            onChange={(e) => {
              const currentValue = e.target.value;
              setDomicilio(currentValue);
              updateDireccionEntrega(
                callePrincipal,
                numero,
                calleSecundaria,
                currentValue,
              );
            }}
          />
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            placeholder="Referencia"
            className="w-full rounded-md border border-black pl-4"
            id="referenciaEntrega"
            name="referenciaEntrega" // This "nombre" needs to match "nombre" in prop value
            value={guiaHijaData?.personaContacto}
            onChange={handleOnChangeGuiaHijaFields}
          />
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <select
            className="block w-2/5 rounded-md border border-black bg-white pl-4 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="cantonEntrega"
            value={guiaHijaData.cantonEntrega}
            onChange={(e) =>
              setGuiaHijaData({
                ...guiaHijaData,
                cantonEntrega: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Cantón
            </option>
            {sortedCantones.map((canton, index) => (
              <option key={index} value={canton.CantonNombre}>
                {canton.CantonNombre}
              </option>
            ))}
          </select>
          <button
            type="button"
            className=" ml-[10px] h-full w-2/5 rounded-md bg-gray-400 text-white"
            onClick={() =>
              fetchPostalCode(
                guiaHijaData.direccionEntrega,
                guiaHijaData.cantonEntrega,
              )
            }
            disabled={
              !guiaHijaData.direccionEntrega || !guiaHijaData.cantonEntrega
            }
          >
            Obtener Codigo Postal
          </button>
          <input
            type="text"
            className="ml-[10px] w-1/5 rounded-md border border-black"
            id="codigoPostalEntrega"
            name="codigoPostalEntrega" // This "nombre" needs to match "nombre" in prop value
            value={guiaHijaData.codigoPostalEntrega || ""} // Bind the value to the state
            /* readOnly // Make field "read-only" if necessary */
          />
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          {" "}
          <input
            type="text"
            placeholder="Comentarios Adicionales"
            className="h-[50px] w-full rounded-md  border border-black pl-4"
            id="comentario"
            name="comentario" // This "nombre" needs to match "nombre" in prop value
            value={guiaMasterData?.comentario}
            onChange={handleOnChangeGuiaMasterFields}
          />
        </div>
        <div className="flex w-full items-center justify-center pl-5 pr-5">
          <button
            type="submit"
            className="focus:shadow-outline w-full rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600 focus:outline-none"
          >
            <span>Continuar a Pago</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDeUsuario;
