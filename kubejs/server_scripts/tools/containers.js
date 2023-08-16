ServerEvents.recipes(event => {
    event.remove({id: /(sophisticatedbackpacks:)(?!backpack).*/})

    event.shaped(
        'sophisticatedbackpacks:backpack',
        [
            'SLS',
            'SCS',
            'LLL'
        ],
        {
            S: '#forge:string',
            L: '#forge:leather',
            C: '#forge:chests/wooden'
        }
    ).id('sophisticatedbackpacks:backpack')

    event.shaped(
        'supplementaries:sack',
        [
            ' S ',
            'C C',
            ' C '
        ],
        {
            S: '#forge:string',
            C: 'farmersdelight:canvas'
        }
    ).id('supplementaries:sack')
})