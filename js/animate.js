// const changeSection = (event, elePrev, eleNext, du, topHeight, scrollNow, isStop) => {
//     let topHeightPc
//     if (isStop == true) {
//         topHeightPc = 100
//     } else {
//         topHeightPc = Math.round((scrollNow * 100) / topHeight)
//     }
//     let topHeightPcOp = Math.abs(topHeightPc - 100)

//     let animatPrevList = elePrev.querySelectorAll(".jsAnimatedOnTransformSlide")
//     let animatNextList = eleNext.querySelectorAll(".jsAnimatedOnTransformSlide")

//     // console.log(topHeightPc)

//     if (animatPrevList.length != 0) {
//         for (let i = 0; i < animatPrevList.length; i++) {
//             let attrBf = animatPrevList[i].getAttribute("data-bf-translateY-px")
//             // let attrAc = animatPrevList[i].getAttribute("data-active-translateY-px")
//             let attrAc = 0
//             let attrAf = animatPrevList[i].getAttribute("data-af-translateY-px")

//             if (du == "up") {
//                 animatPrevList[i].style.transform = `translateY(${((Math.abs(attrBf) - Math.abs(attrAc)) / (attrBf < 0 ? -100 : 100)) * topHeightPc}px)`
//             } else if (du == "down") {
//                 animatPrevList[i].style.transform = `translateY(${((Math.abs(attrAf) - Math.abs(attrAc)) / (attrAf < 0 ? -100 : 100)) * topHeightPc}px)`
//             }
//         }
//     }
//     if (animatNextList.length != 0) {
//         for (let i = 0; i < animatNextList.length; i++) {
//             let attrBf = animatNextList[i].getAttribute("data-bf-translateY-px")
//             // let attrAc = animatNextList[i].getAttribute("data-active-translateY-px")
//             let attrAc = 0
//             let attrAf = animatNextList[i].getAttribute("data-af-translateY-px")


//             if (du == "up") {
//                 if (attrAf >= attrAc) {
//                     animatNextList[i].style.transform = `translateY(${Math.abs((((Math.abs(attrBf) - Math.abs(attrAc)) / (attrBf < 0 ? 100 : -100)) * topHeightPc) - Math.abs(attrBf))}px)`
//                 } else if (attrAf < attrAc) {
//                     animatNextList[i].style.transform = `translateY(${(-(((Math.abs(attrBf) - Math.abs(attrAc)) / (attrBf < 0 ? 100 : -100)) * topHeightPc) - Math.abs(attrBf))}px)`
//                 }
//             } else if (du == "down") {
//                 if (attrBf >= attrAc) {
//                     animatNextList[i].style.transform = `translateY(${Math.abs((((Math.abs(attrBf) - Math.abs(attrAc)) / (attrBf < 0 ? -100 : 100)) * topHeightPc) - Math.abs(attrBf))}px)`
//                 } else if (attrBf < attrAc) {
//                     animatNextList[i].style.transform = `translateY(${((((Math.abs(attrBf) - Math.abs(attrAc)) / (attrBf < 0 ? 100 : -100)) * topHeightPc) - Math.abs(attrBf))}px)`
//                 }
//             }
//         }
//     }

// }

const changeSection = (du, elePrev, eleNext) => {
    let animatPrevList = elePrev.querySelectorAll(".jsAnimatedOnTransformSlide")
    let animatNextList = eleNext.querySelectorAll(".jsAnimatedOnTransformSlide")

    if (animatPrevList.length != 0) {
        for (let i = 0; i < animatPrevList.length; i++) {
            let attrBf = animatPrevList[i].getAttribute("data-bf-translateY-px")
            let attrAf = animatPrevList[i].getAttribute("data-af-translateY-px")

            if (du == "up") {
                animatPrevList[i].style.transform = `translateY(${attrBf}px)`
            } else if (du == "down") {
                animatPrevList[i].style.transform = `translateY(${attrAf}px)`
            }
        }
    }

    if (animatNextList.length != 0) {
        for (let i = 0; i < animatNextList.length; i++) {
            let attrAc = animatNextList[i].getAttribute("data-active-translateY-px")
            animatNextList[i].style.transform = `translateY(${attrAc}px)`
            animatNextList[i].style.transform = `translateY(${attrAc}px)`
        }
    }

}


const initSection = (getSection) => {
    console.log("start function")
    let i = 0
    for (let thiss of getSection) {
        if (i > 0) {
            const selectAll = thiss.querySelectorAll(".jsAnimatedOnTransformSlide")
            if (selectAll.length > 0) {
                for (let j = 0; j < selectAll.length; j++) {
                    selectAll[j].setAttribute('style', `transform: translateY(${selectAll[j].getAttribute("data-bf-translateY-px")}px)`)
                    console.log(selectAll[j])
                }
            }
        }
        i++
    }
}

const textHeaderAnimate = async (docHeaderSection, keywords) => {
    let textHeader = docHeaderSection.querySelector(".textHeader")
    const show = async (kw) => {
        textHeader.innerHTML = ""
        let kwL = kw.length
        let kwN = 0


        return new Promise((res) => {
            let setTm = () => {
                let tmId = setTimeout(function st() {
                    if (kwN < kwL) {
                        textHeader.innerHTML += kw[kwN]
                        setTm()
                    } else {
                        res(true)
                        clearTimeout(tmId)
                    }
                    kwN++
                }, 150)
            }
            setTm()
        })
    }
    const hide = async (kw) => {
        textHeader.innerHTML = kw
        let kwN = kw.length - 1
        let kwP = kw.split('')
        return new Promise((res) => {
            let setTm = () => {
                let tmId = setTimeout(function st() {
                    if (0 <= kwN) {
                        kwP.pop()
                        textHeader.innerHTML = kwP.join('')
                        setTm()
                    } else {
                        res(true)
                        clearTimeout(tmId)
                    }
                    kwN--
                }, 120)
            }
            setTm()
        })
    }

    let k = 0
    let stL = async (ms) => {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, ms)
        })
    }

    do {
        console.log("show")
        await show(keywords[k]).then(async () => {
            await stL(5000)
            console.log("hide")
            await hide(keywords[k]).then(async () => {
                await stL(250)
                if (k == keywords.length - 1) {
                    k = 0
                } else {
                    k++
                }
            })
        })
    } while (k < keywords.length);
}

export default {
    changeSection,
    initSection,
    textHeaderAnimate
}