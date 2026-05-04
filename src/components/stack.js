let stack1 = [];
let stack2 = [];

const strs = ["str1", "str2", "str3"];

for (let str of strs) stack1.push(str);

while (stack1.length > 0) {
    let line = stack1.pop();
    for (let ch of line) stack2.push(ch);
    let reversed = "";
    while (stack2.length > 0) reversed += stack2.pop();
    console.log(reversed);
}
