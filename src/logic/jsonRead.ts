// 外から来たJSONを読むときの共通の道具。
// 形が違えば「どこが問題か」を添えて投げる。呼び出し側でまとめて捕まえる。

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readInteger(value: unknown, where: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new Error(`${where} が整数ではありません`);
  }
  return value;
}

export function readString(value: unknown, where: string): string {
  if (typeof value !== "string" || value === "") {
    throw new Error(`${where} が文字列ではありません`);
  }
  return value;
}

export function readArray(value: unknown, where: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${where} が配列ではありません`);
  return value;
}

/** 決められた候補のどれかであることを確かめる */
export function readEnum<T extends string>(
  value: unknown,
  candidates: readonly T[],
  where: string,
): T {
  if (!candidates.includes(value as T)) {
    throw new Error(`${where} が不正です(${candidates.join(" / ")} のいずれか)`);
  }
  return value as T;
}

/** 検証を通した結果。合わなければどこが問題かを返す */
export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string };

/** JSONの文字列を読み、渡された組み立て関数に通す */
export function parseJson<T>(
  text: string,
  build: (raw: unknown) => T,
): ParseResult<T> {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "JSONとして読めませんでした" };
  }
  try {
    return { ok: true, value: build(raw) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
