const io = require("console-read-write"); //konsoldan veri almak için bir paket kullanıldı.
//değişkenler tanımlandı
let stocs = {
  meatball: 5,
  chicken: 5,
  lettuce: 5,
  tomato: 5,
  pickle: 5,
  orion: 5,
  bread: 5,
  sauce: 5,
  potato: 5,
  cola: 0,
};
let piece=1;
let meatType = "";
let cookingDegree = "";
let extra = "";
//ana fonksiyon tanımlandı
//fonskiyonun iki ana inputu var zaman ve iş
async function order(time, work) {
  //then fonksyionun kullanmak için fonksiyon tanımlarken promise kullandık
  //promise işi tamamlaması veya hatayla karşılaşması durumu için iki tane input alır.resolve-reject
  //rejectşi tanımlamaya gerek duymadım.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(work());
    }, time);
  });
}
//sipariş işlemi için fonksiyon çağrıldı.
order(0, () => console.log(`Hoşgeldiniz`))
  //fonksiyonumuz promise olduğu için tamanladıktan sonra diğer adımlar için then kullanıldı.
  .then(() => {
    return order(0, () => {
      console.log("siparişinize neler ekleyelim?");
      console.log("paketSos,Patates,cola");
    });
  })
  //konsoldan ekstra içerikler için konsoldan veri okundu. veriyi beklemek için async await kullanıldı.
  .then(async () => {
    extra = await io.read();
    console.log("Kaç adet istiyorsunuz?");
  })
  .then(async() => {
    piece = await io.read();
    return order(1000, () => console.log(`1.siparişiniz alındı...1sn`));
  })
  //stoklar değişkenindeki valueslerde 0 varmı kontrolu yapıldı.
  .then(() => {
    if (piece>5) {
      //order fonksyionu hata fırlatırken sorun oluştu. önce boş bekletildi. sonra ten kullanıldı
      return order(3000, () => {}).then(() => {
        ///eğer stokta 0 varsa bir hata fırlattım.
        throw "2.Stoklarda problem var. Tekrar Bekleriz... ";
      });
    }
    return order(3000, () => {
      console.log("2.Stoklarda problem yok.");
    });
  })
  //köfte veya tavuk seçimi için konsoldan veri aldık.
  .then(async () => {
    console.log("3.köfte/tavuk ?");
    meatType = await io.read();
    //alınan veriyi bir değişkene atayıp if-else kullanarak fonksiyona yön verdik.
    if (meatType == "köfte") {
      console.log("3.1.az pişmiş/orta pişmiş/çok pişmiş ?");
      cookingDegree = await io.read();
      if (cookingDegree == "az pişmiş") {
        //3-4-5. adımlar  aynı anda başlaması için promise.all metodu kullanıldı.
        return Promise.all([
          order(2000, () => {
            console.log("3.1.1.Köfte az pişirildi");
          }),
          order(1000, () => {
            console.log(
              `3.2.Hamburger hazırlanıyor...ekstra ${extra} ekleniyor`
            );
          }),
          order(5000, () => {
            console.log("4.Patatesler kızartıldı");
          }),
          order(2000, () => {
            console.log("5.içeçekler hazırlandı");
          }),
        ]);
        //3-4-5. adımlar  aynı anda başlaması için promise.all metodu kullanıldı.
      } else if (cookingDegree == "orta pişmiş") {
        return Promise.all([
          order(3000, () => {
            console.log("3.1.2.Köfte orta pişirildi");
          }),
          order(1000, () => {
            console.log(
              `3.2.Hamburger hazırlanıyor...ekstra ${extra} ekleniyor`
            );
          }),
          order(5000, () => {
            console.log("4.Patatesler kızartıldı");
          }),
          order(2000, () => {
            console.log("5.içeçekler hazırlandı");
          }),
        ]);
      } else {
        //3-4-5. adımlar  aynı anda başlaması için promise.all metodu kullanıldı.

        return Promise.all([
          order(4000, () => {
            console.log("3.1.3.Köfte çok pişirildi");
          }),
          order(1000, () => {
            console.log(
              `3.2.Hamburger hazırlanıyor...ekstra ${extra} ekleniyor`
            );
          }),
          order(5000, () => {
            console.log("4.Patatesler kızartıldı");
          }),
          order(2000, () => {
            console.log("5.içeçekler hazırlandı");
          }),
        ]);
      }
    } else {
      //3-4-5. adımlar  aynı anda başlaması için promise.all metodu kullanıldı.

      return Promise.all([
        order(3000, () => {
          console.log("3.1.tavuk pişirildi");
        }),
        order(1000, () => {
          console.log(
            `3.2.Hamburger hazırlanıyor...ekstra ${extra} ekleniyor`
          );
        }),
        order(5000, () => {
          console.log("4.Patatesler kızartıldı");
        }),
        order(2000, () => {
          console.log("5.içeçekler hazırlandı");
        }),
      ]);
    }
  })
  .then(() => {
    return order(1000, () =>
      console.log("6.Sosları ve Ürünleri Servis Tepsisine Koyuldu")
    );
  })
  .then(() => {
    return order(1000, () => console.log("7.Müşteriye Servis Edildi."));
  })
  //herhangi bir hatayla karşılaşınca hata yakalama tanımlandı.
  .catch((error) => console.log(error))
  .finally(() => {
    console.log("bye");
  });
