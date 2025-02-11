import { world } from "@minecraft/server";

const MilkBottleComponents = {
    onConsume({ source }) {
        source.runCommand("effect @s clear");
    },
};

world.beforeEvents.worldInitialize.subscribe(({ itemComponentRegistry }) => {
    itemComponentRegistry.registerCustomComponent(
        "ua:milk_bottle",
        MilkBottleComponents
    )
})