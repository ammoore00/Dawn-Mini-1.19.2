ServerEvents.recipes(event => {
    event.remove({type: 'woodworks:sawmill'})

    let woodcutting = (output, output_count, input, name) => {
        event.custom({
            type: 'woodworks:sawmill',
            count: output_count,
            ingredient: Ingredient.of(input).toJson(),
            result: output
        }).id('dawn:woodcutting/' + name)
    }

    let woodcuttingWithLogs = (output, output_count, input, input_log, name) => {
        woodcutting(output, output_count, input, name);
        woodcutting(output, output_count * 4, input_log, name + '_from_logs');
    }

    //============================//
    //------- RECIPE TYPES -------//
    //============================//

    //------ Vanilla ------//

    let addVanillaRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let log_postfix = is_fungus ? 'stems' : 'logs'

        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + '_' + log_postfix

        let output_prefix = wood_type_prefix + ':' + wood_type

        woodcutting(output_prefix + '_planks', 4, log, wood_type + '_planks')
        woodcutting(output_prefix + '_fence_gate', 1, log, wood_type + '_fence_gate')

        woodcuttingWithLogs(output_prefix + '_door', 1, planks, log, wood_type + '_door')
        woodcuttingWithLogs(output_prefix + '_trapdoor', 2, planks, log, wood_type + '_trapdoor')
        woodcuttingWithLogs(output_prefix + '_slab', 2, planks, log, wood_type + '_slab')
        woodcuttingWithLogs(output_prefix + '_stairs', 1, planks, log, wood_type + '_stairs')
        woodcuttingWithLogs(output_prefix + '_fence', 1, planks, log, wood_type + '_fence')
        woodcuttingWithLogs(output_prefix + '_sign', 1, planks, log, wood_type + '_sign')
        woodcuttingWithLogs(output_prefix + '_pressure_plate', 1, planks, log, wood_type + '_pressure_plate')
        woodcuttingWithLogs(output_prefix + '_button', 1, planks, log, wood_type + '_button')

        if (!is_fungus) {
            woodcutting(output_prefix + '_boat', 1, log, wood_type + '_boat')
        }
    }

    //------ Macaw ------//

    let addMacawRecipes = (woodType, woodTypePrefix, is_fungus) => {
        addTrapdoorRecipes(woodType, woodTypePrefix, is_fungus)
        addDoorRecipes(woodType, woodTypePrefix, is_fungus)
    }

    let trapdoor_types = [
        'classic', 'cottage', 'paper', 'beach', 'four_panel', 'tropical', 'swamp', 'barred', 'mystic', 'barn', 'glass', 'bark', 'ranch', 'bamboo', 'blossom'
    ]

    let vanilla_trapdoor_exceptions = {
        oak: 'classic',
        spruce: 'cottage',
        birch: 'paper',
        jungle: 'beach',
        dark_oak: 'four_panel',
        acacia: 'tropical',
        mangrove: 'swamp',
        crimson: 'barred',
        warped: 'mystic',
        
        // Quark backport
        bamboo: 'mesh'
    }

    let addTrapdoorRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let is_vanilla = wood_type_prefix == 'minecraft'

        let trapdoor_prefix = is_vanilla ? 'mcwtrpdoors:' : 'everycomp:mct/' + wood_type_prefix + '/'
        let log_postfix = is_fungus ? 'stems' : 'logs'

        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + '_' + log_postfix

        for (let trapdoor_type of trapdoor_types) {
            if (vanilla_trapdoor_exceptions[wood_type] === undefined || vanilla_trapdoor_exceptions[wood_type] != trapdoor_type) {
                let output = trapdoor_prefix + wood_type + '_' + trapdoor_type + '_trapdoor'
                woodcuttingWithLogs(output, 1, planks, log, wood_type + '_' + trapdoor_type + '_trapdoor')
            }
        }
    }

    let door_types = [
        'classic', 'cottage', 'paper', 'beach', 'four_panel', 'tropical', 'swamp', 'nether', 'mystic', 'barn', 'barn_glass', 'glass', 'japanese', 'japanese2', 'stable', 'stable_head', 'western', 'bark_glass', 'modern', 'bamboo', 'waffle'
    ]

    let vanilla_door_exceptions = {
        oak: 'classic',
        spruce: 'cottage',
        birch: 'paper',
        jungle: 'beach',
        dark_oak: 'four_panel',
        acacia: 'tropical',
        mangrove: 'swamp',
        crimson: 'nether',
        warped: 'mystic'
    }

    let addDoorRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let is_vanilla = wood_type_prefix == 'minecraft'

        let door_prefix = is_vanilla ? 'mcwdoors:' : 'everycomp:mcd/' + wood_type_prefix + '/'
        let log_postfix = is_fungus ? 'stems' : 'logs'

        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + '_' + log_postfix

        for (let door_type of door_types) {
            if (vanilla_door_exceptions[wood_type] === undefined || vanilla_door_exceptions[wood_type] != door_type) {
                let output = door_prefix + wood_type + '_' + door_type + '_door'
                woodcuttingWithLogs(output, 1, planks, log, wood_type + '_' + door_type + '_door')
            }
        }
    }

    //------ Decorative Blocks ------//

    let addDecorativeBlocksRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let is_vanilla = wood_type_prefix == 'minecraft'

        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + (is_fungus ? '_stems' : '_logs')

        let output_prefix = is_vanilla ? 'decorative_blocks:' : 'everycomp:db/' + wood_type_prefix + '/'
        
        woodcutting(output_prefix + wood_type + '_beam', 1, log, wood_type + '_beam')
        woodcuttingWithLogs(output_prefix + wood_type + '_seat', 1, planks, log, wood_type + '_seat')
        woodcutting(output_prefix + wood_type + '_palisade', 4, log, wood_type + '_pallisade')
        woodcuttingWithLogs(output_prefix + wood_type + '_support', 1, planks, log, wood_type + '_support')
    }

    //------ Another Furniture ------//

    let addAnotherFurnitureRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let is_vanilla = wood_type_prefix == 'minecraft'

        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + (is_fungus ? '_stems' : '_logs')

        let output_prefix = is_vanilla ? 'another_furniture:' : 'everycomp:af/' + wood_type_prefix + '/'
        
        woodcuttingWithLogs(output_prefix + wood_type + '_chair', 1, planks, log, wood_type + '_chair')
        woodcuttingWithLogs(output_prefix + wood_type + '_bench', 1, planks, log, wood_type + '_bench')
        woodcuttingWithLogs(output_prefix + wood_type + '_table', 1, planks, log, wood_type + '_table')
        woodcuttingWithLogs(output_prefix + wood_type + '_shelf', 1, planks, log, wood_type + '_shelf')
        woodcuttingWithLogs(output_prefix + wood_type + '_shutter', 2, planks, log, wood_type + '_shutter')
        woodcuttingWithLogs(output_prefix + wood_type + '_drawer', 1, planks, log, wood_type + '_drawer')
    }

    //------ Quark ------//
    
    let addQuarkRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + (is_fungus ? '_stems' : '_logs')

        let output_prefix = ''
        let is_default = false

        switch (wood_type_prefix) {
            case 'minecraft':
            case 'quark':
                output_prefix = 'quark:'
                break;
            case 'biomemakeover':
                output_prefix = 'compat_makeover:'
                break;
            case 'windswept':
                output_prefix = 'windswept:'
                break;
            default:
                output_prefix = 'everycomp:q/' + wood_type_prefix + '/'
                is_default = true
        }

        woodcuttingWithLogs(output_prefix + wood_type + '_ladder', 4, planks, log, wood_type + '_ladder')
        woodcuttingWithLogs(output_prefix + wood_type + '_vertical_planks', 1, planks, log, wood_type + '_vertical_planks')
        woodcuttingWithLogs(output_prefix + wood_type + '_post', 1, planks, log, wood_type + '_post')
        woodcuttingWithLogs(output_prefix + wood_type + '_stripped_post', 1, planks, log, wood_type + '_stripped_post')

        if (is_default) {
            event.shaped(
                '4x ' + output_prefix + wood_type + '_chest',
                [
                    'LLL',
                    'L L',
                    'LLL'
                ],
                {
                    L: log
                }
            )
        }
    }

    //------ Woodworks ------//
    
    let addWoodworksRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + (is_fungus ? '_stems' : '_logs')

        let output_prefix = ''

        switch (wood_type_prefix) {
            case 'minecraft':
                output_prefix = 'woodworks:'
                break;
            case 'biomemakeover':
                output_prefix = 'compat_makeover:ww_'
                break;
            case 'windswept':
                output_prefix = 'windswept:'
                break;
            default:
                output_prefix = 'everycomp:abnww/' + wood_type_prefix + '/'
        }

        woodcuttingWithLogs(output_prefix + wood_type + '_boards', 1, planks, log, wood_type + '_boards')

        if (wood_type_prefix == 'minecraft') {
            if (wood_type != 'oak') {
                woodcuttingWithLogs('woodworks:' + wood_type + '_ladder', 4, planks, log, wood_type + '_ladder_woodworks')

                woodcutting('woodworks:' + wood_type + '_ladder', 1, 'quark:' + wood_type + '_ladder', wood_type + '_ladder_quark_to_woodworks_conversion')
                woodcutting('quark:' + wood_type + '_ladder', 1, 'woodworks:' + wood_type + '_ladder', wood_type + '_ladder_woodworks_to_quark_conversion')

                event.shapeless(
                    'woodworks:' + wood_type + '_ladder',
                    'quark:' + wood_type + '_ladder'
                ).id('dawn:' + wood_type + '_ladder_quark_to_woodworks_conversion')
                event.shapeless(
                    'quark:' + wood_type + '_ladder',
                    'woodworks:' + wood_type + '_ladder'
                ).id('dawn:' + wood_type + '_ladder_woodworks_to_quark_conversion')
            }

            woodcutting('woodworks:' + wood_type + '_chest', 1, 'quark:' + wood_type + '_chest', wood_type + '_chest_quark_to_woodworks_conversion')
            woodcutting('quark:' + wood_type + '_chest', 1, 'woodworks:' + wood_type + '_chest', wood_type + '_chest_woodworks_to_quark_conversion')

            event.shapeless(
                'woodworks:' + wood_type + '_chest',
                'quark:' + wood_type + '_chest'
            ).id('dawn:' + wood_type + '_chest_quark_to_woodworks_conversion')
            event.shapeless(
                'quark:' + wood_type + '_chest',
                'woodworks:' + wood_type + '_chest'
            ).id('dawn:' + wood_type + '_chest_woodworks_to_quark_conversion')
        }
    }

    //------ Farmers Delight ------//
    
    let addFarmersDelightRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + (is_fungus ? '_stems' : '_logs')

        let output_prefix = ''

        switch (wood_type_prefix) {
            case 'minecraft':
                output_prefix = 'farmersdelight:'
                break;
            case 'biomemakeover':
                output_prefix = 'compat_makeover:'
                break;
            case 'windswept':
                output_prefix = 'windswept:'
                break;
            default:
                output_prefix = 'everycomp:fd/' + wood_type_prefix + '/'
        }

        woodcuttingWithLogs(output_prefix + wood_type + '_cabinet', 1, planks, log, wood_type + '_cabinet')
    }

    //------ Supplementaries ------//

    let addSupplementariesRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        let is_vanilla = wood_type_prefix == 'minecraft'

        let planks = wood_type_prefix + ':' + wood_type + '_planks'
        let log = '#' + wood_type_prefix + ':' + wood_type + (is_fungus ? '_stems' : '_logs')

        let output_prefix = is_vanilla ? 'supplementaries:' : 'supplementaries:' + wood_type_prefix + '/'
        
        woodcuttingWithLogs(output_prefix + 'hanging_sign_' + wood_type, 1, planks, log, wood_type + '_hanging_sign')
        woodcuttingWithLogs(output_prefix + 'sign_post_' + wood_type, 2, planks, log, wood_type + '_sign_post')
    }

    //==========================//
    //------- WOOD TYPES -------//
    //==========================//

    let addAllRecipes = (wood_type, wood_type_prefix, is_fungus) => {
        is_fungus = typeof is_fungus !== undefined ? is_fungus : false

        addVanillaRecipes(wood_type, wood_type_prefix, is_fungus)
        addMacawRecipes(wood_type, wood_type_prefix, is_fungus)
        addDecorativeBlocksRecipes(wood_type, wood_type_prefix, is_fungus)
        addAnotherFurnitureRecipes(wood_type, wood_type_prefix, is_fungus)
        addQuarkRecipes(wood_type, wood_type_prefix, is_fungus)
        addWoodworksRecipes(wood_type, wood_type_prefix, is_fungus)
        addFarmersDelightRecipes(wood_type, wood_type_prefix, is_fungus)
        addSupplementariesRecipes(wood_type, wood_type_prefix, is_fungus)
    }

    //------ General ------//

    woodcuttingWithLogs('minecraft:ladder', 4, 'minecraft:oak_planks', 'minecraft:oak_log', 'oak_ladder')

    woodcutting('minecraft:barrel', 1, '#minecraft:logs', 'barrel')

    //------ Vanilla ------//

    let prefix = 'minecraft'

    let vanilla = [
        'oak', 'spruce', 'birch', 'jungle', 'dark_oak', 'acacia', 'mangrove'
    ]

    let vanilla_fungus = [
        'crimson', 'warped'
    ]

    for (let wood_type of vanilla) {
        addAllRecipes(wood_type, prefix)
    }

    for (let wood_type of vanilla_fungus) {
        addAllRecipes(wood_type, prefix, true)
    }

    //------ Biome Makeover ------//

    prefix = 'biomemakeover'

    let biomemakeover = [
        'blighted_balsa', 'willow', 'swamp_cypress', 'ancient_oak'
    ]

    for (let wood_type of biomemakeover) {
        addAllRecipes(wood_type, prefix)
    }

    //------ Ecologics ------//

    prefix = 'ecologics'

    let ecologics = [
        'coconut', 'walnut', 'azalea', 'flowering_azalea'
    ]

    for (let wood_type of ecologics) {
        addAllRecipes(wood_type, prefix)
    }

    //------ Quark ------//

    prefix = 'quark'

    let quark = [
        'ancient',
        'blossom'
    ]

    for (let wood_type of quark) {
        addAllRecipes(wood_type, prefix)
    }

    event.remove({output: 'everycomp:mct/quark/bamboo_bamboo_trapdoor'})

    //------ Windswept ------//

    prefix = 'windswept'

    let windswept = [
        'chestnut', 'holly'
    ]

    for (let wood_type of windswept) {
        addAllRecipes(wood_type, prefix)
    }
})