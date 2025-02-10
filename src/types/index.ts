export type Artist = {
  artist_name: string;
  artist_rating: number;
  artist_id: number;
};

export type Album = {
  album_copyright: string;
  album_id: number;
  album_label: string;
  album_name: string;
  album_rating: number;
  artist_name: string;
  external_ids: {
    spotify: string[];
  };
  album_release_date: string;
};

export type Track = {
  track_name: string;
  track_rating: number;
  track_id: number;
  has_lyrics: boolean;
  explicit: boolean;
};

export type UserData = {
  username: string;
  password: string;
  country: string;
};

export type LoginUserData = Omit<UserData, "country">;
