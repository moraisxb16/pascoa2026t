import { jsonResponse, readReservados, writeReservados } from "./_reservados.js";

const ADMIN_PASSWORD = "rifa2025";

export default async function handler(request) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();
    const password = String(body?.password ?? "");
    const number = Number(body?.number);

    if (password !== ADMIN_PASSWORD) {
      return jsonResponse({ error: "Senha invalida." }, 401);
    }

    if (!Number.isInteger(number) || number < 1 || number > 200) {
      return jsonResponse({ error: "Numero invalido." }, 400);
    }

    const current = await readReservados();
    if (current.reservados.includes(number)) {
      return jsonResponse({ error: "Numero ja reservado.", reservados: current.reservados }, 409);
    }

    const updated = await writeReservados([...current.reservados, number]);
    return jsonResponse({ success: true, reservados: updated.reservados });
  } catch (error) {
    return jsonResponse(
      {
        error: "Failed to reserve number",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
}
