import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent {

  public formData = {
    skills: [],
    portfolio: []
  };

  @Output() saveData = new EventEmitter<any>();

  save() {
    this.saveData.emit(this.formData);
    this.closeModal();
  }



  closeModal() {

  }

}
