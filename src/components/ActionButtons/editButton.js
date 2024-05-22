import React from "react";
import Swal from "sweetalert2";
import axios from 'axios';

const BotonActualizar = ({ actualizarCliente, ClienteEditando, data, setData, setModalEditarOpen }) => {
  const handleClick = async () => {
    try {
      await actualizarCliente(ClienteEditando, data, setData, setModalEditarOpen);
      mostrarAlerta();
    } catch (error) {
      console.error('Error al actualizar el Cliente:', error);
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al actualizar el Cliente.",
        icon: "error",
      });
    }
  };

  const mostrarAlerta = () => {
    Swal.fire({
      title: "Actualizado!",
      text: "Se actualizó con éxito.",
      icon: "success",
    });
  };

  return (
    <button
      style={{ marginLeft: 1 }}
      className="btn btn-warning"
      onClick={handleClick}
    >
      Guardar cambios
    </button>
  );
};

export default BotonActualizar;


