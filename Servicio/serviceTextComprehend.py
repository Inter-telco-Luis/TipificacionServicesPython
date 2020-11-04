from flask import Flask, request
from flask import Response
from flask_restful import Api, Resource, reqparse
from flask import jsonify
from flask_cors import CORS
import numpy as np
import os
from DBComprobantes import fill_db_comprobantes## Aqui se debe llamar al servicio que lee el excel y que resive el texto
 
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
        args = parser.parse_args()

        print('\nPARAMETROS ENTRADA:')
        for key,value in args.items():
            imgName=value
            print(imgName) #parameters=value.split(",")

        fill_db_comprobantes(imgName)
        return True


api.add_resource(User, "/")

app.run(debug=True, port=4000, host='0.0.0.0')