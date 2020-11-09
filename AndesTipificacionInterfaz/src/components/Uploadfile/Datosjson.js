import React, { Component } from 'react';
import axios from 'axios'; 
import './datosjson.css';
import {
  Header,
  Table,
  Input,
  TableBody,
} from "semantic-ui-react";

 

class Datosjson extends Component { 

  constructor(props) {
      //el constructor recibe las propiedades
      super(props); //super para llamar a react component
  
      this.state = {
        // objeto con las propiedades que necesitemos
        texto:"",
        tipificacion:[]
      };
      this.handleChange = this.handleChange.bind(this);
      this.onTextUpload = this.onTextUpload.bind(this);
    }
  
    handleChange(e) {
      const {value } = e.target;
      // console.log(value)
      this.setState(
        {
          texto:value
        })  
    }


    onTextUpload = () => {
      // Create an object of formData
      const formData = new FormData(); 
      // Se forma las etiquetas de la peticion
      formData.append("datos",this.state.texto);  
      console.log(this.state.texto); 
      // Envio de peticion al servidor
      axios.post("http://localhost:5001", formData)
      .then(response => {
          this.setState({
          tipificacion:  response.data,
          });
          // console.log(this.state.suma_grupoAC)
          return response
      });

      }; 
	
	render() { 
    // const { texto ="" } = this.state;
    const { tipificacion =[] } = this.state;
    
        
	return ( 
        <>    
        <Header as="h6"  textAlign="center">
          <Table>
            <Table.Row>
              <Table.HeaderCell>
                <h1>Mensage</h1>
                {/* {console.log(items)} */}
                <Input                
                  defaultValue=""
                  valor="valor"
                  type= "text"
                  size='big' 
                  onChange={this.handleChange}
                />
                <button onClick={this.onTextUpload}> 
                  Cargar
                </button>
              </Table.HeaderCell>

            
            </Table.Row>
            <TableBody>
                <Table.Row>
                  <Table.Cell>
                    <Input
                      value = {tipificacion}
                      size='big'
                    />
                    
                  </Table.Cell>
                </Table.Row>

              </TableBody>
          </Table>
        </Header>
      </>
	); 
	} 
} 

export default Datosjson; 
