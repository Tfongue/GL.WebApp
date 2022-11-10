import { Component } from '@angular/core';
import { CalculatorModalComponent } from './calculator-modal/calculator-modal.component'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GL.WebApp';
  private modalService: NgbModal;
  private hideModal: string;

  constructor(private ngbModalService: NgbModal) {
    this.modalService = ngbModalService;
    this.hideModal = '';
  }

 showModal(modal: any){
    this.modalService.open(modal).result;
  }
}
