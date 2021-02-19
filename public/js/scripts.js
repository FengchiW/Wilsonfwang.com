$('document').ready(function() {
  var consoleText = "root@wilsonfwang~# "
  var lines = ["#line1", "#line2"]
  var dataText = [
    "gcc index_page.c -o index.out",
    "./index.out",
    "index"];
  
  function hideElements()
  {
    $("#Main").hide()
    $("#Projects").hide()
    $("#Hire").hide()
    $("#footerpad").hide()
  }
  hideElements()

  function compileText(text, i, fnCallback, line) {
    if (i < (text.length)) {
      caret = '<span aria-hidden="true"></span>'
      if (i === text.length - 1) {
        caret = ''
      }
      $(lines[line]).html(consoleText + text.substring(0, i+1) + caret);

      setTimeout(function() {
        compileText(text, i + 1, fnCallback, line)
      }, 50);
    }

    else if (typeof fnCallback == 'function') {
      setTimeout(fnCallback, 300);
    }
  }

  function StartIndexPage(){
    $(".typewriter").fadeOut()
    $("#Main").fadeIn(2000)
    $("#Projects").fadeIn(2000)
    $("#Hire").fadeIn(2000)
    $("#footerpad").fadeIn(2000)
    $(".typewriter").remove()
  }

  function StartTextAnimation(i, line) {
    if (dataText[i] === 'index'){
      setTimeout(function() {
        StartIndexPage();
      }, 500);
    }
    else if (i < dataText[i].length) {
      compileText(dataText[i], 0, function(){
        StartTextAnimation(i + 1, (line + 1) % 2);
      }, line);
    }
  }
  StartTextAnimation(0, 0);
});