document.addEventListener("DOMContentLoaded", () => {
    const pages = Array.from(document.querySelectorAll(".page"));
    let currentIndex = 0;
    const music = window.musicInstance || new Audio("./audio/bg-music.mp3");
    music.loop = true;
    music.volume = 0.2;
  
    const storedTime = sessionStorage.getItem("music-time");
    if (storedTime) {
      music.currentTime = parseFloat(storedTime);
    }
  
    window.musicInstance = music;
  
    let musicStarted = false;
    const startMusic = () => {
      music.play().then(() => {
        musicStarted = true;
      }).catch(() => {
        console.warn("Music play was blocked.");
      });
    };
  
    let firstClick = true;

    document.getElementById('ws').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
      
        // Open WhatsApp link in a new tab
        window.open("https://wa.me/601111775676?text=Saya%20mau%20pergi%20!!!%20*dengan%20rela%20hati%20%F0%9F%99%8C%F0%9F%8F%BF%0A%0ABantu%20pilih%20please%20%3A-%0AVenue%20%20%20%20%20%20%20%20%20%20%3A%20dpulze%20%26%20ioi%20putrajaya%20takde%20%3A'(%0A(selected%20tgv%20ngan%20gsc%20je%20ada)%0ATarikh%20%20%20%20%20%20%20%20%20%20%3A%20Jumaat%20kan%3F%0AMasa%20%20%20%20%20%20%20%20%20%20%20%3A%20Petang%20ke%20malam%3F%0ADress%20code%20%3A%20%3F%3F%3F", '_blank');
      
        // Optional: hide all pages to prevent flicker
        document.querySelectorAll('.page').forEach(page => {
          page.classList.add('hidden');
        });
      
        // Then show page9 after slight delay (optional)
        setTimeout(() => {
          document.getElementById('page9').classList.remove('hidden');
        }, 100); // small delay for smoother effect
    });
  
    const goToNextPage = () => {
      if (currentIndex < pages.length - 1) {
        pages[currentIndex].classList.add("hidden");
        currentIndex++;
        pages[currentIndex].classList.remove("hidden");
      }
    };
  
    // Global click handler
    document.body.addEventListener("click", (e) => {
      if (!musicStarted) startMusic();
  
      if (firstClick) {
        firstClick = false;
        return;
      }
  
      const nextButton = e.target.closest(".next-button");

  if (nextButton) {
    e.preventDefault(); // prevent default link navigation

    const href = nextButton.getAttribute("href");
        if (href && href.startsWith("#")) {
        // get target page id from href (e.g. "#page7")
        const targetId = href.substring(1);
        const targetIndex = pages.findIndex(p => p.id === targetId);
        if (targetIndex !== -1) {
            // hide current page and show target page
            pages[currentIndex].classList.add("hidden");
            currentIndex = targetIndex;
            pages[currentIndex].classList.remove("hidden");
            return;
        }
        }
        // fallback: just go to next page if no valid href
        goToNextPage();
    } else {
        const currentPage = pages[currentIndex];
        if (!currentPage.querySelector(".next-button")) {
        goToNextPage();
        }
    }
    });
  
    setInterval(() => {
      sessionStorage.setItem("music-time", music.currentTime);
    }, 1000);
  
    setTimeout(() => {
      const currentPage = pages[currentIndex];
      const reminder = currentPage.querySelector(".reminder");
      if (reminder) reminder.style.display = "block";
    }, 20000);
  });
  