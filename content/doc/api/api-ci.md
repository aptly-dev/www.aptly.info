---
title: "Swagger API"
menu:
    doc:
        parent: API
        weight: 10
---

Swagger API
----------------

<div id="swagger-ui"></div>
<script>
        window.onload = function() {
        const ui = SwaggerUIBundle({
            url: "/swagger.json",
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset.slice(1) // remote topbar
            ],
            layout: "StandaloneLayout",
            supportedSubmitMethods: [],
            onComplete: () => { }
        });
        window.ui = ui;
    };
</script>
