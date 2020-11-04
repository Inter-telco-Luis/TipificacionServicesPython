import openpyxl
import re


def read_dict_tipicacion():
    dictionaryTipification = openpyxl.load_workbook('Tipificacion Dynamics.xlsx')
    hoja1 = dictionaryTipification.get_sheet_by_name('Hoja1')
    print(hoja1.cell(row = 5, column = 2).value)
    return hoja1

def clean_message(message):
    messageList=message.split("\n")
    messageFilter=[]
    for line in messageList:
        lineNoSpaces = re.sub("\W","",line)
        if lineNoSpaces != "":
            messageFilter.append(line)
            print(line)

    return messageFilter

def compare_text(message):
    read_dict_tipicacion()

    return True

def tipificacion_message():

    return True

if __name__ == "__main__":
    message = '''buenas tardes
     
    
    quiero realizar una cancelacion'''
    
    messageClean=clean_message(message)
    tipificacin = compare_text(messageClean)
    compare_text(message)

    