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
interface Todo {
    title: string;
    text: string;
    description: string;
    completed: boolean;
}
// 和Pick相反
type MyOmit<T, K extends keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key];
};
type TodoPreview = MyOmit<Todo, "description" | "title">;
const todo: TodoPreview = {
    text: "",
    completed: false,
};