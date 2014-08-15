$(document).ready(function() {
  var highlight =     function() {
       var lines = $(this).html().split("\n")
       for (i = 0; i < lines.length; i++) {
        if (lines[i].slice(0, 2) == "$ ") {
          lines[i] = '<span class="greeting">$</span> <span class="command">' + lines[i].slice(2, lines[i].length) + '</span>'
        } else if (lines[i].slice(0, 3) == "[+]") {
          lines[i] = '<span class="green">[+]</span>' + lines[i].slice(3, lines[i].length)
        } else if (lines[i].slice(0, 3) == "[-]") {
          lines[i] = '<span class="red">[-]</span>' + lines[i].slice(3, lines[i].length)
        } else if (lines[i].slice(0, 3) == "[!]") {
          lines[i] = '<span class="yellow">[!]</span>' + lines[i].slice(3, lines[i].length)
        }
      }
      $(this).html(lines.join("\n"))
     }

  $("pre code").each(highlight)
  $("pre.code").each(highlight)
})