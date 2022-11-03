import section from "./section.js"

(async (f) => {
    try {
        console.time("Time of loading: ")
        window.addEventListener('load', async () => {
            /* run zone */
            const t = f()
            /* getelementbyid */
            const dataDocument = {
                bodyContainer: document.getElementById("_bodyContainer"),
                navigation: document.getElementById("navigation"),
                bodyScroll: document.getElementById("_bodyScroll"),
                appMain: document.getElementById("_appMain"),
                mainContent: document.getElementById("mainContent"),
                mainScroll: document.getElementById("_mainScroll"),
                layerFixedA: document.getElementById("layerFixedA"),
                layerFixedB: document.getElementById("layerFixedB"),
                getSection: [
                    document.getElementById("section_head"),
                    document.getElementById("section_a"),
                    document.getElementById("section_b"),
                    document.getElementById("section_d"),
                    document.getElementById("section_e")
                ]
            }

            let apiData = {}
            let apiDataKey = Object.keys(t.API.external.preload)

            for (let i = 0; i < apiDataKey.length; i++) {
                await t.func.getApiData(t.API.external.preload[apiDataKey[i]]).then((response) => {
                    if (response.status == 200) {
                        console.log("API Success: " + t.API.external.preload[apiDataKey[i]])
                        return response.json()
                    } else {
                        console.log("API Error: " + response.statusText)
                    }
                }).then((res) => {
                    apiData[apiDataKey[i]] = res
                }).catch((err) => {
                    console.log("API Error: " + err)
                    apiData[apiDataKey[i]] = false
                })
            }

            console.time("preloadImg")
            let assetsImg = apiData['assets']
            let assetsImgKey = Object.keys(assetsImg)
            for (let i = 0; i < assetsImgKey.length; i++) {
                await t.func.loadImage(assetsImg[assetsImgKey[i]])
            }
            console.timeEnd("preloadImg")

            let navBrand = dataDocument.navigation.querySelector(".navBrand")
            let navImg = document.createElement("img")
            navImg.src = t.func.findAssetsApi(apiData.assets.logo, "03")
            navBrand.appendChild(navImg)

            await section(apiData, dataDocument, t)
            // window.addEventListener("resize", async () => {
            //     await section(apiData, dataDocument, t)
            // })
            /* run zone */
        })
    } catch (err) {
        alert(err)
    }

})(() => {
    const func = {
        loadImage: async (url) => {
            let imgload = (urlF, hOnload) => {
                let image = new Image()
                image.src = urlF
                image.addEventListener('load', hOnload)
            }

            return new Promise((res, rej) => {
                if (typeof url == "object") {
                    let i, arr = [], l = 0
                    for (i = 0; i < url.length; i++) {
                        // console.log(url[i])
                        arr[i] = imgload(url[i], () => {
                            l++
                            if (l == url.length - 1) {
                                res(arr)
                            }
                        })
                    }
                } else if (typeof url == "string") {
                    let img = imgload(url, () => {
                        res(img)
                    })
                } else {
                    return new Promise((res, rej) => {
                        rej(false)
                    })
                }
            })
        },
        getApiData: async (url, init) => {
            return new Promise((res, rej) => {
                init = typeof init == 'undefined' || init == null ? {} : init
                fetch(url, init).then((response) => res(response)).catch((err) => rej(err))
            })
        },
        findAssetsApi: (apiData, path) => {
            let result = apiData.find(thisArr => {
                let re = new RegExp('(' + path + ')')
                return re.test(thisArr)
            })

            return result
        }
    }

    return {
        API: {
            external: {
                preload: {
                    assets: "https://gamertocoder.garena.co.th/api/assets",
                    minigames: "https://gamertocoder.garena.co.th/api/minigames"
                },
                normal: {
                    minigame: "https://gamertocoder.garena.co.th/api/minigame/"
                }
            }/*,
            internal: {
                languages: {}
            }*/
        },
        func
    }
});