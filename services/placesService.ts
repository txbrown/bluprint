import "@firebase/firestore";
import * as firebase from "firebase";
import Constants from "expo-constants";

const SPACE_ID = Constants.manifest.extra.CONTENTFUL_SPACE_ID;
const CDA_TOKEN = Constants.manifest.extra.CONTENTFUL_CDA_TOKEN;
const API_BASE_URL = Constants.manifest.extra.CONTENTFUL_API_BASE_URL;

class PlacesService {
  public async getPlaces() {
    return fetch(
      `${API_BASE_URL}/spaces/${SPACE_ID}/environments/master/entries?access_token=${CDA_TOKEN}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  public async getAllPlacesByIds(ids: string[]) {
    return fetch(
      `${API_BASE_URL}/spaces/${SPACE_ID}/environments/master/entries?access_token=${CDA_TOKEN}&sys.id[in]=${ids.join(
        ","
      )}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  public async getImage(id: string) {
    const resp = await fetch(
      `${API_BASE_URL}/spaces/${SPACE_ID}/environments/master/assets/${id}?access_token=${CDA_TOKEN}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!resp.ok) throw new Error("Failed fetching image");

    const data = await resp.json();

    return `https:${data.fields.file.url}`;
  }

  public async setFavourite(placeId, userId) {
    firebase
      .firestore()
      .collection("favourites")
      .add({
        place_id: placeId,
        user_id: userId,
      })
      .catch((err) => console.log(err));
  }

  public async removeFavourite(id) {
    firebase
      .firestore()
      .collection("favourites")
      .doc(id)
      .delete()
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  }

  public async getUserFavourites(userId) {
    const snapshot = await firebase
      .firestore()
      .collection("favourites")
      .where("user_id", "==", userId)
      .get();

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
}

export default new PlacesService();
