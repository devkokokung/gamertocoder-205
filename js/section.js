import animate from './animate.js'
import gallery from './gallery.js'

let transformTimeMs = 1120, transformTimeMsDf = 1120

const sectionStory = {
    0: {
        afterMovein: [
            []
        ]
    },
    1: {

    }
}

const sectionFunction = [async (apiData, dataDocument, t) => {
    /* Section header */
    let thisSection = dataDocument.getSection[0]
    let getEleBg = thisSection.querySelector('.section_header_bg_charactersContainer')
    let getBgEle = thisSection.querySelector('.section_header_bg')
    let characters = {
        characters_01: {
            image: t.func.findAssetsApi(apiData.assets.characters, "cyberguy_01")
        },
        characters_02: {
            image: t.func.findAssetsApi(apiData.assets.characters, "cyberguy_02")
        },
        characters_03: {
            image: t.func.findAssetsApi(apiData.assets.characters, "cyberguy_03")
        }
    }
    let characterKeys = Object.keys(characters)


    for (let characterKey of characterKeys) {
        let createEle = document.createElement('div')
        let thisImg = document.createElement('img')
        let thisEleAnimate = document.createElement('div')
        thisImg.src = characters[characterKey].image
        thisEleAnimate.classList.add(characterKey + '_animate')
        thisEleAnimate.appendChild(thisImg)
        createEle.classList.add(characterKey)
        createEle.appendChild(thisEleAnimate)

        getEleBg.appendChild(createEle)
    }

    getBgEle.style.backgroundImage = `url('${t.func.findAssetsApi(apiData.assets.banner, "01")}')`


},
async (apiData, dataDocument, t) => {
    /* Section_A */
    let thisSection = dataDocument.getSection[1]

},
async (apiData, dataDocument, t) => {
    /* Section_B */
    let thisSection = dataDocument.getSection[2]
    let grid1Gallery = thisSection.querySelector(".appSectionForeground_grid1-gallery")
    let grid1GalleryContainer = thisSection.querySelector(".appSectionForeground_grid1-galleryContainer")

    let galleryScroll = document.createElement("div")
    galleryScroll.classList.add("appSectionForeground_grid1-galleryScroll")
    galleryScroll.classList.add("isDontScroll")
    for (let data of apiData.minigames) {
        let galleryImg = document.createElement("div")
        let galleryBlock = document.createElement("div")
        let imgEle = document.createElement("img")
        let fgBlack = document.createElement("div")

        galleryImg.classList.add("appSectionForeground_grid1-galleryImg")
        galleryBlock.classList.add("appSectionForeground_grid1-galleryImgBlock")
        fgBlack.classList.add("foreground-black")

        imgEle.src = data.icon
        imgEle.setAttribute('alt', data.name)

        fgBlack.innerHTML = (`<div class="text-head">${data.name}</div>`)

        galleryBlock.appendChild(imgEle)
        galleryBlock.appendChild(fgBlack)
        galleryImg.appendChild(galleryBlock)

        galleryScroll.appendChild(galleryImg)
    }

    let eleIO = new IntersectionObserver((e) => {
        if (e[0].isIntersecting == true) {
            grid1GalleryContainer.innerHTML = ""
            console.warn("added")
            grid1GalleryContainer.appendChild(galleryScroll)
            eleIO.disconnect(grid1Gallery)
        }
    })
    eleIO.observe(grid1Gallery)
    // for (let data of apiData.minigames) {
    //     let galleryImg = document.createElement("div")
    //     let galleryBlock = document.createElement("div")
    //     let imgEle = document.createElement("img")
    //     let fgBlack = document.createElement("div")

    //     galleryImg.classList.add("appSectionForeground_grid1-galleryImg")
    //     galleryBlock.classList.add("appSectionForeground_grid1-galleryImgBlock")
    //     fgBlack.classList.add("foreground-black")

    //     imgEle.src = data.icon
    //     imgEle.setAttribute('alt', data.name)

    //     fgBlack.innerHTML = (`<div class="text-head">${data.name}</div>`)

    //     galleryBlock.appendChild(imgEle)
    //     galleryBlock.appendChild(fgBlack)
    //     galleryImg.appendChild(galleryBlock)

    //     galleryScroll.appendChild(galleryImg)
    // }

},
async (apiData, dataDocument, t) => {
    /* Section_D */
    let thisSection = dataDocument.getSection[3]

    let grid2Carousel = thisSection.querySelector(".appSectionForeground_grid2-carousel")
    let eleCarousel = grid2Carousel.querySelector(".carousel")
    let eleCarouselImgScroll = eleCarousel.querySelector(".carousel-imgSetScroll")
    let eleCarouselGalleryScroll = eleCarousel.querySelector(".carousel-galleryScroll")
    eleCarouselImgScroll.innerHTML = ''
    eleCarouselGalleryScroll.innerHTML = ''

    let apiAssetWallpaper = apiData.assets.wallpaper.slice(0, 7)
    for (let thisImg of apiAssetWallpaper) {
        let carouselImg = document.createElement("div")

        let galleryImg = document.createElement("div")
        let galleryImgBlock = document.createElement("div")
        let thisEleImg = document.createElement("img")

        carouselImg.classList.add("carousel-img")
        galleryImg.classList.add("carousel-galleryScroll-galleryImg")
        galleryImgBlock.classList.add("carousel-galleryScroll-galleryImgBlock")
        thisEleImg.src = thisImg

        carouselImg.appendChild(thisEleImg)

        galleryImgBlock.innerHTML = `${thisEleImg.outerHTML}<div class="foreground-black"></div>`
        galleryImg.appendChild(galleryImgBlock)

        eleCarouselImgScroll.appendChild(carouselImg)
        eleCarouselGalleryScroll.appendChild(galleryImg)
    }

    gallery.reload()
},
async (apiData, dataDocument, t) => {
    /* Section_E */
    let thisSection = dataDocument.getSection[4]

}]

