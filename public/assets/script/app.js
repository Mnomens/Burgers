$(function() {
    $(".eat-burger").on("click", function(event) {
        const id = $(this).data("id");
        const newDevoured = $(this).data("devouredstate");

        const newDevouredState = {
            devoured: newDevoured
        };
        console.log(id)

        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function() {
              location.reload();
            }
        );
        $(".box").empty();
    });

    $("#submit").on("click", function(event) {
        event.preventDefault();

        const newBurger = {
            burger_name: $("#burg").val().trim(),
            devoured: 0
        };

        $.ajax("api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function(results) {
                console.log("added")
                location.reload();
            }
        );
    });
});