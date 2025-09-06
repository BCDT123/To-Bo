// models DataBase
type DiaperType = "pee" | "poo" | "mix";
type Consistency = "dry" | "wet";
type PooColor = "yellow" | "green" | "brown" | "black";
type HouseRole = "owner" | "parent" | "grandparent" | "caretaker" | "guest";

// Elimina password si usas Firebase Auth
export interface User {
  id: string;
  email: string;
  //password: string;
  name: string;
  admin: boolean;
  photoUrl: string;
  language: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Baby {
  id: string;
  gender: string;
  color: string;
  photoUrl: string;
  birthday: Date;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}

//Relation baby-user
export interface House {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface HousePersons {
  houseId: string;
  userId: string;
  type: HouseRole;
  createdAt: Date;
  updatedAt?: Date;
}

export interface HouseBaby {
  houseId: string;
  babyId: string;
  createdAt: Date;
  updatedAt?: Date;
}

//Baby Logs
export interface GrowLogs {
  id: string;
  weight: number;
  height: number;
  headsize: number;
  dateTime: Date;
  babyId: string;
  notes: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface DiapersLogs {
  id: string;
  dateTime: Date;
  type: DiaperType; //[pepee, poopoo, mix]
  consistency: Consistency; //[dry,wet]
  color: PooColor; //[yellow, green, brown, black]
  quantity: string; //[small, medium, large]
  observations: string;
  babyId: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface FeedLogs {
  id: string;
  dateTime: Date;
  type: string; //[breast,bottle]
  time: number;
  side: string; //[left,right]
  quantity: number;
  notes: string;
  babyId: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface SleepLogs {
  id: string;
  dateTime: Date;
  form: Date;
  to: Date;
  notes: string;
  babyId: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface MilestonesCatalog {
  id: string;
  type: string; //[social,motor,none]
  description: string;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Milestone {
  id: string;
  photo: string;
  babyId: string;
  milestoneCatalogId: string;
  description: string;
  dateTime: Date;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Alerts {
  id: string;
  dateTime: Date;
  type: string; //[diaper, sleep, feed]
  endDateTime: Date;
  comments: string;
  recurrent: number; //[every 30 min, 1hr]
  babyId: string;
  createdAt: Date;
  updatedAt?: Date;
}
//User
export interface SocialFeedComments {
  id: string;
  comments: string;
  milestoneCatalogId: string;
  userId: string;
  dateTime: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Favorites {
  id: string;
  milestoneCatalogId: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}
