import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryModel } from '../../models/category.model';
import { FormValidateDirective } from 'form-validate-angular';
import { CategoryPipe } from '../../pipes/category.pipe';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule, FormValidateDirective,CategoryPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  parentList: any[] = []
  mainCategories: CategoryModel[] = [];
  parentCategories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();
  parentCategoryId: string = ""
  categoryIndex:number=0

  @ViewChild("addCategoryModalCloseBtn") addCategoryModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("addMainCategoryModalCloseBtn") addMainCategoryModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  constructor(private http: HttpService) {
    this.getAllMainCategory()
  }
  clearCreateCategoryModel(){
    this.category=new CategoryModel();
  }
  clearCreateMainCategoryModel(){
    this.category=new CategoryModel();
  }
  getAllMainCategory() {
    this.http.get("Categories/GetAllMainCategory", (res) => {
      this.parentCategories = res.categories
      this.parentList=[]
      this.parentList.push(this.parentCategories)
    });
  }
  getByParentCategoryId(id: string, categoryIndex: number) {
    this.categoryIndex=categoryIndex
    this.parentCategoryId = id;
    this.category.id = id
    if (categoryIndex !==-1) {
      this.parentList = this.parentList.slice(0, categoryIndex + 1);
    }
    this.http.post("Categories/GetAllCategory", this.category, (res) => {
      this.parentCategories = res.categories
      this.parentList.push(this.parentCategories)
    });
  }
  createCategory(form: NgForm) {
    if (form.valid) {
      this.category.id=this.parentCategoryId
      this.http.post("Categories/CreateCategory", this.category, (res) => {
        this.addCategoryModalCloseBtn?.nativeElement.click();
        this.getByParentCategoryId(this.parentCategoryId,this.categoryIndex);
      });
    }
  }
  createMainCategory(form: NgForm) {
    if (form.valid) {
      this.http.post("Categories/CreateMainCategory", this.category, (res) => {
        this.addMainCategoryModalCloseBtn?.nativeElement.click();
        this.getAllMainCategory()
      });
    }
  }
}
