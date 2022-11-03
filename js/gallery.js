var carouselEle = []

const init = () => {
    let carousels = document.querySelectorAll(".carousel")
    for (let i = 0; i < carousels.length; i++) {
        carouselEle[i] = load(carousels[i])
    }
}

const reload = () => {
    let carousels = document.querySelectorAll(".carousel")
    for (let i = 0; i < carousels.length; i++) {
        let thisEle = carouselEle[i]
        thisEle.carouselPrevBtn.removeEventListener("click", thisEle.eventFunc.cPHandleClick)
        thisEle.carouselNextBtn.removeEventListener("click", thisEle.eventFunc.cNHandleClick)
        thisEle.carouselImgSetScroll.removeEventListener('transitionstart', thisEle.eventFunc.iSHandleTransitionStart)
        thisEle.carouselImgSetScroll.removeEventListener('transitionend', thisEle.eventFunc.iSHandleTransitionEnd)

        thisEle = load(carousels[i])
    }
}

const load = (thisEle) => {
    let imgCount = 0
    let j

    const carouselPrevBtn = thisEle.querySelector(".carousel-prev-btn")
    const carouselNextBtn = thisEle.querySelector(".carousel-next-btn")
    const carouselImgSetContainer = thisEle.querySelector(".carousel-imgSetContainer")
    const carouselImgSetScroll = thisEle.querySelector(".carousel-imgSetScroll")
    const carouselGalleryScroll = thisEle.querySelector(".carousel-galleryScroll")

    let imgAll = carouselImgSetScroll.querySelectorAll(".carousel-img")
    let galleryAll = carouselGalleryScroll.querySelectorAll(".carousel-galleryScroll-galleryImg")

    let imgAllcount = imgAll.length
    let galleryAllcount = galleryAll.length

    if (imgAllcount != galleryAllcount) {
        j = Math.max(imgAllcount, galleryAllcount, 0)
        imgAllcount = Math.min(imgAllcount, galleryAllcount, j)
        galleryAllcount = imgAllcount
    }

    const changeActiveGallery = (no, globalEle) => {
        let rmActiveEle = globalEle.querySelectorAll(".active")
        let activeEle = globalEle.querySelectorAll(".carousel-galleryScroll-galleryImg")
        for (let tE of rmActiveEle) {
            tE.classList.remove("active")
        }
        activeEle[no].classList.add("active")
    }

    for (let i = 0; i < imgAllcount; i++) {
        if (imgAllcount == 0) {
            galleryAll[i].classList.add("active")
        }
        imgAll[i].setAttribute("data-id", i)
        galleryAll[i].setAttribute("data-id", i)
        galleryAll[i].addEventListener("click", (e) => {
            imgCount = galleryAll[i].getAttribute("data-id")
            changeActiveGallery(imgCount, carouselGalleryScroll)
            // galleryAll[i].querySelector(".foreground-black")
            carouselImgSetScroll.style.transform = `translateX(${carouselImgSetContainer.getBoundingClientRect().width * -(imgCount)}px)`
        })
    }

    const cPHandleClick = () => {
        console.log("prev")
        if (imgCount > 0) {
            imgCount--
            changeActiveGallery(imgCount, carouselGalleryScroll)
            carouselImgSetScroll.style.transform = `translateX(${carouselImgSetContainer.getBoundingClientRect().width * -(imgCount)}px)`
        }
    }

    const cNHandleClick = () => {
        console.log("next")
        if (imgCount >= 0 && imgCount < imgAllcount - 1) {
            imgCount++
            changeActiveGallery(imgCount, carouselGalleryScroll)
            carouselImgSetScroll.style.transform = `translateX(${carouselImgSetContainer.getBoundingClientRect().width * -(imgCount)}px)`
        }
    }

    const iSHandleTransitionStart = () => {
        carouselPrevBtn.removeEventListener("click", cPHandleClick)
        carouselNextBtn.removeEventListener("click", cNHandleClick)
    }

    const iSHandleTransitionEnd = () => {
        carouselPrevBtn.addEventListener("click", cPHandleClick)
        carouselNextBtn.addEventListener("click", cNHandleClick)
    }

    // console.log(carouselImgSetContainer.getBoundingClientRect())

    carouselPrevBtn.addEventListener("click", cPHandleClick)
    carouselNextBtn.addEventListener("click", cNHandleClick)

    carouselImgSetScroll.addEventListener('transitionstart', iSHandleTransitionStart)
    carouselImgSetScroll.addEventListener('transitionend', iSHandleTransitionEnd)

    return {
        carouselImgSetScroll,
        carouselPrevBtn,
        carouselNextBtn,
        eventFunc: {
            cPHandleClick,
            cNHandleClick,
            iSHandleTransitionStart,
            iSHandleTransitionEnd
        }
    }
}

export default {
    init,
    reload
}