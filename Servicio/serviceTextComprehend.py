from flask import Flask, request
from flask import Response
from flask_restful import Api, Resource, reqparse
from flask import jsonify
from flask_cors import CORS
import numpy as np
import os
from analyseText import compare_text

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

        #print('\nPARAMETROS ENTRADA:')
        for key,value in args.items():
            message=value
            #print(message) #parameters=value.split(",")

        motivo,negocio,tipologia3,tipologia4 = compare_text(message)
        return [motivo,negocio,tipologia3,tipologia4]


api.add_resource(User, "/")

app.run(debug=True, port=5001, host='0.0.0.0')
