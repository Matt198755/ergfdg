const text = "vsrp ot";
const speed = 100; // ms
let index = 0;
const typewriter = document.getElementById("typewriter");

function typeWriter() {
    if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();
