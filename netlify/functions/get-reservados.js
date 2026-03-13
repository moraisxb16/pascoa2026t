import { jsonResponse, readReservados } from "./_reservados.js";

export default async function handler(request) {
  if (request.method !== "GET") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const data = await readReservados();
    return jsonResponse(data);
  } catch (error) {
    return jsonResponse(
      {
        error: "Failed to load reserved numbers",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
}
