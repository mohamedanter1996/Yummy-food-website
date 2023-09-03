$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

export default class Nav {
  constructor() {
    $("nav").css({
      left: `${-$("nav .nav-data").innerWidth()}px`,
      width: `${
        $("nav .nav-data").innerWidth() + $("nav .nav-setting").innerWidth()
      }px`,
    });
  }

  closeNav() {
    $("nav .nav-data .nav-links ul li").addClass("animate__fadeOutDown");
    $("nav .nav-data .nav-links ul li").removeClass("animate__fadeInUp");

    $("nav").animate({ left: `${-$("nav .nav-data").innerWidth()}px` }, 1000);
    $("nav .nav-setting .nav-open-close .nav-open").removeClass("d-none");
    $("nav .nav-setting .nav-open-close .nav-close").addClass("d-none");
  }

  openNavSide() {
    $("nav .nav-setting .nav-open-close .nav-open").click(function (e) {
      $("nav").animate({ left: "0px" }, 500);

      $("nav .nav-data .nav-links ul li").addClass("animate__fadeInUp");
      $("nav .nav-data .nav-links ul li").removeClass("animate__fadeOutDown");
      $("nav .nav-setting .nav-open-close .nav-open").addClass("d-none");
      $("nav .nav-setting .nav-open-close .nav-close").removeClass("d-none");
    });
  }

  closeNavSide() {
    $("nav .nav-setting .nav-open-close .nav-close").click((e) => {
      this.closeNav();
    });
  }

  clickOnSearchLink() {
    $(".Search a").click((e) => {
      e.preventDefault();
      console.log($(e.target));
      $(".search-page").removeClass("d-none").addClass("d-block");
      $("header").removeClass("d-block").addClass("d-none");
      $("section")
        .not(".search-page")
        .removeClass("d-block")
        .addClass("d-none");
      this.closeNav();
    });
  }

  clickOnCategoryLink() {
    $(".Categories a").click((e) => {
      e.preventDefault();
      console.log($(e.target));
      $(".categories-page").removeClass("d-none").addClass("d-block");
      $("header").removeClass("d-block").addClass("d-none");
      $(".categories-page .categories-page-data .category-items").removeClass(
        "d-none"
      );
      $(".categories-page .categories-page-data .meals-category-list").addClass(
        "d-none"
      );
      $("section")
        .not(".categories-page")
        .removeClass("d-block")
        .addClass("d-none");
      this.closeNav();
    });
  }

  clickOnAreaLink() {
    $(".Area a").click((e) => {
      e.preventDefault();
      console.log($(e.target));
      $(".area-page").removeClass("d-none").addClass("d-block");
      $("header").removeClass("d-block").addClass("d-none");
      $(".area-page .area-page-data .area-items").removeClass("d-none");
      $(".area-page .area-page-data .meals-area-list").addClass("d-none");
      $("section").not(".area-page").removeClass("d-block").addClass("d-none");
      this.closeNav();
    });
  }

  clickOnIngredientsLink() {
    $(".Ingredients a").click((e) => {
      e.preventDefault();
      console.log($(e.target));
      $(".ingredients-page").removeClass("d-none").addClass("d-block");
      $("header").removeClass("d-block").addClass("d-none");
      $(
        ".ingredients-page .ingredients-page-data .ingredients-items"
      ).removeClass("d-none");
      $(
        ".ingredients-page .ingredients-page-data .meals-ingredients-list"
      ).addClass("d-none");
      $("section")
        .not(".ingredients-page")
        .removeClass("d-block")
        .addClass("d-none");
      this.closeNav();
    });
  }

  clickOnContactLink() {
    $(".Contact a").click((e) => {
      e.preventDefault();
      console.log($(e.target));
      $(".contact-page").removeClass("d-none").addClass("d-block");
      $("header").removeClass("d-block").addClass("d-none");
      $(
        ".ingredients-page .ingredients-page-data .ingredients-items"
      ).removeClass("d-none");
      $(
        ".ingredients-page .ingredients-page-data .meals-ingredients-list"
      ).addClass("d-none");
      $("section")
        .not(".contact-page")
        .removeClass("d-block")
        .addClass("d-none");
      this.closeNav();
    });
  }
}
