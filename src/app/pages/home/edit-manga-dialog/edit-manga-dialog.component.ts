import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MmlSelectComponent } from '@components/select/select.component';
import { Manga } from '@models/manga';
import { ViewMangaService } from '@services/manga/daves/view-manga.service';
import { webUrlValidator } from '@validators/web-url.validator';
import { MangaForm } from '../add-manga-dialog/add-manga-dialog.component';


@Component({
  selector: 'mml-edit-manga-dialog',
  templateUrl: './edit-manga-dialog.component.html',
  styleUrls: ['./edit-manga-dialog.component.css']
})
export class EditMangaDialogComponent implements OnInit {

  @ViewChild('mangaStatusSelect', { read: MmlSelectComponent })
  mangaStatusSelect!: MmlSelectComponent;

  @Output()
  submitFormEvent = new EventEmitter<any>();
  emitFormData(value: { mangaId: number, mangaForm: Partial<MangaForm> }) {
    this.submitFormEvent.emit(value);
  }

  @Output()
  deleteMangaButtonEvent = new EventEmitter<number>();
  emitMangaToBeDeleted(id: number) {
    this.deleteMangaButtonEvent.emit(id);
  }

  manga!: Manga;

  mangaId!: number;

  isDialogOpen = false;

  fileAsDataURL!: string;

  fileValidationMessage?: string;

  hasImage!: boolean;

  mangaForm: FormGroup = this.fb.group({
    mangaTitle: ['', Validators.required],
    mangaStatus: 'reading',
    mangaChapter: ['0', [Validators.required, Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')]],
    mangaSite: ['', webUrlValidator()],
    mangaCoverImageAsDataURL: ''
  });

  get mangaChapter() { return this.mangaForm.get('mangaChapter'); }

  get mangaSite() { return this.mangaForm.get('mangaSite'); }

  constructor(private viewMangaService: ViewMangaService, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  getDialogElementClicked(value: boolean) {

    if (value) { this.closeDialog(); }

  }

  openDialog(mangaId: number) {

    this.resetMangaForm();

    this.isDialogOpen = true;

    this.viewMangaService.viewOneManga(mangaId).subscribe(manga => {

      if (manga.title) {

        this.manga = manga;

        this.mangaForm = this.fb.group({
          mangaTitle: [this.manga.title, Validators.required],
          mangaStatus: this.manga.status,
          mangaChapter: [this.manga.chapter.toString(), [Validators.required, Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')]],
          mangaSite: [this.manga.mangaSite, webUrlValidator()],
          mangaCoverImageAsDataURL: ''
        });

        this.hasImage = (this.manga.imageUrl !== undefined) ? true : false;

        if (this.mangaStatusSelect) { this.mangaStatusSelect.setCurrentOption(this.manga.status); }

      } else {

        this.isDialogOpen = false;

      }

    });

    this.mangaId = mangaId;

  }

  closeDialog(isSubmit = false) {

    const isMangaFormChanged = this.hasChanges(this.mangaForm.value as MangaForm);

    if (isMangaFormChanged && isSubmit == false) {

      if (confirm('If you close this dialog the data you have editing will be lost.') == true) {

        this.resetMangaForm();

        this.isDialogOpen = false;

      }

    } else if (isSubmit == true) {

      this.resetMangaForm();

      this.manga.imageUrl = undefined;

      this.isDialogOpen = false;

      this.mangaId = 0;

    } else {

      this.manga.imageUrl = undefined;

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

      } else {

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

    this.manga.imageUrl = undefined;

    this.fileValidationMessage = undefined;

  }

  updateMissingFormValues() {

    if (this.fileAsDataURL) { this.mangaForm.value.mangaCoverImageAsDataURL = this.fileAsDataURL };

    if (this.mangaStatusSelect.currentOption) { this.mangaForm.value.mangaStatus = this.mangaStatusSelect.currentOption };

  }

  trimMangaFormInputValues(mangaForm: FormGroup): FormGroup<any> {

    mangaForm.value.mangaTitle = mangaForm.value.mangaTitle.trim();

    mangaForm.value.mangaChapter = mangaForm.value.mangaChapter.trim();

    if (mangaForm.value.mangaSite !== undefined && mangaForm.value.mangaSite !== null) {

      mangaForm.value.mangaSite = mangaForm.value.mangaSite.trim();

    }

    return mangaForm;

  }

  emitMangaForm(mangaForm: FormGroup) {

    mangaForm = this.trimMangaFormInputValues(mangaForm);

    const mangaFormValue: MangaForm = mangaForm.value;

    const filteredMangaForm = this.filterChanges(mangaFormValue);

    if (this.hasChanges(mangaFormValue)) {

      this.emitFormData({ mangaId: this.mangaId, mangaForm: filteredMangaForm });

    } else { this.closeDialog(); }

  }

  hasChanges(mangaForm: MangaForm): boolean {

    if (!this.manga) { return false; }

    const isMangaTitleChanged = mangaForm.mangaTitle !== this.manga.title;

    const isMangaStatusChanged = mangaForm.mangaStatus !== this.manga.status;

    const isMangaChapterChanged = mangaForm.mangaChapter !== this.manga.chapter.toString();

    if (mangaForm.mangaSite == null) { mangaForm.mangaSite = undefined; }

    const isMangaSiteChanged = mangaForm.mangaSite !== this.manga.mangaSite;

    let isMangaCoverImageChanged!: boolean;

    if (this.hasImage == true) { isMangaCoverImageChanged = this.manga.imageUrl == undefined; }

    if (this.hasImage == false) { isMangaCoverImageChanged = mangaForm.mangaCoverImageAsDataURL !== ''; }

    return (isMangaTitleChanged || isMangaStatusChanged || isMangaChapterChanged || isMangaSiteChanged || isMangaCoverImageChanged) ? true : false;

  }

  filterChanges(mangaForm: MangaForm): Partial<MangaForm> {

    let filteredMangaForm: Partial<MangaForm> = mangaForm;

    if (mangaForm.mangaTitle == this.manga.title) { delete filteredMangaForm.mangaTitle; }

    if (mangaForm.mangaStatus == this.manga.status) { delete filteredMangaForm.mangaStatus; }

    if (mangaForm.mangaChapter == this.manga.chapter.toString()) { delete filteredMangaForm.mangaChapter; }

    if (mangaForm.mangaSite == null) { mangaForm.mangaSite = undefined; }

    if (mangaForm.mangaSite == this.manga.mangaSite) { delete filteredMangaForm.mangaSite; }

    if (this.hasImage == true && this.manga.imageUrl !== undefined) { delete filteredMangaForm.mangaCoverImageAsDataURL; }

    if (this.hasImage == false &&
      (filteredMangaForm.mangaCoverImageAsDataURL == '')) { delete filteredMangaForm.mangaCoverImageAsDataURL; }

    return filteredMangaForm;

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
