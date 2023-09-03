$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

import CategoryPage from "./categoryPage.module.js";
import SearchPage from "./searchpage.module.js";

export default class IngredientsPage {
  constructor() {
    this.externalSearchPageClassModule = new SearchPage();
    this.externalCategoryPageClassModule = new CategoryPage();
  }
  async getMealsIngredientsFromApi() {
    let getMealsIngredientsAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let getMealsIngredients = await getMealsIngredientsAllData.json();
    return getMealsIngredients.meals;
  }

  displayMealsIngredients(MealsIngredientsArray) {
    let MealsIngredientsContainer = "";
    for (let i = 0; i < 20; i++) {
      MealsIngredientsContainer += `<div class="col-md-3">
                <div class="ingredient text-center text-white">
                    <div class="ingredient-icon"><i class="fa-solid fa-drumstick-bite fa-4x"></i></div>
                    <h3>${MealsIngredientsArray[i].strIngredient}</h3>
                    <p>${MealsIngredientsArray[i].strDescription.slice(
                      0,
                      85
                    )}</p>
                </div>
            </div>`;
    }

    $(".ingredients-page .ingredients-page-data .ingredients-items").html(
      MealsIngredientsContainer
    );
  }

  async setMealsIngredients() {
    let mealsIngredientsArray = [...(await this.getMealsIngredientsFromApi())];
    this.displayMealsIngredients(mealsIngredientsArray);
  }

  getMealsIngredientName(clickedTarget) {
    let mealsIngredientName =
      clickedTarget.localName == "h3"
        ? $(clickedTarget).html()
        : clickedTarget.classList.contains(".country-icon")
        ? $(clickedTarget).next("h3").html()
        : clickedTarget.localName == "i"
        ? $(clickedTarget).parent(".country-icon").next().html()
        : clickedTarget.localName == "p"
        ? $(clickedTarget).prev("h3").html()
        : $(clickedTarget).children("h3").html();
    return mealsIngredientName;
  }

  async getMealsIngredientFromApai(getMealsIngredientKey) {
    let mealsIngredientAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${getMealsIngredientKey}`
    );
    let mealsIngredient = await mealsIngredientAllData.json();
    return mealsIngredient.meals;
  }

  displaymealsIngredient(mealsCountryArray) {
    let mealsCountryContainer = "";
    let mealsCountryArrayLength =
      mealsCountryArray.length > 20 ? 20 : mealsCountryArray.length;
    for (let i = 0; i < mealsCountryArrayLength; i++) {
      mealsCountryContainer += `<div class="col-md-3">
                <div class="item position-relative rounded-2 overflow-hidden">
                <img src="${mealsCountryArray[i].strMealThumb}" alt="${mealsCountryArray[i].strMeal}" class="w-100">
                <div class="item-data position-absolute d-flex align-items-center">
                    <h3 class="position-absolute translate-middle-y ms-1">${mealsCountryArray[i].strMeal}</h3>
                </div>
                </div>
            </div>`;
    }
    $(".ingredients-page .ingredients-page-data .meals-ingredients-list").html(
      mealsCountryContainer
    );
  }

  clickOnMealsIngredient() {
    $(
      ".ingredients-page .ingredients-page-data .ingredients-items .col-md-3 .ingredient"
    ).click(async (e) => {
      let mealsIngredientList = await this.getMealsIngredientFromApai(
        this.getMealsIngredientName(e.target)
      );
      $(".ingredients-page .ingredients-page-data .ingredients-items").addClass(
        "d-none"
      );
      $(
        ".ingredients-page .ingredients-page-data .meals-ingredients-list"
      ).removeClass("d-none");
      this.displaymealsIngredient(mealsIngredientList);
    });
  }

  clickOnMealIngredient() {
    $(".ingredients-page .ingredients-page-data .meals-ingredients-list").click(
      async (e) => {
        let mealData =
          await this.externalSearchPageClassModule.getMealsSearchedFromApi(
            this.externalCategoryPageClassModule.getMealsCategoryName(e.target)
          );
        console.log(mealData[0]);
        $(".ingredients-page").addClass("d-none").removeClass("d-block");
        $("header").addClass("d-block").removeClass("d-none");
        $("header .home-data .all-items").addClass("d-none");
        $("header .home-data .clicked-item").removeClass("d-none");
        this.externalSearchPageClassModule.displaySearchedMeal(mealData[0]);
      }
    );
  }
}
