// Plays music and handles click-based navigation
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bg-music");
    if (music) {
      document.body.addEventListener("click", () => {
        music.play();
      }, { once: true });
    }
  
    // Click to go to next page
    document.body.addEventListener("click", () => {
      const current = document.body.id;
      if (current === "page1") window.location.href = "page2.html";
      if (current === "page2") window.location.href = "page3.html";
      if (current === "page3") window.location.href = "page4.html";
      // Add more as needed
    });
  
    // Reminder if user is idle
    setTimeout(() => {
      const reminder = document.getElementById("reminder1") || document.getElementById("reminder2");
      if (reminder) reminder.style.display = "block";
    }, 20000); // 20 seconds
  });
  