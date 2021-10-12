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

  $("a.more-features").click(
    function() {
      $("#upcoming").toggle().removeClass("hidden")
      return false
  })
})

$(document).ready(function() {
  $("section.documentation table").addClass("table table-striped");
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

var carouselInterval, carouselTimeout

function carouselActivate(num) {
  $(".code-switches-wrapper a.switch-target").removeClass("active")
  $(".code-switches-wrapper a.switch-target[data-c='" + num +"']").addClass("active")

  $(".code-switches-wrapper div.carousel").hide()
  $(".code-switches-wrapper div.carousel[data-c='" + num + "']").removeClass('hidden').show()
}

function carouselNext() {
  var current = $(".code-switches-wrapper a.switch-target.active").attr("data-c")
  carouselActivate(current % 6 + 1)
}

function carouselPause() {
  if (carouselInterval != null) {
    window.clearInterval(carouselInterval)
    carouselInterval = null
  }

  if (carouselTimeout != null) {
    window.clearTimeout(carouselTimeout)
  }

  carouselTimeout = window.setTimeout(function() {
    carouselInterval = window.setInterval(carouselNext, 3 * 1000)
  }, 15 * 1000)
}

function setupCarousel() {
  $(".code-switches-wrapper a.switch-target").click(function() {
    carouselActivate($(this).attr("data-c"))
    carouselPause()
    return false
  })

  carouselInterval = window.setInterval(carouselNext, 3 * 1000)
}

$(document).ready(setupCarousel)

redirectLegacyHashes()