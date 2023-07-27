ServerEvents.recipes(event => {
    event.remove({id: /(createdeco:).*(slab_vert)/})
})