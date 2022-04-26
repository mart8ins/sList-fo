export const ValidateForm = (email: string, password: string, login: boolean) => {
    let isValid = true;
    let errorMessage = "";

    if (email) {
        const atSymbol = email.indexOf("@");
        const dot = email.indexOf(".");
        if (atSymbol === -1 || dot === -1) {
            isValid = false;
            errorMessage = "Please enter valid email";
        }
        if (email[0] === "@") {
            isValid = false;
            errorMessage = "Please enter valid email";
        }
        if (email[email.length - 1] === ".") {
            isValid = false;
            errorMessage = "Please enter valid email";
        }
        if (email[atSymbol + 1] === ".") {
            isValid = false;
            errorMessage = "Please enter valid email";
        }
    }

    if (!email) {
        isValid = false;
        errorMessage = "Email is required";
    }
    if (!password) {
        isValid = false;
        errorMessage = "Password is required";
    }

    if (!login) {
        if (password.length < 4) {
            isValid = false;
            errorMessage = "Passwords minimum length is 5 characters";
        }
    }
    return {
        isValid,
        errorMessage,
    };
};
