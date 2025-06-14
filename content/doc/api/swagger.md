---
title: "REST API Documentation"
menu:
    doc:
        weight: 100
---

<script>
let swagger = null;

function changeVersion(event) {
  if (swagger === null) return;
  swagger.specActions.updateUrl("/swagger/aptly_" + event.target.value + ".json");
  swagger.specActions.download();
}
window.onload = function() {
    function collapseAll() {
        blocks = document.getElementsByClassName("opblock-tag");
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].click();
        }
        models = document.getElementsByClassName("models-control");
        for (let i = 0; i < models.length; i++) {
            models[i].click();
        }
    }
    const version = document.getElementById("aptly-version");
    swagger = SwaggerUIBundle({
        url: "/swagger/aptly_" + version.value + ".json",
        dom_id: '#swagger-ui',
        servers: [{ url: '/api' }],
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset.slice(1) // remove topbar
        ],
        layout: "StandaloneLayout",
        <!--supportedSubmitMethods: [],-->
        onComplete: () => {
            swagger.setHost('www.google.com');
        }
    });
    setTimeout(collapseAll, 50);
};
</script>
<div class="version-select">
    Version:
    <select id="aptly-version" onChange="changeVersion(event)">
       <option>1.6.2</option>
       <option>1.6.1</option>
       <option>1.6.0</option>
    </select>
</div>
<div id="swagger-ui"></div>
