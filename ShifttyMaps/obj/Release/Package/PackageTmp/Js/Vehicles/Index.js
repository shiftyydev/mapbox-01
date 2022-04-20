$(document).ready(function () {
    LoadVehicles();
});
function LoadVehicles() {
    $('#loaderDiv').show();
    $.ajax({
        type: "POST",
        url: "/Vehicle/LoadVehicles",
        data: {
        },
        success: function (res) {
            $("#loadVehicles").html(res);
            $("#tbl_Vehicles").DataTable();
            jQuery('#loaderDiv').fadeOut(3000);
        },
        error: function (err) {
            swal("Something went wrong", err, "error");
            jQuery('#loaderDiv').fadeOut(1000);
        }
    });
}
function AddVehicles() {
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $("#txtName").val('');
    $("#txtVehicleId").val('');

}
function SaveVehicle() {
    var Name = $("#txtName").val();
    var VehicleId = $("#txtVehicleId").val();
    if (Name == '') {
        swal("Enter Name", "", "error");
        return;
    }
    if (VehicleId == '') {
        swal("Enter Vehicle Id", "", "error");
        return;
    }
    $('#loaderDiv').show();
    $.ajax({
        type: "POST",
        url: "/Vehicle/CreateVehicle",
        data: {
            Name: Name,
            VehicleId: VehicleId
        },
        success: function (res) {
            if (res == "true") {
                swal("Record Added Successfully", "", "success");
            }
            else if (res == "false") {
                swal("Something Went Wrong", "error", "error");
            }
            $("#txtName").val('');
            $("#txtVehicleId").val('');
            $("#staticBackdrop").modal("hide");
            jQuery('#loaderDiv').fadeOut(1000);
            LoadVehicles();
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
        url: "/Vehicle/DeleteVehicle",
        data: { id: Id },
        type: 'POST',
        success: function (res) {
            if (res == "true") {
                swal("Record Deleted Successfully", "", "error");
            }
            else if (res == "false") {
                swal("Something Went Wrong", "error", "error");
            }
            LoadVehicles();
        },
        error: function (err) {
            swal("Something Went Wrong", err, "error");
        }
    });

}
var editId = '0';
function Edit(Id) {
    $('#btnAdd').hide();
    $('#btnUpdate').show();
    $.ajax({
        type: "GET",
        url: "/Vehicle/Edit",
        data: {
            id: Id
        },
        success: function (res) {
            editId = Id;
            var name = res["name"];
            var vehicle_id = res["vehicle_id"];
            $("#txtName").val(name);
            $("#txtVehicleId").val(vehicle_id);
            $("#staticBackdrop").modal("show");
        },
        error: function (err) {

        }
    });
}
function UpdateVehicle() {
    var Name = $("#txtName").val();
    var VehicleId = $("#txtVehicleId").val();
    if (Name == '') {
        swal("Enter Name", "", "error");
        return;
    }
    if (VehicleId == '') {
        swal("Enter Vehicle Id", "", "error");
        return;
    }
    $('#loaderDiv').show();
    $.ajax({
        type: "POST",
        url: "/Vehicle/UpdateVehicle",
        data: {
            editId: editId,
            Name: Name,
            VehicleId: VehicleId
        },
        success: function (res) {
            if (res == "true") {
                swal("Record Added Successfully", "", "success");
            }
            else if (res == "false") {
                swal("Something Went Wrong", "error", "error");
            }
            $("#txtName").val('');
            $("#txtVehicleId").val('');
            $("#staticBackdrop").modal("hide");
            jQuery('#loaderDiv').fadeOut(1000);
            LoadVehicles();
        },
        error: function (err) {
            jQuery('#loaderDiv').fadeOut(1000);
            swal("Something Went Wrong", err, "error");
        }
    });
}