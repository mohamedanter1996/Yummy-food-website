$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

export default class ItemData {
  constructor() {
    this.itemData = "";
    this.itemDetailsData = "";
    this.recipesContainer = "";
    this.itemListData = "";
    this.tag = "";
    this.commaCounterPrev = 0;
    this.commaCounterNext = 0;
    this.commaNumber = 0;
    this.numberOfTags = "";
  }
  clickOnItem() {
    $("header .home-data .row .col-md-3 .item").click(async (e) => {
      console.log(e.target.localName);
      e.target.localName == "h3"
        ? (this.itemData = $(e.target).html())
        : (this.itemData = $(e.target).children().html());
      let itemAllData = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.itemData}`
      );
      this.itemDetailsData = await itemAllData.json();
      console.log(this.itemDetailsData.meals[0]);

      $("header .home-data .all-items").addClass("d-none");
      $("header .home-data .clicked-item").removeClass("d-none");

      this.itemListData = new Map(
        Object.entries(this.itemDetailsData.meals[0])
      );
      $("#clickedItemImg").attr("src", this.itemListData.get("strMealThumb"));
      $("#clickedItemName").html(this.itemListData.get("strMeal"));
      $("#clickedItemInstructions").html(
        this.itemListData.get("strInstructions")
      );
      $("#area").html(this.itemListData.get("strArea"));
      $("#category").html(this.itemListData.get("strCategory"));
      for (let i = 1; i <= 20; i++) {
        if (
          this.itemListData.get(`strMeasure${i}`) != "" &&
          this.itemListData.get(`strIngredient${i}`) != ""
        ) {
          console.log(
            this.itemListData.get(`strMeasure${i}`) +
              " " +
              this.itemListData.get(`strIngredient${i}`)
          );

          this.recipesContainer += `<li class="rounded-2 recipe-element-style">${
            this.itemListData.get(`strMeasure${i}`) +
            " " +
            this.itemListData.get(`strIngredient${i}`)
          }</li>`;
        }
      }
      $("#recipes").html(this.recipesContainer);

      if (this.itemListData.get("strTags") != null) {
        if (this.itemListData.get("strTags").indexOf(",", 0) > 0) {
          console.log(
            this.itemListData.get("strTags").indexOf(",", this.commaCounterPrev)
          );
          console.log(this.itemListData.get("strTags").length);
          console.log(this.commaCounterPrev);
          console.log(this.commaCounterNext);
          for (
            let i = this.commaCounterPrev;
            i <
            this.itemListData
              .get("strTags")
              .indexOf(",", this.commaCounterPrev);
            i = this.commaCounterPrev
          ) {
            console.log(this.commaCounterPrev);
            this.numberOfTags = "";
            this.commaCounterNext = this.itemListData
              .get("strTags")
              .indexOf(",", this.commaCounterPrev);
            for (
              let j = this.commaCounterPrev;
              j < this.commaCounterNext;
              j++
            ) {
              this.numberOfTags += this.itemListData.get("strTags")[j];
            }
            $("#tags").append(
              `<li class="tag-element-style rounded-2">${this.numberOfTags}</li>`
            );
            this.commaCounterPrev = this.commaCounterNext + 1;
            console.log(this.commaCounterNext);
            console.log(this.commaCounterPrev);
            console.log(
              this.itemListData
                .get("strTags")
                .indexOf(",", this.commaCounterPrev + 1)
            );
            if (
              this.itemListData
                .get("strTags")
                .indexOf(",", this.commaCounterPrev + 1) < 0
            ) {
              this.numberOfTags = "";
              for (
                let t = this.commaCounterPrev;
                t < this.itemListData.get("strTags").length;
                t++
              ) {
                this.numberOfTags += this.itemListData.get("strTags")[t];
              }
              console.log(this.numberOfTags);
              $("#tags").append(
                `<li class="tag-element-style rounded-2">${this.numberOfTags}</li>`
              );
              break;
            }
          }
        } else {
          $("#tags").append(
            `<li class="tag-element-style rounded-2">${this.itemListData.get(
              "strTags"
            )}</li>`
          );
        }
      } else {
        $("#tags").append("");
      }

      $("#source").attr("href", this.itemListData.get("strSource"));
      $("#youtube").attr("href", this.itemListData.get("strYoutube"));
    });
  }
}
