$(document).ready(function () {
    const dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    url: "http://localhost:51987/odata/Users",
                    type: 'GET',
                    datatype: 'json',
                    success: function (result) {
                        console.log("get", result.value)
                        options.success(result.value);
                    },
                    error: function (result) {
                        console.log("error to get")
                    }
                });
            },
            create: function (options) {
                const data = options.data.models[0];
                $.ajax({
                    url: "http://localhost:51987/odata/Users",
                    type: 'POST',
                    data: {
                        FirstName: data.FirstName,
                        IsEnabled: data.IsEnabled,
                        LastName: data.LastName,
                        LogOnName: data.LogOnName,
                        PasswordHash: 'other',
                        ExpiryDate: data.ExpiryDate.toJSON(),
                        PasswordChangeDate: data.ExpiryDate.toJSON(),
                    },
                    success: function (result) {
                        options.success(result.value);
                        console.log("created", result.value)
                    },
                    error: (result) => {
                        console.log("error to create")
                    },
                });
            },
            update: function (options) {
                const data = options.data.models[0]
                const newUser = {
                    Id: data.Id,
                    FirstName: data.FirstName,
                    IsEnabled: data.IsEnabled,
                    LastName: data.LastName,
                    LogOnName: data.LogOnName,
                    PasswordHash: 'new',
                    ExpiryDate: data.ExpiryDate.toJSON(),
                    PasswordChangeDate: data.ExpiryDate.toJSON(),
                }
                $.ajax({
                    url: `http://localhost:51987/odata/Users(guid'${data.Id}')`,
                    type: 'PUT',
                    data: newUser,
                    success: function (result) {
                        console.log("updated", result.value)
                        options.success(result.value);
                    },
                    error: (result) => {
                        console.log("error to update", result)
                    },
                });
            },
            destroy: function (options) {
                const data = options.data.models[0]
                $.ajax({
                    url: `http://localhost:51987/odata/Users(guid'${data.Id}')`,
                    type: 'DELETE',
                    success: function (result) {
                        console.log("deleted", result.value);
                        options.success(result.value);
                    },
                    error: function (result) {
                        console.log("error to delete");
                    }
                });
            },
            parameterMap: function (options, operation) {
                console.log("----------------> ", options)
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                id: "Id",
                fields: {
                    Id: { editable: false, nullable: true },
                    FirstName: { validation: { required: true, min: 2, maxlength: "255" } },
                    LastName: { validation: { required: true, min: 2, maxlength: "255" } },
                    LogOnName: { validation: { required: true, min: 2, maxlength: "255" } },
                    IsEnabled: { type: "boolean" },
                    ExpiryDate: { type: "date", validation: { required: false } },
                }
            }
        }
    });

    dataSource.fetch((result) => {
        console.log(result)
    })

    $("#grid").kendoGrid({
        sortable: false,
        autoBind: false,
        dataSource: dataSource,
        pageable: true,
        height: 550,
        toolbar: [
            { name: "create", text: "New User" }
        ],
        columns: [
            // { title: "#", width: "40px" },
            { field: "FirstName", title: "First Name" },
            { field: "LastName", title: "LastName" },
            { field: "LogOnName", title: "Log On Name" },
            { field: "IsEnabled", title: "Is Enabled", width: "100px" },
            { field: "ExpiryDate", title: "Expiry Date", format: "{0:MM-dd-yyyy}", width: "100px" },
            { command: ["edit", "destroy"], title: "Actions", width: "200px" }
        ],
        editable: "popup"
    });
});