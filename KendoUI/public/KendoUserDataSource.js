class KendoUserDataSource {
    constructor() {
        this.userService = new AjaxUserService();
        this.dataSource;
        this.buildDatasource();
    }

    buildDatasource() {
        this.dataSource = new kendo.data.DataSource({
            transport: {
                read: async (options) => {
                    const userList = await this.userService.getUsers();
                    options.data = userList
                    userList !== "error" ?
                        options.success(userList) :
                        options.error("error")
                },
                create: async (options) => {
                    const data = options.data.models[0];
                    const newUser = await this.userService.createUser(data);
                    newUser !== "error" ?
                        options.success(newUser) :
                        options.error("error")
                },
                update: async (options) => {
                    const data = options.data.models[0]
                    const updatedList = await this.userService.updateUser(data);
                    updatedList !== "error" ?
                        options.success(updatedList) :
                        options.error("error")
                },
                destroy: async (options) => {
                    const data = options.data.models[0]
                    const deltedList = await this.userService.deleteUser(data);
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
            pageSize: 10,
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
    }

    fetch() {
        this.dataSource.fetch();
    }
}
