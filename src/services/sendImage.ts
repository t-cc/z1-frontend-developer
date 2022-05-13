import { API_STATUS_APPROVED, API_URL } from "../constants/api";

export async function sendImage(imageData: string): Promise<boolean> {
  const response = await fetch(API_URL, {
    method: "POST",
    body: imageData,
  });

  const responseJson = await response.json();
  if (responseJson.summary && responseJson.summary.outcome) {
    return responseJson.summary.outcome === API_STATUS_APPROVED;
  }
  return false;
}
