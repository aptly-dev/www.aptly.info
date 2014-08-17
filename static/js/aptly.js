$(document).ready(function() {
  var highlight = function() {
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

function redirectLegacyHashes() {
    if (document.location.pathname != "/") {
        return
    }

    var newpath = "", hash = document.location.hash

    switch(hash) {
    case "#examples":
    case "#download":
    case "#support":
        newpath = "/" + hash.slice(1, hash.length) + "/"
        break
    case "#usage":
        newpath = "/doc/overview/"
        break
    case "#common-options":
        newpath = "/doc/aptly/flags/"
        break
    case "#package-query":
        newpath = "/doc/feature/query/"
        break
    case "#duplicate-packages":
        newpath = "/doc/feature/duplicate/"
        break
    case "#s3-publishing":
        newpath = "/doc/feature/s3/"
        break
    case "#gpg-keys":
        newpath = "/doc/aptly/publish/"
        break
    case "#commands":
    case "#configuration":
    case "#history":
        newpath = "/doc/" + hash.slice(1, hash.length) + "/"
        break
    default:
        if (/#aptly-/.test(hash)) {
            newpath = "/doc/" + hash.slice(1, hash.length).replace(/-/g, "/") + "/"
        }
    }

    if (newpath != "") {
        document.location.replace(document.location.origin + newpath)
    }
}

redirectLegacyHashes()