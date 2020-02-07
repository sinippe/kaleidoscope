export type ConfigService = {
  setDivisions: (divisions: number) => void;
  getDivisions: () => number | null;
  setRadius: (radius: number) => void;
  getRadius: () => number | null;
  setImageUrl: (imageUrl: string) => void;
  getImageUrl: () => string | null;
};

const setDivisions = (divisions: number) => {
  localStorage.setItem("divisions", divisions.toString());
};

const getDivisions = () => {
  const divisions = localStorage.getItem("divisions");
  return divisions !== null ? +divisions : null;
};

const setRadius = (radius: number) => {
  localStorage.setItem("radius", radius.toString());
};

const getRadius = () => {
  const radius = localStorage.getItem("radius");
  return radius !== null ? +radius : null;
};

const setImageUrl = (imageUrl: string) => {
  localStorage.setItem("imageUrl", imageUrl);
};

const getImageUrl = () => {
  return localStorage.getItem("imageUrl");
};

const configService: ConfigService = {
  setDivisions,
  getDivisions,
  setRadius,
  getRadius,
  setImageUrl,
  getImageUrl
};

export default configService;