const changeSection = (du, dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, handleSlideMoving, scrollYNow) => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchstart', handleSlideStart)
    window.removeEventListener('touchmove', handleSlideMoving)
    window.removeEventListener('touchend', handleSlideEnd)

    let elePrev, eleNext, scrollToHeight

    if (du == "up") {
        elePrev = dataDocument.getSection[sectionNo + 1]
        eleNext = dataDocument.getSection[sectionNo]
        scrollToHeight = scrollYNow - elePrev.getBoundingClientRect().height
    } else if (du == "down") {
        elePrev = dataDocument.getSection[sectionNo - 1]
        eleNext = dataDocument.getSection[sectionNo]
        scrollToHeight = scrollYNow + eleNext.getBoundingClientRect().height
    }

    dataDocument.mainScroll.addEventListener("transitionstart", function msHandleTransitionStart(e) {
        let eventPath = e.path || (e.composedPath && e.composedPath())
        if (eventPath[0] == dataDocument.mainScroll) {
            animate.changeSection(du, elePrev, eleNext, transformTimeMs)
            console.log("transition start")
            // dataDocument.mainScroll.removeEventListener('transitionstart', msHandleTransitionStart)
        }
    }, { once: true })

    // dataDocument.mainScroll.addEventListener("transitionend", function msHandleTransitionEnd(e) {
    // let eventPath = e.path || (e.composedPath && e.composedPath())
    // if (eventPath[0] == dataDocument.mainScroll) {
    setTimeout(() => {
        console.log("transition end")
        dataDocument.mainScroll.style.transition = ""
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('touchstart', handleSlideStart)
        window.addEventListener('touchmove', handleSlideMoving)
        window.addEventListener('touchend', handleSlideEnd)
        // dataDocument.mainScroll.removeEventListener('transitionend', msHandleTransitionEnd)
    }, transformTimeMs + 100)
    // }
    // }, { once: true })

    dataDocument.mainScroll.style.transition = `all ${transformTimeMs / 1000}s cubic-bezier(0, 0.4, 0.6, 1)`
    dataDocument.mainScroll.style.transform = `translateY(${scrollToHeight - (scrollToHeight * 2)}px)`

    return scrollToHeight
}

const movingSection = (scrollYNow, scrollYNew, dataDocument, sectionNo) => {
    /*
        (scrollYNew < 0) = scroll up
        (scrollYNew >= 0) = scroll down
    */

    let eleNext, elePrev, du, isStop = false
    let topHeight

    scrollYNew = (scrollYNew / 100) * 77

    if (scrollYNew < 0) {
        eleNext = dataDocument.getSection[sectionNo - 1]
        elePrev = dataDocument.getSection[sectionNo]
        topHeight = eleNext.getBoundingClientRect().height
        du = 'up'
    } else if (scrollYNew >= 0) {
        elePrev = dataDocument.getSection[sectionNo]
        eleNext = dataDocument.getSection[sectionNo + 1]
        topHeight = eleNext.getBoundingClientRect().height
        du = 'down'
    }

    animate.movingSection(elePrev, eleNext, du, topHeight, scrollYNew, isStop)
    dataDocument.mainScroll.style.transform = `translateY(-${scrollYNow + scrollYNew}px)`
}

const navbarShow = (dataDocument, isOpen) => {
    if (isOpen == true) {
        dataDocument.navigation.classList.add("active")
    } else {
        dataDocument.navigation.classList.remove("active")
    }
}

