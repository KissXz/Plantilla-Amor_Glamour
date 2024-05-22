import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../assets/css/switch.css";
import BotonEliminar from "components/ActionButtons/deleteButton";
import BotonActualizar from "components/ActionButtons/editButton";
import SearchBar from "components/SearchBar/SearchBar";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function Cliente() {
  {
    /*validacion*/
  }
  const [errorMessages, setErrorMessages] = useState({
    tipoIdentificacionCliente: "",
    numIdentificacionCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    fechaNacimientoCliente: "",
    emailCliente: "",
    direccionCliente: "",
    celularCliente: "",
  });

  const resetErrorMessages = () => {
    setErrorMessages({
      tipoIdentificacionCliente: "",
      numIdentificacionCliente: "",
      nombreCliente: "",
      apellidoCliente: "",
      fechaNacimientoCliente: "",
      emailCliente: "",
      direccionCliente: "",
      celularCliente: "",
      idRol: "",
    });
  };

  const validarCampos = () => {
    const errors = {};
    let hasErrors = false;

    if (!nuevoCliente.tipoIdentificacionCliente) {
      errors.tipoIdentificacionCliente = "Campo requerido";
      hasErrors = true;
    }

    if (!nuevoCliente.numIdentificacionCliente) {
      errors.numIdentificacionCliente = "Campo requerido";
      hasErrors = true;
    } else if (!/^\d+$/.test(nuevoCliente.numIdentificacionCliente)) {
      errors.numIdentificacionCliente = "Debe ser un número";
      hasErrors = true;
    }

    if (!nuevoCliente.nombreCliente) {
      errors.nombreCliente = "Campo requerido";
      hasErrors = true;
    }

    if (!nuevoCliente.apellidoCliente) {
      errors.apellidoCliente = "Campo requerido";
      hasErrors = true;
    }

    if (!nuevoCliente.fechaNacimientoCliente) {
      errors.fechaNacimientoCliente = "Campo requerido";
      hasErrors = true;
    }

    if (!nuevoCliente.emailCliente) {
      errors.emailCliente = "Campo requerido";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(nuevoCliente.emailCliente)) {
      errors.emailCliente = "Formato de correo electrónico inválido";
      hasErrors = true;
    }

    if (!nuevoCliente.direccionCliente) {
      errors.direccionCliente = "Campo requerido";
      hasErrors = true;
    }

    if (!nuevoCliente.celularCliente) {
      errors.celularCliente = "Campo requerido";
      hasErrors = true;
    } else if (!/^\d+$/.test(nuevoCliente.celularCliente)) {
      errors.celularCliente = "Debe ser un número";
      hasErrors = true;
    }

    setErrorMessages(errors);
    return !hasErrors;
  };

  const [data, setData] = useState([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(true);
  const [nuevoCliente, setNuevoCliente] = useState({
    tipoIdentificacionCliente: "",
    numIdentificacionCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    fechaNacimientoCliente: "",
    emailCliente: "",
    direccionCliente: "",
    celularCliente: "",
    estado: true,
  });
  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalDetallesOpen, setModalDetallesOpen] = useState(false);
  const [ClienteEditando, setClienteEditando] = useState(null);
  const [ClienteDetalles, setClienteDetalles] = useState(null);

  const handleChangeNuevoCliente = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitCrearCliente = async () => {
    try {
      resetErrorMessages();
      const clienteSinEspacios = {
        ...nuevoCliente,
        tipoIdentificacionCliente:
          nuevoCliente.tipoIdentificacionCliente.trim(),
        numIdentificacionCliente: nuevoCliente.numIdentificacionCliente.trim(),
        nombreCliente: nuevoCliente.nombreCliente.trim(),
        apellidoCliente: nuevoCliente.apellidoCliente.trim(),
        fechaNacimientoCliente: nuevoCliente.fechaNacimientoCliente.trim(),
        emailCliente: nuevoCliente.emailCliente.trim(),
        direccionCliente: nuevoCliente.direccionCliente.trim(),
        celularCliente: nuevoCliente.celularCliente.trim(),
      };
      if (!validarCampos(clienteSinEspacios)) {
        return;
      }
      console.log(nuevoCliente);
      const response = await axios.post(
        "http://localhost:3001/crearCliente",
        nuevoCliente
      );
      console.log("Cliente creado:", response.data);
      fetchData();
      setModalCrearOpen(false);

      Swal.fire({
        title: "Éxito!",
        text: "El Cliente se ha creado correctamente.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al crear el Cliente:", error);
    }
  };

  const actualizarCliente = async (
    ClienteEditando,
    data,
    setData,
    setModalEditarOpen
  ) => {
    try {
      if (!ClienteEditando || !ClienteEditando.idCliente) {
        throw new Error("El Cliente o su ID no están definidos");
      }
      const response = await axios.put(
        `http://localhost:3001/editarCliente/${ClienteEditando.idCliente}`,
        ClienteEditando
      );
      console.log("Cliente editado:", response.data);
      const newData = data.map((user) =>
        user.idCliente === ClienteEditando.idCliente ? ClienteEditando : user
      );
      setData(newData);
      setModalEditarOpen(false);
    } catch (error) {
      console.error("Error al actualizar el Cliente:", error);
    }
  };

  const toggleUserState = (idCliente) => {
    axios
      .put(`http://localhost:3001/cambiarEstadoCliente/${idCliente}`)
      .then((response) => {
        console.log("Respuesta de la API:", response.data);
        Swal.fire({
          title: "Éxito!",
          text: "El estado del cliente ha sido cambiado.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error al cambiar el estado del Cliente:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cliente");
      setData(response.data);
      setIsLoadingClientes(false);
    } catch (error) {
      console.error("Error al obtener los Clientes:", error);
      setIsLoadingClientes(false);
    }
  };

    const [filteredData, setFilteredData] = useState(data);
  
    useEffect(() => {
      setFilteredData(data); // Inicializa filteredData con data cuando data cambie
    }, [data]);

  const eliminarCliente = async (idCliente) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/eliminarCliente/${idCliente}`
      );
      console.log("Cliente eliminado:", response.data);
      fetchData(); // Volver a cargar los datos después de la eliminación
      Swal.fire({
        title: "Eliminado!",
        text: "El cliente ha sido eliminado.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al eliminar el cliente.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="Content content">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="search-container">
                <InputGroup className="no-border">
                  <Button
                    color="primary"
                    onClick={() => setModalCrearOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-person-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                      <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                    Crear Cliente
                  </Button>
                  <div>
                    <SearchBar data={data} setFilteredData={setFilteredData} />
                  </div>
                </InputGroup>
              </div>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>Tipo</th>
                  <th>Número</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th hidden>Fecha Nacimiento</th>
                  <th>Email</th>
                  <th hidden>Dirección</th>
                  <th hidden>Celular</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((cliente) => (
                  <tr key={cliente.idCliente}>
                    <td>{cliente.tipoIdentificacionCliente}</td>
                    <td>{cliente.numIdentificacionCliente}</td>
                    <td>{cliente.nombreCliente}</td>
                    <td>{cliente.apellidoCliente}</td>
                    <td hidden>{cliente.fechaNacimientoCliente}</td>
                    <td>{cliente.emailCliente}</td>
                    <td hidden>{cliente.direccionCliente}</td>
                    <td hidden>{cliente.celularCliente}</td>
                    <td>
                      <label class="switch">
                        <input
                          type="checkbox"
                          defaultChecked={cliente.estado}
                          onChange={() => toggleUserState(cliente.idCliente)}
                        />
                        <div class="slider"></div>
                        <div class="slider-card">
                          <div class="slider-card-face slider-card-front"></div>
                          <div class="slider-card-face slider-card-back"></div>
                        </div>
                      </label>
                    </td>
                    <td>
                      <Button
                        color="warning"
                        onClick={() => {
                          setClienteEditando(cliente);
                          setModalEditarOpen(true);
                        }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i
                          className="nc-icon nc-ruler-pencil"
                          style={{ marginRight: "5px", marginTop: 3 }}
                        />
                      </Button>
                      <Button
                        color="primary"
                        style={{
                          marginLeft: 100,
                          marginTop: -55,
                          marginBottom: 5,
                        }}
                        onClick={() => {
                          setClienteDetalles(cliente);
                          setModalDetallesOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-card-list"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={modalCrearOpen} toggle={() => setModalCrearOpen(false)}>
        <ModalHeader toggle={() => setModalCrearOpen(false)}>
          Crear Cliente
        </ModalHeader>
        <ModalBody>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Tipo de Identificación</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="tipoIdentificacionCliente"
              value={nuevoCliente.tipoIdentificacionCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.tipoIdentificacionCliente && (
              <span className="text-danger">
                {errorMessages.tipoIdentificacionCliente}
              </span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Número de Identificación</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="numIdentificacionCliente"
              value={nuevoCliente.numIdentificacionCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.numIdentificacionCliente && (
              <span className="text-danger">
                {errorMessages.numIdentificacionCliente}
              </span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Nombre</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="nombreCliente"
              value={nuevoCliente.nombreCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.nombreCliente && (
              <span className="text-danger">{errorMessages.nombreCliente}</span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Apellido</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="apellidoCliente"
              value={nuevoCliente.apellidoCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.apellidoCliente && (
              <span className="text-danger">
                {errorMessages.apellidoCliente}
              </span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Fecha de Nacimiento</InputGroupText>
            </InputGroupAddon>
            <Input
              type="date"
              name="fechaNacimientoCliente"
              value={nuevoCliente.fechaNacimientoCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.fechaNacimientoCliente && (
              <span className="text-danger">
                {errorMessages.fechaNacimientoCliente}
              </span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email</InputGroupText>
            </InputGroupAddon>
            <Input
              type="email"
              name="emailCliente"
              value={nuevoCliente.emailCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.emailCliente && (
              <span className="text-danger">{errorMessages.emailCliente}</span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Dirección</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="direccionCliente"
              value={nuevoCliente.direccionCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.direccionCliente && (
              <span className="text-danger">
                {errorMessages.direccionCliente}
              </span>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Celular</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="celularCliente"
              value={nuevoCliente.celularCliente}
              onChange={handleChangeNuevoCliente}
            />
            {errorMessages.celularCliente && (
              <span className="text-danger">
                {errorMessages.celularCliente}
              </span>
            )}
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitCrearCliente}>
            Crear
          </Button>{" "}
          <Button color="secondary" onClick={() => setModalCrearOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditarOpen} toggle={() => setModalEditarOpen(false)}>
        <ModalHeader toggle={() => setModalEditarOpen(false)}>
          Editar Cliente
        </ModalHeader>
        <ModalBody>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Tipo de Identificación</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="tipoIdentificacionCliente"
              value={ClienteEditando?.tipoIdentificacionCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  tipoIdentificacionCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Número de Identificación</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="numIdentificacionCliente"
              value={ClienteEditando?.numIdentificacionCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  numIdentificacionCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Nombre</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="nombreCliente"
              value={ClienteEditando?.nombreCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  nombreCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Apellido</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="apellidoCliente"
              value={ClienteEditando?.apellidoCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  apellidoCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Fecha de Nacimiento</InputGroupText>
            </InputGroupAddon>
            <Input
              type="date"
              name="fechaNacimientoCliente"
              value={ClienteEditando?.fechaNacimientoCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  fechaNacimientoCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email</InputGroupText>
            </InputGroupAddon>
            <Input
              type="email"
              name="emailCliente"
              value={ClienteEditando?.emailCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  emailCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Dirección</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="direccionCliente"
              value={ClienteEditando?.direccionCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  direccionCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Celular</InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              name="celularCliente"
              value={ClienteEditando?.celularCliente}
              onChange={(e) =>
                setClienteEditando((prevUser) => ({
                  ...prevUser,
                  celularCliente: e.target.value,
                }))
              }
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <BotonActualizar
            actualizarCliente={actualizarCliente}
            ClienteEditando={ClienteEditando}
            data={data}
            setData={setData}
            setModalEditarOpen={setModalEditarOpen}
          />
          <Button color="danger" onClick={() => setModalEditarOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalDetallesOpen}
        toggle={() => setModalDetallesOpen(false)}
      >
        <ModalHeader toggle={() => setModalDetallesOpen(false)}>
          Detalles del Cliente
        </ModalHeader>
        <ModalBody>
          {ClienteDetalles && (
            <div>
              <p>
                <strong>ID:</strong> {ClienteDetalles.idCliente}
              </p>
              <p>
                <strong>Tipo de Identificación:</strong>{" "}
                {ClienteDetalles.tipoIdentificacionCliente}
              </p>
              <p>
                <strong>Identificación:</strong>{" "}
                {ClienteDetalles.numIdentificacionCliente}
              </p>
              <p>
                <strong>Nombre:</strong> {ClienteDetalles.nombreCliente}
              </p>
              <p>
                <strong>Apellido:</strong> {ClienteDetalles.apellidoCliente}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {ClienteDetalles.fechaNacimientoCliente}
              </p>
              <p>
                <strong>Email:</strong> {ClienteDetalles.emailCliente}
              </p>
              <p>
                <strong>Dirección:</strong> {ClienteDetalles.direccionCliente}
              </p>
              <p>
                <strong>Celular:</strong> {ClienteDetalles.celularCliente}
              </p>
              <p style={{ color: "blue" }}>
                <strong>Estado:</strong>{" "}
                {ClienteDetalles.estado ? "Activo" : "Inactivo"}
              </p>
              <div style={{ marginTop: 45, marginLeft: 125 }}>
                <BotonEliminar
                  onDelete={() => eliminarCliente(ClienteDetalles.idCliente)}
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModalDetallesOpen(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Cliente;
