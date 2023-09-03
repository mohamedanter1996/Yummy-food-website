$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

import SearchPage from "./searchpage.module.js";

export default class CategoryPage {
  constructor() {
    this.externalClassModule = new SearchPage();
  }

  async getMealsCategoriesFromApi() {
    let mealsCategoriesAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let mealsCategories = await mealsCategoriesAllData.json();
    return mealsCategories.categories;
  }

  async setMealsCategories() {
    let mealsCategoriesContainer = "";
    let mealsCategoriesList = [...(await this.getMealsCategoriesFromApi())];
    mealsCategoriesList.forEach((mealsCategory) => {
      mealsCategoriesContainer += `<div class="col-md-3">
                <div class="item position-relative rounded-2 overflow-hidden">
                <img src="${mealsCategory.strCategoryThumb}" alt="${mealsCategory.strCategory}" class="w-100">
                <div class="item-data position-absolute d-flex flex-column justify-content-center">
                    <div class="text-center position-absolute heading-parag">
                      <h3>${mealsCategory.strCategory}</h3>
                    <p>${mealsCategory.strCategoryDescription}</p>
                    </div>
                   
                </div>
                </div>
            </div>`;
    });
    $(".categories-page .categories-page-data .category-items").html(
      mealsCategoriesContainer
    );
  }

  getMealsCategoryName(clickedtarget) {
    let MealsCategoryName =
      clickedtarget.localName == "h3"
        ? $(clickedtarget).html()
        : clickedtarget.localName == "p"
        ? $(clickedtarget).prev().html()
        : clickedtarget.localName == "div" &&
          clickedtarget.classList.contains(".item-data")
        ? $(clickedtarget).children()("div").children("h3").html()
        : $(clickedtarget).children("h3").html();
    return MealsCategoryName;
  }

  async getMealsCategoryFromApi(mealCategoryName) {
    let mealCategoryListAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategoryName}`
    );
    let mealCategoryList = await mealCategoryListAllData.json();
    return mealCategoryList.meals;
  }

  displayMealsCategoryList(mealsCategoryArray) {
    let mealsCategoryContainer = "";
    let mealsCategoryArrayLength =
      mealsCategoryArray.length >= 20 ? 20 : mealsCategoryArray.length;
    for (let i = 0; i < mealsCategoryArrayLength; i++) {
      mealsCategoryContainer += `<div class="col-md-3">
                <div class="item position-relative rounded-2 overflow-hidden">
                <img src="${mealsCategoryArray[i].strMealThumb}" alt="${mealsCategoryArray[i].strMeal}" class="w-100">
                <div class="item-data position-absolute d-flex align-items-center">
                    <h3 class="position-absolute translate-middle-y ms-1">${mealsCategoryArray[i].strMeal}</h3>
                </div>
                </div>
            </div>`;
    }

    $(".categories-page .categories-page-data .meals-category-list").html(
      mealsCategoryContainer
    );
  }

  setMealsCategory() {
    $(
      ".categories-page .categories-page-data .category-items .col-md-3 .item"
    ).click(async (e) => {
      console.log(e.target.localName);
      console.log(e.target.classList);
      this.getMealsCategoryName(e.target);
      console.log(this.getMealsCategoryName(e.target));
      let mealsCategoryList = await this.getMealsCategoryFromApi(
        this.getMealsCategoryName(e.target)
      );
      console.log(mealsCategoryList);
      $(".categories-page .categories-page-data .category-items").addClass(
        "d-none"
      );
      $(
        ".categories-page .categories-page-data .meals-category-list"
      ).removeClass("d-none");

      this.displayMealsCategoryList(mealsCategoryList);
    });
  }

  clickOnMealCategoryList() {
    $(".categories-page .categories-page-data .meals-category-list").click(
      async (e) => {
        let mealData = await this.externalClassModule.getMealsSearchedFromApi(
          this.getMealsCategoryName(e.target)
        );
        console.log(mealData[0]);
        $(".categories-page").addClass("d-none").removeClass("d-block");
        $("header").addClass("d-block").removeClass("d-none");
        $("header .home-data .all-items").addClass("d-none");
        $("header .home-data .clicked-item").removeClass("d-none");
        this.externalClassModule.displaySearchedMeal(mealData[0]);
      }
    );
  }
}
