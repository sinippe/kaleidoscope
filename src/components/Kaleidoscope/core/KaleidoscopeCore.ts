export type Position = {
  x: number;
  y: number;
};

const KaleidoscopeCore = () => {
  let canvasOffscreen: HTMLCanvasElement;

  const drawSections = (props: {
    context: CanvasRenderingContext2D;
    image: CanvasImageSource;
    divisions: number;
    radius: number;
    positionRate: Position;
  }) => {
    const imageWidth = props.image.width as number;
    const imageHeight = props.image.height as number;
    const deltaAngle = (Math.PI * 2) / props.divisions;

    props.context.clearRect(
      0,
      0,
      props.context.canvas.width,
      props.context.canvas.height
    );

    if (typeof canvasOffscreen === "undefined") {
      canvasOffscreen = document.createElement("canvas");
      canvasOffscreen.width = imageWidth;
      canvasOffscreen.height = imageHeight;
    }
    const contextOffscreen = canvasOffscreen.getContext("2d");
    if (contextOffscreen !== null) {
      contextOffscreen.drawImage(props.image, 0, 0);
    }

    props.context.imageSmoothingEnabled = false;
    props.context.fillRect(0, 0, imageWidth, imageHeight);

    const { x, y } = getImageCoordinates({
      angle: Math.sin(Math.PI / props.divisions),
      imageWidth,
      imageHeight,
      positionRate: props.positionRate,
      radius: props.radius
    });

    for (let i = 0; i < props.divisions; i++) {
      const startAngle = i * deltaAngle;
      const endAngle = startAngle + deltaAngle;

      props.context.save();

      const centerX = props.context.canvas.width / 2,
        centerY = props.context.canvas.height / 2;
      props.context.beginPath();
      props.context.moveTo(centerX, centerY);
      props.context.arc(centerX, centerY, props.radius, startAngle, endAngle);
      props.context.closePath();
      props.context.strokeStyle = "#ffffff";
      props.context.stroke();

      props.context.clip();
      props.context.translate(centerX, centerY);
      props.context.rotate(
        Math.PI / 2 + startAngle + (endAngle - startAngle) / 2
      );
      if (i % 2 === 0) {
        props.context.scale(-1, 1);
      }

      props.context.drawImage(canvasOffscreen, x, y, imageWidth, imageHeight);

      props.context.restore();
    }
  };

  const getImageCoordinates = ({
    radius,
    angle,
    imageWidth,
    imageHeight,
    positionRate
  }: {
    radius: number;
    angle: number;
    imageWidth: number;
    imageHeight: number;
    positionRate: Position;
  }) => {
    // distance between the 2 points forming the arc
    const arcLength = 2 * radius * angle;
    const imageXBoundaries = {
      min: -arcLength / 2,
      max: -imageWidth + arcLength / 2
    };
    const imageX =
      imageXBoundaries.min +
      positionRate.x * (imageXBoundaries.max - imageXBoundaries.min);
    const imageYBoundaries = {
      min: -imageHeight,
      max: -radius
    };
    const imageY =
      imageYBoundaries.min +
      positionRate.y * (imageYBoundaries.max - imageYBoundaries.min);

    return { x: imageX, y: imageY };
  };

  return { drawSections };
};

export default KaleidoscopeCore;
