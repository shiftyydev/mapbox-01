// Login Form Validations

$("#LoginForm").validate({
    rules: {
        email: {
            required: true,
        },
        password: {
            required: true,
        },
    },
    messages: {
        email: {
            required: "Please enter email address",
        },
        password: {
            required: "Please enter password",
        },
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        // Add the `help-block` class to the error element
        error.addClass("help-block");

        // Add `has-feedback` class to the parent div.form-group
        // in order to add icons to inputs
        element.parents(".col-sm-5").addClass("has-feedback");

        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }

        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if (!element.next("span")[0]) {
            $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
        }
    },
    success: function (label, element) {
        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if (!$(element).next("span")[0]) {
            $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
    }
});


$('#LoginBtn').click(function () {
    if ($("#LoginForm").valid()) {
        window.location.href = 'dashboard2.html';
    }
});

// Login Form Validations



// Register Form Validations

$("#RegisterForm").validate({
    rules: {
        username: {
            required: true,
        },
        email: {
            required: true,
        },
        password: {
            required: true,
        },
    },
    messages: {
        username: {
            required: "Please enter username",
        },
        email: {
            required: "Please enter email address",
        },
        password: {
            required: "Please enter password",
        },
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        // Add the `help-block` class to the error element
        error.addClass("help-block");

        // Add `has-feedback` class to the parent div.form-group
        // in order to add icons to inputs
        element.parents(".col-sm-5").addClass("has-feedback");

        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }

        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if (!element.next("span")[0]) {
            $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
        }
    },
    success: function (label, element) {
        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if (!$(element).next("span")[0]) {
            $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
    }
});


$('#RegisterFormBtn').click(function () {
    if ($("#RegisterForm").valid()) {
        window.location.href = 'dashboard2.html';
    }
});

// Register Form Validations