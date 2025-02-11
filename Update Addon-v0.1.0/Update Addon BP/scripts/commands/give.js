import { system, ItemStack } from "@minecraft/server";

system.afterEvents.scriptEventReceive.subscribe(data => {
    if (data.sourceType !== "Entity") return;
    if (data.sourceEntity.typeId !== "minecraft:player") return;
    const player = data.sourceEntity;

    if (data.id === "ua:give") {
        const inventory = player.getComponent("inventory").container
        try {
            inventory.addItem(new ItemStack(data.message));
            player.sendMessage(`アイテムID:${data.message}を与えました。`)
        } catch (e) {
            player.sendMessage(`§cアイテムのIDが間違っています。または存在しません。\n${e}`);
        }
    }

    return;
}, { namespaces: ["ua"] })