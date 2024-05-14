import react from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";



function Cliente() {
  return (
    <>
<div className="Content content">
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Clientes</CardTitle>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
          <tr>
            <th>ID</th>
            <th>Nombre de usuario</th>
            <th>E-Mail</th>
            <th>Sitio Web</th>
            <th>Direccion de residencia</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dakota Rice</td>
              <td>Niger</td>
              <td>Oud-Turnhout</td>
              <td className="text-right">$36,738</td>
              <td>Carrera 23</td>
              <td><Button id="btnEditar" className="btn btn-warning" style={{padding : 15, margin: 10}}>Editar</Button>
              <Button id="btnEliminar" className="btn btn-danger" style={{padding : 15, margin: 10}}>Eliminar</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
    </div>
    </>
  );
}
export default Cliente;
