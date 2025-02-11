import { world } from "@minecraft/server";

/** @type {import("@minecraft/server").BlockCustomComponent} */
const CustomTrapdoorBlockComponent = {
    onPlayerInteract({ block, dimension }) {
        const isOpen = block.permutation.getState("ua:open");
        const sound = isOpen ? "close.wooden_trapdoor" : "open.wooden_trapdoor";

        block.setPermutation(block.permutation.withState("ua:open", !isOpen));

        dimension.playSound(sound, block.center(), {
            pitch: 0.9,
            volume: 0.9,
        });
    },
};

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent(
        "ua:custom_trapdoor",
        CustomTrapdoorBlockComponent
    );
});