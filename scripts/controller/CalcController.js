//Regras de negócio
class CalcController {
    constructor(){
        this._displayCalc = '0'
        this._currentDate
    }

    //Encapsulamento
    get displayCalc(){
        //recupera
        return this._displayCalc
    }
    set displayCalc(value){
        //atribui valor
        this._displayCalc = value
    }
    get currentDate(){
        return this._currentDate
    }
    set currentDate(value){
        this._currentDate = value
    }
}