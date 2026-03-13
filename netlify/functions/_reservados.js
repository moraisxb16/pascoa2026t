import { getStore } from "@netlify/blobs";

const STORE_NAME = "pascoa-rifa";
const KEY_NAME = "reservados_v4";
const TOTAL_NUMBERS = 200;

function normalizeNumbers(values) {
  if (!Array.isArray(values)) return [];

  const unique = Array.from(
    new Set(
      values
        .map((value) => Number(value))
        .filter((value) => Number.isInteger(value) && value >= 1 && value <= TOTAL_NUMBERS)
    )
  );

  unique.sort((a, b) => a - b);
  return unique;
}

export async function readReservados() {
  const store = getStore(STORE_NAME);
  const data = await store.get(KEY_NAME, { type: "json" });
  const reservados = normalizeNumbers(data?.reservados);
  return { reservados };
}

export async function writeReservados(reservados) {
  const store = getStore(STORE_NAME);
  const payload = { reservados: normalizeNumbers(reservados) };
  await store.setJSON(KEY_NAME, payload);
  return payload;
}

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
