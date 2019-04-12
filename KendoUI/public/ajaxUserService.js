class AjaxUserService {
    constructor() {
        this.oDataUri = "http://localhost:51987/odata";
    }

    getUsers = async () => {
        let userList;
        await $.ajax({
            url: `${this.oDataUri}/Users`,
            type: 'GET',
            datatype: 'json',
            success: function (result) {
                userList = result.value;
            },
            error: function (result) {
                userList = "error";
            }
        });
        return userList;
    }

    createUser = async (data) => {
        let userList;
        await $.ajax({
            url: `${this.oDataUri}/Users`,
            type: 'POST',
            data: {
                FirstName: data.FirstName,
                IsEnabled: data.IsEnabled,
                LastName: data.LastName,
                LogOnName: data.LogOnName,
                PasswordHash: 'password',
                ExpiryDate: data.ExpiryDate.toJSON(),
                PasswordChangeDate: data.ExpiryDate.toJSON(),
            },
            success: function (result) {
                userList = result.value;
            },
            error: (result) => {
                userList = "error";
            },
        });
        return userList;
    }

    updateUser = async (data) => {
        let userList;
        const newUser = {
            Id: data.Id,
            FirstName: data.FirstName,
            IsEnabled: data.IsEnabled,
            LastName: data.LastName,
            LogOnName: data.LogOnName,
            PasswordHash: 'password',
            ExpiryDate: data.ExpiryDate.toJSON(),
            PasswordChangeDate: data.ExpiryDate.toJSON(),
        }
        $.ajax({
            url: `${this.oDataUri}/Users(guid'${data.Id}')`,
            type: 'PUT',
            data: newUser,
            success: function (result) {
                userList = result.value
            },
            error: (result) => {
                userList = "error"
            },
        });
        return userList;
    }

    deleteUser = async (data) => {
        let userList;
        await $.ajax({
            url: `${this.oDataUri}/Users(guid'${data.Id}')`,
            type: 'DELETE',
            success: function (result) {
                userList = result.value
            },
            error: function (result) {
                userList = "error"
            }
        });
        return userList;
    }
}
