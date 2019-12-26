const KaleidoscopeCore = () => {
  const drawSections = (props: {
    context: CanvasRenderingContext2D;
    image: CanvasImageSource;
    divisions: number;
    radius: number;
    horizontalRate: number;
    verticalRate: number;
  }) => {
    const imageWidth = props.image.width as number,
      imageHeight = props.image.height as number;

    props.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < props.divisions; i++) {
      const startAngle = (i * Math.PI * 2) / props.divisions;
      const endAngle = startAngle + (Math.PI * 2) / props.divisions;

      props.context.save();

      const cx = props.context.canvas.width / 2,
        cy = props.context.canvas.height / 2;
      props.context.beginPath();
      props.context.moveTo(cx, cy);
      props.context.arc(cx, cy, props.radius, startAngle, endAngle);
      props.context.closePath();
      props.context.fillStyle = `#000000`;
      props.context.fill();
      props.context.strokeStyle = "#ffffff";
      props.context.stroke();
      props.context.clip();
      props.context.translate(cx, cy);
      props.context.rotate(
        Math.PI / 2 + startAngle + (endAngle - startAngle) / 2
      );
      if (i % 2 === 0) {
        props.context.scale(-1, 1);
      }
      // FIXME: calculate proper min/max values for X and Y
      const imageXValues = {
        min: -imageWidth / 2,
        max: imageWidth / 2
      };
      const imageX =
        imageXValues.min +
        props.horizontalRate * (imageXValues.max - imageXValues.min);
      const imageYValues = {
        min: -imageHeight,
        max: imageHeight
      };
      const imageY =
        imageYValues.min +
        props.verticalRate * (imageYValues.max - imageYValues.min);
      props.context.drawImage(props.image, imageX, imageY);
      console.log({ imageX, imageY, imageWidth, imageHeight });
      //
      props.context.fillText("0", cx, cy);
      props.context.restore();
    }
  };

  return { drawSections };
};

export default KaleidoscopeCore;
