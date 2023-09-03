$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

export default class SearchPage {
  constructor() {
    this.nameValue = document.querySelector("#nameValue");
    this.firstLetterValue = document.querySelector("#firstLetterValue");
  }
  async getMealsSearchedFromApi(searchKey) {
    let mealsAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`
    );
    let mealsData = await mealsAllData.json();
    return mealsData.meals;
  }

  async getmealsSearchedFromApiFirstLetter(searchKey) {
    let mealsAllData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKey}`
    );
    let mealsData = await mealsAllData.json();
    return mealsData.meals;
  }

  searchByName() {
    this.nameValue.addEventListener("input", async (eventInfo) => {
      let mealsData = await this.getMealsSearchedFromApi(this.nameValue.value);
      console.log(mealsData);
      this.displaySearchedMeals(mealsData);
    });
  }
  displaySearchedMeals(searchedMealsArray) {
    let searchedItemContainer = "";
    searchedMealsArray.forEach((meal) => {
      searchedItemContainer += `<div class="col-md-3">
                <div class="item position-relative rounded-2 overflow-hidden">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
                <div class="item-data position-absolute d-flex align-items-center">
                    <h3 class="position-absolute translate-middle-y ms-1">${meal.strMeal}</h3>
                </div>
                </div>
            </div>`;
    });
    $(".search-page .search-page-data .row").html(searchedItemContainer);
  }

  serchByFirstLetter() {
    this.firstLetterValue.addEventListener("input", async () => {
      if (this.firstLetterValue.value != "") {
        let mealsData = await this.getmealsSearchedFromApiFirstLetter(
          this.firstLetterValue.value
        );
        console.log(mealsData);
        console.log(this.firstLetterValue.value);
        this.displaySearchedMeals(mealsData);
      } else {
        let mealsData = await this.getmealsSearchedFromApiFirstLetter("A");
        this.displaySearchedMeals(mealsData);
      }
    });
  }

  displaySearchedMeal(mealObject) {
    let commaCounterNext = 0;
    let commaCounterPrev = 0;
    let numberOfTags = "";
    let recipesContainer = "";
    let mealObjectData = new Map(Object.entries(mealObject));
    $("#clickedItemImg").attr("src", mealObjectData.get("strMealThumb"));
    $("#clickedItemName").html(mealObjectData.get("strMeal"));
    $("#clickedItemInstructions").html(mealObjectData.get("strInstructions"));
    $("#area").html(mealObjectData.get("strArea"));
    $("#category").html(mealObjectData.get("strCategory"));

    for (let i = 1; i <= 20; i++) {
      if (
        mealObjectData.get(`strMeasure${i}`) != "" &&
        mealObjectData.get(`strIngredient${i}`) != ""
      ) {
        console.log(
          mealObjectData.get(`strMeasure${i}`) +
            " " +
            mealObjectData.get(`strIngredient${i}`)
        );

        recipesContainer += `<li class="rounded-2 recipe-element-style">${
          mealObjectData.get(`strMeasure${i}`) +
          " " +
          mealObjectData.get(`strIngredient${i}`)
        }</li>`;
      }
    }
    $("#recipes").html(recipesContainer);

    if (mealObjectData.get("strTags") != null) {
      if (mealObjectData.get("strTags").indexOf(",", 0) > 0) {
        console.log(
          mealObjectData.get("strTags").indexOf(",", commaCounterPrev)
        );
        console.log(mealObjectData.get("strTags").length);
        console.log(commaCounterPrev);
        console.log(commaCounterNext);
        for (
          let i = commaCounterPrev;
          i < mealObjectData.get("strTags").indexOf(",", commaCounterPrev);
          i = commaCounterPrev
        ) {
          console.log(commaCounterPrev);
          numberOfTags = "";
          commaCounterNext = mealObjectData
            .get("strTags")
            .indexOf(",", commaCounterPrev);
          for (let j = commaCounterPrev; j < commaCounterNext; j++) {
            numberOfTags += mealObjectData.get("strTags")[j];
          }
          $("#tags").append(
            `<li class="tag-element-style rounded-2">${numberOfTags}</li>`
          );
          commaCounterPrev = commaCounterNext + 1;
          console.log(commaCounterNext);
          console.log(commaCounterPrev);
          console.log(
            mealObjectData.get("strTags").indexOf(",", commaCounterPrev + 1)
          );
          if (
            mealObjectData.get("strTags").indexOf(",", commaCounterPrev + 1) < 0
          ) {
            numberOfTags = "";
            for (
              let t = commaCounterPrev;
              t < mealObjectData.get("strTags").length;
              t++
            ) {
              numberOfTags += mealObjectData.get("strTags")[t];
            }
            console.log(numberOfTags);
            $("#tags").append(
              `<li class="tag-element-style rounded-2">${numberOfTags}</li>`
            );
            break;
          }
        }
      } else {
        $("#tags").append(
          `<li class="tag-element-style rounded-2">${mealObjectData.get(
            "strTags"
          )}</li>`
        );
      }
    } else {
      $("#tags").append("");
    }

    $("#source").attr("href", mealObjectData.get("strSource"));
    $("#youtube").attr("href", mealObjectData.get("strYoutube"));
  }

  clickOnSearchedMeal() {
    $(".search-page").click(async (e) => {
      let mealName = "";
      if (
        e.target.localName == "h3" ||
        e.target.firstElementChild.localName == "h3"
      ) {
        console.log("yes");
        mealName =
          e.target.localName == "h3"
            ? $(e.target).html()
            : $(e.target).children().html();

        console.log(mealName);
      }

      let mealData = await this.getMealsSearchedFromApi(mealName);
      console.log(mealData);
      console.log(mealData[0]);
      $(".search-page").addClass("d-none").removeClass("d-block");
      $("header").addClass("d-block").removeClass("d-none");
      $("header .home-data .all-items").addClass("d-none");
      $("header .home-data .clicked-item").removeClass("d-none");
      this.displaySearchedMeal(mealData[0]);
      this.firstLetterValue.value = "";
      this.nameValue.value = "";
      $(".search-page .search-page-data .searched-items-data").empty();
    });
  }
}
