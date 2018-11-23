import React, { Component } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

class Ingreso extends Component {
  state = {
    paciente: [
      {
        nombre: "",
        apellidos: "",
        edad: "",
        sexo: "Masculino",
        rut: "",
        direccion: "",
        telefono: "",
        nacionalidad: "Chilena",
        prevision: "Fonasa A",
        categoria: "null",
        estado: "0"
      }
    ],
    nacionalidades: [
      { id: 1, glosa: "Chilena" },
      { id: 2, glosa: "Peruana" },
      { id: 3, glosa: "Argentina" }
    ],
    sexo: [{ id: 0, tipo: "Masculino" }, { id: 1, tipo: "Femenino" }],
    previsiones: [
      { id: 1, glosa: "Fonasa A" },
      { id: 2, glosa: "Fonasa B" },
      { id: 3, glosa: "Fonasa C" },
      { id: 4, glosa: "Fonasa D" },
      { id: 5, glosa: "Isapre" },
      { id: 6, glosa: "Particular" }
    ]
  };

  handleSubmit = event => {
    // Ajax - POST
    const { paciente } = this.state;
    let pac = paciente[0];
    //console.log("SUBMIT!!", pac);
    event.preventDefault();
    fetch("http://192.168.0.65:4000/api/pacientes/", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "*": "*"
      },
      body: JSON.stringify(pac)
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(res) {
        console.log(res);
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    let paciente = this.state.paciente;
    paciente[0][name] = value;
    this.setState({ paciente });
    console.log(this.state.paciente);
  };

  render() {
    const { nacionalidades, sexo, previsiones, paciente } = this.state;

    return (
      <div className="jumbotron">
        <Form onSubmit={this.handleSubmit}>
          <Row form>
            <Col md={{ size: 3, offset: 3 }}>
              <FormGroup>
                <Label for="exampleEmail">Nombres</Label>
                <Input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre completo..."
                  value={paciente.nombre}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="apellidos">Apellidos</Label>
                <Input
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  placeholder="Apellidos..."
                  value={paciente.apellidos}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={{ size: 1, offset: 3 }}>
              <FormGroup>
                <Label for="exampleCity">Edad</Label>
                <Input
                  type="text"
                  name="edad"
                  id="edad"
                  placeholder="Edad ..."
                  value={paciente.edad}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleState">Sexo</Label>
                <Input
                  type="select"
                  name="sexo"
                  id="selectSexo"
                  value={paciente.sexo}
                  onChange={this.handleChange}
                >
                  {sexo.map(sexo => (
                    <option key={sexo.id}>{sexo.tipo}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Rut</Label>
                <Input
                  type="text"
                  name="rut"
                  id="rut"
                  value={paciente.rut}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Col md={{ size: 6, offset: 3 }}>
              <Label for="exampleAddress2">Dirección</Label>
              <Input
                type="text"
                name="direccion"
                id="exampleAddress2"
                placeholder="Calle #número, bloque, departamento..."
                value={paciente.direccion}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <Row form>
            <Col md={{ size: 2, offset: 3 }}>
              <FormGroup>
                <Label for="exampleCity">Teléfono</Label>
                <Input
                  type="text"
                  name="telefono"
                  id="telefono"
                  placeholder="+56 9 12345678"
                  value={paciente.telefono}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleState">Nacionalidad</Label>
                <Input
                  type="select"
                  name="nacionalidad"
                  id="exampleSelect"
                  value={paciente.nacionalidad}
                  onChange={this.handleChange}
                >
                  {nacionalidades.map(nacionalidad => (
                    <option key={nacionalidad.id}>{nacionalidad.glosa}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Previsión</Label>
                <Input
                  type="select"
                  name="prevision"
                  id="selectSexo"
                  value={paciente.prevision}
                  onChange={this.handleChange}
                >
                  {previsiones.map(prevision => (
                    <option key={prevision.id}>{prevision.glosa}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" outline color="success">
            Ingresar
          </Button>
        </Form>
      </div>
    );
  }
}

export default Ingreso;
