//Regras de negócio
class CalcController {
    constructor(){
        this._operation = []; //guarda tudo oq foi clicado
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
        
        this.setLastNumberToDisplay()
    }

    clearAll(){
        this._operation = []
        this.setLastNumberToDisplay()
    }
    clearEntry(){
        this._operation.pop() //exclui o último clicado
        this.setLastNumberToDisplay()
    }
    //Retorna o último digitado, sendo operação ou número
    getLastOperation(){
        return this._operation[this._operation.length-1]
    }
    //Troca o último valor pelo anterior
    setLastOperation(value){
        this._operation[this._operation.length-1] = value
    }

    isOperator(value){
        //retorna se value é um dos operadores
        return ['+', '-', '*', '%', '/'].indexOf(value) > -1      
    } 

    //Faz os push
    pushOperation(value){
        this._operation.push(value)

        //Se digitou mais de 3 itens
        if(this._operation.length > 3){
            //Calcula a primeira operação (os primeiros 3 itens)
            this.calc()
        }
    } 

    calc(){
        let last = ''

        if(this._operation.length > 3){
            //Tira o último
            last = this._operation.pop()
        }
        
        //Tranforma em string e faz a operação
        let result = eval(this._operation.join(""))

        if(last == '%'){

            result /= 100

            this._operation = [result]

        }else{
            //salva o resultado
            this._operation = [result]
            //adiciona last se existir
            if(last) this._operation.push(last)
        }
        this.setLastNumberToDisplay()
    }

    //Atualiza o display com o último digitado
    setLastNumberToDisplay(){

        let lastNumber
        for(let i = this._operation.length - 1; i >= 0; i--){
            if(!this.isOperator(this._operation[i])){
                //is number
                lastNumber = this._operation[i]
                break
            }
        }
        if(!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber
    }

    addOperation(value){
        
        if(isNaN(this.getLastOperation())){
            //String
            //se é operações e ponto
            if(this.isOperator(value)){ 
               // se for um operador, troca pelo último
               this.setLastOperation(value)

            }else if(isNaN(value)){
                //Outra coisa
                console.log(value)
            }else{
                this.pushOperation(value)

                this.setLastNumberToDisplay()
            }

        }else{
            if(this.isOperator(value)){
                //Operador
                this.pushOperation(value)
            }else{
                //Number
                //Converte para string para concatenar os números
                let newValue = this.getLastOperation().toString() +  value.toString()

                this.setLastOperation(parseInt(newValue))//troca pelo último

                this.setLastNumberToDisplay()//atualiza display
            }
        }
    }

    setError(){
        this.displayCalc = 'Error'
    }

    //Execução dos botões
    execBtn(value){      
        switch(value){
            case 'ac':
                this.clearAll()
                break;
            
            case 'ce':
                this.clearEntry()
                break;
            
            case 'soma':
                this.addOperation('+')
                break;

            case 'subtracao':
                this.addOperation('-')
                break;

            case 'multiplicacao':
                this.addOperation('*')
                break;
            
            case 'divisao':
                this.addOperation('/')
                break;

            case 'porcento':
                this.addOperation('%')
                break;

            case 'igual':
                this.calc()
                break;

            case 'ponto':
                
                break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;
            
            default:
                this.setError();
                break;
        }
    }

    //Trata múltiplos eventos ao mesmo tempo
    addEventListenerAll(element, events, fn){

        //Split converte a string dos eventos em um array
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false) //false evita disparar 2x o evento
        })
    }

    initButtonsEvents(){
        //Pegas todos os g filhos de button e de parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        //Percorre a lista e para cada botão adiciona o evento click
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                //Pega o nome das classes dos botões e substitui o btn- por nada, retornando somente o número do botão
                let textBtn = btn.className.baseVal.replace("btn-","")

                //Executa a ação do botão
                this.execBtn(textBtn)
            })
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {

                //Deixa o cursor como clicável
                btn.style.cursor = "pointer"
            })
        })
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
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