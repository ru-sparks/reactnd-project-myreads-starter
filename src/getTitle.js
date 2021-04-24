export const getTitle = (category) => {
    switch (category) {
        case "currentlyReading":
            return "Currently Reading";
        case "wantToRead":
            return "Want To Read";
        case "read":
            return "Read";
        case "none":
            return "None";
        default:
            return "Category Needs Title";
    }
};
