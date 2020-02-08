import gsap from "gsap";

export type Position = {
  x: number;
  y: number;
};

export type KaleidoscopeCore = {
  draw: (props: { positionRate: Position }) => void;
  getImageCoordinates: (props: {
    imageWidth: number;
    imageHeight: number;
    areaWidth: number;
    areaHeight: number;
    positionRate: Position;
  }) => { x: number; y: number };
  getAreaSize: (props: {
    radius: number;
    angle: number;
  }) => { width: number; height: number };
};

const core = ({
  image,
  context,
  divisions,
  radius,
  animate
}: {
  image: CanvasImageSource;
  context: CanvasRenderingContext2D;
  divisions: number;
  radius: number;
  animate?: boolean;
}): KaleidoscopeCore => {
  const getImageCoordinates = ({
    imageWidth,
    imageHeight,
    areaWidth,
    areaHeight,
    positionRate
  }: {
    imageWidth: number;
    imageHeight: number;
    areaWidth: number;
    areaHeight: number;
    positionRate: Position;
  }) => {
    const imageXBoundaries = {
      min: -areaWidth / 2,
      max: -imageWidth + areaWidth / 2
    };
    const imageX =
      imageXBoundaries.min +
      positionRate.x * (imageXBoundaries.max - imageXBoundaries.min);
    const imageYBoundaries = {
      min: -imageHeight,
      max: -areaHeight
    };
    const imageY =
      imageYBoundaries.min +
      positionRate.y * (imageYBoundaries.max - imageYBoundaries.min);

    return { x: imageX, y: imageY };
  };

  const getAreaSize = ({
    radius,
    angle
  }: {
    radius: number;
    angle: number;
  }): {
    width: number;
    height: number;
  } => {
    // distance between the 2 points forming the arc
    const width = 2 * radius * Math.sin(angle / 2);
    const height = radius;

    return {
      width,
      height
    };
  };

  let canvasOffscreen: HTMLCanvasElement;
  const imageWidth = image.width as number;
  const imageHeight = image.height as number;
  const deltaAngle = (Math.PI * 2) / divisions;

  const { width: areaWidth, height: areaHeight } = getAreaSize({
    angle: deltaAngle,
    radius
  });

  canvasOffscreen = document.createElement("canvas");
  // TODO: calculate proper width & height
  const imageResizeRate = 1.0;
  canvasOffscreen.width = imageWidth * imageResizeRate;
  canvasOffscreen.height = imageHeight * imageResizeRate;
  canvasOffscreen.hidden = true;

  const contextOffscreen = canvasOffscreen.getContext("2d");
  if (contextOffscreen !== null) {
    contextOffscreen.drawImage(
      image,
      0,
      0,
      imageWidth,
      imageHeight,
      0,
      0,
      canvasOffscreen.width,
      canvasOffscreen.height
    );
  }
  context.imageSmoothingEnabled = true;

  const coordinates = {
    imageX: NaN,
    imageY: NaN
  };

  const draw = (props: { positionRate: Position }) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const { x: imageX, y: imageY } = getImageCoordinates({
      imageWidth: canvasOffscreen.width,
      imageHeight: canvasOffscreen.height,
      areaWidth,
      areaHeight,
      positionRate: props.positionRate
    });

    const drawSections = () => {
      for (let i = 0; i < divisions; i++) {
        const startAngle = i * deltaAngle;
        const endAngle = startAngle + deltaAngle;

        context.save();

        const centerX = context.canvas.width / 2,
          centerY = context.canvas.height / 2;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();

        context.clip();
        context.translate(centerX, centerY);
        context.rotate(Math.PI / 2 + startAngle + (endAngle - startAngle) / 2);
        if (i % 2 === 0) {
          context.scale(-1, 1);
        }

        context.fillRect(0, 0, canvasOffscreen.width, canvasOffscreen.height);

        context.drawImage(
          canvasOffscreen,
          coordinates.imageX,
          coordinates.imageY,
          canvasOffscreen.width,
          canvasOffscreen.height
        );

        context.restore();
      }
    };

    if (
      (isNaN(coordinates.imageX) && isNaN(coordinates.imageY)) ||
      animate !== true
    ) {
      coordinates.imageX = imageX;
      coordinates.imageY = imageY;
    }

    if (animate === true) {
      gsap.to(coordinates, {
        duration: 0.5,
        imageX,
        imageY,
        onUpdate: function() {
          drawSections();
        },
        overwrite: true
      });
    } else {
      drawSections();
    }
  };

  return { draw, getImageCoordinates, getAreaSize };
};

export default core;
