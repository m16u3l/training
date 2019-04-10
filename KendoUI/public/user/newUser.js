$(document).ready(function () {
    var data = [
        "12 Angry Men",
        "Il buono, il brutto, il cattivo.",
        "Inception",
        "One Flew Over the Cuckoo's Nest",
        "Pulp Fiction",
        "Schindler's List",
        "The Dark Knight",
        "The Godfather",
        "The Godfather: Part II",
        "The Shawshank Redemption"
    ];

    $("#search").kendoAutoComplete({
        dataSource: data,
        separator: ", "
    });

    $("#time").kendoDropDownList({
        optionLabel: "--Start time--"
    });

    $("#amount").kendoNumericTextBox();

    $("#date").kendoDateInput();

    var validator = $("#ticketsForm").kendoValidator().data("kendoValidator"),
        status = $(".status");

    $("form").submit(function (event) {
        console.log(event)
        event.preventDefault();
        if (validator.validate()) {
            status.text("Hooray! Your tickets has been booked!")
                .removeClass("invalid")
                .addClass("valid");
        } else {
            status.text("Oops! There is invalid data in the form.")
                .removeClass("valid")
                .addClass("invalid");
        }
    });

    $("#datepicker").kendoDatePicker({
        value: new Date(),
        dateInput: true
    });
});