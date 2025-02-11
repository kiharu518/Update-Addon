import { world, ItemStack } from "@minecraft/server"
import { ModalFormData } from "@minecraft/server-ui"

world.afterEvents.itemUse.subscribe(data => {
    const source = data.source

    if (data.itemStack.typeId === "ua:give_item") {
        const ui = new ModalFormData()
        ui.title("アイテム入手");
        ui.textField("入力したいアイテムのIDを入力", "Identifier");
        ui.show(source).then(({ canceled, formValues }) => {
            const inventory = source.getComponent("inventory").container

            if (canceled) return
            try {
                inventory.addItem(new ItemStack(formValues[0]))
            } catch (e) {
                source.sendMessage("§cそのようなアイテムはありません。またはIDが間違っています。");
            }
        });
    }
});