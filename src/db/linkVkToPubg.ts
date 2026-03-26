import { pool } from "./db";

export async function linkVkToPubg(pubgId: string, vkId: number) {
    const findQuery = `
    SELECT id, pubg_id, nickname
    FROM clan_members
    WHERE pubg_id = $1
    LIMIT 1
  `;
    console.log("vk:", vkId);
    const found = await pool.query(findQuery, [pubgId]);

    if (found.rows.length === 0) {
        return {
            ok: false,
            message: "Игрок с таким PUBG ID не найден",
        };
    }

    const member = found.rows[0];

    const updateQuery = `
    UPDATE clan_members
    SET vk_id = $1
    WHERE id = $2
    RETURNING id, pubg_id, nickname, vk_id
  `;

    const updated = await pool.query(updateQuery, [vkId, member.id]);

    return {
        ok: true,
        member: updated.rows[0],
    };
}