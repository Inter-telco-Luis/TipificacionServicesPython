from flask import Flask, request
from flask import Response
from flask_restful import Api, Resource, reqparse
from flask import jsonify
from flask_cors import CORS
import numpy as np
import os
from analyseText import compare_text
from organiceClientData import organice_client_data

app = Flask(__name__)
api = Api(app)
CORS(app)
cors=CORS(app, resources={
    r"/*":{
        "origin":"*",
        'Access-Control-Allow-Origin': '*'
    }
})

# 400 Bad Request   
r_400 = Response("Peticion invalida.", status=400)

# 500 Internal Server Error
r_500 = Response("Error interno del servidor", status=500)


class User(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("datos")
        parser.add_argument("service")
        args = parser.parse_args()

        if args["service"]=="1":
            #print('\nPARAMETROS ENTRADA:')
            # for key,value in args.items():
            #     message=value
            message=args["datos"]
                #print(message) #parameters=value.split(",")

            motivo,negocio,tipologia3,tipologia4,CPC_Escala = compare_text(message)
            return [motivo,negocio,tipologia3,tipologia4,CPC_Escala]
        elif args["service"]=="2":
            datosCliente=args["datos"]
            name,cellPhone,cedula,idCard,city,numOrder,officeGuide=organice_client_data(datosCliente)
            return[name,cellPhone,cedula,idCard,city,numOrder,officeGuide]



api.add_resource(User, "/")

app.run(debug=True, port=5001, host='0.0.0.0')
