(() => {
  // I was so confused by all the Javascript so I added comments to each function to help myself.

  // burger menu Section
  // console.log("JS is connected");

  const menu = document.querySelector("#menu-toggle");
  const links = document.querySelectorAll("#burger-menu a");

  links.forEach(function (link) {
    link.onclick = function () {
      menu.checked = false;
    };
  });

  //
  //
  // hero-vertical Section
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  canvas.width = 1280;
  canvas.height = 720;

  const frameCount = 450;
  const images = [];

  const speaker = {
    frame: 0,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/webp_450f/01_${(i + 1).toString().padStart(4, "0")}.webp`;
    images.push(img);
  }

  gsap.to(speaker, {
    frame: frameCount - 1,
    ease: "none",
    snap: "frame",
    scrollTrigger: {
      trigger: "#hero-vertical",
      pin: true,
      start: "top top",
      end: "+=3000",
      scrub: true,
    },
    onUpdate: render,
  });

  gsap.to(".hero-title", {
    opacity: 0,
    y: -30,
    scrollTrigger: {
      trigger: "#hero-vertical",
      start: "top top",
      end: "+=600",
      scrub: true,
    },
  });

  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[speaker.frame], 0, 0);
  }

  //
  //
  // Revelaer Section

  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  function moveDivisor() {
    divisor.style.width = `${slider.value}%`;
  }

  function resetSlider() {
    slider.value = "50";
    moveDivisor();
  }

  slider.addEventListener("input", moveDivisor);
  window.addEventListener("load", resetSlider);

  //
  //
  //ar-model Section
  const mobileList = document.querySelector("#mobile-feature-list");

  const infoBoxes = [
    {
      title: "Bright LED Light",
      text: "Enjoy bright, warm light that makes your surroundings clear, even in the dark.",
      image: "images/light.jpg",
    },
    {
      title: "Enjoy Music All Around",
      text: "Enjoy rich, immersive sound that fills your outdoor space.",
      image: "images/speaker.jpg",
    },
    {
      title: "Simple One-Touch Control",
      text: "Press to turn on or off. Rotate the button to adjust the volume.",
      image: "images/buttons.jpg",
    },
    {
      title: "Fast & Easy Charging",
      text: "Recharge easily with a USB-C cable. Convenient charging wherever you go.",
      image: "images/usb-c.jpg",
    },
    {
      title: "Hang It Anywhere",
      text: "Hang your lamp on a tree branch or hook. Easy to carry and hang wherever you go.",
      image: "images/handle.jpg",
    },
  ];

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement("h2");
      titleElement.textContent = infoBox.title;

      const textElement = document.createElement("p");
      textElement.textContent = infoBox.text;

      const imageElement = document.createElement("img");
      imageElement.src = infoBox.image;

      selected.appendChild(imageElement);
      selected.appendChild(titleElement);
      selected.appendChild(textElement);

      const mobileCard = document.createElement("div");
      mobileCard.classList.add("mobile-feature-card");

      const mobileImg = document.createElement("img");
      mobileImg.src = infoBox.image;
      mobileImg.alt = infoBox.title;

      const mobileTitle = document.createElement("h2");
      mobileTitle.textContent = infoBox.title;

      const mobileText = document.createElement("p");
      mobileText.textContent = infoBox.text;

      mobileCard.appendChild(mobileImg);
      mobileCard.appendChild(mobileTitle);
      mobileCard.appendChild(mobileText);

      mobileList.appendChild(mobileCard);
    });
  }

  loadInfo();

  //
  //
  // Promotion Gallery
  const stage = document.querySelector("#promotion .stage");
  const ring = document.querySelector("#promotion .ring");
  const imgs = document.querySelectorAll("#promotion .img");

  const imgURLs = [
    "images/promotion_gallery/cj_camping_night.png",
    "images/promotion_gallery/cj_canadafall.png",
    "images/promotion_gallery/cj_cyberpunk.png",
    "images/promotion_gallery/cj_futurism.png",
    "images/promotion_gallery/cj_retroposter.png",
    "images/promotion_gallery/cj_space_web.png",
    "images/promotion_gallery/cj_wireframe_insta.png",
  ];

  imgs.forEach((img, i) => {
    img.style.backgroundImage = `url("${imgURLs[i]}")`;
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const angle = 360 / imgs.length;
    const radius = 350;

    imgs.forEach((img, i) => {
      gsap.set(img, {
        rotateY: -angle * i,
        transformOrigin: `50% 50% ${radius}px`,
        z: -radius,
      });
    });

    let rotation = 180;
    let isDragging = false;
    let startX = 0;

    gsap.set(ring, { rotationY: rotation });

    gsap.from(imgs, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    });

    function hoverIn(e) {
      const current = e.currentTarget;

      gsap.to(imgs, {
        opacity: (i, img) => (img === current ? 1 : 0.5),
        duration: 0.2,
        overwrite: true,
      });
    }

    function hoverOut() {
      gsap.to(imgs, {
        opacity: 1,
        duration: 0.2,
        overwrite: true,
      });
    }

    imgs.forEach((img) => {
      img.addEventListener("mouseenter", hoverIn);
      img.addEventListener("mouseleave", hoverOut);
    });

    function dragStart(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;

      isDragging = true;
      startX = e.clientX;
      stage.setPointerCapture(e.pointerId);
    }

    function drag(e) {
      if (!isDragging) return;

      rotation += (e.clientX - startX) * 0.5;
      gsap.set(ring, { rotationY: rotation });

      startX = e.clientX;
    }

    function dragEnd() {
      isDragging = false;
    }

    stage.addEventListener("pointerdown", dragStart);
    stage.addEventListener("pointermove", drag);
    stage.addEventListener("pointerup", dragEnd);
    stage.addEventListener("pointercancel", dragEnd);
    stage.addEventListener("lostpointercapture", dragEnd);

    return () => {
      stage.removeEventListener("pointerdown", dragStart);
      stage.removeEventListener("pointermove", drag);
      stage.removeEventListener("pointerup", dragEnd);
      stage.removeEventListener("pointercancel", dragEnd);
      stage.removeEventListener("lostpointercapture", dragEnd);

      imgs.forEach((img) => {
        img.removeEventListener("mouseenter", hoverIn);
        img.removeEventListener("mouseleave", hoverOut);
      });

      gsap.killTweensOf(imgs);
      imgs.forEach((img) => img.style.removeProperty("opacity"));
    };
  });
})();
