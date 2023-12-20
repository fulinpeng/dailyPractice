var Box = /** @class */ (function () {
    function Box() {
    }
    Box.prototype.hasValue = function () {
        return this.value !== undefined;
    };
    return Box;
}());
var box = new Box();
box.value = "Gameboy";
box.value;
//   (property) Box<unknown>.value?: unknown
if (box.hasValue()) {
    console.log(box.value);
    // (property) value: unknown
}
