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


	// On file upload (click the upload button) 
	onTextUpload = event => {
    var data = new FormData();
    data.append('datos', this.state.texto);
    
    var config = {
      method: 'post',
      url: 'http://localhost:5001/',
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      this.setState(
        {
        tipificacion:  response.data
        })
    })
    .catch(function (error) {
      console.log(error);
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
              <TableBody>
                <Table.Row>
                  <Table.Cell>
                    {tipificacion}
                    {/* <Input
                      defaulValue = {this.state.tipificacion}
                    /> */}
                    
                  </Table.Cell>
                </Table.Row>

              </TableBody>
            
            </Table.Row>
          </Table>
        </Header>
      </>
	); 
	} 
} 

export default Datosjson; 
