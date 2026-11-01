(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
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

  //functions

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
    });
  }

  loadInfo();
})();
