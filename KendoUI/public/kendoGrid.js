$(document).ready(function () {
    const dataSource = new KendoUserDataSource();
    dataSource.fetch();
    $("#grid").kendoGrid({        
        height: 650,
        autoBind: false,
        dataSource: dataSource.dataSource,
        pageable: {
            pageSize: 3,
            refresh: true
        },
        editable: {
            mode: "popup",
        },
        toolbar: [
            { name: "create", text: "New User" }
        ],
        columns: [
            { field: "FirstName", title: "First Name" },
            { field: "LastName", title: "LastName" },
            { field: "LogOnName", title: "Log On Name" },
            { field: "IsEnabled", title: "Is Enabled", width: "100px" },
            { field: "ExpiryDate", title: "Expiry Date", format: "{0:MM-dd-yyyy}", width: "120px" },
            { command: ["edit", "destroy"], title: "Actions", width: "250px" }
        ],
    });
});