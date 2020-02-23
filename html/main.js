/* global send */

const cardColors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown",
    "grey",
    "black"
];

const messageKindCommand = "command";
const messageOperationWrite = "write";
const messageOperationDelete = "delete";

let cardsParent = $("#cards-parent");
let modalUi = $(".ui.modal.add-command-modal");
let modalForm = $(".ui.modal.add-command-modal #form-modal");

$(".ui.card").hover(
    function () {
        $(this).addClass("raised");
    }, function () {
        $(this).removeClass("raised");
    }
);

$(".ui.transparent.fluid.input").focusin(
    function () {
        $(this).children("div").show(100);
    }
).focusout(
    function () {
        $(this).children("div").hide(100);
    }
);

$(".sortable").sortable({
    placeholder: "card"
});

$(".add-command").click(function () {
    $(".ui.modal.add-command-modal").modal("show");
});

function submitModalNewCommand(title, description, command, output) {
    // Create new ui card
    let newcard = "\n" +
        "                        <div class=\"ui " + cardColors[Math.floor(Math.random() * cardColors.length)] + " card\">\n" +
        "                            <div class=\"content\">\n" +
        "                                <div class=\"header\">\n" +
        "                                    <div class=\"ui transparent fluid input header\">\n" +
        "                                        <input type=\"text\" placeholder=\"Title ...\" value=\"" + title + "\">\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"meta\">\n" +
        "                                    <div class=\"ui transparent fluid input meta\">\n" +
        "                                        <input type=\"text\" placeholder=\"Desription ...\" value=\"" + description + "\">\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"extra content\">\n" +
        "                                <div class=\"description\">\n" +
        "                                    <div class=\"ui transparent fluid input\">\n" +
        "                                        <input type=\"text\" placeholder=\"Your command ...\" value=\"" + command + "\">\n" +
        "                                        <div class=\"ui left pointing label olive\" style=\"display: none\">Keep it short\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"extra content\">\n" +
        "                                <div class=\"description\">\n" +
        "                                    <div class=\"ui transparent fluid input\">\n" +
        "                                        <input type=\"text\" placeholder=\"Output text ...\" value=\"" + output + "\">\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"extra content\">\n" +
        "                                <div class=\"ui two buttons\">\n" +
        "                                    <div class=\"ui basic grey button disable\">Disable</div>\n" +
        "                                    <div class=\"ui basic red button delete\">Delete</div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>";

    let existingDiv = $("#cards-parent > div").last();
    if (existingDiv.length) {
        existingDiv.after(newcard);
    } else {
        cardsParent.append(newcard);
    }

    if (modalUi.modal("is active")) {
        modalUi.modal("hide");
    }
}

modalUi.modal("setting", "transition", "horizontal flip").modal({
    closable: true,
    onApprove() {
        return false;
    },
    onShow() {
        modalForm.form("clear");
    }
});

function sendCommand(kind, operation, data) {
    let obj = {
        kind,
        operation,
        data
    };

    send(obj);
}

function sendNewCommand(title, description, command, output) {
    let data = JSON.stringify({
        title,
        description,
        command,
        output
    });

    sendCommand(messageKindCommand, messageOperationWrite, data);
}

function sendDeleteCommand(title) {
    sendCommand(messageKindCommand, messageOperationDelete, title);
}

cardsParent.on("click", ".delete", function () {
    sendDeleteCommand($(this).parents(".ui.card").find(".header input").val());
    $(this).parents(".ui.card").remove();
});

function validateModal(form) {
    // If title empty, return false
    let inputTitle = form.find("input[name ='title']").val();
    if (inputTitle === "") {
        form.focus();
        return false;
    }

    // Else call methods below
    let inputDescription = form.find("input[name ='description']").val();
    let inputCommand = form.find("input[name ='command']").val();
    let inputOutput = form.find("input[name ='output']").val();

    sendNewCommand(inputTitle, inputDescription, inputCommand, inputOutput);
    submitModalNewCommand(inputTitle, inputDescription, inputCommand, inputOutput);
}

$("#form-modal").submit(function () {
    validateModal($(this));

    return false;
});

modalUi.find(".ok").click(function () {
    validateModal(modalForm);
});

modalForm.form({
    on: "blur",
    inline: false,
    fields: {
        title: {
            identifier: "title",
            rules: [{
                type: "empty",
                prompt: "Please enter a title"
            }]
        }
    }
});

