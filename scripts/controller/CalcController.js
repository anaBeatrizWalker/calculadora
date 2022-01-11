//Regras de negócio
class CalcController {
    constructor(){
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")
        this._currentDate
        this.initialize()
        this.initButtonsEvents()
    }

    initialize(){

        //Mostra a hora e data
        this.setDisplayDateTime()

        //Atualiza a hora e data após um intervalo de 1 seg
        setInterval(()=>{
            this.setDisplayDateTime()
        }, 1000)
    }

    initButtonsEvents(){
        //Pegas todos os g filhos de button e de parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        //Percorre a lista e para cada botão adiciona o evento click
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', e => {
                console.log(btn.className.baseVal.replace("btn-",""))
            })
        })
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)

        this.displayTime = this.currentDate.toLocaleDateString(this._locale)
    }

    //Encapsulamento
    get displayTime(){
        return this._timeEl.innerHTML
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value
    }

    get displayDate(){
        return this._dateEl.innerHTML
    }
    set displayDate(value){
        return this._dateEl.innerHTML = value
    }

    get displayCalc(){
        //recupera
        return this._displayCalcEl.innerHTML
    }
    set displayCalc(value){
        //atribui valor
        this._displayCalcEl.innerHTML = value
    }

    get currentDate(){
        return new Date()
    }
    set currentDate(value){
        this._currentDate = value
    }
}