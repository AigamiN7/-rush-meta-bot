const axios = require('axios')

const fetchLegends = async () => {
    const data = await axios.get('https://raw.githubusercontent.com/ProjectIgnis/LFLists/master/Rush-Prerelease.lflist.conf')
    return data.data
            .split('\n')
            .filter(o => o.startsWith('16'))
            .filter(o => o.split('--')[0].trim().endsWith(1))
            .filter(o => o !== '160000000 1 --Legend')
            .map(o => o.split('--')[1].replace(' (Rush)', ''))
}
                    

module.exports = {
    fetchLegends
}