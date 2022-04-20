var userId = '0';
$(document).ready(function () {
    LoadUsers();
});
function LoadUsers() {
    $('#loaderDiv').show();
    $.ajax({
        type: "POST",
        url: "/Users/LoadUsers",
        data: {},
        success: function (res) {
            $("#tbl_users").html(res);
            $("#tblUsersList").DataTable();
            jQuery('#loaderDiv').fadeOut(3000);
        },
        error: function (err) {
            swal("Something went wrong", err, "error");
            jQuery('#loaderDiv').fadeOut(1000);
        }
    });
}
function chkEmail() {
    var username = $("#txtEmail").val();
    $.ajax({
        type: "GET",
        url: "/Users/chkUser",
        data: {
            username: username
        },
        success: function (res) {
            if (res == "false") {
                swal("Email Already Exsist Try Another One", "", "error");
                $("#txtEmail").val('');
            }
            else {
                swal("You Can Register With This Email", "", "success");
            }

        },
        error: function (err) {
        }
    });
}
function AddUserClick() {
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $("#txtEmail").prop('disabled', false);
    $("#txtFirstName").val('');
    $("#txtLastName").val('');
    $("#txtEmail").val('');

}
function SaveUser() {
    var FirstName = $("#txtFirstName").val();
    var LastName = $("#txtLastName").val();
    var Email = $("#txtEmail").val();
    var Role = $("#ddlRoleAdd").val();
    if (FirstName == '') {
        swal("Enter First Name", "", "error");
        return;
    }
    if (LastName == '') {
        swal("Enter Last Name", "", "error");
        return;
    }
    if (Email == '') {
        swal("Enter Email", "", "error");
        return;
    }
    if (Role == '') {
        swal("Select User Type", "", "error");
        return;
    }
    $('#loaderDiv').show();
    $.ajax({
        type: "POST",
        url: "/Users/CreateUser",
        data: {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Role: Role
        },
        success: function (res) {
            if (res == "true") {
                swal("Record Added Successfully", "", "success");
            }
            else if (res == "false") {
                swal("Something Went Wrong", "error", "error");
            }
            $("#txtFirstName").val('');
            $("#txtLastName").val('');
            $("#txtEmail").val('');
            $("#ddlRoleAdd").val('');
            $("#modalAdd").modal("hide");
            jQuery('#loaderDiv').fadeOut(1000);
            LoadUsers();
        },
        error: function (err) {
            jQuery('#loaderDiv').fadeOut(1000);
            swal("Something Went Wrong", err, "error");
        }
    });
}
function Delete(Id) {
    $.ajax({
        type: "POST",
        url: "/Users/DeleteConfirmed",
        data: { id: Id },
        type: 'POST',
        success: function (res) {
            if (res == "true") {
                swal("Record Deleted Successfully", "", "error");
            }
            else if (res == "false") {
                swal("Something Went Wrong", "error", "error");
            }
            LoadUsers();
        },
        error: function (err) {
            swal("Something Went Wrong", err, "error");
        }
    });

}
function Edit(Id) {
    $('#btnAdd').hide();
    $('#btnUpdate').show();
    $("#txtEmail").prop('disabled', true);
    $.ajax({
        type: "GET",
        url: "/Users/Edit",
        data: {
            id: Id
        },
        success: function (res) {
            userId = res["id"];
            var FirstName = res["FirstName"];
            var LastName = res["LastName"];
            var Email = res["Email"];
            var Role = res["Role"];
            $("#txtFirstName").val(FirstName);
            $("#txtLastName").val(LastName);
            $("#txtEmail").val(Email);
            $("#ddlRoleAdd").val(Role);
            $("#modalAdd").modal("show");
        },
        error: function (err) {

        }
    });
    $.ajax({
        url: '@Url.Action("Edit", "Users")',
        dataType: 'html',
        async: false,
        data: { id: Id },
        type: 'GET',
        success: function (content) {
            $('.js-example-basic-multiple').select2({
                closeOnSelect: false
            });
            $("#partialContent").html(content);
            $("#modalEditUser").modal("show");
        }
    });
}
function UpdateUserProfile() {
    var FirstName = $("#txtFirstName").val();
    var LastName = $("#txtLastName").val();
    var Role = $("#ddlRoleAdd").val();
    if (FirstName == '') {
        swal("Enter First Name", "", "error");
        return;
    }
    if (LastName == '') {
        swal("Enter Last Name", "", "error");
        return;
    }
    if (Role == '') {
        swal("Select User Type", "", "error");
        return;
    }
    $('#loaderDiv').show();
    $.ajax({
        type: "POST",
        url: "/Users/UpdateUser",
        data: {
            userId: userId,
            FirstName: FirstName,
            LastName: LastName,
            Role: Role
        },
        success: function (res) {
            if (res == "true") {
                swal("Record Added Successfully", "", "success");
            }
            else if (res == "false") {
                swal("Something Went Wrong", "error", "error");
            }
            $("#txtFirstName").val('');
            $("#txtLastName").val('');
            $("#txtEmail").val('');
            $("#ddlRoleAdd").val('');
            $("#modalAdd").modal("hide");
            jQuery('#loaderDiv').fadeOut(1000);
            LoadUsers();
        },
        error: function (err) {
            jQuery('#loaderDiv').fadeOut(1000);
            swal("Something Went Wrong", err, "error");
        }
    });
}
function SendPassword(FName, LName, Email, Password) {
    $.ajax({
        url: "/Users/SendPassword",
        async: false,
        data: {
            FName: FName,
            LName: LName,
            Email: Email,
            Password: Password
        },
        type: 'POST',
        success: function (res) {
            swal("Alert", res, "warning");
        }
    });
}