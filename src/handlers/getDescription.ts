import {getDescriptionByVkId} from "../db/getDescriptionDb";
import {MessageContext} from "vk-io";

function es(text: string): string {
    if (!text) return '—';
    return text
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/`/g, '\\`')
        .replace(/\[/g, '\\[');
}

export async function  getDescription(senderId: number, context: MessageContext){
    const player = await getDescriptionByVkId(senderId);
    let message = `
        🧾 Описание игрока :
        
👤 Имя: ${player.name}
🏷 Ник: ${player.nickname}
🎮 PUBG ID: ${player.pubg_id || "—"}
🎂 Возраст: ${player.age}
📍 Город: ${player.city}
            `.trim();
    context.send(message);
}