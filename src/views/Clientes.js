import react from "react";
import { useState, useEffect } from "react";
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
} from "reactstrap";

import BotonActualizar from "components/ActionButtons/editButton";
import BotonEliminar from "components/ActionButtons/deleteButton";
import BotonDetalles from "components/ActionButtons/detailsButton";
import BotonCrear from "components/ActionButtons/createButton";

function Cliente() {
  async function onConfirmDelete() {
    alert("FUNCIONÓ");
  }

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/cliente");
        if (!response.ok) {
          throw new Error("La respuesta de red no fue exitosa");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="Content content">
        <Card>
          <CardHeader>
            <CardTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px"
                }}
              >
                <BotonCrear/>
                <InputGroup  className="no-border">
                  <Input placeholder="Buscar..." />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
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
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Celular</th>
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
                    <td>{cliente.emailCliente}</td>
                    <td>{cliente.direccionCliente}</td>
                    <td>{cliente.celularCliente}</td>
                    <td>
                      <BotonActualizar />
                    </td>
                    <td>
                      <BotonEliminar cb={onConfirmDelete} />
                    </td>
                    <td>
                      <BotonDetalles />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default Cliente;
