import "../css/_tryit.pcss";

import flasher from "@flasher/flasher";

const messages = {
    success: [
        "Success!",
        "Operation completed successfully.",
        "Task completed successfully.",
        "Your request was processed successfully.",
        "The operation was successful.",
        "Great success!",
        "The action was completed successfully.",
        "Your submission has been received successfully.",
        "The process was completed successfully.",
        "The operation completed successfully.",
    ],
    error: [
        "Error!",
        "An error occurred.",
        "There was a problem processing your request.",
        "Something went wrong.",
        "The operation failed.",
        "Sorry, something went wrong.",
        "Oops, something went wrong.",
        "An error has occurred.",
        "We're sorry, but an error occurred.",
        "An unexpected error occurred.",
    ],
    warning: [
        "Warning: This cannot be undone.",
        "Caution: May have unintended consequences.",
        "Exercise caution when performing this action.",
        "This may have unintended consequences. Proceed with caution.",
        "Warning: This may be irreversible.",
        "Caution: May have unintended results.",
        "Warning: Proceed with caution.",
    ],
    info: [
        "Heads up: This may take a while.",
        "This may take some time. Please be patient.",
        "This may take a while. Do not refresh the page.",
        "Heads up: This may take a while. Be patient.",
        "This may take some time. Do not refresh the page.",
    ],
};

function getRandomMessageByType(type) {
    const messagesByType = messages[type];
    const random = Math.floor(Math.random() * messagesByType.length);

    return messagesByType[random];
}

function getRandomType() {
    const types = Object.keys(messages);
    const random = Math.floor(Math.random() * types.length);

    return types[random];
}

function getRandomMessage() {
    const type = getRandomType();

    return getRandomMessageByType(type);
}

const examples = {
    "# success": function () {
        flasher.success(getRandomMessageByType("success"));
    },
    "# error": function () {
        flasher.error(getRandomMessageByType("error"));
    },
    "# warning": function () {
        flasher.warning(getRandomMessageByType("warning"));
    },
    "# info": function () {
        flasher.info(getRandomMessageByType("info"));
    },
};

const codeBlocks = document.querySelectorAll("pre > code");

codeBlocks.forEach(function (codeBlock) {
    const code = codeBlock.innerText.trim();
    if (!code.startsWith("#")) {
        return;
    }

    const button = document.createElement("button");
    button.classList.add("tryit", "text-indigo-500");
    button.type = "button";
    button.ariaLabel = "Try it!";

    const icon = '<i class="fa-duotone fa-play"></i>';
    button.innerHTML = icon;

    const parent = codeBlock.parentElement;
    parent.classList.add("tryable");

    parent.append(button);

    button.addEventListener("click", function () {
        button.innerHTML = '<i class="fa-duotone fa-spinner-third spin"></i>';

        const example = code.split("\n")[0].trim();

        try {
            examples[example]();
        } catch (error) {
            console.log(`${example} example doest not exist`);
        }

        setTimeout(function () {
            button.innerHTML = icon;
        }, 500);
    });
});
