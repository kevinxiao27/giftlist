import dotenv from "dotenv";

dotenv.config("./.env");

export const searchImages = async (query) => {
  try {
    const response = await fetch(
      `/unsplash/search/photos?query=${query}&client_id=9hM1ygY7aW9FGo4HsaFF9A3Iz8SqPodJAf8j3tcGV1s`
    );
    const data = await response.json();
    const imageUrls = data.results
      .slice(0, 7)
      .map((image) => image.urls.regular); // Adjust based on the Unsplash API response structure
    console.log(imageUrls[0]);
    return imageUrls[0];
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};
