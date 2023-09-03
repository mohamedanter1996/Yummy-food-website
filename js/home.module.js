$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

export default class Home {
  constructor() {
    this.container = "";
  }

  async getItemsDataFromApi() {
    let allItemsData = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    let itemsData = await allItemsData.json();
    return itemsData.meals;
  }

  async setItemsDataToHome() {
    let itemsList = [...(await this.getItemsDataFromApi())];
    itemsList.forEach((item) => {
      this.container += `<div class="col-md-3">
                <div class="item position-relative rounded-2 overflow-hidden">
                <img src="${item.strMealThumb}" alt="${item.strMeal}" class="w-100">
                <div class="item-data position-absolute d-flex align-items-center">
                    <h3 class="position-absolute translate-middle-y ms-1">${item.strMeal}</h3>
                </div>
                </div>
            </div>`;
    });
    $("header .home-data .all-items").append(this.container);
  }
}
