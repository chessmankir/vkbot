import {pool} from "./db";

export async function getDescriptionByVkId(vkId: number) {
    const query = `
    SELECT id, pubg_id, nickname, description
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

    if (!member.description || !member.description.trim()) {
        return {
            ok: false,
            message: "У этого пользователя описание пока не заполнено",
        };
    }

    return {
        ok: true,
        member,
    };
}