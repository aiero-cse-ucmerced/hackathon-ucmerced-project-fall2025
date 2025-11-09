import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "./clientApp";

import { updateRestaurantImageReference } from "./firestore";

// Replace the two functions below
export async function updateRestaurantImage(restaurantId, image) {}

async function uploadImage(restaurantId, image) {}
// Replace the two functions above