import React, { Component } from "react";
import Paciente from "./paciente";

class Pacientes extends Component {
  state = {
    pacientes: [],
    modal: false
  };

  /* componentWillMount() {
    this.downloadListOfUsers();
  } */

  downloadListOfUsers = () => {
    fetch("http://192.168.0.65:4000/api/pacientes/", {
      mode: "no-cors",
      method: "GET"
    })
      .then(response => console.log(response))
      .then(json => {
        console.log(json);
        /* var nuevospaciente = [];
        json.usuarios.map(usuario => (

          nuevosUsuarios.push({
            id: usuario._id,
            name: usuario.nombre,
            email: usuario.email
          })
        ));
        this.setState({pacientes: nuevosPacientes}); */
      })
      .catch(error => console.log(error));
  };

  render() {
    this.downloadListOfUsers();
    const { pacientes } = this.state;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-sm">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido Paterno</th>
                  <th scope="col">Apellido Materno</th>
                  <th scope="col">Rut</th>
                  <th scope="col">Categorización</th>
                </tr>
              </thead>
              <tbody>
                {pacientes
                  .filter(p => p.categorizacion === 0)
                  .map(paciente => (
                    <Paciente key={paciente.id} paciente={paciente} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Pacientes;
