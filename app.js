const convas = document.getElementById("canvas");
const gameSpeedSlider = document.getElementById("gameSlider");
const gameSpeedIndicator = document.getElementsByClassName("gameSpeedValue")[0];
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;
gameSpeedSlider.value = gameSpeed;
gameSpeedIndicator.innerHTML = gameSpeed;

gameSpeedSlider.addEventListener("change", (e) => {
  gameSpeedSlider.value = e.target.value;
  gameSpeed = e.target.value;
  gameSpeedIndicator.innerHTML = e.target.value;
});

const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "layer-5.png";

window.addEventListener("load", () => {
  let x = 0;

  class layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * speedModifier;
      this.image = image;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) this.x = 0;
      else this.x -= this.speed;

      this.draw();
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const layer1 = new layer(backgroundLayer1, 0.2);
  const layer2 = new layer(backgroundLayer2, 0.4);
  const layer3 = new layer(backgroundLayer3, 0.6);
  const layer4 = new layer(backgroundLayer4, 0.8);
  const layer5 = new layer(backgroundLayer5, 1);

  const layersArr = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    layersArr.forEach((L) => L.update());
    requestAnimationFrame(animate);
  }

  animate();
});
