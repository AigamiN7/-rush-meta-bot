// const axios = require('axios')

// const fetchLegends = async () => {
//     const data = await axios.get('https://raw.githubusercontent.com/ProjectIgnis/LFLists/master/Rush-Prerelease.lflist.conf')
//     return data.data
//             .split('\n')
//             .filter(o => o.startsWith('16'))
//             .filter(o => o.split('--')[0].trim().endsWith(1))
//             .filter(o => o !== '160000000 1 --Legend')
//             .map(o => o.split('--')[1].replace(' (Rush)', ''))
// }
         
const fetchLegends = () => [
    'Blue-Eyes White Dragon',
    'Dark Magician',
    'Red-Eyes Black Dragon',
    'Summoned Skull',
    'Cyber-Tech Alligator',
    'Millennium Shield',
    'Luster Dragon',
    'Archfiend Soldier',
    'Vorse Raider',
    'Alien Shocktrooper',
    'Mystical Elf',
    'Darklord Zerato',
    'The Creator',
    'Buster Blader',
    'Barrel Dragon',
    'Levia-Dragon - Daedalus',
    'Jinzo',
    'Abyss Soldier',
    'Twin-Barrel Dragon',
    'Magician\'s Valkyria',
    'Pitch-Black Warwolf',
    'Mirage Dragon',
    'Flame Ruler',
    'Shield & Sword',
    'Card Destruction',
    'Upstart Goblin',
    'Tribute to the Doomed',
    'The Warrior Returning Alive',
    'Graceful Charity',
    'Dark Hole',
    'Power Bond',
    'Dark Factory of Mass Production',
    'Monster Reincarnation',
    'Pot of Greed',
    'Recurring Nightmare',
    'Monster Reborn',
    'Smashing Ground',
    'Pot of Avarice',
    'Heavy Storm',
    'Torrential Tribute',
    'Trap Hole',
    'Sakuretsu Armor',
    'Mirror Force',
    'Widespread Ruin',
    'Magical Cylinder',
    'Gilford the Lightning'
]

module.exports = {
    fetchLegends
}