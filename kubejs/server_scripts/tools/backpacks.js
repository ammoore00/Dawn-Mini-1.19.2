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
})