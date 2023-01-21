import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MmlSelectComponent } from '@components/select/select.component';
import { webUrlValidator } from '@validators/web-url.validator'


export interface MangaForm {
  mangaTitle: string;
  mangaStatus: string;
  mangaChapter: string;
  mangaSite?: string;
  mangaCoverImageAsDataURL?: string;
}

@Component({
  selector: 'mml-add-manga-dialog',
  templateUrl: './add-manga-dialog.component.html',
  styleUrls: ['./add-manga-dialog.component.css']
})
export class AddMangaDialogComponent implements OnInit {

  @ViewChild('mangaStatusSelect', { read: MmlSelectComponent })
  mangaStatusSelect!: MmlSelectComponent;

  @Output()
  submitFormEvent = new EventEmitter<MangaForm>();
  emitFormData(value: MangaForm) {

    this.submitFormEvent.emit(value);

  }

  isDialogOpen = false;

  fileAsDataURL!: string;

  fileValidationMessage?: string;

  mangaForm: FormGroup = this.fb.group({
    mangaTitle: ['', Validators.required],
    mangaStatus: 'reading',
    mangaChapter: ['0', [Validators.required, Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')]],
    mangaSite: ['', webUrlValidator()],
    mangaCoverImageAsDataURL: ''
  });

  get mangaChapter() { return this.mangaForm.get('mangaChapter'); }

  get mangaSite() { return this.mangaForm.get('mangaSite'); }

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {

  }

  getDialogElementClicked(value: boolean) {

    if (value) { this.closeDialog(); }

  }

  openDialog() {

    this.isDialogOpen = true;

  }

  closeDialog(isSubmit = false) {

    if (this.mangaForm.pristine == false && (this.fileAsDataURL !== undefined || this.fileAsDataURL !== '') && isSubmit == false) {

      if (confirm('If you close this dialog the data you have entered will be lost.') == true) {

        this.resetMangaForm();

        this.isDialogOpen = false;

      }

    } else if (isSubmit == true) {

      this.resetMangaForm();

      this.isDialogOpen = false;

    } else {

      this.fileAsDataURL = '';

      this.isDialogOpen = false;

    }

  }

  fileUpload(fileList: FileList | File[]) {

    if (fileList && fileList.length < 1) {

      //console.log('File doesn\'t exist.');

    } else if (fileList.length > 1) {

      this.fileValidationMessage = 'Only one file can be uploaded.';

    } else {

      const file: File = fileList[0];

      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png') {

        this.fileValidationMessage = 'File type is not supported.\nIt should be jpg or png.';

      } else if (file.size > 1 * 1024 * 1024) {

        this.fileValidationMessage = 'File size is greater than 1MB.';

      }

      else {

        const reader = new FileReader();

        reader.onload = (e) => {

          this.fileAsDataURL = e.target!.result as string;

          this.mangaForm.value.mangaCoverImageAsDataURL = this.fileAsDataURL;

          this.fileValidationMessage = ' ';

        }

        reader.readAsDataURL(file);

      }

    }

  }

  removeImage(inputElement: HTMLInputElement) {

    inputElement.value = '';

    this.fileAsDataURL = '';

    this.mangaForm.value.mangaCoverImageAsDataURL = '';

    this.fileValidationMessage = undefined;

  }

  updateMissingFormValues() {

    if (this.fileAsDataURL) { this.mangaForm.value.mangaCoverImageAsDataURL = this.fileAsDataURL };

    if (this.mangaStatusSelect.currentOption) { this.mangaForm.value.mangaStatus = this.mangaStatusSelect.currentOption };

  }

  emitMangaForm(mangaForm: FormGroup) {

    mangaForm = this.trimMangaFormInputValues(mangaForm);

    const mangaFormValue: MangaForm = mangaForm.value;

    this.emitFormData(mangaFormValue);

  }

  trimMangaFormInputValues(mangaForm: FormGroup): FormGroup<any> {

    mangaForm.value.mangaTitle = mangaForm.value.mangaTitle.trim();

    mangaForm.value.mangaChapter = mangaForm.value.mangaChapter.trim();

    if (mangaForm.value.mangaSite !== undefined || mangaForm.value.mangaSite !== null) {

      mangaForm.value.mangaSite = mangaForm.value.mangaSite.trim();

    }

    return mangaForm;

  }

  resetMangaForm() {

    this.mangaForm.reset({
      mangaTitle: '',
      mangaStatus: 'reading',
      mangaChapter: '0',
      mangaSite: '',
      mangaCoverImageSource: ''
    });

    this.fileAsDataURL = '';

  }

}
