export function setLocalStorage(action: string, dbName: string, value?: any) {
    let returnValue;

    if (action === "get") {
        const result: any = localStorage.getItem(dbName);
        const parsedResult = JSON.parse(result);
        returnValue = parsedResult;
    }

    if (action === "set") {
        localStorage.setItem(dbName, JSON.stringify(value));
    }

    if (action === "remove") {
        localStorage.removeItem(dbName);
    }

    if (returnValue) {
        return returnValue;
    }
}
