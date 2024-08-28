export function keyPressedHex(event) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-fA-F0-9]/.test(inp)) {
        return true;
    } else {
        event.preventDefault();
        return false;
    }
}
