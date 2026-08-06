export interface ConfigSchema {
  divisions: number;
  radius: number;
  imagesList: {
    name: string;
    url: string;
  }[];
}

const Config: ConfigSchema = {
  divisions: 8,
  radius: 400,
  imagesList: [
    {
      name: "Giant plant head",
      url: "img/swarovski_kristallwelten_innsbruck.jpg"
    },
    {
      name: "Psychedelic 1",
      url:
        "https://fractalika.com/image/cache/catalog/psihodelicheskaya-mandala-nastennyj-dekor-dlya-interera-svetitsya-v-ultrafiolete-fluorestsentnaya-kartina-psihodelicheskoe-iskusstvo-zakazat-s-dostavkoj-800x800.jpg"
    },
    {
      name: "Psychedelic 2",
      url:
        "https://andreiverner.com/wp-content/uploads/2024/11/HN-DJ-Booth-Art-1400x700.jpg"
    },
    {
      name: "Sandwich",
      url:
        "https://www.datocms-assets.com/129288/1725392697-california-club.jpg?auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&ar=1:1&w=800&h=800"
    },
    {
      name: "Grolar",
      url:
        "https://lamouettebblog.files.wordpress.com/2016/03/hybridbar_taps4.jpg"
    },
    {
      name: "Kaleidoscope",
      url:
        "https://previews.123rf.com/images/visharo/visharo1701/visharo170100240/71478803-motif-de-kal%C3%A9idoscope.jpg"
    },
    {
      name: "Non existing image",
      url: "img/error.jpg"
    }
  ]
};

export default Config;
