$(document).ready(function () {
    const ajax = new Ajaxservice();
    const dataSource = new kendo.data.DataSource({
        transport: {
            read: async (options) => {
                const userList = await ajax.getUsers();
                options.data = userList
                userList !== "error" ?
                    options.success(userList) :
                    options.error("error")
            },
            create: async (options) => {
                const data = options.data.models[0];
                const newUser = await ajax.createUser(data);
                newUser !== "error" ?
                    options.success(newUser) :
                    options.error("error")
            },
            update: async (options) => {
                const data = options.data.models[0]
                const updatedList = await ajax.updateUser(data);
                updatedList !== "error" ?
                    options.success(updatedList) :
                    options.error("error")
            },
            destroy: async (options) => {
                const data = options.data.models[0]
                const deltedList = await ajax.deleteUser(data);
                deltedList !== "error" ?
                    options.success(deltedList) :
                    options.error("error")
            },
            parameterMap: function (options, operation) {
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

    dataSource.fetch()

    $("#grid").kendoGrid({
        autoBind: false,
        dataSource: dataSource,
        pageable: true,
        toolbar: [
            { name: "create", text: "New User" }
        ],
        columns: [
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