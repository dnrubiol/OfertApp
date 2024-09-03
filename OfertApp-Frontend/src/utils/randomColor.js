function generateRandomColor() {
    // Generate a random color in hexadecimal format
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export default generateRandomColor;