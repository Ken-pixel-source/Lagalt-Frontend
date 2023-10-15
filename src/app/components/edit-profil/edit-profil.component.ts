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

  // EventEmitter to notify when the data is saved
  @Output() saveData = new EventEmitter<any>();

  save() {
    this.saveData.emit(this.formData);
    // Close the modal (we will implement this next)
    this.closeModal();
  }

  closeModal() {
    // Logic to close the modal (this can be updated based on how you handle modal visibility)
  }

}
