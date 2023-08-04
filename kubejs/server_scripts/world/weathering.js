ServerEvents.tags('block', event => {
    event.remove('immersive_weathering:moss_source', [
        'minecraft:moss_block',
        'minecraft:moss_carpet'
    ])

    event.remove('immersive_weathering:crack_source', '#immersive_weathering:cracked')

    event.removeAll('immersive_weathering:leaf_pile_replaceable')
})