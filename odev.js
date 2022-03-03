const io = require("console-read-write"); //konsoldan veri almak için bir paket kullanıldı.
//değişkenler tanımlandı
let stoklar = {
  köfte: 5,
  tavuk: 5,
  marul: 5,
  domates: 5,
  tursu: 5,
  soğan: 5,
  ekmek: 5,
  paketSos: 5,
  Patates: 5,
  cola: 0,
};
let et = "";
let pismeDerecesi = "";
let ekstra = "";
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
      console.log(
        "paketSos,Patates,cola"
      );
    });
  })
  //konsoldan ekstra içerikler için konsoldan veri okundu. veriyi beklemek için async await kullanıldı.
  .then(async () => {
    ekstra = await io.read();
  })
  .then(() => {
    return order(1000, () => console.log(`1.sipariş alındı...1sn`));
  })
//stoklar değişkenindeki valueslerde 0 varmı kontrolu yapıldı.
  .then(() => {
    if (Object.values(stoklar).includes(0)) {
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
  //köfte veya tavukiçin konsoldan veri aldık.
  .then(async () => {
    console.log("3.köfte/tavuk ?");
    et = await io.read();
    //alınan veriyi bir değişkene atayıp if-else kullanarak fonksiyona yön verdik.
    if (et == "köfte") {
      console.log("3.1.az pişmiş/orta pişmiş/çok pişmiş ?");
      pismeDerecesi = await io.read();
      if (pismeDerecesi == "az pişmiş") {
          //3-4-5. adımlar  aynı anda başlaması için promise.all metodu kullanıldı.
        return Promise.all([
          order(2000, () => {
            console.log("3.1.1.Köfte az pişirildi");
          }),
          order(1000, () => {
            console.log(
              `3.2.Hamburger hazırlanıyor...ekstra ${ekstra} ekleniyor`
            );
          }),
          order(5000, () => {
            console.log("4.Patatesler kızartıldı");
          }),
          order(2000, () => {
            console.log("5.içeçekhazırlandı");
          }),
        ]);
                  //3-4-5. adımlar  aynı anda başlaması için promise.all metodu kullanıldı.

      } else if (pismeDerecesi == "orta pişmiş") {
        return Promise.all([
          order(3000, () => {
            console.log("3.1.2.Köfte orta pişirildi");
          }),
          order(1000, () => {
            console.log(
              `3.2.Hamburger hazırlanıyor...ekstra ${ekstra} ekleniyor`
            );
          }),
          order(5000, () => {
            console.log("4.Patatesler kızartıldı");
          }),
          order(2000, () => {
            console.log("5.içeçekhazırlandı");
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
              `3.2.Hamburger hazırlanıyor...ekstra ${ekstra} ekleniyor`
            );
          }),
          order(5000, () => {
            console.log("4.Patatesler kızartıldı");
          }),
          order(2000, () => {
            console.log("5.içeçekhazırlandı");
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
            `3.2.Hamburger hazırlanıyor...ekstra ${ekstra} ekleniyor`
          );
        }),
        order(5000, () => {
          console.log("4.Patatesler kızartıldı");
        }),
        order(2000, () => {
          console.log("5.içeçekhazırlandı");
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
    return order(1000, () => console.log("7.Müşteriye Servis Et"));
  })
  //herhangi bir hatayla karşılaşınca hata yakalama tanımlandı.
  .catch((error) => console.log(error))
  .finally(() => {
    console.log("bye");
  });
