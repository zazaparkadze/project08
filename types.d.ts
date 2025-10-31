type User = {
  id: number;
  username: string;
  password: string;
  refreshToken: string;
};
type Employee = {
  id: number;
  firstname: string;
  lastname: string;
};
type BlogPost = {
  _id: string;
  date: string;
  title: string;
  body?: string;
};
type Post = {
  _id?: string | object;
  id: number;
  title: string;
  dateTime: string;
  postBody: string;
  likes?: number;
  disLikes?: number;
  comments?: string[];
  __v?: number;
  userId?: number;
};
type Feedback = {
  [index: string]: string;
  name?: string;
  email?: string;
  phone?: string;
  textContent?: string;
};
///////////////////////

type ArrayOfStrings = string[];
type ArrayOfNumbers = number[];

type geoResults = {
  [index: string]: string | number;
  id?: string | number;
  name: string;
  latitude: string | number;
  longitude: string | number;
  elevation?: string | number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: ArrayOfStrings;
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
};

type meteoResult = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    wind_speed_10m: string;
    temperature_2m: string;
  };
  current: {
    time: string;
    interval: number;
    wind_speed_10m: number;
    temperature_2m: number;
  };
  hourly_units: {
    time: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    temperature_2m: string;
  };
  hourly: {
    time: ArrayOfStrings;
    temperature_2m: ArrayOfNumbers;
    wind_speed_10m: ArrayOfNumbers;
    relative_humidity_2m: ArrayOfNumbers;
  };
};

type SearchObject = {
  [index: string]: string;
  name: string;
  latitude: string;
  longitude: string;
  hourly?: string;
  forecast_days?: string;
};
type SunsetSunrizeResult = {
  results: {
    date: string;
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
    solar_noon: string;
    golden_hour: string;
    day_length: string;
    timezone: string;
    utc_offset: number;
  };
  status: string;
};

type PostOld = {
  id: number;
  userId: string;
  title: string;
  body: string;
};

type UserOld = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

type Params = {
  params: {
    userId: string;
  };
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
type EmployeeOld = {
  name: string;
  occupation: string;
};

type Result = {
  pageid: string;
  title: string;
  extract: string;
  snippet: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};

type SearchResults = {
  query?: {
    pages?: Result[];
  };
};
type Decoded = {
  [index: string]: string | number;
};
