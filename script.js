document.addEventListener("DOMContentLoaded", () => {
    const current = document.body.id;
    const isInitialPage = current === "page1" || current === "index";
  
    let music = window.musicInstance || new Audio("./audio/bg-music.mp3");
    music.loop = true;
    music.volume = 0.2;
  
    const storedTime = sessionStorage.getItem("music-time");
    if (storedTime) {
      music.currentTime = parseFloat(storedTime);
    }
  
    window.musicInstance = music;
  
    // Track if music has been played
    let musicStarted = false;
  
    const startMusic = () => {
      music.play().then(() => {
        musicStarted = true;
      }).catch(() => {
        console.warn("Music play was blocked.");
      });
    };
  
    // For initial page: require first click for music, second click for nav
    if (isInitialPage) {
      let firstClick = true;
  
      document.body.addEventListener("click", (e) => {
        if (firstClick) {
          e.preventDefault();
          startMusic();
          firstClick = false;
        } else {
          navigate(current);
        }
      });
    } else {
      // Other pages: just play music and allow nav
      document.body.addEventListener("click", () => {
        if (!musicStarted) startMusic();
        navigate(current);
      });
    }
  
    // Save current time
    setInterval(() => {
      sessionStorage.setItem("music-time", music.currentTime);
    }, 1000);
  
    function navigate(currentPage) {
      if (currentPage === "page1" || currentPage === "index") window.location.href = "page2.html";
      else if (currentPage === "page2") window.location.href = "page3.html";
      else if (currentPage === "page3") window.location.href = "page4.html";
      // Extend for more pages
    }
  
    // Optional reminder logic
    setTimeout(() => {
      const reminder = document.getElementById("reminder1") || document.getElementById("reminder2");
      if (reminder) reminder.style.display = "block";
    }, 20000);
  });
  