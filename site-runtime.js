(function () {
  var EXPIRES_AT = "2026-04-08T21:31:46+08:00";
  var LINK_MAP = {
    "https://www.uemo.net/tools/preview/id/3457": "./brand/",
    "https://www.uemo.net/tools/preview/id/3503": "./ui/",
    "https://www.uemo.net/tools/preview/id/3471": "./visual/"
  };

  function isExpired() {
    return Date.now() > new Date(EXPIRES_AT).getTime();
  }

  function showExpiredPage() {
    document.documentElement.innerHTML =
      '<head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<title>链接已失效</title>' +
      '<style>' +
      'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#111;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px;}' +
      '.wrap{max-width:640px;text-align:center;line-height:1.6;}' +
      '.badge{display:inline-block;padding:6px 12px;border:1px solid rgba(255,255,255,.2);border-radius:999px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:20px;}' +
      'h1{margin:0 0 12px;font-size:40px;line-height:1.1;}' +
      'p{margin:0;color:rgba(255,255,255,.78);font-size:16px;}' +
      '</style>' +
      '</head>' +
      '<body><main class="wrap"><div class="badge">Expired</div><h1>这个作品集链接已失效</h1><p>该页面仅限 3 天内访问，已于 2026-04-08 21:31:46 (UTC+8) 过期。</p></main></body>';
  }

  function rewriteHomeLinks() {
    var pathname = window.location.pathname;
    var isHomePage =
      pathname === "/" ||
      pathname === "/index.html" ||
      pathname.endsWith("/tt-portfolio-site/") ||
      pathname.endsWith("/tt-portfolio-site/index.html");

    if (!isHomePage) {
      return;
    }

    var anchors = document.querySelectorAll("a[href]");
    anchors.forEach(function (anchor) {
      var href = anchor.getAttribute("href");
      if (LINK_MAP[href]) {
        anchor.setAttribute("href", LINK_MAP[href]);
        anchor.setAttribute("target", "_self");
        anchor.removeAttribute("rel");
      }
    });
  }

  function optimizeImages() {
    var images = document.querySelectorAll("img");
    images.forEach(function (img, index) {
      img.decoding = "async";

      if (index < 2) {
        img.loading = "eager";
        img.fetchPriority = "high";
      } else {
        img.loading = "lazy";
        img.fetchPriority = "low";
      }
    });
  }

  if (isExpired()) {
    showExpiredPage();
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      rewriteHomeLinks();
      optimizeImages();
    });
  } else {
    rewriteHomeLinks();
    optimizeImages();
  }
})();
