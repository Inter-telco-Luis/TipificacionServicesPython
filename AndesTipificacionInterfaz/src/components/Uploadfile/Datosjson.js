import React, { Component } from 'react';
import axios from 'axios'; 
import './datosjson.css';
import {
  Header,
  Table,
  Input,
} from "semantic-ui-react";

 

class Datosjson extends Component { 

    constructor(props) {
        //el constructor recibe las propiedades
        super(props); //super para llamar a react component
    
        this.state = {
          // objeto con las propiedades que necesitemos
          texto:"",
          items: [],
          nameFile: '', 
          selectedFile: null,
        };

      }
  
	// On file select (from the pop up) 
	onFileChange = event => { 
        // Update the state 
        // console.log("hubo un evento")
        this.setState({ selectedFile: event.target.files[0],items:[] }); 
        }; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => {
        // Create an object of formData
        this.setState({items:[{"estado":"cargando"}]})
        const formData = new FormData(); 
        // Se forma las etiquetas de la peticion
        formData.append("name",this.state.selectedFile.name); 
        formData.append("data",this.state.selectedFile); 
        console.log(this.state.selectedFile); 
        // Envio de peticion al servidor
        axios.post("http://35.175.103.14:1232/", formData)
        .then(response => {
            this.setState({
            items:  response.data,            
            });
            // console.log(this.state.suma_grupoAC)
            return response
        });

        }; 

  escribir(){
  document.getElementById('cont1').innerHTML='Párrafo de texto';
  }

	
	render() { 
        const { items =[] } = this.state;
        console.log(items)
        // const jsonStr = JSON.stringify(items)
	return ( 
        <>    
        <Header as="h6"  textAlign="center">
          <Table>
            <Table.Row>
              <Table.HeaderCell>
                <h1>Cargar PDF</h1>
                {/* {console.log(items)} */}
                <input size="big" type="text" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}> 
                    Cargar 
                </button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Body>
              <Table.Cell active>
                <div id="cont1">
                  {/* <a href="javascript:escribir()">Escribir</a> */}
                  {/* <a href="javascript:void(document.getElementById('cont1').innerHTML='ho ho');">Escribirww</a> */}
                  {/* {document.getElementById('cont1').innerHTML='ho ho'} */}
                  {/* <Input defaultValue={JSON.stringify(this.items)}/> */}
                  {JSON.stringify(items)}
                </div>
              </Table.Cell>
              {/* <div>{document.write(+items)}</div> */}
              {/* {window.onload = document.write(+items)} */}
              {/* {document.write(items)} */}
              {/* <input type="text" name="textbox1" id="textbox1" /> */}
              {/* {document.response.innerHTML = this.items} */}
            </Table.Body>
          </Table>
        </Header>
      </>
	); 
	} 
} 

export default Datosjson; 
