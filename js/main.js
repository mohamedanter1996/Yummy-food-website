"use strict"
$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});


import AreaPage from "./areapage.module.js";
import CategoryPage from "./categoryPage.module.js";
import ContactPage from "./contactpage.module.js";
import Home from "./home.module.js";
import IngredientsPage from "./ingredients.module.js";
import ItemData from "./itemData.module.js";
import Nav from "./nav.module.js";
import SearchPage from "./searchpage.module.js";



let settingHome=new Home();
let clickedItem=new ItemData();
let nav=new Nav();
let settingSearchPage=new SearchPage();
let settingCategoryPage=new CategoryPage();
let settingAreaPage=new AreaPage();
let settingIngredientsPage=new IngredientsPage();
let settingContactPage=new ContactPage();
await settingHome.setItemsDataToHome();
await settingCategoryPage.setMealsCategories();
await settingAreaPage.setMealsCountriesAreas();
await settingIngredientsPage.setMealsIngredients();
 clickedItem.clickOnItem();
 nav.openNavSide();
 nav.closeNavSide();
 nav.clickOnSearchLink();
 nav.clickOnCategoryLink();
 nav.clickOnAreaLink();
 nav.clickOnContactLink();
 nav.clickOnIngredientsLink();
 settingSearchPage.searchByName();
 settingSearchPage.serchByFirstLetter();
 settingSearchPage.clickOnSearchedMeal();
settingCategoryPage.setMealsCategory();
settingCategoryPage.clickOnMealCategoryList();
settingAreaPage.clickOnMealsCountry();
settingAreaPage.clickOnMailCountryList();
settingIngredientsPage.clickOnMealsIngredient();
settingIngredientsPage.clickOnMealIngredient();
settingContactPage.validateUserData();