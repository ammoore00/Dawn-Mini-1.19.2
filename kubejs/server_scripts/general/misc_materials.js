ServerEvents.recipes(event => {
    event.shaped(
        'supplementaries:antique_ink',
        [
            'I',
            'B'
        ],
        {
            I: [
                'minecraft:ink_sac',
                'minecraft:glow_ink_sac',
                '#forge:dyes/black'
            ],
            B: 'minecraft:glass_bottle'
        }
    ).id('dawn:antique_ink')

    event.replaceInput({output: 'farmersdelight:canvas'}, 'farmersdelight:straw', 'supplementaries:flax')
})