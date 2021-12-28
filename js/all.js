const serchContain = document.querySelector('.serch-contain')
const send = document.querySelector('.exploreBTN')
const keyword = document.querySelector('.keyword2')
const city = document.getElementById('city')

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/Taipei?$top=9&$format=JSON`,
    {
      headers: getAuthorizationHeader(),
    },
  )
  .then(function (response) {
    let str = ''
    let address = ''
    let serImgcount = 0
    const serchIMG = [
      'image/ser1.png',
      'image/ser2.png',
      'image/ser3.png',
      'image/ser4.png',
      'image/ser5.png',
      'image/ser6.png',
      'image/ser7.png',
      'image/ser8.png',
      'image/ser9.png',
      'image/ser10.png',
      'image/ser11.png',
      'image/ser12.png',
    ]

    console.log(response.data[0])
    console.log(response.data[3])
    response.data.forEach((item) => {
      if (item.Town != undefined) {
        address = item.Town
      } else {
        address = '無提供'
      }
      if (item.Direction != undefined) {
        dire = item.Direction
      } else {
        dire = ''
      }
      if (item.RoadSectionStart != undefined) {
        RSStart = item.RoadSectionStart
      } else {
        RSStart = '無提供'
      }
      if (item.RoadSectionEnd != undefined) {
        RSEnd = item.RoadSectionEnd
      } else {
        RSEnd = '無提供'
      }
      str += `<li>
      <img src="${serchIMG[serImgcount]}" alt="" />
      <h4>${item.RouteName}</h4>
      <p>從 
        ${RSStart}
      </p>
      <p>至
      ${RSEnd}
    </p>
      <p
          ><i class="fas fa-map-marker-alt"></i>${item.City} ${address} ${dire}</p
        >
      
    </li>`
      serImgcount += 1
    })
    serchContain.innerHTML = str
  })
  .catch(function (error) {
    console.log(error)
  })

send.addEventListener('click', function (e) {
  e.preventDefault()
  let selectKeyword = `$filter=contains(RouteName,'${keyword.value}')&`
  console.log('123')
  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city.value}?${selectKeyword}$top=9&$format=JSON`,
      {
        headers: getAuthorizationHeader(),
      },
    )
    .then(function (response) {
      let str = ''
      let address = ''
      let serImgcount = 0
      const serchIMG = [
        'image/ser1.png',
        'image/ser2.png',
        'image/ser3.png',
        'image/ser4.png',
        'image/ser5.png',
        'image/ser6.png',
        'image/ser7.png',
        'image/ser8.png',
        'image/ser9.png',
        'image/ser10.png',
        'image/ser11.png',
        'image/ser12.png',
      ]
      console.log(response.data[0])
      console.log(response.data[3])
      response.data.forEach((item) => {
        if (item.Town != undefined) {
          address = item.Town
        } else {
          address = '無提供'
        }
        if (item.Direction != undefined) {
          dire = item.Direction
        } else {
          dire = ''
        }
        if (item.RoadSectionStart != undefined) {
          RSStart = item.RoadSectionStart
        } else {
          RSStart = '無提供'
        }
        if (item.RoadSectionEnd != undefined) {
          RSEnd = item.RoadSectionEnd
        } else {
          RSEnd = '無提供'
        }
        str += `<li>
          <div class="pic">
          <img src="${serchIMG[serImgcount]}" alt="" /></div>
          <h4>${item.RouteName}</h4>
          <p>從 
            ${RSStart}
          </p>
          <p>至
          ${RSEnd}
        </p>
          <p
              ><i class="fas fa-map-marker-alt"></i>${item.City} ${address} ${dire}</p
            >
          
        </li>`
        serImgcount += 1
      })
      serchContain.innerHTML = str
    })
    .catch(function (error) {
      console.log(error)
    })
})

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  // let AppID = '9d5eccb4-ca4a-4f97-b829-7fa73264f550'
  // let AppKey = '0oBJLHiS-raca-0HT6-omY8-K6imx7Q'
  let AppID = '9d5eccb4ca4a4f97b8297fa73264f550'
  let AppKey = '0oBJLHiSraca0HT6omY8K6imx7Q'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}