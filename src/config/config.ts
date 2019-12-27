export interface ConfigSchema {
  divisions: number;
  radius: number;
  imagesList: {
    name: string;
    url: string;
  }[];
}

const Config: ConfigSchema = {
  divisions: 16,
  radius: 400,
  imagesList: [
    {
      name: "Giant plant head",
      url: "img/swarovski_kristallwelten_innsbruck.jpg"
    },
    {
      name: "Psychedelic 1",
      url:
        "https://andreiverner.com/wp-content/uploads/2019/07/hanuman-color-1.jpg"
    },
    {
      name: "Psychedelic 2",
      url:
        "https://andreiverner.com/wp-content/uploads/2019/07/alien-cave-artwork.jpg"
    },
    {
      name: "Sandwich",
      url:
        "https://www.poulet.ca/assets/RecipePhotos/_resampled/FillWyIxNDQwIiwiNzAwIl0/california-club.jpg"
    },
    {
      name: "Grolar",
      url:
        "https://lamouettebblog.files.wordpress.com/2016/03/hybridbar_taps4.jpg"
    },
    {
      name: "Ugly",
      url: "https://vl-media.fr/wp-content/uploads/2018/01/trump.jpg"
    },
    {
      name: "Kaleidoscope",
      url:
        "https://previews.123rf.com/images/visharo/visharo1701/visharo170100240/71478803-motif-de-kal%C3%A9idoscope.jpg"
    }
  ]
};

export default Config;
