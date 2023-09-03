$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

import CategoryPage from "./categoryPage.module.js";
import SearchPage from "./searchpage.module.js";

export default class AreaPage {
  constructor() {
    this.externalSearchPageClassModule = new SearchPage();
    this.externalCategoryPageClassModule = new CategoryPage();
  }

  async getCountriesFromApi() {
    let countriesAllData = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let countries = await countriesAllData.json();
    return countries.meals;
  }

  displayCountries(countriesArray) {
    let countriesContainer = "";
    countriesArray.forEach((country) => {
      countriesContainer += `<div class="col-md-3">
                <div class="country text-center text-white">
                    <div class="country-icon"><i class="fa-solid fa-house-laptop fa-4x"></i></div>
                    <h3>${country.strArea}</h3>
                </div>
            </div>`;
    });

    $(".area-page .area-page-data .area-items").html(countriesContainer);
  }

  async setMealsCountriesAreas() {
    let countriesArray = [...(await this.getCountriesFromApi())];
    this.displayCountries(countriesArray);
  }

  getCountryName(clickedTarget) {
    let countryName =
      clickedTarget.localName == "h3"
        ? $(clickedTarget).html()
        : clickedTarget.classList.contains(".country-icon")
        ? $(clickedTarget).next("h3").html()
        : clickedTarget.localName == "i"
        ? $(clickedTarget).parent(".country-icon").next().html()
        : $(clickedTarget).children("h3").html();
    return countryName;
  }

  async getMealsCountryFromApi(mealsCountryKey) {
    let mealsCountryAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealsCountryKey}`
    );
    let mealsCountry = await mealsCountryAllData.json();
    return mealsCountry.meals;
  }

  displayMealsCountry(mealsCountryArray) {
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
    $(".area-page .area-page-data .meals-area-list").html(
      mealsCountryContainer
    );
  }

  clickOnMealsCountry() {
    $(".area-page .area-page-data .area-items .col-md-3 .country").click(
      async (e) => {
        let mealsCountryList = await this.getMealsCountryFromApi(
          this.getCountryName(e.target)
        );
        console.log(mealsCountryList);
        $(".area-page .area-page-data .area-items").addClass("d-none");
        $(".area-page .area-page-data .meals-area-list").removeClass("d-none");
        this.displayMealsCountry(mealsCountryList);
      }
    );
  }

  clickOnMailCountryList() {
    $(".area-page .area-page-data .meals-area-list").click(async (e) => {
      let mealData =
        await this.externalSearchPageClassModule.getMealsSearchedFromApi(
          this.externalCategoryPageClassModule.getMealsCategoryName(e.target)
        );
      console.log(mealData[0]);
      $(".area-page").addClass("d-none").removeClass("d-block");
      $("header").addClass("d-block").removeClass("d-none");
      $("header .home-data .all-items").addClass("d-none");
      $("header .home-data .clicked-item").removeClass("d-none");
      this.externalSearchPageClassModule.displaySearchedMeal(mealData[0]);
    });
  }
}
