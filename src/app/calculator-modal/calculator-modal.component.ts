import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator-service.service'

@Component({
  selector: 'app-calculator-modal',
  templateUrl: './calculator-modal.component.html',
  styleUrls: ['./calculator-modal.component.scss']
})
export class CalculatorModalComponent implements OnInit {
  calculatorService: CalculatorService;

  start: string = '';
  amount: string = '';
  result: number = 0;
  display: string = '';
  operator: string = '';
  openBracket: string = '';
  closeBracket: string = '';

  constructor(calculatorService: CalculatorService){
    this.calculatorService = calculatorService;
  }

  ngOnInit(): void {
  }

  clearOutput(){
    this.result = 0;
    this.resetAll();
  }
  
  resetAll(){
    this.display = '';
    this.amount = '';
    this.start = '';
    this.amount = '';
    this.operator = '';
    this.openBracket = '';
    this.closeBracket = '';
  }

  recordNumber(value: number){
    if(this.display.includes(' - ') || this.display.includes(' + ')){
      this.amount += value;
    } else {
      this.start += value;
    }

    this.buildDisplay();
  }

  recordOperator(operator: string){
    if((this.start === '' || this.start === '-') && operator === '+')
      return;

    if(this.start === '' && operator === '-') 
      this.start = operator;
    else if(this.amount === '' && this.operator !== '' && operator === '-' && !this.display.endsWith('- ') && !this.display.endsWith('+ ')) 
      this.amount = operator;
    else if(!this.display.trim().endsWith('-') && !this.display.trim().endsWith('+')){
      this.operator = operator;
    }

    this.buildDisplay();
  }

  recordBrackets(bracket: string){
    const lastCharacter: string = this.display.charAt(this.display.length - 1);
    const regCheck = new RegExp('^[0-9]+$');
    const isNumber: boolean = regCheck.test(lastCharacter);

    if(this.operator && bracket === '(')
      this.openBracket = bracket;
    else if(this.operator && isNumber && bracket === ')')
      this.closeBracket = bracket;

    this.buildDisplay();
  }

  buildDisplay(){
    this.result = 0;

    this.display = this.start + ' ' + this.operator + ' ' + this.openBracket + this.amount + this.closeBracket;
    if(!this.display) return;
  }

  calculate(){
    let isBracketOpen: boolean = this.display.includes('(');
    if(isBracketOpen && this.display.includes(')'))
      isBracketOpen = false;

    if(!this.operator || !this.start || !this.amount || isBracketOpen) return;

    const start: any = this.start;
    const amount: any = this.amount;

    if(this.operator === '+'){
      this.calculatorService.performAddition(start, amount)
        .subscribe(res => this.result = res);
    } else {
      this.calculatorService.performSubtraction(start, amount)
        .subscribe(res => this.result = res);
    }

    this.resetAll();
  }


}
