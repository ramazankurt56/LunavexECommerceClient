import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryListModel, CategoryModel } from '../../models/category.model';
import { FormValidateDirective } from 'form-validate-angular';
import { CategoryPipe } from '../../pipes/category.pipe';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule, FormValidateDirective, CategoryPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: CategoryListModel = new CategoryListModel();
  categoryNames: string = '';

  parentList: any[] = []
  parentCategories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();

  parentCategoryId: string = ""
  categoryIndex: number = 0
  modalCategoryName:string=""

  @ViewChild("addCategoryModalCloseBtn") addCategoryModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("addMainCategoryModalCloseBtn") addMainCategoryModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("addCategoryListModalCloseBtn") addCategoryListModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(private http: HttpService) {
    this.getAllMainCategory()
  }

  createCategoryList(form: NgForm) {
    if (form.valid) {
    const categoriesArray = this.categoryNames.split('\n').map(category => category.trim());
    this.categories.parentCategoryId = this.parentCategoryId
    this.categories.name = categoriesArray
    this.http.post("Categories/CreateCategories", this.categories, (res) => {
      this.addCategoryListModalCloseBtn?.nativeElement.click();
      this.getByParentCategoryId(this.parentCategoryId, this.categoryIndex,this.modalCategoryName);
    });
  }
  }
 
  getAllMainCategory() {
    this.http.get("Categories/GetAllMainCategory", (res) => {
      this.parentCategories = res.categories
      this.parentList = []
      this.parentList.push(this.parentCategories)
    });
  }
  getByParentCategoryId(id: string, categoryIndex: number,categoryName:string) {
    this.modalCategoryName=categoryName
    this.categoryIndex = categoryIndex
    this.parentCategoryId = id;
    this.category.parentCategoryId = id
    this.parentList = this.parentList.slice(0, categoryIndex + 1)
    this.http.post("Categories/GetAllCategory", this.category, (res) => {
      this.parentCategories = res.categories
      this.parentList.push(this.parentCategories)
    });
  }
  createCategory(form: NgForm) {
    if (form.valid) {
      this.category.parentCategoryId = this.parentCategoryId
      this.http.post("Categories/CreateCategory", this.category, (res) => {
        this.addCategoryModalCloseBtn?.nativeElement.click();
        this.getByParentCategoryId(this.parentCategoryId, this.categoryIndex,this.modalCategoryName);
      });
    }
  }


  clearCreateCategoryListModel() {
    this.categoryNames=""
    this.categories = new CategoryListModel();
  }
  clearCreateCategoryModel() {
    this.category = new CategoryModel();
  }
  clearCreateMainCategoryModel() {
    this.category = new CategoryModel();
  }
}
