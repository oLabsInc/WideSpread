const zoneMenuBtn = document.getElementById('zoneMenuBtn')
const pageMenuBtn = document.getElementById('pageMenuBtn')
const subMenu = document.getElementById('subMenu')
const zoneMenu = document.getElementById('zoneMenu')
const zoneMenuLeft = document.getElementById('zoneMenuLeft')
const zoneMenuRight = document.getElementById('zoneMenuRight')
const zoneItems = document.querySelectorAll('.zone-item')

// const minZoneWidth = parseInt(window.screenWidth / zoneItems.length)
const pageWidth = document.body.clientWidth
console.log('pageWidth: ', pageWidth)
const totalZoneLength = zoneItems.length
console.log('totalZoneLength: ', totalZoneLength)

const eachZoneLength = (pageWidth / totalZoneLength) - 10
console.log('eachZoneLength: ', eachZoneLength)

const minZonesForScroll = (eachZoneLength / pageWidth) > 100
console.log('minZonesForScroll: ', minZonesForScroll)

zoneItems.forEach(zoneItem => {
    if (eachZoneLength > 100) {
        zoneItem.style.maxWidth = '250px'
        zoneItem.style.width = eachZoneLength + 'px'
    } else {
        const zoneItemP = zoneItem.querySelector('p')
        zoneItemP.style.minWidth = 'fit-content'
        console.log('zoneItemP', zoneItemP.clentWidth)
        zoneItem.querySelector('p').style.minWidth = 110 + 'px'

    }

})


zoneItems.forEach((zone, index) => {
    console.log(zone.querySelector('p').scrollWidth)
    const zoneWidth = zone.scrollWidth
    zone.addEventListener('click', e => {
        console.log(zone)
    })
})




zoneMenuBtn.addEventListener('click', e => {
    zoneItems.forEach((zone, index) => {
        console.log(zone.querySelector('p').offsetWidth)
        console.log(getComputedStyle(zone.querySelector('p')).minWidth)
        const zoneWidth = zone.scrollWidth
        zone.addEventListener('click', e => {
            console.log(zone)
        })
    })

    subMenu.classList.toggle('hidden')
    zoneMenuBtn.classList.toggle('sub-menu-open')
    zoneMenu.classList.toggle('open')
    const totalWidth = zoneMenu.scrollWidth
    const visibleX = zoneMenu.clientWidth
    let currentXPosition = zoneMenu.offsetLeft
    let totalScreenWidth = screenWidth
    console.log(totalScreenWidth)
    if (totalWidth < totalScreenWidth) {
        zoneMenuLeft.classList.add('hidden')
        zoneMenuRight.classList.add('hidden')
    } else {
        zoneMenuLeft.classList.remove('hidden')
        zoneMenuRight.classList.remove('hidden')

    }

    if (zoneMenu.offsetLeft === 0) {
        zoneMenuLeft.classList.add('hidden')
        console.log('dont show left arrow button')
    } else {
        zoneMenuLeft.classList.remove('hidden')
    }
})




zoneMenuLeft.addEventListener('click', e => {
    console.log('clientWidth', zoneMenu.clientWidth)
    console.log('offsetWidth', zoneMenu.offsetWidth)
    console.log('scrollWidth', zoneMenu.scrollWidth)
    const checkInt = zoneMenu.offsetLeft * 3
    console.log(checkInt)
    console.log('clientLeft', zoneMenu.offsetLeft)
    console.log(window.screenLeft)
    console.log(screenWidth)

    const zoneMenuWidth = zoneMenu.scrollWidth
    const currentZoneMenuPosition = zoneMenu.offsetLeft

    const menuLength = zoneItems.length * 110
    const singleScrollDistance = screenWidth / zoneItems.length
    let currentPosition = zoneMenu.offsetLeft
    let newPosition = currentPosition + singleScrollDistance
    let styledPosition = newPosition + 'px'
    zoneMenu.style.marginLeft = styledPosition
    if (zoneMenu.offsetLeft === 0) {
        zoneMenuLeft.classList.add('hidden')
    } else {
        zoneMenuLeft.classList.remove('hidden')
    }

    const menuXShown = zoneMenu.offsetLeft - screenWidth
    const menuLeft = menuLength + menuXShown

    if (menuLeft <= 0) {
        zoneMenuRight.classList.add('hidden')
    } else {
        zoneMenuRight.classList.remove('hidden')
    }

})
zoneMenuRight.addEventListener('click', e => {
    const checkInt = zoneMenu.offsetLeft * 3
    const zoneMenuWidth = zoneMenu.scrollWidth
    const currentZoneMenuPosition = zoneMenu.offsetLeft

    const menuLength = zoneItems.length * 110
    const singleScrollDistance = screenWidth / zoneItems.length
    let currentPosition = zoneMenu.offsetLeft
    let newPosition = currentPosition - singleScrollDistance
    let styledPosition = newPosition + 'px'
    zoneMenu.style.marginLeft = styledPosition
    if (zoneMenu.offsetLeft === 0) {
        zoneMenuLeft.classList.add('hidden')
    } else {
        zoneMenuLeft.classList.remove('hidden')
    }

    const menuXShown = zoneMenu.offsetLeft - screenWidth
    const menuLeft = menuLength + menuXShown

    if (menuLeft <= 0) {
        zoneMenuRight.classList.add('hidden')
    }



})
