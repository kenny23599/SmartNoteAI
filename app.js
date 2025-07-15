  // Animate loading dots
    let dotCount = 0;
    setInterval(() => {
      const dots = document.querySelector(".dots");
      if (dots) {
        dotCount = (dotCount + 1) % 4;
        dots.textContent = ".".repeat(dotCount);
      }
    }, 500);

    // Hide loader after page loads
    window.addEventListener("load", () => {
      document.body.classList.remove("loading");
      const loader = document.getElementById("smartnoteLoader");
      if (loader) loader.style.display = "none";
    });

    // Example function to show loader during a fake async operation
    function triggerAction() {
      const loader = document.getElementById("smartnoteLoader");
      if (loader) loader.style.display = "flex";

      // Simulate a fetch request delay
      setTimeout(() => {
        if (loader) loader.style.display = "none";
        alert("SmartNote AI has completed the task!");
      }, 3000);
    }

    // Optional: auto-show loader on all fetch() calls
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const loader = document.getElementById("smartnoteLoader");
      if (loader) loader.style.display = "flex";

      try {
        const result = await originalFetch(...args);
        return result;
      } finally {
        if (loader) loader.style.display = "none";
      }
    };

