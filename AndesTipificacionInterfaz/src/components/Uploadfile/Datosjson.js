import React, { Component } from 'react';
import axios from 'axios'; 
import './datosjson.css';
import {
  Header,
  Table,
  Input,
  // TableBody,
} from "semantic-ui-react";

 

class Datosjson extends Component { 

  constructor(props) {
      //el constructor recibe las propiedades
      super(props); //super para llamar a react component
  
      this.state = {
        // objeto con las propiedades que necesitemos
        textoMensage:"",
        textoDatosCliente:"",
        tipificacion:[],
        datosCliente:[]
      };
      this.handleChange = this.handleChange.bind(this);
      this.dataUpClient = this.dataUpClient.bind(this);      
      this.onTextUpload = this.onTextUpload.bind(this);
      this.service2Tipificacion = this.service2Tipificacion.bind(this);
    }
  
    handleChange(e) {
      const {value } = e.target;
      this.setState(
        {
          textoMensage:value
        })  
    }

    dataUpClient(e) {
      const {value } = e.target;
      this.setState(
        {
          textoDatosCliente:value
        })  
    }


    onTextUpload = () => {
      // Create an object of formData
      const formData = new FormData(); 
      // Se forma las etiquetas de la peticion
      formData.append("datos",this.state.textoMensage);
      formData.append("service","1")  
      // console.log(this.state.texto); 
      // Envio de peticion al servidor
      axios.post("http://54.234.133.155:5001", formData)
      .then(response => {
          this.setState({
          tipificacion:  response.data,
          });
          // console.log(this.state.suma_grupoAC)
          return response
      });

      }; 

      service2Tipificacion = () => {
        // Create an object of formData
        const formData = new FormData(); 
        // Se forma las etiquetas de la peticion
        formData.append("datos",this.state.textoDatosCliente);
        formData.append("service","2")   
        // Envio de peticion al servidor
        axios.post("http://54.234.133.155:5001", formData)
        .then(response => {
            this.setState({
            datosCliente:  response.data,
            });
            // console.log(this.state.suma_grupoAC)
            return response
        });
  
        }; 
	
	render() { 
    // const { texto ="" } = this.state;
    const { tipificacion =[] } = this.state;
    const { datosCliente =[] } = this.state;
    
        
	return ( 
        <>
        <Header as="h6"  textAlign="center">
          <Table>
            <Table.Row>
            <h1>Servicio para el Proceso de Tipificacion</h1>
              Mensage: <Input defaultValue="" valor="valor" type= "text" size='big' placeholder = "Mensage" onChange={this.handleChange}/> <button onClick={this.onTextUpload}> Cargar S1 </button>
            </Table.Row>
            <br/>
            <Table.Row>
              Resultado S1: <Input value = {tipificacion} size='big' placeholder = "Tipificacion"/>
            </Table.Row>
            <br/>
            <Table.Row>
              Datos Cliente: <Input defaultValue="" valor="valor" type= "text" size='big' placeholder = "Datos del Cliente Vtex" onChange={this.dataUpClient}/> <button onClick={this.service2Tipificacion}> Cargar S2</button>  
            </Table.Row>  
            <br/>
            <Table.Row>
              Resultado S2: <Input value = {datosCliente} size='big' placeholder="Datos del Cliente Dynamics"/>
            </Table.Row>
            <br/>
          </Table>
        </Header>
      </>
	); 
	} 
} 

export default Datosjson; 
