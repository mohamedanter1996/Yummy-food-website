$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
  });
});

export default class ContactPage {
  constructor() {
    this.userData = document.querySelectorAll(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 input"
    );
  }

  validateUserData() {
    for (let i = 0; i < this.userData.length; i++) {
      this.userData[i].addEventListener("input", (e) => {
        this.submitContactForm(
          this.validateUserName(),
          this.validateUserEmail(),
          this.validateUserPhone(),
          this.validateUserAge(),
          this.validateUserPassword(),
          this.validateUserRepassword()
        );
      });
    }
  }

  validateUserName() {
    let userName = $(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userName"
    ).val();
    let regex = /^[a-zA-Z\s]+$/;
    if (regex.test(userName)) {
      console.log("nameTrue");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #nameAlert"
      ).addClass("d-none");

      return regex.test(userName);
    } else {
      console.log("namefalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #nameAlert"
      ).removeClass("d-none");
      return regex.test(userName);
    }
  }

  validateUserEmail() {
    let userEmail = $(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userEmail"
    ).val();
    let regex = /^([\w]*[\w\.]*(?!\.)@(gmail|yahoo|hotmail).com)$/;
    if (regex.test(userEmail)) {
      console.log("emailTrue");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #emailAlert"
      ).addClass("d-none");
      return regex.test(userEmail);
    } else {
      console.log("emailfalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #emailAlert"
      ).removeClass("d-none");
      return regex.test(userEmail);
    }
  }

  validateUserPhone() {
    let userPhone = $(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userPhone"
    ).val();
    let regex = /^(\+2){0,1}01[0125][0-9]{8}$/;
    if (regex.test(userPhone)) {
      console.log("phoneTrue");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #phoneAlert"
      ).addClass("d-none");
      return regex.test(userPhone);
    } else {
      console.log("phonefalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #phoneAlert"
      ).removeClass("d-none");
      return regex.test(userPhone);
    }
  }

  validateUserAge() {
    let userAge = $(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userAge"
    ).val();
    let regex = /^[0-9]{0,3}$/;
    if (regex.test(userAge)) {
      console.log("ageTrue");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #ageAlert"
      ).addClass("d-none");
      return regex.test(userAge);
    } else {
      console.log("agefalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #ageAlert"
      ).removeClass("d-none");
      return regex.test(userAge);
    }
  }

  validateUserPassword() {
    let userPassword = $(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userPassword"
    ).val();
    let regex = /^[a-zA-Z0-9!@#$_.]{6,16}$/;
    if (regex.test(userPassword)) {
      console.log("passwordTrue");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #passwordAlert"
      ).addClass("d-none");
      return regex.test(userPassword);
    } else {
      console.log("passwordfalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #passwordAlert"
      ).removeClass("d-none");
      return regex.test(userPassword);
    }
  }

  validateUserRepassword() {
    let userRepassword = $(
      ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userRepassword"
    ).val();
    let regex = /^[a-zA-Z0-9!@#$_.]{6,16}$/;
    if (
      regex.test(userRepassword) &&
      userRepassword ==
        $(
          ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #userPassword"
        ).val()
    ) {
      console.log("repasswordTrue");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #repasswordAlert"
      ).addClass("d-none");
      return regex.test(userRepassword);
    } else {
      console.log("repasswordfalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row .col-md-6 #repasswordAlert"
      ).removeClass("d-none");
      return regex.test(userRepassword);
    }
  }

  submitContactForm(
    userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRepassword
  ) {
    if (
      userName &&
      userEmail &&
      userPhone &&
      userAge &&
      userPassword &&
      userRepassword &&
      $("#userRepassword").val() == $("#userPassword").val() &&
      $("#userAge").val() != ""
    ) {
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row button"
      ).removeAttr("disabled");
      console.log("submitTrue");
    } else {
      console.log("submitFalse");
      $(
        ".contact-page .contact-data .contact-data-details .contact-data-details-scope .contact-data-details-scope-inputs .row button"
      ).attr("disabled", "disabled");
    }
  }
}