export default async function (apiData, dataDocument, t) {
    let scrollYNow = 0

    let sectionNo = 0, sectionNoMin = 0, sectionNoMax = 4
    let startY, dist = 0

    let donotScroll = false

    gallery.init(document)

    for (let thisF of sectionFunction) {
        await thisF(apiData, dataDocument, t)
    }

    console.timeEnd("Time of loading: ")

    animate.initSection(dataDocument.getSection)
    dataDocument.bodyScroll.classList.add("onload")

    setTimeout(() => {
        dataDocument.bodyScroll.addEventListener("transitionend", function bdHandleTransition() {
            dataDocument.navigation.classList.add("show")
            animate.textHeaderAnimate(dataDocument.getSection[0], ["PLAY", "CREATIVE", "ENJOY"])
            dataDocument.bodyScroll.removeEventListener("transitionend", bdHandleTransition)

            const handleWheel = (event) => {
                console.log("scrolling")
                let eventPath = event.path || (event.composedPath && event.composedPath())
                for (let j = 0; j < eventPath.length - 3; j++) {
                    if (/(isDontScroll)/.test(typeof eventPath[j].classList.value == 'undefined' ? "null" : eventPath[j].classList.value)) {
                        break
                    }
                    if (j == eventPath.length - 4) {
                        if (event.deltaY < 0) {
                            console.log("scroll up")
                            if (sectionNo == sectionNoMin) {
                                sectionNo = sectionNoMin
                            } else {
                                if (sectionNo == 1) {
                                    navbarShow(dataDocument, false)
                                }
                                sectionNo--
                                scrollYNow = changeSection("up", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, handleSlideMoving, scrollYNow)
                                console.log(sectionNo)
                            }
                        } else if (event.deltaY > 0) {
                            console.log("scroll down")
                            if (sectionNo == sectionNoMax) {
                                sectionNo = sectionNoMax
                            } else {
                                if (sectionNo == 0) {
                                    navbarShow(dataDocument, true)
                                }
                                sectionNo++
                                scrollYNow = changeSection("down", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, handleSlideMoving, scrollYNow)
                                console.log(sectionNo)
                            }
                        }
                    }
                }
            }

            const handleSlideStart = (event) => {
                window.removeEventListener('wheel', handleWheel);
                let eventPath = event.path || (event.composedPath && event.composedPath())

                for (let j = 0; j < eventPath.length - 3; j++) {
                    if (/(isDontScroll)/.test(typeof eventPath[j].classList.value == 'undefined' ? "null" : eventPath[j].classList.value)) {
                        donotScroll = true
                    } else {
                        if (j == eventPath.length - 4) {
                            let touchobj = event.changedTouches[0]
                            startY = touchobj.pageY
                        }
                    }
                }
            }
            const handleSlideMoving = (event) => {
                if (donotScroll == false) {
                    let touchobj = event.changedTouches[0]
                    switch (sectionNo) {
                        case sectionNoMin:
                            if (touchobj.pageY < startY) {
                                movingSection(scrollYNow, -touchobj.pageY + startY, dataDocument, sectionNo)
                            } else {
                                movingSection(scrollYNow, 0, dataDocument, sectionNo)
                            }
                            break;
                        case sectionNoMax:
                            console.log(sectionNoMax)
                            if (touchobj.pageY > startY) {
                                movingSection(scrollYNow, -touchobj.pageY + startY, dataDocument, sectionNo)
                            } else {
                                movingSection(scrollYNow, 0, dataDocument, sectionNo)
                            }
                            break;
                        default:
                            movingSection(scrollYNow, -touchobj.pageY + startY, dataDocument, sectionNo)
                            break;
                    }
                }
            }
            const handleSlideEnd = (event) => {
                if (donotScroll == false) {
                    let touchobj = event.changedTouches[0]
                    dist = touchobj.pageY - startY

                    if (dist > 0) {
                        console.log("slide up")
                        if (sectionNo == sectionNoMin) {
                            sectionNo = sectionNoMin
                        } else {
                            if (sectionNo == 1) {
                                navbarShow(dataDocument, false)
                            }
                            sectionNo--
                            scrollYNow = changeSection("up", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, handleSlideMoving, scrollYNow)
                            console.log(sectionNo)
                        }
                    } else if (dist < 0) {
                        console.log("slide down")
                        if (sectionNo == sectionNoMax) {
                            sectionNo = sectionNoMax
                        } else {
                            if (sectionNo == 0) {
                                navbarShow(dataDocument, true)
                            }
                            sectionNo++
                            scrollYNow = changeSection("down", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, handleSlideMoving, scrollYNow)
                            console.log(sectionNo)
                        }
                    } else {
                    }

                } else {
                    donotScroll = false
                    window.addEventListener('wheel', handleWheel);
                }

            }
            window.addEventListener('wheel', handleWheel);
            window.addEventListener('touchstart', handleSlideStart)
            window.addEventListener('touchmove', handleSlideMoving)
            window.addEventListener('touchend', handleSlideEnd)
        })
    }, 600)
}