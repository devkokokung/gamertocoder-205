import animate from './animate.js'
import gallery from './gallery.js'

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
            grid1GalleryContainer.appendChild(galleryScroll)
            eleIO.disconnect(grid1Gallery)
        }
    })
    eleIO.observe(grid1Gallery)

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

const changeSection = (du, dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, scrollYNow) => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchstart', handleSlideStart)
    window.removeEventListener('touchend', handleSlideEnd)

    // console.log(document.body.getBoundingClientRect().height)

    let elePrev, eleNext, scrollToHeight

    if (du == "up") {
        elePrev = dataDocument.getSection[sectionNo + 1]
        eleNext = dataDocument.getSection[sectionNo]
        scrollToHeight = scrollYNow - elePrev.offsetHeight
    } else if (du == "down") {
        elePrev = dataDocument.getSection[sectionNo - 1]
        eleNext = dataDocument.getSection[sectionNo]
        scrollToHeight = scrollYNow + eleNext.offsetHeight
    }

    // let scrollToHeight = document.body.getBoundingClientRect().height * sectionNo
    // scrollToHeight = window.innerHeight * sectionNo

    /* OLD CODE */
    // dataDocument.mainContent.scrollTo({
    //     top: scrollToHeight,
    //     behavior: 'smooth'
    // });

    // let isEemovedEvent = false, startScroll

    // dataDocument.mainContent.addEventListener("scroll", function msHandleScroll(event) {
    //     let mathRoundScrollTop
    //     if (isEemovedEvent == true) {
    //         mathRoundScrollTop = scrollToHeight
    //     } else {
    //         mathRoundScrollTop = Math.round(dataDocument.mainContent.scrollTop)
    //     }
    //     startScroll = typeof startScroll == "undefined" ? mathRoundScrollTop : startScroll
    //     animate.changeSection(event, elePrev, eleNext, du, window.innerHeight, startScroll > scrollToHeight ? startScroll - mathRoundScrollTop : mathRoundScrollTop - startScroll, isEemovedEvent)
    //     // console.log(Math.round(dataDocument.mainScroll.scrollTop) + " : " + Math.round(scrollToHeight))
    //     if (isEemovedEvent == false && mathRoundScrollTop >= Math.round(scrollToHeight - 4) && mathRoundScrollTop <= Math.round(scrollToHeight + 4)) {
    //         isEemovedEvent = true
    //         setTimeout(() => {
    //             window.addEventListener('wheel', handleWheel);
    //             window.addEventListener('touchstart', handleSlideStart)
    //             window.addEventListener('touchend', handleSlideEnd)
    //             dataDocument.mainContent.removeEventListener('scroll', msHandleScroll)
    //         }, 100)
    //     }
    // }, false)

    let isEemovedEvent = false, startScroll

    dataDocument.mainScroll.addEventListener("transitionstart", function msHandleTransitionStart(e) {
        animate.changeSection(du, elePrev, eleNext)

        dataDocument.mainScroll.addEventListener("transitionend", function msHandleTransitionEnd(h) {
            setTimeout(() => {
                window.addEventListener('wheel', handleWheel);
                window.addEventListener('touchstart', handleSlideStart)
                window.addEventListener('touchend', handleSlideEnd)
                dataDocument.mainScroll.removeEventListener('transitionrun', msHandleTransitionStart)
                dataDocument.mainScroll.removeEventListener('transitionend', msHandleTransitionEnd)
            }, 100)
        })
    })

    dataDocument.mainScroll.style.transform = `translateY(-${scrollToHeight}px)`


    // dataDocument.mainScroll.addEventListener("transitionrun", function msHandleScroll(event) {
    //     let mathRoundScrollTop
    //     if (isEemovedEvent == true) {
    //         mathRoundScrollTop = scrollToHeight
    //     } else {
    //         mathRoundScrollTop = Math.round(dataDocument.mainContent.scrollTop)
    //     }
    //     startScroll = typeof startScroll == "undefined" ? mathRoundScrollTop : startScroll
    //     animate.changeSection(event, elePrev, eleNext, du, window.innerHeight, startScroll > scrollToHeight ? startScroll - mathRoundScrollTop : mathRoundScrollTop - startScroll, isEemovedEvent)
    //     // console.log(Math.round(dataDocument.mainScroll.scrollTop) + " : " + Math.round(scrollToHeight))

    //     dataDocument.mainScroll.addEventListener("transitionend", function msHandleTransitionEnd() => {

    //     })
    //     if (isEemovedEvent == false && mathRoundScrollTop >= Math.round(scrollToHeight - 4) && mathRoundScrollTop <= Math.round(scrollToHeight + 4)) {
    //         isEemovedEvent = true

    //     }
    // }, false)

    return scrollToHeight
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

            let sectionNo = 0, sectionNoMin = 0, sectionNoMax = 4
            let startY, dist = 0

            const handleWheel = (event) => {
                let isDontScroll = false
                for (let j = 0; j < event.path.length - 3; j++) {
                    if (/(isDontScroll)/.test(typeof event.path[j].classList.value == 'undefined' ? "null" : event.path[j].classList.value)) {
                        isDontScroll = true
                        break
                    }
                    if (j == event.path.length - 4) {
                        if (isDontScroll == false) {
                            if (event.deltaY < 0) {
                                console.log("scroll up")
                                if (sectionNo == sectionNoMin) {
                                    sectionNo = sectionNoMin
                                } else {
                                    if (sectionNo == 1) {
                                        navbarShow(dataDocument, false)
                                    }
                                    sectionNo--
                                    scrollYNow = changeSection("up", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, scrollYNow)
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
                                    scrollYNow = changeSection("down", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, scrollYNow)
                                    console.log(sectionNo)
                                }
                            }
                        }
                    }
                }
            }

            const handleSlideStart = (event) => {
                let touchobj = event.changedTouches[0]
                startY = touchobj.pageY
            }
            const handleSlideEnd = (event) => {
                let touchobj = event.changedTouches[0]
                dist = touchobj.pageY - startY

                let isDontScroll = false
                for (let j = 0; j < event.path.length - 3; j++) {
                    if (/(isDontScroll)/.test(typeof event.path[j].classList.value == 'undefined' ? "null" : event.path[j].classList.value)) {
                        isDontScroll = true
                        break
                    }
                    if (j == event.path.length - 4) {
                        if (isDontScroll == false) {
                            if (dist > 0) {
                                console.log("slide up")
                                if (sectionNo == sectionNoMin) {
                                    sectionNo = sectionNoMin
                                } else {
                                    if (sectionNo == 1) {
                                        navbarShow(dataDocument, false)
                                    }
                                    sectionNo--
                                    scrollYNow = changeSection("up", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, scrollYNow)
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
                                    scrollYNow = changeSection("down", dataDocument, sectionNo, handleWheel, handleSlideStart, handleSlideEnd, scrollYNow)
                                    console.log(sectionNo)
                                }
                            }
                        }
                    }
                }
            }
            window.addEventListener('wheel', handleWheel);
            window.addEventListener('touchstart', handleSlideStart, false)
            window.addEventListener('touchend', handleSlideEnd, false)
        })
    }, 600)
}