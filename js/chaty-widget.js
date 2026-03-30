/**
 * Chaty Widget – Shared Version
 * Floating social contact buttons (bottom-left)
 * Configure via window.CHATY_CONFIG or data-chaty attribute on script tag
 */
(function () {
  "use strict";

  // Default channels (can be overridden by site config)
  var defaultChannels = [
    {
      name: "Facebook_Messenger",
      label: "Facebook Messenger",
      url: "https://m.me/cmlocals",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#0084FF"/><path d="M19.5 9.5C13.701 9.5 9 13.748 9 19.074c0 3.014 1.474 5.702 3.778 7.456V30l3.294-1.81c.878.244 1.81.376 2.778.376 5.799 0 10.5-4.248 10.5-9.574S25.299 9.5 19.5 9.5zm1.04 12.878l-2.674-2.852-5.22 2.852 5.74-6.096 2.74 2.852 5.154-2.852-5.74 6.096z" fill="white"/></svg>'
    },
    {
      name: "WhatsApp",
      label: "WhatsApp",
      url: "https://wa.me/66801202074",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#25D366"/><path d="M19.5 9.5C14.253 9.5 10 13.753 10 19c0 1.67.436 3.285 1.265 4.717L10 29l5.418-1.234A9.454 9.454 0 0019.5 28.5c5.247 0 9.5-4.253 9.5-9.5s-4.253-9.5-9.5-9.5zm5.508 13.142c-.232.652-1.345 1.247-1.853 1.29-.508.043-.982.228-3.306-.688-2.806-1.107-4.573-3.974-4.71-4.16-.137-.186-1.12-1.49-1.12-2.843 0-1.352.71-2.018.96-2.293.25-.275.546-.344.728-.344.183 0 .365.002.525.01.168.007.394-.064.617.47.232.556.786 1.92.855 2.06.069.138.115.3.023.485-.093.186-.139.3-.275.462-.137.162-.288.362-.412.486-.137.137-.28.286-.12.56.16.275.71 1.173 1.525 1.9 1.047.933 1.93 1.222 2.205 1.36.275.137.435.115.595-.069.16-.185.686-.8.869-1.075.183-.275.365-.228.617-.137.25.092 1.595.752 1.868.889.275.137.457.206.526.32.068.115.068.663-.164 1.315z" fill="white"/></svg>'
    }
  ];

  // Get config from window.CHATY_CONFIG or use defaults
  var config = window.CHATY_CONFIG || {};
  var channels = config.channels || defaultChannels;
  var triggerColor = config.triggerColor || "#9F7AEA";
  var bottomOffset = config.bottomOffset || 45;
  var leftOffset = config.leftOffset || 18;

  var isMobile = window.innerWidth <= 480;
  var iconSize = isMobile ? 36 : 49;
  var itemGap = isMobile ? 9 : 11;

  var triggerSvg =
    '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="' + triggerColor + '"/>' +
    '<path d="M26.4 13H13.6C12.72 13 12 13.72 12 14.6V23.4C12 24.28 12.72 25 13.6 25H16L19.5 28L23 25H26.4C27.28 25 28 24.28 28 23.4V14.6C28 13.72 27.28 13 26.4 13Z" fill="white"/>' +
    '<circle cx="15.5" cy="19" r="1.25" fill="' + triggerColor + '"/>' +
    '<circle cx="19.5" cy="19" r="1.25" fill="' + triggerColor + '"/>' +
    '<circle cx="23.5" cy="19" r="1.25" fill="' + triggerColor + '"/>' +
    '</svg>';

  var closeSvg =
    '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="' + triggerColor + '"/>' +
    '<path d="M25 14L14 25M14 14L25 25" stroke="white" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  function createWidget() {
    var isOpen = false;
    var autoCloseTimer = null;
    var channelEls = [];

    // Create tooltip
    var tooltipEl = document.createElement("div");
    var tooltipLeft = leftOffset + iconSize + 9;
    var tooltipBottom = bottomOffset + iconSize / 2;
    tooltipEl.style.cssText = [
      "position:fixed",
      "z-index:10008",
      "background:rgba(0,0,0,0.9)",
      "color:#fff",
      "padding:7px 11px",
      "border-radius:5px",
      "font-family:'system-ui', sans-serif",
      "font-size:12px",
      "white-space:nowrap",
      "pointer-events:none",
      "opacity:0",
      "transition:opacity 0.2s ease",
      "bottom:" + tooltipBottom + "px",
      "left:" + tooltipLeft + "px",
      "transform:translateY(50%)"
    ].join(";");
    tooltipEl.textContent = "Contact";
    document.body.appendChild(tooltipEl);

    var triggerEl = document.createElement("div");
    triggerEl.id = "chaty-trigger";
    triggerEl.style.cssText = [
      "position:fixed",
      "bottom:" + bottomOffset + "px",
      "left:" + leftOffset + "px",
      "width:" + iconSize + "px",
      "height:" + iconSize + "px",
      "border-radius:50%",
      "cursor:pointer",
      "z-index:10010",
      "line-height:0",
      "transition:transform 0.2s ease"
    ].join(";");
    triggerEl.innerHTML = triggerSvg;

    triggerEl.onmouseenter = function() {
      triggerEl.style.transform = "scale(1.1)";
    };
    triggerEl.onmouseleave = function() { triggerEl.style.transform = "scale(1)"; };

    document.body.appendChild(triggerEl);

    channels.forEach(function(ch, idx) {
      var itemEl = document.createElement("div");
      var stackBottom = bottomOffset + iconSize + itemGap + idx * (iconSize + itemGap);

      itemEl.style.cssText = [
        "position:fixed",
        "bottom:" + bottomOffset + "px",
        "left:" + leftOffset + "px",
        "width:" + iconSize + "px",
        "height:" + iconSize + "px",
        "border-radius:50%",
        "z-index:10009",
        "opacity:0",
        "pointer-events:none",
        "line-height:0",
        "transition:bottom 0.3s ease, opacity 0.3s ease"
      ].join(";");

      var link = document.createElement("a");
      link.href = ch.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", ch.label);
      link.style.display = "block";
      link.style.width = iconSize + "px";
      link.style.height = iconSize + "px";
      link.style.borderRadius = "50%";
      link.style.lineHeight = "0";
      link.innerHTML = ch.svg;

      var svgEl = link.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", iconSize);
        svgEl.setAttribute("height", iconSize);
      }

      itemEl.appendChild(link);
      document.body.appendChild(itemEl);

      var channelItem = { el: itemEl, bottom: stackBottom, label: ch.label };
      channelEls.push(channelItem);

      // Add custom tooltip for this channel
      (function(item) {
        itemEl.addEventListener("mouseenter", function() {
          tooltipEl.textContent = item.label;
          tooltipEl.style.bottom = (item.bottom + iconSize / 2) + "px";
          tooltipEl.style.opacity = "1";
        });
        itemEl.addEventListener("mouseleave", function() {
          tooltipEl.style.opacity = "0";
        });
      })(channelItem);
    });

    function openWidget() {
      isOpen = true;
      triggerEl.innerHTML = closeSvg;

      channelEls.forEach(function(item, idx) {
        item.el.style.transitionDelay = (idx * 0.06) + "s";
        item.el.style.bottom = item.bottom + "px";
        item.el.style.opacity = "1";
        item.el.style.pointerEvents = "auto";
      });

      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      autoCloseTimer = setTimeout(function() {
        if (isOpen) closeWidget();
      }, 30000);
    }

    function closeWidget() {
      isOpen = false;
      triggerEl.innerHTML = triggerSvg;

      channelEls.forEach(function(item) {
        item.el.style.transitionDelay = "0s";
        item.el.style.bottom = "-" + (iconSize + 9) + "px";
        item.el.style.opacity = "0";
        item.el.style.pointerEvents = "none";
      });

      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
    }

    triggerEl.onclick = function(e) {
      e.stopPropagation();
      if (isOpen) {
        closeWidget();
      } else {
        openWidget();
      }
    };

    document.addEventListener("click", function(e) {
      if (isOpen && !triggerEl.contains(e.target)) {
        var onChannel = channelEls.some(function(item) {
          return item.el.contains(e.target);
        });
        if (!onChannel) {
          closeWidget();
        }
      }
    });

    // Show "Contact" when mouse in bottom-left 30% of screen
    document.addEventListener("mousemove", function(e) {
      var inZone = e.clientX < window.innerWidth * 0.3 && e.clientY > window.innerHeight * 0.7;

      if (inZone && !isOpen) {
        tooltipEl.textContent = "Contact";
        tooltipEl.style.bottom = bottomOffset + iconSize / 2 + "px";
        tooltipEl.style.opacity = "1";
      } else if (!isOpen) {
        tooltipEl.style.opacity = "0";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
