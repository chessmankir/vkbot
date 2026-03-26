import {pool} from "./db";

export async function getDescriptionByVkId(vkId: number) {
    const query = `
    SELECT *
    FROM clan_members
    WHERE vk_id = $1
    LIMIT 1
  `;
    const result = await pool.query(query, [vkId]);
    if (result.rows.length === 0) {
        return {
            ok: false,
            message: "Сначала привяжи PUBG ID через команду: +привязать 51020303",
        };
    }

    const member = result.rows[0];
    return member;
}