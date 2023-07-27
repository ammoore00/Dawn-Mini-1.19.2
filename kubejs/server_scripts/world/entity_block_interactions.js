ServerEvents.tags('block', event => {
    event.removeAll("minecraft:enderman_holdable");
    event.add("minecraft:wither_immune", "minecraft:netherite_block");
})

ServerEvents.tags('block', event => {
    event.removeAll('minecraft:guarded_by_piglins')

    event.add('minecraft:guarded_by_piglins', [
        'lootr:lootr_barrel',
        'lootr:lootr_chest',
        'lootr:lootr_shulker',
        'lootr:lootr_trapped_chest'
    ])
})