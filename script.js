const canvas = document.getElementById("braceletCanvas");
const ctx = canvas.getContext("2d");

const assets = {};

const loadImage = (name, src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      assets[name] = img;
      resolve();
    };
    img.src = `assets/${src}`;
  });
};

async function loadAssets() {
  const imageFiles = {
    "link-silver": "link-silver.png",
    "link-gold": "link-gold.png",
    "link-silver-braided": "link-silver-braided.png",
    "bead-blue": "bead-blue.png",
    "bead-red": "bead-red.png",
    "bead-black": "bead-black.png",
    "bead-white": "bead-white.png",
    "bead-eye": "bead-eye.png",
  };

  await Promise.all(
    Object.entries(imageFiles).map(([name, file]) =>
      loadImage(name, file)
    )
  );
}

function renderBracelet() {
  const linkStyle = document.getElementById("linkStyle").value;
  const beadStyle = document.getElementById("beadStyle").value;
  const count = parseInt(document.getElementById("linkCount").value, 10);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const spacing = 105;
  const startX = 50;
  const centerY = canvas.height / 2;

  for (let i = 0; i < count; i++) {
    const x = startX + i * spacing;

    ctx.drawImage(assets[linkStyle], x, centerY - 40, 200, 40);
    ctx.drawImage(assets[beadStyle], x + 50, centerY - 30, 20, 20);
  }
}

loadAssets().then(renderBracelet);