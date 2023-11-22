const compileBtn = document.getElementById('compile')
compileBtn.addEventListener('click', (event) => {
    event.preventDefault()
    compileJs()
})
function compile() {

    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;

    document.body.onkeyup = function () {
        code.open();
        code.writeln(html.value + "<style>" + css.value + "</style>");
        code.close();
    };
};

compile();
function compileJs() {

    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;

        console.clear()
        code.open();
        code.writeln(html.value + "<style>" + css.value + "</style>" + "<script>" + js.value + "</script>");
        code.close();
};

compile();