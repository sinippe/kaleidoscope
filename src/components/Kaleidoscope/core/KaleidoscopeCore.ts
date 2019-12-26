export type Position = {
  x: number;
  y: number;
};

const KaleidoscopeCore = () => {
  const drawSections = (props: {
    context: CanvasRenderingContext2D;
    image: CanvasImageSource;
    divisions: number;
    radius: number;
    positionRate: Position;
  }) => {
    const imageWidth = props.image.width as number,
      imageHeight = props.image.height as number;
    const deltaAngle = (Math.PI * 2) / props.divisions;

    props.context.clearRect(
      0,
      0,
      props.context.canvas.width,
      props.context.canvas.height
    );

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
      props.context.fillStyle = `#000000`;
      props.context.fill();
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
      // distance between the 2 points forming the arc
      const arcLength = 2 * props.radius * Math.sin(Math.PI / props.divisions);
      const imageXValues = {
        min: -arcLength / 2,
        max: -imageWidth + arcLength / 2
      };
      const imageX =
        imageXValues.min +
        props.positionRate.x * (imageXValues.max - imageXValues.min);
      const imageYValues = {
        min: -imageHeight,
        max: -props.radius
      };
      const imageY =
        imageYValues.min +
        props.positionRate.y * (imageYValues.max - imageYValues.min);
      // TODO: optimize image drawing in canvas
      props.context.drawImage(props.image, imageX, imageY);

      props.context.restore();
    }
  };

  return { drawSections };
};

export default KaleidoscopeCore;