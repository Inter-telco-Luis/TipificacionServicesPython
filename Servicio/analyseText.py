import openpyxl
from fuzzywuzzy import fuzz
import re, string
from unicodedata import normalize

def read_dict_tipicacion():
    dictionaryTipification = openpyxl.load_workbook('Tipificacion Dynamics.xlsx')
    hoja1 = dictionaryTipification.get_sheet_by_name('Hoja1')

    motivoConsulta=[]
    negocio=[]
    tipologia3=[]
    tipologia4=[]
    for indexCell in range(1,hoja1.max_row):
        motivoConsulta.append(hoja1.cell(row=indexCell,column = 1).value)
        #print(hoja1.cell(row=indexCell,column = 4).value)
        negocio.append(hoja1.cell(row=indexCell,column = 2).value)
        tipologia3.append(hoja1.cell(row=indexCell,column = 3).value)
        tipologia4.append(hoja1.cell(row=indexCell,column = 4).value)

    return motivoConsulta,negocio,tipologia3,tipologia4

def clean_message(message):
    messageList=message.split("\n")
    messageFilter=[]
    for line in messageList:
        lineNoSpaces = re.sub("\W","",line)
        if lineNoSpaces != "":
            messageFilter.append(line)
            print(line)

    messageBody=""
    for line in messageFilter:
        if "body>" in line:
            messageBody=line

    return messageBody

def replace_accent(text):
    # Quita las tildes del texto que ingresa
    text.replace("á","a")
    text.replace("é","e")
    text.replace("í","i")
    text.replace("ó","o")
    text.replace("ú","u")
    text.replace(",","")
    text.replace(".","")
    text.replace(":","")
    text.replace(";","")

    return text

def compare_T4_message(words,message):
    # Resive el mensaje y las palabras con las que debe copararlo para generar un porcentaje de 
    # similitud de acuerdo al numero de palabras similares.

    similarity=0
    countWord=0 # cuenta el numero de palabras de mas de dos cifras, exceptuando la preposicion no que tambien se cuenta como palabra
    # Se tranforma en minusculas message
    message = message.lower()
    # Se quitan tildes, puntos, comas, dos puntos de words y de message
    message = replace_accent(message)



    for word in words:
        word = word.lower()
        if len(word) > 2 and word != "no":
            countWord=countWord+1
            word = replace_accent(word)
            if word in message:
                #print(word)
                similarity=similarity+100
            else:
                similarity = similarity + fuzz.token_sort_ratio(word,message)

    #similarity=similarity/countWord
    return similarity


def compare_text(message):
    motivo,negocio,tipologia3,tipologia4 = read_dict_tipicacion()

    messageBody = clean_message(message)

    # Se tiene en las variables motivo, negocio,tipologia3,tipologia4 las columnas del diccionario dado por Andes
    # Se compara cada palabra de la tipologia 4 con cada palabra del mensaje y se guarda y suma el porsentaje de similitud con fuzz
    # o se entrena algoritmo con amazon comprehend.
    # Inicialmente se realiza utilizando la libreria Fuzz
    

    percentajeSimilarity = [] # almacena el porcentaje de coincidencia del texto de cada celda de la tipologia 4 con el mensaje
    for indexT4,statement in enumerate(tipologia4):
        # words es una lista que contiene cada palabra de la frase(statement) actual de la tipologia 4
        words=statement.split(" ")
        # se llama a la funcion para comparar cada palabra de la celda actual de la tipologia 4 con el menssaje y que retorna el grado de similitud.
        similarity=compare_T4_message(words,messageBody)
        print(indexT4,statement +"________________________"+str(similarity))
        percentajeSimilarity.append(similarity)
        #print(words)
    
    # Se extrae el indice de la tipologia con mayor similitud
    indexMaxSimilarity = percentajeSimilarity.index(max(percentajeSimilarity)) 
    print(indexMaxSimilarity)

    return (motivo[indexMaxSimilarity],negocio[indexMaxSimilarity],tipologia3[indexMaxSimilarity],tipologia4[indexMaxSimilarity])

def tipificacion_message():

    return True

if __name__ == "__main__":
    message = '''body> buenas quiero realizar una cancelacion de Tarjeta'''    
    motivo,negocio,tipologia3,tipologia4 = compare_text(message)
    print(motivo,negocio,tipologia3,tipologia4)


    