// Enhanced Bonus Hunt Tracker Calculation
function calculateBonusHunt(startMoney, stopMoney, betSize, bonuses) {
  const totalSpent = startMoney - stopMoney;
  // Calculate average bet from bonuses array
  let averageBet = 0;
  if (bonuses.length) {
    const totalBet = bonuses.reduce((sum, b) => sum + (typeof b.bet === "number" ? b.bet : 0), 0);
    averageBet = totalBet / bonuses.length;
  }
  const breakEvenPerBonus = bonuses.length ? totalSpent / bonuses.length : 0;
  const totalBreakEven = totalSpent;
  const actualReturn = bonuses.reduce((sum, b) => sum + (typeof b.value === "number" ? b.value : 0), 0);
  const profit = actualReturn - totalSpent;
  const profitPercent = totalSpent !== 0 ? (profit / totalSpent) * 100 : 0;
  // BE X calculation: (stopMoney - startMoney) / averageBet
  let beX = 0;
  if (averageBet !== 0) {
    beX = (stopMoney - startMoney) / averageBet;
  }
  return {
    totalSpent,
    averageBet,
    breakEvenPerBonus,
    totalBreakEven,
    actualReturn,
    profit,
    profitPercent: Math.round(profitPercent),
    beX
  };
}

// 🧠 New Bonus Hunt Stats Calculation
function calculateBonusHuntStats(startBalance, openingBalance, bonuses) {
  const bonusesCount = bonuses.length;
  const totalCost = startBalance - openingBalance;
  const totalReturn = bonuses.reduce((sum, b) => sum + (typeof b.result === "number" ? b.result : 0), 0);
  const totalBet = bonuses.reduce((sum, b) => sum + (typeof b.bet === "number" ? b.bet : 0), 0);
  const averageBetSize = bonusesCount ? totalBet / bonusesCount : 0;
  const averageWin = bonusesCount ? totalReturn / bonusesCount : 0;
  const averageX = bonusesCount
    ? bonuses.reduce((sum, b) => sum + (b.bet ? b.result / b.bet : 0), 0) / bonusesCount
    : 0;
  const breakEven = totalCost;
  const breakEvenPerBonus = bonusesCount ? breakEven / bonusesCount : 0;
  const breakEvenX = averageBetSize ? breakEvenPerBonus / averageBetSize : 0;
  const totalProfit = totalReturn - totalCost;
  return {
    bonuses: bonusesCount,
    totalCost,
    totalReturn,
    averageBetSize,
    averageWin,
    averageX,
    breakEven,
    breakEvenPerBonus,
    breakEvenX,
    totalProfit
  };
}

function updateTime() {
  const el = document.getElementById('current-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// --- Slot Database (Global) ---
const slotDatabase = [
  { name: "Sugar Twist", image: "https://mediumrare.imgix.net/3fbda3cb3022ebe5175f345c8bd6ff4b3cc305f28b2b10c21b5762f788908623?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Rad Max", image: "https://mediumrare.imgix.net/912e93fcb0e5f52ee1f549d6b6ffcf21ba0847eef9c5003a28893274a6f1cb68?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Pray For Three", image: "https://mediumrare.imgix.net/1ea39d28bbd9237c659f60233fce9bdd9f1c46b934c5d3b311f1580dbcea7f74?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Duel at Dawn", image: "https://mediumrare.imgix.net/81223334b34083d375cd42c6df9f0a5414b817e8ca16b54dc3b63e05386fc44c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Wanted Dead or Wild", image: "https://mediumrare.imgix.net/2c04ff5694af0adf12b483a79567814407c1a4fc943b4d1980f84367a1910874?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Danny Dollar", image: "https://mediumrare.imgix.net/21e4b0ac5fd88338625abc758802e7f90156ae5cecf25ac236cd1a03fc0a693e?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "SixSixSix", image: "https://mediumrare.imgix.net/30be38fdc2b4d9a6c76194314dfb7814a66d6905287ade354a0e5f2a79b1ab27?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Life and Death", image: "https://mediumrare.imgix.net/9407302fecd33613bc716d3b0d4f1e724334321ec910404f6b417284db593d37?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Le Viking", image: "https://mediumrare.imgix.net/2cb39e9486a6cd37f49767537241fc8b9f5fd302f17a79c06f5220afcea27ea3?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Le Pharaoh", image: "https://mediumrare.imgix.net/293b2337d4d5cfda999ca423e34518a1a6682062340f1f1c5a669a26e7927c79?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Le Bandit", image: "https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Spinman", image: "https://mediumrare.imgix.net/fcc00223f58811594d5c7db35abd3e2f1aeac13866981132e044333c75a4a3bf?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Reign of Rome", image: "https://mediumrare.imgix.net/7c2dd8e10ca25f28737a4cc48c50b4b898c15b633ee14459b956237f2e58e185?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "FRKN Bananas", image: "https://mediumrare.imgix.net/d4c903b8aa3bcbcd3e7cfdd46e14fa5ff3f056922cd470a109438ee41184990e?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Rip City", image: "https://mediumrare.imgix.net/c55c2ec37c310140617b75c9e490faca98090292991840dce959d93649efbfa5?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fighter Pit", image: "https://mediumrare.imgix.net/5ec25f926e0d9b8b6575aa93df1dfb769e7b6b2127f801d159994eb249eefe29?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Wishbringer", image: "https://mediumrare.imgix.net/6bddae78f98ce6fc8d84be9b084d070cb755c3cb86b8ec05000f8af742536b66?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Slayers INC", image: "https://mediumrare.imgix.net/f08dd3c03232627f508e0b4f458651947e13e46f6d8a53be08507672256d3be2?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Donny Dough", image: "https://mediumrare.imgix.net/d0da486c2ef84196c52198fce55b4566303ef3d73d94c675179a8f6c4c5a3781?w=180&h=236&fit=min&auto=format ", provider: "Hacksaw" },
  { name: "Magic Piggy", image: "https://mediumrare.imgix.net/b18560b8631fc3b27c06d41e9729f7774048864ad7c4a16d1a20b1a953883943?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Dork Unit", image: "https://mediumrare.imgix.net/33cd5a34c3937da326652a3beb44fe9c3680118c363a060ca5670847595561a5?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Chaos Crew 2", image: "https://mediumrare.imgix.net/9d93c95c411dde57286a1ebb9dc76d93ab8f0c49d1b1445ce7d316c36820552c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Hounds of Hell", image: "https://mediumrare.imgix.net/05830ae2a958fe4b3d1c334ef2e93c34406fde0f9402969ef3a4d26992024e9d?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Klowns", image: "https://mediumrare.imgix.net/075588ccb0fe1466d036afcd2386e173af3032773c0ed4e1c4b02b60ab630691?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Hand of Anubis", image: "https://mediumrare.imgix.net/6d3e8501656c2ae403f7478d9bee1ffb49f81894b8f45ca42ad457a834a79149?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Thai The Toad", image: "https://mediumrare.imgix.net/715d1e5694973e27bac8deb3fd4c375135ca01517822bf3ab7a31888f7646119?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fist of Destruction", image: "https://mediumrare.imgix.net/c123ef1cf5a97e2c94cdbd6db80c47c35afa5af9837f1416eb25ac10dd6c8f50?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Rotten", image: "https://mediumrare.imgix.net/da1d839ace20adb0337eae0b922a336d54df21aa2d8d616aad9f234a2ca38f90?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Ze Zeus", image: "https://mediumrare.imgix.net/e20cf100fe7b8cc8f19a428ca222abd4f85c46679f876aa08fa2521248360b54?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cloud Princess", image: "https://mediumrare.imgix.net/c0be957b99d1a534b8fa221a225e87445766948f0b861b42700ad370fb84e22d?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Stack´em", image: "https://mediumrare.imgix.net/894ab0aba513722d8da9f3b118fb1197a00b248e40214b196fa7701265934069?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Miami Multiplier", image: "https://mediumrare.imgix.net/fdd4a97ee86f946b11c92f897c55696bfaabbd97002727c9d91b3c8883c31733?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Marlin Masters", image: "https://mediumrare.imgix.net/1b0d34ebc41450aedeb0720079aa82a9625da940ec61fbe2ef2b51f5a8b6d04b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Xmas Drop", image: "https://mediumrare.imgix.net/be3cf80fcd859427ca4ecabef13e7dfbee3603eaa3ed2dc975ccc1cb6ee622dc?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Dorks of the Deep", image: "https://mediumrare.imgix.net/73558636b4e41b610e1e15aa8f527b84348895dbbfee8f02d1231af77abbe9b1?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Stormforged", image: "https://mediumrare.imgix.net/35e02b639347011bbf26252e562f1535447edd5db692c212a0469c4ad5da512c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "2Wild 2Die", image: "https://mediumrare.imgix.net/cca5a281205cfcc8161b358091cc19e7af1385127754d005d4ddb12b8e9e2ba9?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Benny the Beer", image: "https://mediumrare.imgix.net/4ae57eafffc4f3253232b04ef6d9948eea70ef01d0337c56e106c773e92bc509?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fire My Laser", image: "https://mediumrare.imgix.net/7a29a0822d23020cd983ede3c4af9a90f065512b1cecd10d6faee751107a3bbf?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Double Rainbow", image: "https://mediumrare.imgix.net/f2cea670f01b8351d7660385c688a0d30d5da4f201fd478df5d26ec9e78ce460?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Octo Attack", image: "https://mediumrare.imgix.net/9e3f45cf9ef13c45d0aa67f7c2e9ce49187e196db7d3e1c862427f72b7f121ff?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Phoenix Duelreels", image: "https://mediumrare.imgix.net/7ac7169ca980177d2f7843face3046fb42c001bf4dd7356becb037e92fc07ff1?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Densho", image: "https://mediumrare.imgix.net/eadeb726f36d9807051b6216e638c817537c8b4a39cd1e5de9017e1b0d6ea61c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Beam Boys", image: "https://mediumrare.imgix.net/d0d102db575ee3a3b89ae2a12ff27799ee95063fb1e97ae2c616b2fba5727bcd?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Beast Below", image: "https://mediumrare.imgix.net/fad562df401ccfd1dde3707308efab027eea94a6cd11c35d64cc814efbb3a44f?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Drop´em", image: "https://mediumrare.imgix.net/dd4726f7b3ab5614e1e56c8314748397dc45f1d2a60d1a83a935a1fac95936a4?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Strength of Hercules", image: "https://mediumrare.imgix.net/92dc6be959aee15f956fd64e6fd3777274d9655724912343ec222235858e1fea?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Donut Division", image: "https://mediumrare.imgix.net/694d00465a62a9aa16b08c0739945ac27d025ca0f7e3ccbbf165f325b1ca87af?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Eye of the Panda", image: "https://mediumrare.imgix.net/740e91df538e182d4a8ceb6ada7a928a9cfd077796b52dd62b676bbb87a92575?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Shaolin Master", image: "https://mediumrare.imgix.net/bff4a442bf939fb6e8d113fa34c1bfe514b520f5d27cc157ea4a9c1c48a3f53b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Chaos Crew", image: "https://mediumrare.imgix.net/bececcbc4d481dfd6a4fd61f9263dc4bc28d319e93f4ff3fb04cd6c73b0e9ca7?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cursed Seas", image: "https://mediumrare.imgix.net/8a9907240271fd24b09f8c40964e3e7726e056302456e029ee25cf4aa5eb7f74?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Toshi Video Club", image: "https://mediumrare.imgix.net/4580fbe00b06937db40d6759fa65a17337e3c01b96d40d2333739b407be6781b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cash Crew", image: "https://mediumrare.imgix.net/66c02d382f74c7188da5306983f78f42d6aade7b388b8c149c3ac20117d69887?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Pug Life", image: "https://mediumrare.imgix.net/7b18b96de662a92729c3aa7722f6bf872305f9a9d07a60c99ee3f23fc0198f6?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Joker Bombs", image: "https://mediumrare.imgix.net/6afdddc8fdfca2d0106bdaf4e8f02b6c1fbe455df3b855bc6babf6e0669dcee9?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "King Carrot", image: "https://mediumrare.imgix.net/9f7dd8932657e921d74bad8c9355fe6464e64dae26e373c87b554bb62c2e25b8?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Twisted Lab", image: "https://mediumrare.imgix.net/0ed46be36a9207f44ba20b50629d630446504a05db3c513a4b2e1e4abfeb5baf?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Evil Eyes", image: "https://mediumrare.imgix.net/433a1bbc729168261fdc1af5d2047264768654851712d76ae933bcc84f3d5146?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Vending", image: "https://mediumrare.imgix.net/fa74f56742f954b651a006b25c87cf21717541033fbb435a53a10ac675ca2519?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Mayan Stackways", image: "https://mediumrare.imgix.net/f13df3ab6dbb6f1bc732baa75113414ecc4aa04d1860bb009cc8aba4717f2f64?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Rusty & Curly", image: "https://mediumrare.imgix.net/4fbce82073cab8684794cfb36eabd2cec98a0f7df2340a9ac0b308e0aee25ac7?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Itero", image: "https://mediumrare.imgix.net/34c5240f711e56c6af514136ff142cad4b39fd4c9aa3869b627ec010e6da559b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Get the Cheese", image: "https://mediumrare.imgix.net/ba6e2fa2799f1f9926bd2d79e2aa175669ea86116c4dc1e530893cfc68d0a57e?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Wings of Horus", image: "https://mediumrare.imgix.net/506275b06b8a03b332c806dfffd1599f32c68b5674f112cdd04802470a968f7c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Rise of Ymir", image: "https://mediumrare.imgix.net/63ecb7db83f55f800b6c3c057c13f8a80185d4b767500b264867ae07aeb10845?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Immortal Desire", image: "https://mediumrare.imgix.net/1a7de51973e9c1298b1fa58ffe6bdd9ddb02c9e2df2c1adf62c7ca4b63c0b06a?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Dragon´s Domain", image: "https://mediumrare.imgix.net/b32ecba95ce52b451ff09fba9f89246ef4051abac52d250094627f0c5ef6c3e5?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Book of Time", image: "https://mediumrare.imgix.net/9bf10cb05301c16c0fb09d93ba8a973b834fbf76b5a37676878302e9c0e1d3d0?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Bouncy Bombs", image: "https://mediumrare.imgix.net/7f74559ba42c4b965d3f9809a77fbf366af4778bea4af823c9d661abe55302db?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Snow Slingers", image: "https://mediumrare.imgix.net/9048c86fad269aa7ff0abf63ee8c2ddc96f0bf4d5ae519231d40d85a65389986?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cubes 2", image: "https://mediumrare.imgix.net/017cf6597dff23e99f30b296c4162018320b4c6d4e0843b4e8c1d06e45827547?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Gladiator Legends", image: "https://mediumrare.imgix.net/370c9ad85d5a47352f86357e6eec9bc13910b6b77985eb5ef1139cb39680c62b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Outlaws INC", image: "https://mediumrare.imgix.net/1df63aaf3942d0e8423a0343adfaeba4976c44e5ca7c2dddabeb7863fca63a94?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Buffalo Stack´N´sync", image: "https://mediumrare.imgix.net/5ca299b61c3c24a3f3c241360bb74cc7970f3b63cf5d2d9f9cdf2de854e06e97?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "The Bowery Boys", image: "https://mediumrare.imgix.net/153706d7dcb82fbf41e255df6f173ca042c6876bf1a25bdad3b5a669559c965c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Dark Summoning", image: "https://mediumrare.imgix.net/7184d134ae7499ad10ffe6f985c3e0906bc2ab99518c182f7f53c08a260f095a?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Undead Fortune", image: "https://mediumrare.imgix.net/86eab2d535cb53548f1a5aeacb04b08f9ee029905a7c658370d11aa14b17e3c3?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Frank´s Farm", image: "https://mediumrare.imgix.net/8493bbf7575c02b09d053ec3034532f6dec87301495fa5b0cdcd0a5cd297eeeb?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fear the Dark", image: "https://mediumrare.imgix.net/62a6617f773bae2bf5e42516d725c4a00de48ecc4091fd37f4c897fe4d45be31?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Gronk´s Gems", image: "https://mediumrare.imgix.net/0cfe7d7f16134b507f5f44d1cc74c885fc68ca6375147f31d3ba6b05ae9636cb?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Divine Drop", image: "https://mediumrare.imgix.net/2e7edd753384f73be3253d4e68eb4c66319ec1161ef9c769dfbe6676ed67ca46?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Born Wild", image: "https://mediumrare.imgix.net/42393b8f277ee62dc05f00ed9b135e4fe7c1cfb9c8f95a44057a2ccead764e96?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cursed Crypt", image: "https://mediumrare.imgix.net/a3d5a4916410d4a5c0f0ce0e41180e388487c53fe106c454096bfd3fab821a66?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Keep´em", image: "https://mediumrare.imgix.net/b1b7c5f14a4f446855ca34c21ca56235a8e74ed1fd948eaccc81687367488216?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Alpha Eagle", image: "https://mediumrare.imgix.net/4824466ee7f5ebedde11e4a312cca6678d4f8b0f4ed004980fd15ff25dd9d1d0?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Ronin Stackways", image: "https://mediumrare.imgix.net/68a04cf0d75f6fd3c1884805806e11ad128f09a8d274574ec99f34cd8f46f76e?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Aztec Twist", image: "https://mediumrare.imgix.net/a033b9e2336fdd9ef2204f159b98577dcec061c1cea5841685521a165a64ff1c?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Xpander", image: "https://mediumrare.imgix.net/0ff16310e6d71b703046e87e30d66ce1a1b026316c24cc034e7731d04633d743?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Time Spinners", image: "https://mediumrare.imgix.net/ba3b2a5e0c0723860fa088fdcfa8216dec4d5023e6b9f291df95bfebc75ba223?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Temple of Torment", image: "https://mediumrare.imgix.net/7bf6165ab400a926c5abe6ec72a0bb755f637fcdbf0773e1f85f6607f5ac2502?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Break Bones", image: "https://mediumrare.imgix.net/c7e0eca2babf18eb00364a38d18f5e3cba868c9ff2480a98bbbf5a5ef203f1be?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Bloodthirst", image: "https://mediumrare.imgix.net/7bcad426782c83c08801d657c44cfb1afb5789c867bb21c01acc058af27e4cb6?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Rocket Reels", image: "https://mediumrare.imgix.net/7f73d6b27bf2af6b867937e9eb31617b6ff801f09135daf10c5d3d0da2d98b4b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cash Compass", image: "https://mediumrare.imgix.net/e2d08a4aeb8dc9aa5e076e4ec5e6f29217c0c963fd281059b1b2f401554fc2bc?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Warrior Ways", image: "https://mediumrare.imgix.net/7ad19594cf9ddfeb442c6cf1217e50f5a0586afebbebc5107c15a4f90080657b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Hop´N´Pop", image: "https://mediumrare.imgix.net/6605d3de0dd8b58b00db3054ab39e3c68d43cbccfd83ff50a13ade8fb5f21d31?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Orb of Destiny", image: "https://mediumrare.imgix.net/f79b83bc1408abd366a916e4e3b401dd76eb2a0cd31528067fcdb9072d5f7b1d?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fruit Duel", image: "https://mediumrare.imgix.net/a188243dfba1a1bbc9eb9609c250693ecd3643cb57b1bb0adba320dd054edc77?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Mighty Masks", image: "https://mediumrare.imgix.net/414115bbf7390de09bc1f349630e14b6b3e17b606ea18b3fb5d5ceebae601173?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Feel the Beat", image: "https://mediumrare.imgix.net/177e1af21ec99124784e606594f8447933ead39c3262eb50a8041f8adce28853?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "The Bomb", image: "https://mediumrare.imgix.net/12c3bb0487e2239772248e61550a121ee20fe8400a63f386d08896d1122d1655?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Haunted Circus", image: "https://mediumrare.imgix.net/b249d80cd1bb7367d3e9fe9062c04c28563a3050c3f4893b57392e3e132938fa?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Mystery Motel", image: "https://mediumrare.imgix.net/9bb69ef1c5050873ce837473559ecfc7774d4f8ecc23c4e109ca441b12bdc523?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Keep´em Cool", image: "https://mediumrare.imgix.net/3d07ee2ca280623bb86771d146352267affb73d70dc878750fea88e62eb40553?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Dawn of Kings", image: "https://mediumrare.imgix.net/ee600c4d3d4145ef3d2501749e4f2872a68cdc47ef2dc17af43ac6a24b1eab1d?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Stick´em", image: "https://mediumrare.imgix.net/aa91b1aaf297b3c8f174c6364731135f14b55bdd47c60e9ccc1ccd8ef69f3959?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cash Quest", image: "https://mediumrare.imgix.net/96ab764e436daa2fb926d719ed3e6bda0c8f0f42a3d08f4bc4854c0d7a4ea0d0?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Jelly Slice", image: "https://mediumrare.imgix.net/9bcfcbf49d9b6184dec0dddd43d88e4ff7cacffd1c65c4202b03178bb4ae43ad?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Forest Fortune", image: "https://mediumrare.imgix.net/ad803f6a41eaf29721af391695c25656941eae8d3e1ab5ceb1dd692fd6b3586b?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Om NOM", image: "https://mediumrare.imgix.net/8cf1f4ee0df6994bbdadd377285357b241a51dd22b3e2fdf3bf6252e9816f479?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "The Respinners", image: "https://mediumrare.imgix.net/68f2388cb67b4cd35de210c31f5ca15bbe7f3e904e26a50a63315a4d2568f1eb?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Frutz", image: "https://mediumrare.imgix.net/b5d02c384a3e96a30e90018887f14d0923a2c05e582abd4cfa18fd600d7fa94e?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Cubes", image: "https://mediumrare.imgix.net/cf92f60f919b018998478dd92fe93193ab77cdce4bdd5b2ca826dd9b0a38055a?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Tasty Treats", image: "https://mediumrare.imgix.net/a478052cb3a60aacfdcc4dacea3d0b4ea0a095c28e55ccabafd0b64f3c4fb9bf?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Let it Snow", image: "https://mediumrare.imgix.net/22d5ab5f65de364fd4573409289caffbf7cd4c1696ffdc8cbb6e0c0f5ca2aaff?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Harvest Wilds", image: "https://mediumrare.imgix.net/cc2173ba768f9fa72a884bb8d475c47ab13d44b25a275972255ee4fd85331a99?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Ethenal Nile", image: "https://mediumrare.imgix.net/8621688f67c74a42471c052dcc3443c754617d159258554125da3dc1e1da470f?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "8-Bit Quest", image: "https://mediumrare.imgix.net/c24f8c668823b8fc9ecaace4ec2d458d28106c6247b4138a561d38db6b705455?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Monkey Frenzy", image: "https://mediumrare.imgix.net/0b60d8d6e4080095e0cb2e7efd68436ec285135fc00ae0bced559815ffcac7bd?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Sticky Candyland", image: "https://mediumrare.imgix.net/01d620d4903a3f14b397ef202e934cd4e9902ad01794e7bc20903fe156a2a5b4?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "The Library", image: "https://mediumrare.imgix.net/66dd42db2459d2b0a8fc356ed18ad0b3489b562ba80446496c4a8fa908c134cd?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Shadow Treasure", image: "https://mediumrare.imgix.net/04531340b93a65869cd94e56b921bb3438909d61336954c94f7824f8266b1f03?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Lucky Multifruit", image: "https://mediumrare.imgix.net/07dfe0313bf45e0d937f277cbf11f9b2181520f2c0c2a01e4b7d539365e6bd18?w=180&h=236&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Duck Hunters", image: "https://mediumrare.imgix.net/34ee5a63f09ad96cd4d92ba752de18ca210df5439723203c26f385bed7ee97f1?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Kill Em All", image: "https://mediumrare.imgix.net/46ba3573140d67ff2eec9e1c06b37518622d5135bc7abbb590f432a428980267?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Highway To Hell", image: "https://mediumrare.imgix.net/580786a24cdc3f5473c5f00ed5566b58b8b375de32a03284c80f9025d455bd50?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Mental 2", image: "https://mediumrare.imgix.net/3ca0964f7fb9827c900be70a2a0e23005f2b0e4aa67b57365336766c27a7cf40?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Outsourced", image: "https://mediumrare.imgix.net/21f2d81592cc36a42d90f4be5b501f1ef6490c5d0528577aedf76417a25d7fa2?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Dead, Dead Or Deader", image: "https://mediumrare.imgix.net/fc101acdf7ca30e3e78e78e853aa11d9ac0159ef88062ffc72408637de549d47?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Blood Diamond", image: "https://mediumrare.imgix.net/8eba0badef103f9a7179f2f5cc7b8f091bda4f3adb873ac15d28f0dddb5952e0?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Nine to Five", image: "https://mediumrare.imgix.net/c06ffbd9ac77f592824e0393517914beab310640bcba1cca51731c141d8fa566?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "San Quentin 2 Death Row", image: "https://mediumrare.imgix.net/bbbeff94e0b2956633a6a1700e38f39450696673391fb991f8c96d3c5c86157a?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Fire In The Hole 2", image: "https://mediumrare.imgix.net/d93aa56548ee2716b2e743e2b6a0d04a4bcbe6507964367d50c3529ab886ac85?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Brute Force", image: "https://mediumrare.imgix.net/2bf6daf687390406257eb7a19c6789bd363a455aeb155955fda5030644e5d431?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Xways Hoarder Xsplit", image: "https://mediumrare.imgix.net/626864b91465700ae03a98e2f4254b6461b97906c0daa572b3bca4e103c0a745?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Book Of Shadows", image: "https://mediumrare.imgix.net/2c68bb24ec9e031476516000d76f563ecb8f7197b63eae6aed241245f7dcc515?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Tombstone Slaughter  El Gordo Revenge", image: "https://mediumrare.imgix.net/dc6e003dcb26eb6adc4499660abeac536f11101fc62b79cdd28931109fc9a376?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Mental", image: "https://mediumrare.imgix.net/e96a6381078a53449a8ca14f35786f2afe5c0007254bc2053bc1e9ba2a0715eb?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Home Of The Brave", image: "https://mediumrare.imgix.net/0bc0abf755f1e81014bb1e0204d6e0339663ed88c20ef9a2228860d82bf45525?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "The Crypt", image: "https://mediumrare.imgix.net/3285df789ee1e5f52e3b075b4eb0c1f080fcdce28f7c9689daa4e62f87fa85a3?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "DAS XBOOT", image: "https://mediumrare.imgix.net/822438dc4259368302ef5ec6345c4c21a73097e4265f21f53008cef1e79f6cd0?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Brick Snake 2000", image: "https://mediumrare.imgix.net/904a92d026b8583a219d86f3aecaf739b72a7313ece71b6aafdac3c179a5b4ec?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Kenneth Must Die", image: "https://mediumrare.imgix.net/355d623ff7dcacebbdde1aec5ea2cf741935bee9d9eff8eea83c78590f22690b?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Loner", image: "https://mediumrare.imgix.net/c4b68434aa2e8f5ce669b670f3a99b8fb0550fefd2390ae0f9aa14ff5f8a209c?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Devil´s Crossroad", image: "https://mediumrare.imgix.net/686f4b4366094b5f4ce040c7468125b4b18e7764c982237af9d1c79c645839c6?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Road Rage", image: "https://mediumrare.imgix.net/fd404858468d9f561073b9dde3bcb7cdd5a3d9e22ae1e47f97781a86535fa55a?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Tombstone Rip", image: "https://mediumrare.imgix.net/79241625ea0d952c1ca3fe1b5fe1c50b408c1d35beb7096dee3e40858b8ce3c6?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Karen Maneater", image: "https://mediumrare.imgix.net/9dea511342cc56765b3569497ba3b21d4acc46f8d9c79bac96c79dc4bdf8ce22?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Deadwood R.I.P", image: "https://mediumrare.imgix.net/950a8d14e60169197cb5b26dcaebf4aff9375eb99eb5647c72d455f2ceb52948?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Apocalypse", image: "https://mediumrare.imgix.net/2cb50b6da92786adf437bf9f7c7d3976608f0a4db302446cf2edf1ac8d62fa1d?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Punk Rocker 2", image: "https://mediumrare.imgix.net/ed445ad8db1ce3aa5bc3de4abcf815fcc56d2b77fbdf721d75527ffef10f04dc?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Infectious 5 Xways", image: "https://mediumrare.imgix.net/3a867a309eb8fddad57081585b8e6d2761f40a0bed4c0390baa36a355135bd00?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Folsom Prison", image: "https://mediumrare.imgix.net/7302b9247bbb9187df5ba750f1afd2d07f9ef093bb5fcc9aac8b23854f59adde?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Blood And Shadow 2", image: "https://mediumrare.imgix.net/c938eba95cc562f4976a5e87cbcc5293b7b4a9d294f85465dd0b05e0d6242f3b?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Misery Mining", image: "https://mediumrare.imgix.net/52ec64ba09cf9dd206cbdd1e66b6b5abd8052c601fe425c7a95901e88012bf37?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Buffalo Hunter", image: "https://mediumrare.imgix.net/66a79f68725b5d3fb1e940922a2562a3500f3daac56a9d056b00ce9b5a839a71?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Fire In The Hole Xbomb", image: "https://mediumrare.imgix.net/1c880d29afe39363c2b912fa1f90097eee2d39219a3dc3c224678f4dd520fce3?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Tractor Beam", image: "https://mediumrare.imgix.net/7222443c7b5d9b96d4dea8b1090470defaaeb7e78de9d5c4ef0bb981a3ea4bdf?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Pearl Harbor", image: "https://mediumrare.imgix.net/cd746fb8aa1bfe6e90ecd47b3d420938d7058fa1c97fb43330b65b70ba986c35?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "D-Day", image: "https://mediumrare.imgix.net/5034da0890a57d6de36866165567e60c21d55a123ce8b90f953fa806095879d4?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "San Quentin", image: "https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Land Of The Free", image: "https://mediumrare.imgix.net/6128e2d70db29bfcfe14269b652524ee51b931dae9f11469a74c14be004cc879?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Warrior Graveyard Xnudge", image: "https://mediumrare.imgix.net/db4e73c4812e1ede12d2f34ce9a07dbe7ac1a02d6585510eb5e04ff439ab3f71?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Deadwood", image: "https://mediumrare.imgix.net/624759841db8d261bbc83b9bbb8111d40b95ee4d9c025ca7d364e0fbac410ba0?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Eas Coast VS West Coast", image: "https://mediumrare.imgix.net/f32b71c88d0fb3be4b93c136af771aadba05871986136b73e75622b1e8f30700?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Disturbed", image: "https://mediumrare.imgix.net/8b474e497d0ea0109e222b226456da1828913a605890a82dc4bb42d439fa05a6?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Serial", image: "https://mediumrare.imgix.net/07567162f12d9e51847089c49f835445527e03a2d0fc17d7d1c770a69c1dc74e?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Ugliest Catch", image: "https://mediumrare.imgix.net/00fce06cc9f7bb26a217180b623b889df1e9e3c320d34156cdaa78ccf0138595?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Stockholm Syndrome", image: "https://mediumrare.imgix.net/0b1a1fb092eecde4752edbbdae134e7a4eca6235787211d5dd2435fbaf3e8f45?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Beheaded", image: "https://mediumrare.imgix.net/830c55f0c73ea21aaeff830abe90d0a5cd2f403503b900b5e2aa72129b421769?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Remember Gulag", image: "https://mediumrare.imgix.net/8744b8f4130b95ed84a3bf7e8a59cf35cf01a8ecf2b74818f9beb0d599eaab39?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Jingle Bals", image: "https://mediumrare.imgix.net/c3453f1b5a16b59fb682d55c8e75d542b0b6763d383a47c5d5c24d7f03e53f30?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Bonus Bunnies", image: "https://mediumrare.imgix.net/80f2d2c4447e6e06d95b9af7f94165f577d74b78f24b25d753b5954fb0941f83?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Dead Canary", image: "https://mediumrare.imgix.net/7c5ca2b52a1298a4592a9650830d68e67aff4a10408a15d465bb8426cb78fc82?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Bushido", image: "https://mediumrare.imgix.net/256162271648c5c96d48e317c4760d7fd1853809e986dfbff8bd54d31cf20559?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Evil Goblins", image: "https://mediumrare.imgix.net/316bbcb1821c748b04fb87e64b194f9c155cd690ee307ec34a4392094e940826?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "El Paso Gunfight", image: "https://mediumrare.imgix.net/77cc160d9914ddcce1dfa45afc5d14f0102fa155b1bdd4b7433ad1a5b0f9a782?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Benji Killed in Vegas", image: "https://mediumrare.imgix.net/e0c840c69bbe217171b51fd911a7d633eebe0a1102b6d96fce9c63d6585ece05?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Monkey`s Gold", image: "https://mediumrare.imgix.net/fa869ff59279fa8a9095fee189e02f5db17f6039d7d9b791765d1c195b1d5ce0?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Thor Hammer Time", image: "https://mediumrare.imgix.net/5885b413efcf20331294f32e6abd70849cee0cbb75c19207686834960b7a7d7f?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Tombstone", image: "https://mediumrare.imgix.net/01148bdb8a08eae2e8817514ddb68fe6eeb3427390b00cb319e047ae4b1cd766?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Possessed", image: "https://mediumrare.imgix.net/68002032e338e4512a2194d9030b881cf751bed957fa5e3e04c07d81b94e962d?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Space Donkey", image: "https://mediumrare.imgix.net/eebe8afe073a7327804cd10f8f8be06c95e70479723fd6ab71b554354817f9b1?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "The Rave", image: "https://mediumrare.imgix.net/8f0d64d9be52111d617021b56f7fc822a898fe72ddae05df93d9e6926a942a54?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Tombstone No Mercy", image: "https://mediumrare.imgix.net/a8d6291dc467a3b9d33e3a0d85e6a364d1dcc777daaba11cd8c1a4289e177ca3?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Roadkill", image: "https://mediumrare.imgix.net/ac312a93e3011a33f9b2886df8eaf88ba8d17d6e06714e5292306fd31122ce9a?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Punk Toilet", image: "https://mediumrare.imgix.net/b7e23fd8bc2e4047abe21b26be8903a52aa0f11b0fef315d7cd9695dde5f2276?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "The Boarder", image: "https://mediumrare.imgix.net/655249307fb8240db8d6648421990843502a793ec60591c2b27fdaef744795e5?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Waked", image: "https://mediumrare.imgix.net/2d4e31f4a7d5f7ea70503d5ba99ce20b2e6eb6bf6aaa63a5e4cfca5f8186a5e9?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "True Kult", image: "https://mediumrare.imgix.net/b8c7c54caa9354397386209f1598af6061eb2e8620221ac111646f312351e733?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Barbarian Fury", image: "https://mediumrare.imgix.net/4504d296fc5f1e9fe5445e61e11f721b10cbc8f972e678872601e8691fee2cbd?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Coins of Fortune", image: "https://mediumrare.imgix.net/63d079d1db0688e108015d5375d3f9fceef3ee7f840eb3bff981c95e7b544f59?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Blood and Shadow", image: "https://mediumrare.imgix.net/51c4fe897d1c10590b228d7255b6c474357ec6f1c04e4286b03d52a197a3c222?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Kiss My Chainsaw", image: "https://mediumrare.imgix.net/bdfee60eeb0e46f3fde4cf7e2672711715c978f07392ade094836b5dc32b49d6?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Tomb of Akhenaten", image: "https://mediumrare.imgix.net/c9d4e56962e81284b267b4ea668fc830fab41a96cf2f4a1158a446e5872823c4?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Legion X", image: "https://mediumrare.imgix.net/dd3d10c1778385d21443f1807c64f22b34d2a65c52fa4eb695b6e260c40554b5?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "True Grit Redemption", image: "https://mediumrare.imgix.net/68552e953aeae114fe69fbfc5203b2ef2b2b2fe87bc9b277ebdb593546a3bfe5?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Gluttony", image: "https://mediumrare.imgix.net/df36859126cc991e9a2766277d7356cc4c8dd3d81db3f0a0720dd9aecc13e491?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Little Bighorn", image: "https://mediumrare.imgix.net/22d2c08af82a97b0644063771563b61a0b7053dc095f123bf74d83aa0f7f2f67?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "The Cage", image: "https://mediumrare.imgix.net/26f729a51236a7c96e45453f9643a8bb99b0a65835fd05049315929ccfd36d5a?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Rock Bottom", image: "https://mediumrare.imgix.net/51f733ffc60b5da5daa4fdb1a5174e10c1c31b2bdd454f1d068028cba3280995?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Golden Genie and the walking wilds", image: "https://mediumrare.imgix.net/23a5e9d40a75cbeb124c527b989fd48468fe45db9a1639de91cc5f52d19d7b26?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Gaelic Gold", image: "https://mediumrare.imgix.net/8efc6aec875332fb59e5767ee16b69edc2e4fb277fa2acccd896f21a0bbcc37d?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "DJ Psycho", image: "https://mediumrare.imgix.net/22c9730272521443996cbe24cd2011da48e6caff4543c99fcebd0e584a10d365?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Punk Rocker", image: "https://mediumrare.imgix.net/0a1d1fa465dc6842277aa8f2ce462932269f6e7cc1b680a0de201fdaa25d3fbc?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Walk of Shame", image: "https://mediumrare.imgix.net/e9d1159dc4ec26b40a436c9f1c3bceae323c552dd1e5c206d6ab4c93a61ba7fe?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Dragon Tribe ", image: "https://mediumrare.imgix.net/a2f7dabe8bc0947a89e80a60ba13b27814e5eef6bd1d45b4082c7310b9468463?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Bounty Hunters", image: "https://mediumrare.imgix.net/1b3e19c5dadcd298327774785a0ef6dad6128a2ffd323637a85eb34ed859b3ef?w=180&h=236&fit=min&auto=format", provider: "No Limit" },
  { name: "Gold Rush With Johnny Cash", image: "https://cdn.oscarstatic.com/images/game/uploads/softswiss.softswiss-GoldRushWithJohnny_designed.jpg", provider: "Bgaming" },
  { name: "Ultimate Slot of America", image: "https://mediumrare.imgix.net/4e212f817a163d07b8d65cda3e07ec94e2dac06cc520b26ff98ed97d4b63e33d?q=85", provider: "Hacksaw" },
  { name: "Crabbys Gold", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIzlYWupxTSBhZzJ13zkZyp3saTRA7eml9Q&s", provider: "Play n Go" },
  { name: "Alice Cooper And the Tomb of Madness", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pCgBW35jR7SNLHawrRNh0qP-vLcM0dQCEg&s", provider: "Play n Go" },
  { name: "Mighty Munching Melons", image: "https://mediumrare.imgix.net/148378d0a48bc442079c38baa4a8dbd1c44f5edbe34683321efba6d34a783d37?w=180&h=236&fit=min&auto=format", provider: "Pragmatic" },
  { name: "Sky Bounty", image: "https://mediumrare.imgix.net/fbd7a2ba07635bf8178c91c910f92d85ffa4fd4320a52885e7f6d005e872b8a6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic" },
  { name: "Starlight x1000", image: "https://mediumrare.imgix.net/95b7a5cf3b8fb3c41d81717e4bcf4dd615a0cc2256faee80684d824d93a3d3c7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic" },
  { name: "Starlight Pachi", image: "https://mediumrare.imgix.net/b5e8b647424bb8960eb480cd8d0015fc2a5e6af496255608a6ce6149521a1dfa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic" },
  { name: "Starlight Christmas", image: "https://mediumrare.imgix.net/95ae43b4eac22162e71ece7b111c5a45ae1c93bdfdeb141d3ccea0bc6652c0ef?w=180&h=236&fit=min&auto=format", provider: "Pragmatic" },
  { name: "Starlight Princess", image: "https://mediumrare.imgix.net/298229a9a43ea31dd37bb4f356055014eb7e45c570cf06aa59cb2bacbdd65919?w=180&h=236&fit=min&auto=format", provider: "Pragmatic" },
  { name: "Coin Strike Hold And Win", image: "https://mediumrare.imgix.net/1bbcfa17f0283f09c5edf293c154574c927df12bd52775fc6dc874641d11759c?w=180&h=236&fit=min&auto=format", provider: "Playson" },
  { name: "Hoot Shot The Sheriff", image: "https://mediumrare.imgix.net/2dd6367518c2dde0ab0be6dcbf67e27bf31b360b1723402ecd3cfe47b6f5c7d8?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Home of Thor", image: "https://mediumrare.imgix.net/494fd72c6cf90e055067ad69506ad0b4a7cde8b99fe8847ffd09d77b5b125e36?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Roman Bonanza", image: "https://mediumrare.imgix.net/73ca7c50b447324bb570226b2efe75d420ad977aaee516e6697c955e022a0de6?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Gladius Death or Glory", image: "https://mediumrare.imgix.net/789931cb460223cc303dcec9bf8a2e4c8c431cfd8e78c84f979f1eb5ad4cb653?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Pirate Bonanza", image: "https://mediumrare.imgix.net/dadbe45e9f2c2f6a057f168e0a9ef68077f684d9bb26db491ee9e3b49229c8d6?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Chocolate Rocket", image: "https://mediumrare.imgix.net/a858c07e77c66ada9faf506731adf24b23f67e29a0c424b342fef668006c2c1e?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Chicken Man", image: "https://mediumrare.imgix.net/780e3ff5ea3219edf3f7b75223a5ed9064131025479d0da947877534a6d9180a?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Barrel Bonanza", image: "https://mediumrare.imgix.net/78853c4c98bbc63173678f9a29fa16f693261b7d72b5fc21754dc780f8e376a3?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Sleepy Grandpa", image: "https://mediumrare.imgix.net/a5c9c0e7964070f2ccc2084e5805f1f4847d640e1a1c3f8e32dc37be96131d8f?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Super Twins", image: "https://mediumrare.imgix.net/eca3bbafa4c064ef4e32c908bd73c2060ecfb9ce71e5fb6f219c6d731a0d5f7f?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Clumsy cowboys", image: "https://mediumrare.imgix.net/4c89dd9137d1f916f9c61059e50ef52c7aa797a6b29bed222c41c35642c48e1e?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Shadow Strike", image: "https://mediumrare.imgix.net/f7043863474ce6a878eba4d1beb8c945be72b8fdaa79a48674e031b286e85488?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Blaze Buddies", image: "https://mediumrare.imgix.net/98b3f905da6fffb734d1333f5c6e1be3b8f4d50427339d11d1a2a58134d88e86?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Crystal Robot", image: "https://mediumrare.imgix.net/e20cb67dce597579213cf775cd799a6b5c0d312df0c155f7ed56669668824975?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Old Gun", image: "https://mediumrare.imgix.net/651407a0e2f495f40a4437b70e2cd22251030892709d8941577dc4d56042c042?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Infernus", image: "https://mediumrare.imgix.net/3cb55c7cef40ec3e4c5e72a31878a1eada01665bed706b23ae0375cd43eb6743?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fireborn", image: "https://mediumrare.imgix.net/ba872c286648c95b753edd2576f28592d947ebd27f100eb60ba98b5bc388d502?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Desert Temple", image: "https://mediumrare.imgix.net/598e3ad44572857dea16a8a0851618cc2a487f19cb9a21f8e8d165a020eda510?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "The Cursed King", image: "https://mediumrare.imgix.net/b7306f0ebca9848dbef7dd4cd9e229c0673df5a95c61e30efc4a1cef7e1bbe23?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Commander of Tridents", image: "https://mediumrare.imgix.net/c8e85b5b311d82a8bba1b76429384f0c33178e25c63f2f86b38d49acb8b6a372?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Space Zoo", image: "https://mediumrare.imgix.net/40e5fc070c8c0dad1d726ff7010f49a1adf459d34d79a059323a0a2140da1adb?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Blade Master", image: "https://mediumrare.imgix.net/07a947a8fb11abc7aa52c9628a94d0a997b254b0759dfdf4a4c08359660351ba?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Fury and Fortune", image: "https://mediumrare.imgix.net/9ade85dd180196247b53d8c254f4671255b34a44d8dba44b50d658db065a6f8b?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Age of Seth", image: "https://mediumrare.imgix.net/92e2a40a3d7a55c8d768b817bcc2b4ca91a30808de3784f40288496e7854e7a5?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Pickle Bandits", image: "https://mediumrare.imgix.net/001a175a54e58ef21a2db846cd9f8fae84d9092d09150c444fdefa34abe11f7a?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Ancient Paws", image: "https://mediumrare.imgix.net/76920357a8ae701cab16a1157eec612bbe4e87a301c13493af5caf2d89bc970f?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Valhalla Wild Winter", image: "https://mediumrare.imgix.net/e8cd1684359b7db17be29356fb29a7d5cefa42fef7cbddef9cefd4596c167eb1?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Clover Club", image: "https://mediumrare.imgix.net/95a3cfec930a6c90174d1c2699ec737872ee9ba6a8fd1fabc6f9abd69144d26d?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Jawsome Pirates", image: "https://mediumrare.imgix.net/6574ed2ce9866147ecb75af5ba09d7d2e84203d3872a40d27aea44f2865346e9?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Junkyard Kings", image: "https://mediumrare.imgix.net/e996d178a481fdf2f0f190ff3533c9aa69e7cce37b092d9a18bece5ad8664dde?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Amazing Miceketeers", image: "https://mediumrare.imgix.net/30f7870d14c0414bd140bd9cd6bb7ee0e401a8be1fc1e43b8bcfbbb3ea6e4d9d?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Mafia Clash", image: "https://mediumrare.imgix.net/430d97801ce54a8813dfee68c893cb9dbef32a3ca43b17d71790d86e7e01bd55?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Empress of Shadows", image: "https://mediumrare.imgix.net/aac93823c6b13375e6b5ac9ef4007d73f31e6abf93c72173962683768487a447?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Piggy Cluster Hunt", image: "https://mediumrare.imgix.net/040b99f34688458edcfb0aa6e9c7be4c0796d45e93629799aacec22946b82331?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Coop Clash", image: "https://mediumrare.imgix.net/75fabc4e0c30ff04b74baf6e55572e0276cd7b176407f94bbd145abd4d657511?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Holy Heist", image: "https://mediumrare.imgix.net/24f65e1310d76a41e84570b874d8c8c55f874b11a4677a8f090cfd81f793594a?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Wild Dojo Strike", image: "https://mediumrare.imgix.net/9c204c09cc4a6f9487f8783967f97d7f164f0467d35010e1529f5540db55d536?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Merlins Alchemy", image: "https://mediumrare.imgix.net/65cdec3e6fd95d36b9514019cb5f52e3a6a8aabcde244427f765122d71ccf424?w=360&h=472&fit=min&auto=format", provider: "Hacksaw" },
  { name: "Super Sticky Piggy", image: "https://mediumrare.imgix.net/930b0d1222ff53fd1ffbb7da06404686086ab76cfa0534a9cedd4808351eac7e?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 Azetec Temples", image: "https://mediumrare.imgix.net/071784a3c8fb2f33db1d0239e5bbb5142ba5e67ed5a68062c65a84ffd90d8e82?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Coin Express", image: "https://mediumrare.imgix.net/04f5a2af73d423c11b88f5617c5e33c6549cb25d46f16d5d6a1fa4ca178a34b7?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Lucky Penny", image: "https://mediumrare.imgix.net/28a4db71a382de03662ffd82a60d849ecc411c1ff8e1305afc4f393a3482142e?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Coin Up Hot Fire", image: "https://mediumrare.imgix.net/9ed38eb56824505f9383f13f20b8425432e74dbfbd85fc94c3cc7253708cb1a5?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 China Pots", image: "https://mediumrare.imgix.net/db9c7dd74f574eb8152a25571a13bd5773abe6b02f89ed02af5ae0b4d7f7b5db?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Azetec Fire 2", image: "https://mediumrare.imgix.net/d1c594b4d290e28426d986815bbc15c84d84c283103c5becc2ad799a9d50e751?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "15 Dragon Pearls Hold and Win", image: "https://mediumrare.imgix.net/e03cfdaecaf15311d6dcb09bda329a504de15c8bc6b0fe05afc6ba51c5646a07?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 Coins", image: "https://mediumrare.imgix.net/621fd8e92d3188f5cef0101653efd26fed12e6dcdfb35df7289b485f1218e41f?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 Clover Pots Extra", image: "https://mediumrare.imgix.net/972fe13ebdadaf052c44891e1ecec455d7b5622670eed5c17d2f8c8d3476237d?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Power Sun", image: "https://mediumrare.imgix.net/45f92b15b5bdf43a622b049d4b8f7acc26a0693ed1302c26bb12829e74bc0be6?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Coin Lamp", image: "https://mediumrare.imgix.net/57199aa61a0f2189cca12cd12c5a8e4e5dd0541399cce6a9332e48212e998903?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 african Drums", image: "https://mediumrare.imgix.net/e1dcddd9e52221ce7dc2f24a29fcbec3335ae336e11a00bcde05c26ec35de7fb?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "777Coins", image: "https://mediumrare.imgix.net/5fdd0f5ad0a7dd0e713db0f1372aca76de49ca0d6866910c3a3e3268e11989d9?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 Clover Pots", image: "https://mediumrare.imgix.net/44e80eb7111efbe9927c6101eea5017eb6dd9526425d27be53ef8a845a6c4dbf?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Gold Express hold and win", image: "https://mediumrare.imgix.net/5d0a130daf3e7ed5cb2823e9d303c98993a6f3f7a9d96d67209113cde549f13c?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sticky Piggy", image: "https://mediumrare.imgix.net/deefc5e0757b58b3b72e85d8b93e684e2c18de266e9cfe3e409ac25d1d809237?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Black Wolf", image: "https://mediumrare.imgix.net/60104008239b3b6f734862dbd9d731f6d9f664d0a22105e0a7acc72925fa2720?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "777 Gems Respin", image: "https://mediumrare.imgix.net/1ea512d33cc417120241529fb5f561029696978431148c2ae4c9f3a0fa976af7?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 Coins Egypt", image: "https://mediumrare.imgix.net/57cdd483aea608082a1c8400ac2fbee62adf7953f420e1b691f2e0db01756288?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Aztec Fire", image: "https://mediumrare.imgix.net/4cf62cb9a03c4044b8e95130b71602d672491ff2c18d52f5fc3b21a69250940f?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Boom Boom Gold", image: "https://mediumrare.imgix.net/a3b2f5cf9c9af7b002782e14986c4edf6db349d2a77ae5757b897f37ed18fcf5?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Wolf Saga", image: "https://mediumrare.imgix.net/c52670de69bf9624d0750e41d37b6e4874acb2c0f009b652c6cc263e61ce566a?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sky Pearls hold and win", image: "https://mediumrare.imgix.net/080225396949e7289ee4d69fb7bdd20692020516a8c60daa512e0148ba5b980d?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Super Rich God hold and win", image: "https://mediumrare.imgix.net/b79ac43e2450503e1857123a8a20f6e6e99975a1f31343f48b1aceee35c141c5?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Lamp of Wonder", image: "https://mediumrare.imgix.net/9ce3b4a76552122bffc281f4f827d61ec97900ea599ff77cab9b0511febe17eb?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Aztec Sun", image: "https://mediumrare.imgix.net/92f1b5880c722df3a8cbcb33bb0589112a9c6b2fd7623f889cb4ec170a16c0c8?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Green Chilli 2", image: "https://mediumrare.imgix.net/12599373725b87b6ec24797e33464bc0292d54834e73442ed215871660e6edac?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Gold Nuggets", image: "https://mediumrare.imgix.net/9bea1531180cb2c1dcc7b5dee11cef7d1a13d164ed491c8fcfbd41cde742430b?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Buddha Fortune hold and win", image: "https://mediumrare.imgix.net/35667059107b4c4553e97529b46ed4a43d7ff92d09f1f206c7b562ca0831ecfc?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sun of Egypt 3", image: "https://mediumrare.imgix.net/35667059107b4c4553e97529b46ed4a43d7ff92d09f1f206c7b562ca0831ecfc?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Book of Wizard", image: "https://mediumrare.imgix.net/8a200ff10c0a0959191eeec4a04e81abf1a4e3f38ef33c036c766ff45d4a204b?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Egypt Fire", image: "https://mediumrare.imgix.net/079efcf2de2128c051851169626a122c675f9537858fadde2701740a88a13540?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "3 Egypt Chests", image: "https://mediumrare.imgix.net/b11b369e363bbb7f4f737c131b331b2dd6cd1bcfef93ed4ed668f3c0476d0477?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "More Magic Apple", image: "https://mediumrare.imgix.net/a083159b729f372718228af4c8846d4e340f8f277dfdc57159861de709f706f0?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Black Wolf2", image: "https://mediumrare.imgix.net/7eaddd14ee23047b93e35de60e9f219359f15b0f8db01e9cfdd7bd072e32bd1c?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Wukong hold and win", image: "https://mediumrare.imgix.net/939dda8ac532dd70b2be908d0f9f5a3597b569f8a1fdbfc0a83e932d4fce0240?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Candy Boom", image: "https://mediumrare.imgix.net/ad2289244507a5703e9d92f3c9bc8905ef2972e4a21bdfbaf232a37972c5f801?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Lion Coins", image: "https://mediumrare.imgix.net/d13ff7870a2b75ac9f85715e87e8e8c86072eaa6a1b2ac8e51b9b358955beb5e?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sun of Egypt 4", image: "https://mediumrare.imgix.net/e8d47571b009ab8ffe6dd37a647679301b30dd111d99c0f4b5c578a1f0becffe?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Super Marble ", image: "https://mediumrare.imgix.net/00386712d83db3dccfed2ba1b97e04251410f74f3b9de4d68f35adafed75f1e7?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Wolf Night", image: "https://mediumrare.imgix.net/1a9d36ecbf44facdc52553f91f4d7c52a5cd34e0401ec64b85a20c5c975c054f?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Scarab Temple", image: "https://mediumrare.imgix.net/d663666695dd89f889506c445793aa8a55af8d79c534d82e200d18525f6b0e5b?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Tiger Gems", image: "https://mediumrare.imgix.net/819a3b214aaa54ba07b3b3da8bcb6f71549d01baf388d5f826a31fb743388bf1?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Book of Sun", image: "https://mediumrare.imgix.net/0fac23ed8fece3e090f516e8b1cc73a4bcc504e2d59dfda6dad1476a62f4d879?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Dragon Wealth", image: "https://mediumrare.imgix.net/0c7fa15af4e211b91f80945e18fae6297f44d86782b8c7c23f7d7c38fae3a587?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Hit More Gold", image: "https://mediumrare.imgix.net/15b2c1465156598cfbf4f8c4e039f81a1cd49984358663ff4e67174b75900315?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Big Heist", image: "https://mediumrare.imgix.net/d776ed24ec3472f63f8527bc074d02a7f4b08b512a3833b3593f1ae6c0a23723?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Pearl Diver 2", image: "https://mediumrare.imgix.net/7dde31ccc03a7d68514d9da0c79ece137df6e21bd701f8295d56dfaac7f8f95f?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Moon Sisters", image: "https://mediumrare.imgix.net/c2c2fe9d13508344796c41b0bbfec9f1def07745c248eaaab3949d895acd7815?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "China Festival", image: "https://mediumrare.imgix.net/abbaea8b14c8887d40dfb4b8adef86a8009265cd146fa87dd869e62468ed44d4?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Crystal Scarabs", image: "https://mediumrare.imgix.net/05f51912bf4f9a9d8979dc2c7c879ceec9430489c88b12a0ab5b4ee8b86e4188?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Dragon Pearls", image: "https://mediumrare.imgix.net/d8cc824c6c095f5d3f7cda2113d5044a079538667cd9b3ee284254329041c768?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Eggs Of Gold", image: "https://mediumrare.imgix.net/0debc0f807210f01e6cb67c86ca062966c3932804f5a35319b0353e8701779b8?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Book of Sun Multichance", image: "https://mediumrare.imgix.net/d43eddf41b3becc18d7b94559746f8d91993ec7197c407eba3d30551fb6d6c21?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Little Farm", image: "https://mediumrare.imgix.net/fd702ebd03c58ca2e6fd344c30247f3ce43a5a87c5a9b597cfe0c2bf92d1b0ef?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sun of Egypt 2", image: "https://mediumrare.imgix.net/8825caf4e011a82f6b4ab7cde9653e854eefa7e33d273e0f23ad22bfd898d3da?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Hit the Gold", image: "https://mediumrare.imgix.net/0a8b1b5b9f9b778d429bdfaa238c65877b7a6c18f0eec8a638f10c3286e88fb5?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Tiger Jungle", image: "https://mediumrare.imgix.net/b2fa6c7e82f5c2839436b653b91a270836ec777584e8df16acbc3101ef83222c?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Magic Apple hold and win", image: "https://mediumrare.imgix.net/a22a2f6e8c6ab471b63360ded16bb0b0424efa6b702c37a52f93363fd527c116?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Scarab Riches", image: "https://mediumrare.imgix.net/4d61f0b7ee09f07432685182a6c7c9e00e41d36e47b6c46d409e966f4363e8fe?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Green Chilli", image: "https://mediumrare.imgix.net/b837d588cb4a8199572f6f827f0632952eeb4f39c134e0843975ee6ed0239c6a?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Grab More Gold", image: "https://mediumrare.imgix.net/d364aede7b248334cfb8dbdf67de6f2d54b4e19136db12d343862eeb40d4072e?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Queen of the Sun", image: "https://mediumrare.imgix.net/38314d61a8304e913837db18fd4780f33c1014ceaebe632be731200b15c3ccd4?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Lord of Fortune 2", image: "https://mediumrare.imgix.net/d56c8a88317c63b1bc12e1fe80fdbd4bda26a3d22d77ab564c97ded8e0d18481?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Grab The Gold", image: "https://mediumrare.imgix.net/52831c048112281517141ce57469d30273fd054277f25c18e6248831f26b9124?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Thunder of Olympus", image: "https://mediumrare.imgix.net/724ab9940c8982543f86a8302267fab8a28e98639a53553525c9fd6148d991f9?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Olympian Gods", image: "https://mediumrare.imgix.net/e59fdc1189227290ecd326337237a4b620100869c23b181178326a51b2a19fcf?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Scarab Boost", image: "https://mediumrare.imgix.net/c07923607eafd12e0b85a2857383ce206269d675f6632133d6d514d431482ea1?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Hawaii Riches", image: "https://mediumrare.imgix.net/0962cd59b027d298c6bf47ffa478213fd01b417eb23d639b017c74b182153a90?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Maya Sun", image: "https://mediumrare.imgix.net/be4bc87e518f6b853ce51041d5859f895b15d84db6e318c576906fb9a348f84a?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Rio Gems", image: "https://mediumrare.imgix.net/a942741a93e50087501324c66e5fb14bbe6148ea7f9e74f3a79df311f504a138?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sunlight Princess", image: "https://mediumrare.imgix.net/9b6f42ca523917040493a9c87ac11140365dea736c23ec13913d8823cfeab920?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Sun of Egypt", image: "https://mediumrare.imgix.net/f480d50fed347d852024d7f19033e86ba083bcf747fac31eb4f9a67ae981a8c2?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },
  { name: "Magic Apple2", image: "https://mediumrare.imgix.net/4005c84b0b69377b8e2c82f5d88c081abd84dffe35b7f07d13cff1bbcb8ca3f5?w=360&h=472&fit=min&auto=format", provider: "3Oaks" },  
  { name: "Sweet Bonanza 1000", image: "https://mediumrare.imgix.net/445d5df4246639bd20337a70ee328301f1d949f4d3c2bc60c9bd7a31fd3636de?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates of Olympus SuperScatter", image: "https://mediumrare.imgix.net/73318f9e220e1637c4b11338d10f377cd997d0232636f5f5a1940167ad0451cd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sugar Rush 1000", image: "https://mediumrare.imgix.net/14d5410c6cf4c303d291262a10e949dc14b0ac2eca2a7a730b0401919c01358e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates Of Olympus 1000", image: "https://mediumrare.imgix.net/8421465d345dc9f775ee55001e0337b80d86dd77f2de36e4cb3650a364210847?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Brick House Bonanza", image: "https://mediumrare.imgix.net/39d97d426a8f9423aff8862c595c46dcd61dfb3b13f87d65d92fd0eecc5bec2a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates of Hades", image: "https://mediumrare.imgix.net/60206bb76f8d15dd2975ea5d5c908194c66a1183683e6988c83027ada9befbef?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mahjong Wins Super", image: "https://mediumrare.imgix.net/1b79532a239bd087f3c3ea7d3fc831587d03ee765a07fcb4b1ca104a055544b2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Triple Pot Gold", image: "https://mediumrare.imgix.net/e365aeb59268c5b855faa72d77feb90c08ac4ffbeb701c81448f4db96a7ecee1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Boxing", image: "https://mediumrare.imgix.net/83f635b69fd26ecd4a7c43a983302ad110a1150ffc23b930fa04d99f6fb186bf?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild West Gold Blazing Bounty", image: "https://mediumrare.imgix.net/cdaad008019e4fafa1ce7bc82181c2d07c4d22a67f892e9d493ce3acb55179d2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Bonanza", image: "https://mediumrare.imgix.net/7a73d0321e7b6501b7f92b3522c7e6410f4ba8a94ffbf2a260b92a4c509e8cec?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sleeping Dragon", image: "https://mediumrare.imgix.net/6dcf1405b1b25a951812be21b316d1401d1f904b8b7e05150c2dee04c3346251?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Diamond Strike", image: "https://mediumrare.imgix.net/bc7e8e6030ce264762f520b096da402d2c6f745bfc93d7778836845a739fda33?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bigger Bass Splash", image: "https://mediumrare.imgix.net/181ccd872939a7a23b955a3de13bb83cc2c923e20fe358c37f70d3f9af533e7e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mummy Jewels", image: "https://mediumrare.imgix.net/308ef68e4faa11eeea79ebe1a428a6b8e51681e4a5393a1ecfe3ba5db5adf196?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Witch Heart Megaways", image: "https://mediumrare.imgix.net/84b9e198ab9afe0b9624816c00d6ebebb7df1cf348bc26ed055235bd9ee1ab07?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Jumbo Safari", image: "https://mediumrare.imgix.net/06ddf6bf4cce8e9d7a56c4a787b816f03659e963bdb141228b4335e47866193e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Majestic Express Gold Run", image: "https://mediumrare.imgix.net/f76fd75d2ad3833107e1edbfde465e324900fdbf3ec59f55f0c82bbe68cf4a99?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker´s Jewels", image: "https://mediumrare.imgix.net/51c770461759a1cbee4d1ade3a5d0be88d1080c5cf4cf91b2af55631ddf476c1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Eye Of Spartacus", image: "https://mediumrare.imgix.net/490440b6826b05ac256cddf29e2ce635fd6bfa2fae27d6376c266748257bdb6f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Money Money Money", image: "https://mediumrare.imgix.net/bde4e4f235ff392887973f98c115f64c74aa9187899dcdff01d5dcf181e14b14?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fire Portals", image: "https://mediumrare.imgix.net/5f66bd7f515175883d6d66e609e125fcf33f53508ea9a986841a822b63dbc9cf?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fruit Party", image: "https://mediumrare.imgix.net/cb8c8e48781137b94c5dea7326d5c4d15b045ee1e8282b8ca674a0ac231914a8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker´s Jewels Cash", image: "https://mediumrare.imgix.net/e505eda36f86032aa3a75c7b38b39e96d98069fdc03153641d276f36e6f3fb29?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Starlight princess 1000", image: "https://mediumrare.imgix.net/95b7a5cf3b8fb3c41d81717e4bcf4dd615a0cc2256faee80684d824d93a3d3c7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Temple Guardian", image: "https://mediumrare.imgix.net/486ac64c473bc5db6a846c51c922473fd8d980ac4f1a9fec8608f16189d9095a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Resurrecting Riches", image: "https://mediumrare.imgix.net/810b3e7cb5e50c92a64f946b4d44a01211b82670890303d30bd3c18becc9cbae?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5Lions Megaways 2", image: "https://mediumrare.imgix.net/0eeb084b421e2e96d17fce52d9bd81ca5c7396e8035beaf30e84a8510169e1b4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fiesta fortune", image: "https://mediumrare.imgix.net/2b95ddcc4f3b4b70dabf6dc4adb453b7057a9ad4710af57a4b2fbdc621264a88?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sweet Bonanza", image: "https://mediumrare.imgix.net/f95b3adf9d28d57496dd8da909c0cb97515104194924c5abb4cc9ad792f35dfe?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Floating Dragon", image: "https://mediumrare.imgix.net/8e41f5bda43cd6f5efd13d705decc671ea46d314bffea1d82a43b0645424e3a6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fonzo´s Feline Fortune", image: "https://mediumrare.imgix.net/49c50527188012674949d432c28723f3dc0b0b39beb3649e6a3e4c9e3c565006?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Candy blitz Bombs", image: "https://mediumrare.imgix.net/82aeefaa77fd41764c2c75d021f4425ee47c9e119156b25c60c08087e64eb683?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ride the Lighting", image: "https://mediumrare.imgix.net/fa6de27bf3df92c420ac7710072dfda5ee447c31dc05afff554d3a9c5394f591?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Juicy Fruits", image: "https://mediumrare.imgix.net/868356b0d29d09d265dd73771d040d29929d74258a42225a6756761ccce09241?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sugar Rush", image: "https://mediumrare.imgix.net/d460898300e27164e6a059a28fca4b38582c07701a7298566ac08661c8b7dc58?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Dog House Megaways", image: "https://mediumrare.imgix.net/c7e86199205845ec3916e85370c90528a633538e2ff015168e1f5c6f43dafef1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cash Surge", image: "https://mediumrare.imgix.net/c19e41e7182197125fb23f4a9bccbb5b4b44ade5d8d6633f750c95d5e55701c6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker´s Jewels Wild", image: "https://mediumrare.imgix.net/f633bfabe59f18c01a5b19e21a91a3986b29bdbddcff2fec2409a59075bf0955?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Zeus vs Hades ", image: "https://mediumrare.imgix.net/d5e78150a0d8d9c532cc8018b6cebe421baaa443dabbfda9d362c5bc9d358224?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Biga Bass Vegas Double Down Deluxe", image: "https://mediumrare.imgix.net/c4afdff961df33dbf99a1b9544e78659e5a58d5624a30b5017c98a947a94a5b1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Secrets of the Golden Lake", image: "https://mediumrare.imgix.net/516dd23e24bc643b9f6d77362b11b8b077ccea882a4dffb2913e023d7131fbef?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gems Bonanza", image: "https://mediumrare.imgix.net/58af3324803454557a6f58c076ffe9aaf319f16e5aa2b63d4d7858c1a3f59b8c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates Of olympus", image: "https://mediumrare.imgix.net/eb7ea358dba2cf7967e42f9c8327eb787dd9530d74b8cbdbfcecff9ccc962228?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Madame Destiny Megaways", image: "https://mediumrare.imgix.net/958dba694292af80ba3f7efdafb46403b9ca2c31e751f69005721766bf2e8052?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Buffalo King Megaways", image: "https://mediumrare.imgix.net/25e8444ecd1743ad310d141ae1eb68e2af797b1a642e147c63186a141f339625?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bandit Megaways", image: "https://mediumrare.imgix.net/a7be649b28536568effa8596f9e9269e776b10b580ea50d846967fad1254bbc7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Dog House Royal Hunt", image: "https://mediumrare.imgix.net/e187c138d6cf838bfd7aac66124398b9d967f17c6c000244d3ed81e434d4ea0f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Splash", image: "https://mediumrare.imgix.net/5bc066f85f02230fabc6a19bd4ccc6a0d2707b6173b49c7d7b35c6b00dd29c45?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Mission Fishin", image: "https://mediumrare.imgix.net/8755532721d640c0ac309fe2b1261a738750cb6fcbb0b3b91127986584da9ca0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hot Fiesta ", image: "https://mediumrare.imgix.net/2e2aac1c67740ba49ee4a3e5c8e7e5397d5cdb477298db45b82916e2431e898b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Bonanza", image: "https://mediumrare.imgix.net/713054d6e4d7a33d599e02ca3a53ff486c018b07def931e61b6b06fe94183d0f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Chicken Drop", image: "https://mediumrare.imgix.net/c7ee6ffaa8a2a4a85b0eed3e9cecdb68eec7a339fd87ea9fc8cf35c74855da56?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "7 Money Roll", image: "https://mediumrare.imgix.net/0e56cf6f61856fcecac09060dc90dddb7e2aafe5bfc5bb762fb917ec50efae8f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Amazon Extreme", image: "https://mediumrare.imgix.net/c5560e132b47efd8478e3d3f5ec73fab52d247e784187cfa539495bc5b56e548?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sky Bounty", image: "https://mediumrare.imgix.net/fbd7a2ba07635bf8178c91c910f92d85ffa4fd4320a52885e7f6d005e872b8a6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Dog House", image: "https://mediumrare.imgix.net/655cee0c7300da437c3594aabd12f2f2667491b0f010cc58e162c56525551ffe?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Buffalo Kinga", image: "https://mediumrare.imgix.net/3c7dc5ccf410dba0249de36326149dc8dbb34cce60dbf68d07deaa7c489c8018?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wisdom of Athena 1000", image: "https://mediumrare.imgix.net/3b1ac4ce092e99b304a05228604ff71e043caeabd16e382bcbe4a25d03b9cca7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5 Lions Reborn ", image: "https://mediumrare.imgix.net/70e9c782f44a014bae83c385d036a525760f94ac0b497634ae75e43b77655ef3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Lucky´s Wild Pub", image: "https://mediumrare.imgix.net/2288d9ddf0f4069beb19a7bf09b2c9733142dc6891c1a220ed5d730186100f0c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Floats my Boat", image: "https://mediumrare.imgix.net/c50be64591bed4e2b5975dfd941b7f5169d005c84824f35fa32c3ab05df7309b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker´s Jewels Hot", image: "https://mediumrare.imgix.net/c19364a0a682f01e627abfe30f10e0d3356c8778214bacd7667734414bd2274e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5 Lions Megaways", image: "https://mediumrare.imgix.net/741f8f9dd2ead70e1e3fb9b34ef4058b0b431ea93f60f17b71ac65fa7f41bf17?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Starlight Princess", image: "https://mediumrare.imgix.net/298229a9a43ea31dd37bb4f356055014eb7e45c570cf06aa59cb2bacbdd65919?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Halloween 2", image: "https://mediumrare.imgix.net/d305f79149a868f277494b76f2b9e16636177d0062e191d0f37751ddedaa26d1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Blitz Super Wheel", image: "https://mediumrare.imgix.net/10af108d1c293f2051b3ba91df7b19ae035dfa126d68b1ad47abe2aa23f86016?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Three of Riches", image: "https://mediumrare.imgix.net/66aebad03a21522bcd78919b2f74b6712f57cfe6a90c2b0e3e70a77b1b2e13dc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates Of olympus Xmas 1000", image: "https://mediumrare.imgix.net/206a059864461c5bb63e1af83d5a105a2c36205cb8e01b37418f57d10d295252?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Money Stacks", image: "https://mediumrare.imgix.net/3e2cd4909b257c6dab1c49fcfbfd2f027157a39f64d24981da7a75958ea2a694?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Peppe´s Pepperoni Pizza Plaza", image: "https://mediumrare.imgix.net/a710fb4b159d4a3cf7c814d11b1ea07fe0a5ce4442122ea3ce102c96eb89dc5b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "888 Dragons", image: "https://mediumrare.imgix.net/3db0130d81618e121f86fb7c7bbd3127b8590ee939a064b4a9a5b7617a577f8c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild West Gold", image: "https://mediumrare.imgix.net/b32ebfb209819a291bb823fadfd7342b9cc2d8372adb3f3d335f815c7c4a6399?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Greedy Wolf", image: "https://mediumrare.imgix.net/0104004e1f769a1974feaeec500f12c99d1ab056f94b437e4d360eb6a87bfda0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Angel vs Sinner", image: "https://mediumrare.imgix.net/4673b7de47b7328e00ed7d63b8ea8be3850ac7c2c691450faf065b6e15481546?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Wild Joker", image: "https://mediumrare.imgix.net/ea96f6e678bfadaa7b91b5f424037d358c467385240bd6b9ed5a208202c9c1eb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Saiyan Mania", image: "https://mediumrare.imgix.net/717da1b22c088dc442213c84367c5e8ffd62c1ae23a34a337da39d995c55aa68?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "7 Clovers of Fortune", image: "https://mediumrare.imgix.net/fd7b104ef77f1e07b2cdc7747e3edf469a5f97e9cb80062aebdf7c5a8f2a30f5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "6 Jokers", image: "https://mediumrare.imgix.net/e1e7db71c21c4a4cf2751ce04e32fe5d7da1ff87cadd2950b01b171e7e997884?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sugar Supreme Powernudge", image: "https://mediumrare.imgix.net/fc3a732b64a73b0011a0e55def22bb91de90bddf3637f5aad383fd30e47b1fa8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Return to the Races", image: "https://mediumrare.imgix.net/2a34f19ea9f4f8e0b159225f79d0d4119b3d499d04295bc02f0fe78b117ddbd1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Floating Dragon Year of th Snake", image: "https://mediumrare.imgix.net/c5ca010a7f88ff1fe307956e02f7dc373510dcc885c42d10f31fc86c63eb55ea?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Vampy Party", image: "https://mediumrare.imgix.net/857e57fe97696eb3cdbd5c226b87b4357ef8e2926c75571e7e7ee70b082155b2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Release the Kraken", image: "https://mediumrare.imgix.net/b93d03aef477e9b26e7c0e0e4ff1111bd823dc3e583706f12ef65dbfca926a73?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Chests of Cai Shen", image: "https://mediumrare.imgix.net/e9fe64436c485ca471ccb7cf8362ef8f872580c3bcacaaeb253ee3007c115b51?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Book of Monsters", image: "https://mediumrare.imgix.net/63707fbb0327994708728902b8fef1b82a1be2b5f21987cd54247cd4be6b44a6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sweet Bonanza Xmas", image: "https://mediumrare.imgix.net/1447e7b5bd06c7c00fce930db14c38019c3eda5d7735782a0967bfb77808fa37?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gold Train", image: "https://mediumrare.imgix.net/8124efb482a00c9b8589aa8b406261ee5c79f49b3fab0fec705653fa4f30f0af?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sweet Bonanza 1000 Dice", image: "https://mediumrare.imgix.net/4a8e119e4fc2dfd38439f8adbd315ed6c377f5ea825bb293f28fabbe0a34cd38?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Christmas Bashi", image: "https://mediumrare.imgix.net/f4fa756056017a2f5e99e437cb28f3b97af7be0e26a64a4eb10796c57f5a7427?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Rock Vegas", image: "https://mediumrare.imgix.net/fa642b7a616b2f2e983bceffeb7a79493071384a7a5f24f96a79a43b85ed4aa6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Xmas Extreme", image: "https://mediumrare.imgix.net/e368e3376b987897e6efa70518ce562b65b940eee11839dfdb80192b4ad8df3c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Muertos Multipler Megaways", image: "https://mediumrare.imgix.net/69b1f589ccb6dce75d69282d9089d6debd79077398c368d4ab91d072fe1e3f8b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Wild Gang", image: "https://mediumrare.imgix.net/5e33aefb98caae3874aa5cc435a58a068d7600417788461e3e6a2561f2554863?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Buffalo King Untamed Megaways", image: "https://mediumrare.imgix.net/00fa6cb52fa341ab548c3bd27f21aa793b935417caff9ab18e345eec1af33db1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Tiny Toads", image: "https://mediumrare.imgix.net/799cfcee92e88672a30cb0c75f8a73431977e6f262009650145da6bca077d6af?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates of Olympus 1000 Dice", image: "https://mediumrare.imgix.net/c0343caad3435cc83db2e072a20e450fa3502a1b5d45d67bba2adbd85d797d45?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Pompeii Megareels Megaways", image: "https://mediumrare.imgix.net/4af24920ee5ecb18c43c754e17f03803bb465100ae71123e40db0f34f10b0b84?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Dice", image: "https://mediumrare.imgix.net/3b1de17d4f265d5ca39a883d651bd70a6b0a6859203e519d2f67e2598a4704aa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "3 Buzzing Wilds", image: "https://mediumrare.imgix.net/a8f4ae8daa91d9a794025d815e9734243916bf1744860e2d52ca104751a9abbc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Halloween", image: "https://mediumrare.imgix.net/36f247bc334324a6289a19270555e40010b20cb85e3bb4d326ccc038a4508a00?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Moonster Superlanche", image: "https://mediumrare.imgix.net/34a34371dc8e84c4be808612f3eb52a57b61b1ce99df136e019a78c84e518cff?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cleocatra", image: "https://mediumrare.imgix.net/f8599efe28ee0205325f47b4776941b83273be25517af23d23f895b285d0f064?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Might of Ra", image: "https://mediumrare.imgix.net/15392e9b338b1002011405b5e0cfbcf363f976cfc76ed9c4d16478511d22b5e7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Master Joker", image: "https://mediumrare.imgix.net/9042093582edbdaeb98645f3605bde03eaa5c299bbf7af51bd8526e853341a88?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fruit Party 2", image: "https://mediumrare.imgix.net/f94c351797ba9ce7f9c25e68201c62aaaca69d805ff7cf754d577d51937b1751?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker´s Jewels Dice", image: "https://mediumrare.imgix.net/71000d56559cf9ececce7a6949835f7f475fc59c04ba72f27d4807bbc6c90dd4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild West Duels", image: "https://mediumrare.imgix.net/62b2449f9a8577d4908ca4c2478e8db46ce6ef3f306eaa4497d607e0db853d5b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bigger Bass Bonanza", image: "https://mediumrare.imgix.net/5babe07cc44eb499c96cb2915fd1b6c652c01938eb8dc125b38fd41d97cfb668?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Dragon King Hot Pots", image: "https://mediumrare.imgix.net/c526e8b275a06005e6a52d9481c932e7afe6e373f9ac64bba9d07bd99cc9a751?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Hold & Spinner", image: "https://mediumrare.imgix.net/332281daf2e85d8302e05f19e0baa62744e9827db1358ff2ad93dc8ac31ba6d5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Floating Dragon Dragon Boat Festival", image: "https://mediumrare.imgix.net/3694ffa3ba9504ce65915980ea5eff166fd42234b4b46691a33c78ea6e444a4b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hot to Burn", image: "https://mediumrare.imgix.net/09e568ba1294a2b401a7cf76dfd2bbbac722753af1596e71fe434933fec41a24?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Queenie", image: "https://mediumrare.imgix.net/010c32194828d4864f8dbccf225892a3e76f617def1a3120e5f70fd85fbc6630?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Zombie Carnival", image: "https://mediumrare.imgix.net/bbd5d7b9543ba2d37489c79ce6d5687bab314a13cc88da8cc35281140a293a7c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Day at the Races", image: "https://mediumrare.imgix.net/a836b8ad79c35404df44ee054a1762dfa4b4de0006ca93c114951c9f12e125ad?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Twilight Princess", image: "https://mediumrare.imgix.net/58683c96bf98c39621ab114994c0dd520a55c583b9acae8cd362392de151b758?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Dog House MultiHold", image: "https://mediumrare.imgix.net/4e9386ce838d3c59b1905529a13063930ea1bc11cc9bd29a5062dd7d47c383d1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Money Stacks Megaways", image: "https://mediumrare.imgix.net/cc95cd1018d1fb5caa0af2fdcf2272a8301f5494afbd119d43d63c60eb5dd6b5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Wildebeest Wins", image: "https://mediumrare.imgix.net/c01eab4e7d5184de39f6321660cb1e31a8cb6584feec99b84c195568003ce056?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Starz Megaways", image: "https://mediumrare.imgix.net/8ec2ca8bcd4deb3d24e8e047da889b22abc9c86ee5c4ca19a72e2ded0099752f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Bonanza 3 Reeler", image: "https://mediumrare.imgix.net/5f908029d31d48432f5710ee780546d3e8058120ab7ab6a03773e8e48416b465?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Release The Kraken 2", image: "https://mediumrare.imgix.net/e60898842cf8face6b9cafdd13574022016e19b7f559d94d4d122a2823a32696?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Juan", image: "https://mediumrare.imgix.net/880b67fef3d7750e352939f603047dc8fd2be989e1b20e40f30fa7630e967e70?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cash Box", image: "https://mediumrare.imgix.net/9d62c062edfab726b6bfe6eb9400327d69d95cebcd5b22bd8820bbad9b5a17e3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cash Bonanza", image: "https://mediumrare.imgix.net/8e4a5eb5529f53f6874f887d702571a81286dbb565ad9d6bcf1dfd8549611ac6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sticky Bees", image: "https://mediumrare.imgix.net/bb4c69864aabda18ae6016f781ff86e2bd6f4a7a20455c70e459bd89d258f15b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Rocket Blast Megaways", image: "https://mediumrare.imgix.net/cfeda02feee0f93f36ed57289080d7e7e5f45ad4105a38650e25b0239f863f88?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Irish Crown", image: "https://mediumrare.imgix.net/fd21d8cae2c645ed3ac53d6da3366aadca1ceab112c7f96946c0d156f9226667?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Release The Kraken Megaways", image: "https://mediumrare.imgix.net/22c7089ede1396ccc0b6f27278305abfa9ece7de30819593637bc095a3956a2b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gold Party", image: "https://mediumrare.imgix.net/e3151334228b0cd92436375fb7fa236faf566f13cf75bef167a5bce8b415f379?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Juicy Fruits MultiHold", image: "https://mediumrare.imgix.net/31704ea553666f0d08ef9edffe97996f367f38aa5bc32b280f305c2e25f96d57?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5 Rabbits Megaways", image: "https://mediumrare.imgix.net/df6f6ccab517857816feb285bf17b84c68c66dd272caef926c2d973f6fe42ecb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Triple Tigers", image: "https://mediumrare.imgix.net/607de35a5e4e0e61a3d690557902d58c9a7d92d5f8eb626aac5cd2e321dc7147?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sugar Rush Dice", image: "https://mediumrare.imgix.net/1dfa0e762f74219c3cdfe56428fed3130191f4ef289d1e7f5b116023a6d1e450?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sugar Rush XMAS", image: "https://mediumrare.imgix.net/0e621a565ef413c50798294d014cb1e96550effe8ab5befcd1d6774d9dc20148?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Super Joker", image: "https://mediumrare.imgix.net/b41793b683c2403d8e05d7d98b5888da5d737ea4e0cc8d76d9b2786d80ca8c5b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hand Of Midas 2", image: "https://mediumrare.imgix.net/995fb5fef19786c52a568db144aafc8fd4c385f0690c0bc056c1588f4253c1a4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Wild Riches", image: "https://mediumrare.imgix.net/78460943fb9a9ceb88066262c9d5a208212383b6a8b530ea7a2a302257e8bfa2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "888 Gold", image: "https://mediumrare.imgix.net/f9dc69c9c50f9b1488e2d7b2df59937fd1af71fa1ed08c53104faa621c9ddade?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "3 Dancing Monkeys", image: "https://mediumrare.imgix.net/84c22781ec478669c064abf8824387cd3c3f49687e66403b5ea14c3fcbdef042?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wisdom Of Athena", image: "https://mediumrare.imgix.net/2e82458f31fbf81b90f62da7eb27bf63fd50701aeff11aae0e959b9d2a59a135?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Power Of Merlin Megaways", image: "https://mediumrare.imgix.net/680c150385d441b72814bd449c329f64e37d0888a7b082bef5435b1e52783abc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Club Tropicana", image: "https://mediumrare.imgix.net/d403bd0dbea39bb705836ce5100e598b102b2680bded6c333d956b26ca0c59e9?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Curse Of The WereWolf Megaways", image: "https://mediumrare.imgix.net/40339f1c29aa21d3454ef5987ba4564da64246347a31cdfea5b3e7193ef23932?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Bison Charge", image: "https://mediumrare.imgix.net/4f656be5970a7314078d68157aa835ef7e821a2f5fa16bdddf0b175f927fe791?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Christmas Big Bass Bonanza", image: "https://mediumrare.imgix.net/09dafeb49bb8893af92978be45c903cf32f9b674ba07d7fb4976968e41f9915f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Running Sushi", image: "https://mediumrare.imgix.net/68cd2b6192ff99c0e6a1697846f5e93e2983f2f644afa4ba1bf6a8e538660479?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Great Rhino Megaways", image: "https://mediumrare.imgix.net/3f4e0660414099f6074b33e3d31b3492d087530d662395758f4625aa19c72e8a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Book Of Golden Sands", image: "https://mediumrare.imgix.net/a50c8c8d4d15698982986e93c81c41b670cb79db1c09a9796bc6b9ec2695ca81?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Power Of Thor", image: "https://mediumrare.imgix.net/48e63182b0027b733e5a3f57fe6185ff6496567cb25205e348dcf2abbadce37c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hot To Burn 7 Deadly Free Spins", image: "https://mediumrare.imgix.net/7fac3c96f1111c6bf7a5a51c03215bd65d8f6ddcbaf657cfe4a3bf61163f3add?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Voodoo Magic", image: "https://mediumrare.imgix.net/6d82057496e321fc98c0b24b75ccbe49834fc4c20d930a266f892f5851f4f266?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Hand Of Midas", image: "https://mediumrare.imgix.net/0d49e02de572c7016bf498af8b4aa928039ea050c9ddb85e176e5c7e31310a41?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Raging Waterfall Megaways", image: "https://mediumrare.imgix.net/7f4c6bcbbdc99512541098ae4e525023b2718f69715cedd3cbaf493d164fd6ee?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Monkey Madness", image: "https://mediumrare.imgix.net/fb215f91dc04a8364efe8ec4cd0899e984c2d5da6c837f705e9ef2b81c18ef6c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Gems Megaways", image: "https://mediumrare.imgix.net/37a24f8935f1c8cfa1301d53d98f25d4aa9838ea63bb3b2ba20149b78e2308fa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Dragon Hero", image: "https://mediumrare.imgix.net/26802168dc5361febe0325f36cfc6af8a4b8535c8d6181961d4d6d948d4f5ee0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wolf Gold", image: "https://mediumrare.imgix.net/96633eccdbd731a88e54dce8c927a04a2f9df6d370535d620f6e1a1a1e3a7105?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Candy Jar Clusters", image: "https://mediumrare.imgix.net/6b4cc5f321f24cd0bd68c19213804dbea18996f564b5bfcc37bc0e9b186674f2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fire Strike 2", image: "https://mediumrare.imgix.net/ae36f66c8019a0b75ed0ac4dd2847c1012b7bbf3e333207ea1f3f3ded332e9f3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cosmic Cash", image: "https://mediumrare.imgix.net/0b269cceb05d0f0a368c87fc7d6412c77574a0414f451cb9b9c550c0b1381a2d?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ultra Hold & Spin", image: "https://mediumrare.imgix.net/f0e48e8556bf565ebbf4c027f799ff989de7de51bb932b4e9b3ad40f848320ff?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wheel O´Gold", image: "https://mediumrare.imgix.net/98e841ce9678ed0ba2959c37392f8d5019d7b5e96be63f5ee8cc037c89620c2b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Bonanza Megaways", image: "https://mediumrare.imgix.net/40ba877edcd774d87a03c149ad56b6e29139fc083c41c2da0b2a33af7dec9e6e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Extra Juicy", image: "https://mediumrare.imgix.net/ee6f6d5541ce700439d86c9cec97e3b395df5b97c2b99c38c644aa8552af7c49?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fire 88", image: "https://mediumrare.imgix.net/65ae870ac7e944c2046ef7eda8b6f8ef9cfd03f20bdfa56bb0ee60a53199ce0c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild West Gold Megaways", image: "https://mediumrare.imgix.net/a16bace509a7b8962e9cd0582832042f2f16c8280015f82894cd8db6a843d2b9?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Santa´s Great Gifts", image: "https://mediumrare.imgix.net/059801928fb15208481e42ce20552a5af910199d2a25021ab586af47dc06eed9?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Beach Party", image: "https://mediumrare.imgix.net/c658df3a0c2a5ee1db56b739065db4ffbefd058cd0ac46a7282c7a3175ff4761?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fish Eye", image: "https://mediumrare.imgix.net/4e8700d561e278d0610921e475b9620ce9195458ecc29e10b29a78c25ca98aec?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "7 Piggies", image: "https://mediumrare.imgix.net/3aeb93a1c2226f82d8ccb89ef7f60eb8751bf9d18284e4e5be62974466bc1401?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Starlight Christmas", image: "https://mediumrare.imgix.net/95ae43b4eac22162e71ece7b111c5a45ae1c93bdfdeb141d3ccea0bc6652c0ef?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wolf Gold Ultimate", image: "https://mediumrare.imgix.net/331a95d3fcfe2035dbffef44ec3928d7adaae1d473ed70667d49a60f7a6df0fe?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Eternal Empress Freeze Time", image: "https://mediumrare.imgix.net/d1f412f0912e871af2f5ade614989b15accade0614dae3efcd6e6a553dc665b8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Money Men", image: "https://mediumrare.imgix.net/7d6cfd56f91fa69c9f07e68cd39c8d5db775200024767736e4ce9281571c73c2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Dog House DOG or ALIVE", image: "https://mediumrare.imgix.net/0d71f82f4237987db985f8844b984edb28928284a647bcccfb47344d27c75dbb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Volcano Goddess", image: "https://mediumrare.imgix.net/34d8703b7e6b66b9e2685b13c0c1753b264197d54e0486835cbc98e8586d65fb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mining Rush", image: "https://mediumrare.imgix.net/fcf877eff4dde181f8c38fd6966613345107eea97b00abc37cb31dc1d336e325?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Amazing Money Machine", image: "https://mediumrare.imgix.net/41c29742686b52e44b92dc1e09c5f8c3507078c07c3f437366f58ed4091916a4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Floating Dragon New Year Festival Ultra Megaways Hold & Spin", image: "https://mediumrare.imgix.net/0bb1ca90064252c552e9e46135e1ca21ae0577086d365032e0c1592f8cd9f7eb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Super 7S", image: "https://mediumrare.imgix.net/1437721f03ac62ffbd176b3be0735ac00960ac156b0e2b595aa84c3fd79f69aa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Hop & Drop", image: "https://mediumrare.imgix.net/4b6fb59953511158aacdb82c8bdd0ad7c95f6d2cbc227300745d7335a53f7291?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Floating Dragon Megaways", image: "https://mediumrare.imgix.net/c985fe1aa23369555ecbac52538f3fe7431a030aaec9d17427ec4fc2dca0b25e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fruity Party Dice", image: "https://mediumrare.imgix.net/6910c3023b6aec82da8d691044f382487e6657d2ca5ebb4da3a0ada0c8c459c1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Keeping It Reel", image: "https://mediumrare.imgix.net/b0d2fd3a9c0ae0f2efcf134460730c59612d63e41f8c098e6d0d549a8a54fddd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Chilli Heat", image: "https://mediumrare.imgix.net/d70e0a7bbafde74667d8d9d9d2842727ca64e5e10cec2f9204517fbc968f804f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fat Panda", image: "https://mediumrare.imgix.net/fdb95e8d46247ac9c0e9f848e28a3e3678788b8918bb5f6324f531eb939ab658?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Greedy Fortune Pig", image: "https://mediumrare.imgix.net/1b55194385efebaabdeaaccfb1d8999e50be43278db64de55fae23bca408f562?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Enhanced RTP Transylvania Mania", image: "https://mediumrare.imgix.net/f0b4ee5454f6180fb2e0e0d98a8a7167ef439b99a9bc4a153ccfd34be1c441c8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Madame Destiny", image: "https://mediumrare.imgix.net/e6143410bf091a22c499cb04808260f245fd50b8242bb26d1fae1b2f243ae4bd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Super X", image: "https://mediumrare.imgix.net/ca2e2f819c83e5dc8a8f0cda26f6c56031b61145b1d2019401a67af1b263dea4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Candy Blitz", image: "https://mediumrare.imgix.net/f789cb7715a0b446b57d5722010c98e15d3f0f4cdefcdb1a0a20c68ecd7fb487?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Infective Wild", image: "https://mediumrare.imgix.net/4df2dbb9b9a38d0a90364597f00e7d531b093826f4367cff1540bc4f6a13d56b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fangtastic Freespins", image: "https://mediumrare.imgix.net/76e95b4bf0b30fe7e498509e07ab8bba9f0c775d20cc7ee48be5609c0461927e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Forge Of Olympus", image: "https://mediumrare.imgix.net/5a750507e520b8712efa80ae1487f4a5601bccbd6c6dda933e30e024027bce21?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hot Pepper", image: "https://mediumrare.imgix.net/6efbdcae95519089558585588992980097b3852c8fba87d762d840a643783680?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates Of Olympus Dice", image: "https://mediumrare.imgix.net/9099ceb273c85a32737b1682ffefccb899a428ae16daadccf9b7cde80387ad52?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates Of Valhalla", image: "https://mediumrare.imgix.net/9099ceb273c85a32737b1682ffefccb899a428ae16daadccf9b7cde80387ad52?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Extra Juicy Megaways", image: "https://mediumrare.imgix.net/a20f716cfb01146e1877ba8bce8b831b4aac00d5d16f64b5fa2aedc981c4ec0a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Yeti Quest", image: "https://mediumrare.imgix.net/902e803087ddd5eb671b7004972a971d7feae60c2f20c0db6e1f279c2504674f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Release The Bison", image: "https://mediumrare.imgix.net/7ba0e923ad7daef3512ebde3829426ba5a943651fc99943c24aa8e5eeb116c7d?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "7 Monkeys", image: "https://mediumrare.imgix.net/5719e615c66ba4a1a267191e55bdb8c58d1cee42d754322c670935bf15fd0efc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Empty The Bank", image: "https://mediumrare.imgix.net/62032a1b7f3175e0448470199f47b0c96f35ec19a0ea597defc1f853d9632ca7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Trees Of Treasure", image: "https://mediumrare.imgix.net/1777afb6bab2642e05d45189d4f98438bc01ec67db061b40560d4b27c75c80ab?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Demon Pots", image: "https://mediumrare.imgix.net/17cf046fed1fd5ddef5a31b57e18e5327347578a402141f7841f84fa30946d3f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Magic Money Maze", image: "https://mediumrare.imgix.net/a790a261b168830ebec874eb7c2fab8b513bdeaf76b907d9807cd81b80b0d727?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Blade & Fangs", image: "https://mediumrare.imgix.net/a1f13902a49cef30f642a17e8b29b17a59f82f841f55bbf598f6438e608ff84b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Magician´s Secrest", image: "https://mediumrare.imgix.net/b9248b8af7262a55b7829dfe19d2e00a5a53cc40f67670366c50ec474287821b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gravity Bonanza", image: "https://mediumrare.imgix.net/3042bc5b5eb463f601f9e590e9a58da7009621a0dd25541c919673bab8bf37a0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Excalibur Unleashed", image: "https://mediumrare.imgix.net/d7d788896b6ca39b0814045c7a12f53be4aaffa9e64ba777e990ecbecc30832a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Crown Of Fire", image: "https://mediumrare.imgix.net/83968d3724e06b6c328941bf88de77b52551b7b8ce6d55f3bd58bec19e8c140e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Santa´s Xmas Rush", image: "https://mediumrare.imgix.net/7716479c3ed438ec6e25c2ef9f6eacb01dfc355401756937daa6b16bbff9e72a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Starlight Princess Pachi", image: "https://mediumrare.imgix.net/b5e8b647424bb8960eb480cd8d0015fc2a5e6af496255608a6ce6149521a1dfa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Wild Bananas", image: "https://mediumrare.imgix.net/77e2ab351655abfd9321c6a56f0b95c5162741566951803cd96aa33182286990?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5 Frozen Charms Megaways", image: "https://mediumrare.imgix.net/26e886c101414c170889e30882320bf94ecf612519b6fd9a0580fa5d9022d09f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Pyramid Bonanza", image: "https://mediumrare.imgix.net/0387cbb82eb46741e1137c69630ba5681dcbefd83d2a6ef038261e22fdda0202?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5 Lions Gold", image: "https://mediumrare.imgix.net/d668b477e68a6dc87941a3a424ef283de50861e74ced061b402d5d5dd9d1e74c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Dragon Gold 88", image: "https://mediumrare.imgix.net/1d45936fdb454c8e8a0517e08258bbc0f61a7285766e9f28d1a3a8597b2c93da?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Rabbit Garden", image: "https://mediumrare.imgix.net/dea4384049122a56cc24b7565dc9c8853807f5bb5f08f85110d8f12a8f21af50?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hot Chilli", image: "https://mediumrare.imgix.net/8d7c112c5ab66e9cea703b5d63ad2d56ef2c7288d31f40df578b286386fbc24f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Big Dawgs", image: "https://mediumrare.imgix.net/b2d72636fbc5044004f47927ef83dc0894554f889e11259f0fc1c248f13f0ca6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Bonanza", image: "https://mediumrare.imgix.net/e0204ea403793722c5fc78a23755375578f20b763318c19578ebf83b1fa06cd5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Striking hot 5", image: "https://mediumrare.imgix.net/cf307fbb858e3de97c1d7695cc96912545f882dd927c2245c39db18c2ce24bc0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bow Of Artemis", image: "https://mediumrare.imgix.net/facbe9d341f6c13c6d9ec40210ed5ac17e0afe1b87942561e2fb099c720970c9?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wildies", image: "https://mediumrare.imgix.net/1fe31f74090a3dd0477f81b5340f0e086a01e29b07e9213afb4e658b81d46516?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Oodles Of Noodles", image: "https://mediumrare.imgix.net/6b74bb5243e4e99f29d03f0e128cf13ff568955d323aa259d70e44b4a615c00d?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Christmas Carol Megaways", image: "https://mediumrare.imgix.net/78f444fad92689ed432b5d21309255f23f52a0bd9ee4909847a7fe884e4d07a5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Beware The Deeo Megaways", image: "https://mediumrare.imgix.net/c2a16a5f705b9a7a94a05f803a7a2e667dfc3bd35e4acc9572cfdf10668ec6bb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Smash", image: "https://mediumrare.imgix.net/6df4f15a034dbe678951d2d9c2b07323dfe33c2334d972289e18be9da2c63488?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Lucky Lighter", image: "https://mediumrare.imgix.net/247a273454017be5f9eeb0d8e92f055e222a7d37733cc71551aeb59b540a5a0a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gorilla Mayhem", image: "https://mediumrare.imgix.net/d2b4284a1e1451cfe447bbfd571a3d43a077fa9ee4d0a752fec0ddda63c8f5df?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fire Strike", image: "https://mediumrare.imgix.net/aabde89de92d6b1b9199169bbd87978614e156ab59c9f54acf01264a6cd9edf3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "3 Genie Wishes", image: "https://mediumrare.imgix.net/104c74ae22b6716670f552a5f2bc64ba5f4268f8738d08c75cc10f238c06b0ab?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sweet Bonanza Dice", image: "https://mediumrare.imgix.net/d99d991fe476413c9ab9143c19e6add2761d182bfe3e05aad12fbd84da116cb4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Gems", image: "https://mediumrare.imgix.net/50823c8863f61bdc3465d578bb4b6bf50deb0fe240c645955b95aa87823b1d4c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fire Hot 5", image: "https://mediumrare.imgix.net/88e47335944e5f53e399ebebd73e8e82dedfc69cf6f26a01d1f3c2e4ac7230fb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gold Oasis", image: "https://mediumrare.imgix.net/12813f35bd98838df356587f2b931bfc5599f80204726b32cf54b9fd5a0139c4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5Lions ", image: "https://mediumrare.imgix.net/2dc7ab54b25e0674c6ffab8d3976b2088270e0d433eb36f630ce6c2772d3d2fe?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Viking Forge", image: "https://mediumrare.imgix.net/60f67593363898d1f8b2a2b3bbec1f6c480150a02aece0e2ebb5e657a60b10a8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "8 Golden Dragon Challange", image: "https://mediumrare.imgix.net/6ad5ceb1341810e8f1a1ca37dd1c1ddb940511f842b3d511f6bcaf6719f4decd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Jewel Rush", image: "https://mediumrare.imgix.net/7fb4fbfab2d369897dce91e13c3c3b1a493f9d7037b8a13a11cac9138d68c339?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Wild Machine", image: "https://mediumrare.imgix.net/4f2b4f827e265e81a7122018f2abb1e57dd4a1c3f483d7b4b1d738742f574df2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Pirate´s Pub", image: "https://mediumrare.imgix.net/767b3f62a9beb01c841faca3bb76846e7a4626efe2f8b67e195880d9bebe817f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Catfather", image: "https://mediumrare.imgix.net/a8a05478806128c8d6cb9f984dfd7c10058eed2899c05352a72fba0448a96feb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Dog House Dice Show", image: "https://mediumrare.imgix.net/31aca5c2bbd40326ce27e35a0e403aca71ece763df8f9dad8d679da790133fb7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Snakes & Ladders Snake Eyes", image: "https://mediumrare.imgix.net/01d46350e9fd60df3316e85490aeb963b79cb4158af2ee5eecdcd25ac13b4104?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Little Gem", image: "https://mediumrare.imgix.net/a72d898cfdbc335a53109fb5b2067c3ea36a65d33acf8822ae3fc805afb43803?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Yum Yum Powerways", image: "https://mediumrare.imgix.net/47d95c554b2eaf09323c2cfb1eeb363bbc71759e131d6d55d0e4fb5b6469fe64?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Year Of The Dragon King", image: "https://mediumrare.imgix.net/e138fdd82fb0dc10376640fbddf7917679cc4f84df70f6823a1018da3a681e50?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Devilicious", image: "https://mediumrare.imgix.net/13f6a2360f77e2c50d111128b93c2d6c54c73aacd8b761b1b6bc552f0bdf16bc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Black Bull", image: "https://mediumrare.imgix.net/08785ae94c55d79be238db5808104afadadbc0767e1418ca0c0e6cd1fed4292b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "FireBird Spirit", image: "https://mediumrare.imgix.net/7c4281d824330969795c94b21a02465031e9aec00f35319a6e51554d75c8a8f7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Candy Corner", image: "https://mediumrare.imgix.net/f13e51a2c31613978befe11eda333ada3575bb8adf2e0ee8bc6b9a7d0a6d0278?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cash Chips", image: "https://mediumrare.imgix.net/fed49b8c00f2d4dcc085d6647c7e30887332d16117c9b2d006731393f78d2816?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Triple Jokers", image: "https://mediumrare.imgix.net/9ce421c72170b94e03ce81cb2524f792dfc6bfae23cd44969755072836a60c06?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "WildMan Super Bonanza", image: "https://mediumrare.imgix.net/69ca5b72dc1c3efd41f7469060eb4b315e3a526c5fb32aad97e846a5bcf5210b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Emerald King Rainbow Road", image: "https://mediumrare.imgix.net/69ca5b72dc1c3efd41f7469060eb4b315e3a526c5fb32aad97e846a5bcf5210b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Badge Blitz", image: "https://mediumrare.imgix.net/e1b08e3af4db40735a94a928d32fcfced2073599a41bc27220653878de13fb4c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Powernudge", image: "https://mediumrare.imgix.net/2dafc76842ea5a6c71c41febf14a9fc3c527f6d9c14d3ffcd7b41019040c4cbc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sumo Supreme Megaways", image: "https://mediumrare.imgix.net/0dc300a891eb9deaef323039bab9cccfc22484bdb6930b42ace73b194105c1e3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Heat of Cleopatra", image: "https://mediumrare.imgix.net/8a6a6b9a2924b84331f3b6d2966e2bf0fb4282781e8f6df9bf0f4e007009d346?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Chicken Chase", image: "https://mediumrare.imgix.net/7f3b9553b68513ff72882c23757c51b285c375651f62bbfff05822efbfe1b13b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mochimon", image: "https://mediumrare.imgix.net/55a4e195129342b7a7581b138e326069cc4806ac13fdfc7826d38f6d26a8092a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Dragon Hot Hold & Spin", image: "https://mediumrare.imgix.net/0f530ce09efe4e158e9fd8ad765972c4a80dad151b5ff7aa1b40f5037695d488?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "John Hunter and the Tomb of the Scarab Queen", image: "https://mediumrare.imgix.net/1ce367bbf015d2f66df6cded397781b40fcc7bea45749f35ab80448fbdcceadc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Phoenix Forge ", image: "https://mediumrare.imgix.net/6d99f893ceddccf1bcadb6e6fd15251ddc6fc2179783b3c26490b5f34223be47?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Clover Gold ", image: "https://mediumrare.imgix.net/80987919d4aa387ebdd70045c930a556e6905899121577da102dcb19f728e026?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Cash Patrol", image: "https://mediumrare.imgix.net/1f1323f48182eec5a06c47f020fcecb651f6e628bd6e291a86258590694b0c94?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Piggy Bankers", image: "https://mediumrare.imgix.net/80cdd3f0ce098f06f2cac9942b8c608995cf5fbd75cf1802558912ce3126bcc8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "John Hunter and the Secret of Da Vinci´s Treasure", image: "https://mediumrare.imgix.net/98ba1ae44197158d8374fc9fd277f35f66b6e5634430b0a7a613b57dd79ede0b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Gladiators", image: "https://mediumrare.imgix.net/fd2a0df6bd8a2463ba7c85f64abbf88b50c359f94647fb6ffe35bc9979c26b46?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Wild Pearls", image: "https://mediumrare.imgix.net/b5b1d8a40dcef1f8d95dc7848ea0984a8e3b63a65a8ee5a84a01b825b9e9efaa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fire Archer", image: "https://mediumrare.imgix.net/8ddf8854077425a70c685e5eab0154c15f3d7148e00028e7a0825694b3efb485?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "John Hunter And Galileo´s Secrets", image: "https://mediumrare.imgix.net/7af6852c508188d7eef118f1eb458d4c13afb83e6d20cc01b4f25106ce8aaf78?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Castle of Fire", image: "https://mediumrare.imgix.net/9c0a3164ea077acd30558b0e270953622e035ce615703041fddb09ca01e7cbd7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild WAlker", image: "https://mediumrare.imgix.net/dbe7272611a46e05cfcd14889c2580089f6c523da4c8309b59e859f55d764842?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Book of the Fallen", image: "https://mediumrare.imgix.net/f948701348074d027952a7e97cabe91d39d79567edb18f3977e48c454ee2f3e6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sword of Ares", image: "https://mediumrare.imgix.net/35ee0908faba21cd96a5c300229215bacbda3dbbe0d1d5f41064821fa520fe83?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Congo Cash XL", image: "https://mediumrare.imgix.net/0113b341ada97e0600726cc549cf2add81c7ac97fbd6cf0bbccf8c3553447143?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mustang Trail", image: "https://mediumrare.imgix.net/6e94535ac281adb20413ae4ec691d3a629ed2033c64cb83b7f502a6329ddff43?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Piggy Bank Bills", image: "https://mediumrare.imgix.net/e512b3cf8cb4daf68d0d176542c58507674714f63519c2302e54b3b311b65af5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates of Gatot kaca", image: "https://mediumrare.imgix.net/0af25fe25fdd694509af52a1fb2bb725786d01bceda536f99ef549f0f1ea5967?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Chilli Heat Megaways", image: "https://mediumrare.imgix.net/2f27860363665146951be7b54a8b57d3779e3c01078dc7acfbbe1c5d4a9910e2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Barnyard Megahays Megaways", image: "https://mediumrare.imgix.net/2d9e361e4dbe3376252123c7f0bbdd7f68d33d4dc429a8d85469221bd0ea8477?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Booster", image: "https://mediumrare.imgix.net/2b3082c0dc61028396537e8a55ac03823f8603dd39a4077ec0808d9f5a268f6c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Candy Village", image: "https://mediumrare.imgix.net/608fd29a991dcd3cf2037f82edde94e643cd64b2d819c700bff4d650f0d54dd0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The MAgic Cauldron Enchanted Brew", image: "https://mediumrare.imgix.net/ec99f36c3167badf0a7bc8d9c96223917e3dcc9a1fafdbf5bc2173ae583a6548?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Savannah Legend", image: "https://mediumrare.imgix.net/299d0ce05aae598ee40339bc6aa6836d602cdeb49eed4c8af77b44c4eaeb386a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gates of Aztec", image: "https://mediumrare.imgix.net/0cbe57e4da0fb8361c4b1d40efe87044b47ddd24a577612a488eb3c79e0be455?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Lucky Fishing Megaways", image: "https://mediumrare.imgix.net/afa21e5f512936ebed28a28e28973294afcd415832661783c7be11ac9826906b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Santa´s Wonderland", image: "https://mediumrare.imgix.net/9f7f589856fb5b1422263d9f46963d74c379e63c0d0ca01e3cc2a9466f148f70?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "John Hunter and the Book of Tut Respin", image: "https://mediumrare.imgix.net/959e2cba3a5a677dd76b010b2ca64ee492003749923b99f01cef334b7f99ba7b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Samurai Code", image: "https://mediumrare.imgix.net/1e088e0657cdc6cbf11cb32aa404acbb94c7fba35fe40ef1de41b5008591a708?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ultra Burn", image: "https://mediumrare.imgix.net/5137fba5b94a6ec76b7fff97228a6b6848d5b638cd05666b64ef33e2c6322dea?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Pirate Golden Age", image: "https://mediumrare.imgix.net/6a3828109686968f1fbfc05536b08de42e8ba5b482d8a3da7acbb398977703dc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Blazing Wilds Megaways", image: "https://mediumrare.imgix.net/65422a245d2d593cf22bd652bcb499b6bf87bac3f145394626221dda77b33825?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Might of Freya Megaways", image: "https://mediumrare.imgix.net/3b9de9e03f060a35b01a95a2dc0d39c6a015613c742fc1a362707ba38ea8830b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Asgard", image: "https://mediumrare.imgix.net/bc2509a6ef00f16779b9826ac9145a912b07f02d3f19c696a9953b19db194435?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Burger Load it up with xtra Cheese", image: "https://mediumrare.imgix.net/d46a68bfb400090a411b3d766d55a036b29569b0bd37b069ecac4056b761e4d5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Lucky Dragons", image: "https://mediumrare.imgix.net/7a1a767906d6af0c68f51912fcaba8aa5014e7b60203f04b3ecfb3f9a01a81c2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Candy Stars", image: "https://mediumrare.imgix.net/a0ad6072b9253db7c0dc0e260259adb8bb3ffe848cfdeef8b635a06d75c9c9be?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Supermania", image: "https://mediumrare.imgix.net/9e75aaf849ead0a0ea3314a1e20ec5944875a03e85abc0d743cdf6420205ba2d?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Tropical Tiki", image: "https://mediumrare.imgix.net/3d59519cefadecb16f6ad465df10b89d1fa017acced35d090e1cdf7b4e1316e3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Great Chicken Escape", image: "https://mediumrare.imgix.net/17bd5c9a02a494c9c4563619a131cff8d42f321bf02190cc522a84b303802ae0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker Race", image: "https://mediumrare.imgix.net/116bd6dc1473d4bc469b453ac22bf6f761a6f45bb992928d4ed96a0bb839af0b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Tweety House", image: "https://mediumrare.imgix.net/409ec2e69bf853cc563ba03a022c748e810a59bdfa750f20eb7a519d89ecfda8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fortune of Giza", image: "https://mediumrare.imgix.net/5a585ec058a996d7eec518e989e1be6cf7add8c5ab23fac921737b762c5c6a82?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Gems Deluxe", image: "https://mediumrare.imgix.net/5a23a20722bf71f9d396d82fb115d6195327f933607b365a46dbe163e2c06c53?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fury of Odin Megaways", image: "https://mediumrare.imgix.net/cb371b52f06dabfb26dc7f4d1d6efc23e1b4aa0116c7fa1b04ed44512b0c48df?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Triple Dragons", image: "https://mediumrare.imgix.net/2f1b61b8202381509d96298f55a8dd8701fedea840ae2844af5826949d17a0cf?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Hold & Spinner Megaways", image: "https://mediumrare.imgix.net/df87797f419eb94a03323aaad39fcdb8fe056b4d04c4a4b2fb872717ac0339f9?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Gold Rush", image: "https://mediumrare.imgix.net/764ebadb88610ab4d5a90e592f394b0e527cf3b6ed6d34a614c47bbed956306a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Power of Ninja", image: "https://mediumrare.imgix.net/ea7995b9b3b830913fe6a3b3a099fa0cb59e4f66c28f9b2c58562103b7b2139e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Rize of Giza Powernudge", image: "https://mediumrare.imgix.net/aab8f42c3896313853f98cf97696d84308aa6e7a4aad96243927dab6e0960ff6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "John Hunter and the Book of Tut", image: "https://mediumrare.imgix.net/c1379f9f3c072a3335d2b8ef6ca5dcd94ed51acd30c255ada295b4a513e71c63?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Peak Power", image: "https://mediumrare.imgix.net/3d5ab11e953631325afeae04e652e6d3935cad8fbe0a88f4c910b8ab941626e6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Rainbow Reels", image: "https://mediumrare.imgix.net/ef4c60a58ce2ad3090809c88e405cf019e69b39611a6ae81d48a67c551bfb9a6?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Treasure Wild", image: "https://mediumrare.imgix.net/c8973f4b05002b71b7ed73ee74adda6c938ecfb40b59cde843398a07638bb273?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ice Lobster", image: "https://mediumrare.imgix.net/55de9d0aca63738df9ab3dc30214729500e7e0cc39834eaabf3194a8be82bebf?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Drago Jewels of Fortune", image: "https://mediumrare.imgix.net/062587fe83c943ec869a0b82f634524622302a208865c70da4a43255f8af9c63?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Money Stacks Dice", image: "https://mediumrare.imgix.net/b567aab6f07d08290e61d909f301a86f1be07f5cb778568061764a11eed8c14b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Honey Honey Honey", image: "https://mediumrare.imgix.net/fbc876e966e6f01e648b9e897906992d7388dd0b88fe7050c0f1f26e2c3ecb15?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ripe Rewards", image: "https://mediumrare.imgix.net/0b971a777e1507049cdfa9477453471c58a8d161e731376928b583ddab49cd57?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Big Bass Bonanza Reel Action", image: "https://mediumrare.imgix.net/4a7710690658365b0f2db80ce7423bd5969eed90ea15fd1ce9222891ec4e67d7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Barn Festival", image: "https://mediumrare.imgix.net/106cc105dd714484de30a9795e23324d417fc1aa9b60648903549be1a5bb1a9e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Crystal Caverns Megaways", image: "https://mediumrare.imgix.net/56bc6f012ef77b58447b03f9192c076accd5e20f1fefac8513deb07ae2e12926?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mysterious Egypt", image: "https://mediumrare.imgix.net/3518a09029ea97273c811a61c6a90b89b9d3a3a85682932dfb2a092625ba1907?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Eye Of Cleopatra", image: "https://mediumrare.imgix.net/4b4e9c514a8fc0fb68b9e74bc31857be61a0bc7888fec864f8995f695a1aa3b3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mysterious Egypt", image: "https://mediumrare.imgix.net/4b4e9c514a8fc0fb68b9e74bc31857be61a0bc7888fec864f8995f695a1aa3b3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "5 Lions Dance", image: "https://mediumrare.imgix.net/ee387b37418718c31ae3c636792887d52d2db20595700493c757a9ad42798bdf?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Snakes & Ladders Megadice", image: "https://mediumrare.imgix.net/2a24e7989e3b1bb416a47253a10e21497c7d5a80c6c54f88b7e78386d2c12dea?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Joker King", image: "https://mediumrare.imgix.net/4ea23a271634601576967543e27b794afd27092a1550ab1f45296a68f4d67d0b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Sweet Kingdom", image: "https://mediumrare.imgix.net/be8b9d3bb6565afd24db1b5418a3d235297dbaca52fc64c6affdbe98e5ae02e2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "8 Dragons", image: "https://mediumrare.imgix.net/0b8e39ec172d016aae4332a660d77ce33845cab7016da244a3586743d32d746a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Dynamite Diggin Doug", image: "https://mediumrare.imgix.net/1e79f6fb17f5413a677f40afa25076db60fe91e02bc0204e41292a78e2ed9ecc?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mighty Munching Melons", image: "https://mediumrare.imgix.net/148378d0a48bc442079c38baa4a8dbd1c44f5edbe34683321efba6d34a783d37?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hockey League", image: "https://mediumrare.imgix.net/e24f994f628f3e4968b1593daafc98ea04d15126765b69bc95ea5766a496558b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "FU FU FU", image: "https://mediumrare.imgix.net/92ddb0441f008f0064e1006e3f9326ee59966f7828438895a7de96eae4ca6bbd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Lucky Dragon Ball", image: "https://mediumrare.imgix.net/d66041a071f7af6813f566a9c3bc09b9db395a1541eceb9ee059a13c8d788eae?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hot To Burn Multiplier", image: "https://mediumrare.imgix.net/28f5d3243b3ae1e65651fb2d0018d3a3a8af8920b172e5bcfefcab1ed991f678?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Elemental Gems Megaways", image: "https://mediumrare.imgix.net/7c23ee167784fadedc1315f6a8d8adba6b65d4aa2e3639d239af6206b9a791cf?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Knight Hot Spotz", image: "https://mediumrare.imgix.net/9539026e8b4f0c2cc0bcbd60aadea3f155095531c4d77fb8857f964e3f6d140f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wolf Gold Dice", image: "https://mediumrare.imgix.net/9c338d98d965b1fb86d7ac9a5d67df36727067666ac749cbb7b9a2caa1900273?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Panda´s Fortune 2", image: "https://mediumrare.imgix.net/3e8dc8569edcb8bb9d68e9d26efffc505363bf5a480bc8b4017cf4d31114931b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Celebrity Bus Megaways", image: "https://mediumrare.imgix.net/de3993d3b1cf0a5f426eaae616ec15eb7d90396e353bcfeda34f8065a5f3a98a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bomb Bonanza", image: "https://mediumrare.imgix.net/f4796e016ca946b2b2d801e22576e8c677b6004da8a0fefb8e120bc8b7285bfa?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mustang Gold Megaways", image: "https://mediumrare.imgix.net/72bf01869fd566facf23814d2180711c23a5393345ccb13d21bae5a8f1cdf799?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Frog & Bugs", image: "https://mediumrare.imgix.net/7aec8d9b0b8cf48a1ccd5e431a438d87c6a1c727761adb86f82cf68fa8ce8d66?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Pirate Gold", image: "https://mediumrare.imgix.net/fed4b622d84550e0bf48dfe9e3725cb553b7b2b9709d5080882071af039ab7f1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Golden Pig", image: "https://mediumrare.imgix.net/22702462f3aab7ef3f7790ab69bc8017e4fbe6c4c855b05c4980ee1231a12a7b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Shield Of Sparta", image: "https://mediumrare.imgix.net/e2c2a9b2395778c3ac7b1c3a61cabfd7f8e515ce00dbd6e28187591626328d39?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ancient Island Megaways", image: "https://mediumrare.imgix.net/7c184eb2cb6fd6742b3379acbc17e16b8dffec5b28acc256932f00a7dc7ace15?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Devil´s 13", image: "https://mediumrare.imgix.net/e27361a4af613af8a8b5522d0ad315424988cb9510a0bd2cb510e621713167fd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fortunes Of Aztec", image: "https://mediumrare.imgix.net/655c73842f2998473f10b77241222353fe223593b809fef2e5b32d3e75d91d30?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Lobster Bob´s Sea Food And Win It", image: "https://mediumrare.imgix.net/11aacbf3c19f2b16357e5c64ba5c020d3dcf99ffb5eb14698ad3153b5e8c743f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Reel Banks", image: "https://mediumrare.imgix.net/bd6d81dd363137b9798bb059f6ec0c58a65fb8053297aa942e7df1cfabdf9575?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Escape The Pyramid Fire & Ice", image: "https://mediumrare.imgix.net/bf530ee9df42ff267da75c37e050d88fe9fd2dc1a10d8c5f9d340492442f72af?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Dragon Tiger", image: "https://mediumrare.imgix.net/109ee82bfe8d1c91f83c0ecc424ab4d2ccc6951b7651b281be16d1989789ddc3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Spells", image: "https://mediumrare.imgix.net/89f2442f73f359c633fbc37a172b3aee1cd01d0e0d4b0f79d50e06debee5618f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Spartan King", image: "https://mediumrare.imgix.net/0bdcdc9121c843fa1769700e0b76e9f26cecb49652c60fb408e456aad70bb6de?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Spirit Of Adventure", image: "https://mediumrare.imgix.net/188ec4defee75621c885c9d2b55bd994b4f15e17db021d55499dca1cbd9c1126?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mammoth Gold Megaways", image: "https://mediumrare.imgix.net/9a5c6b034ad63314f63882afcf7bd6f580414c70cb42cbb0a1b09516301f95be?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Santa", image: "https://mediumrare.imgix.net/0372b59e3db2c4da9a861447ed10c1dfd113df870c6b1f9fa529580f88a3cb3f?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mahjong Wins", image: "https://mediumrare.imgix.net/6d30ec0db6bb0465325f4b6c5cf37a110eec786dfa41266eb5070c91fbffd3b4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Panda´s Fortune", image: "https://mediumrare.imgix.net/beed7a8af2443afe83ac26aac54f0b9e9dd9eadf6589dad23f25c9299575669c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Congo Cash", image: "https://mediumrare.imgix.net/154e282812857be059c49849a7fc1c1e4a2795d3ad72c5c2e4db1026abc6cde5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Book Of Tut Megaways", image: "https://mediumrare.imgix.net/2e453e06a20c31445ef421e3fe94f14bfc13b1ee758128a6cfdaa3e04b4aa482?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Odds On Winner", image: "https://mediumrare.imgix.net/0eab18b02dfb47d5813c5b3f07c803022952af344ebdf637394425126536eb17?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec King Megaways", image: "https://mediumrare.imgix.net/b9c86f5efb544378a35878a7cec4b727bcd89650de264a3d31ab5bc071c75a31?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hercules Son Of Zeus", image: "https://mediumrare.imgix.net/a9f34d21a0f8bdfdbff91bea175bd711c393d7eec0c8d016ea0dbdac4f4c680e?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Crank It Up", image: "https://mediumrare.imgix.net/78513c35f29a700089c9d913d30a7961d31bbe4e4df9c69aee2bbf1c02812830?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Penguins Christmas Party Time", image: "https://mediumrare.imgix.net/3186a2f9ec0187f974a9f7f6aa939960ce63072ce0af51e651fa76fe418af0a9?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Book Of Vikings", image: "https://mediumrare.imgix.net/c0b5b8ea80a1a827d9fc9a94f55aacaed6bd33f728f2d6584c66ae0e7189fdc0?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Goblin Heist Powernudge", image: "https://mediumrare.imgix.net/973b0b03d3c06aaa2c817a565d7ec0a71cb155df9c8c00c9a3939af26e3cdcab?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mighty Kong", image: "https://mediumrare.imgix.net/86e62cac2ac1231ff0dc20bb1a80198db86e826d2cc881fb829d3c0f2a3646e1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Pixies", image: "https://mediumrare.imgix.net/45e195d87a14b23c1423d42e56f42626a1840f4ac7b22c8c3baf8fc906e1b2a5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Ryse Of Pyramids", image: "https://mediumrare.imgix.net/1fcda1d13772d538993c51692cccb85524beff789413bda3d768af92067bd6ca?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Great Rhino Deluxe", image: "https://mediumrare.imgix.net/17440a8bedf530daa616574b32f0f1140bf4b761ec743ccf51b24a637d913fb3?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Revenge Of Loki Megaways", image: "https://mediumrare.imgix.net/d2b55386a2d86a628538f8e9423a450d0ece031c75594aa99ebad965ba940530?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Comboys Gold", image: "https://mediumrare.imgix.net/59a14ae1e49118853b85622d773a606318e4b416e248487c3f86b731bc2ec302?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aztec Blaze", image: "https://mediumrare.imgix.net/19baa9558bb8068d36ccc988ae5068c06b2f1460fc01c4d66534e43a36778473?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Alter Ego", image: "https://mediumrare.imgix.net/d60c13866309029792e2fd8234be29c022d08b6810186d2d1fd27180da203ae2?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Comboy Coins", image: "https://mediumrare.imgix.net/fc5c4b1408c02133573c44d080b2cc9b80fc8beae3035556f9ae729bea673506?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Heroic Spins", image: "https://mediumrare.imgix.net/d11b9dd9874c96d37cd16f7e0cedfac07fd5985891a8973eca80715991da9dd8?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bonanza Gold", image: "https://mediumrare.imgix.net/7ccd2d226c39ac547a4ae982c25a223c0302f87f860926321d2cd7c7745beeed?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Peking Luck", image: "https://mediumrare.imgix.net/943da851b8c560d01737600be1f91de65dc351766c17854a8cbcf256df93d70c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "3 Kindgoms Battle Of Red Cliffs", image: "https://mediumrare.imgix.net/e5fc3c4cc4abf3f5c4d4ef6b97d58c12dcb27134f0bdca6e59b7588b2b3cebde?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "The Great Stick Up", image: "https://mediumrare.imgix.net/330ba4aa3c2dbe98af974122754751b1ab8388616773f81fa23f2441c4cc2e6b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hor To Burn Hold And Win", image: "https://mediumrare.imgix.net/54e712f8a1c125368c820ec71cf6dedd9d86b2d88b734478d2e856538cf4ce3b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mahjong Wins 2", image: "https://mediumrare.imgix.net/087e0907c057b5edf30117191b03cb2c0e3351a9a423f27ade4c12e1f2d01594?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fruity Treats", image: "https://mediumrare.imgix.net/4a8189d01a67420e900099fd309b101d65a9de8da57be37cf4be7bb1d91d2ca5?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Octobeer Fortunes", image: "https://mediumrare.imgix.net/5dc642a3420db42bfa6cbc2fb98b1bac30d0f842b920e587027efd183ae3d434?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Good Luck & Good Fortune", image: "https://mediumrare.imgix.net/c9bf1489c50190382c9c3191d1e9313c03b1edd3dbee45833918e2805648cc31?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Strawberry Cocktail", image: "https://mediumrare.imgix.net/64ddca8f9dcd4a2cca8b4c23c59c50efb2c7fd38b01d75ea0f49cf3058086f32?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Mustang Gold", image: "https://mediumrare.imgix.net/e6152e528c4b16438539b106866f5709c84adc2d34ec0ccc47a226db4ff459d4?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Day Of Dead", image: "https://mediumrare.imgix.net/9c09df3e517ad19957f2117d26ad7781f6404986b78170542f957bea91760ad1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Pirate Gold Deluxe", image: "https://mediumrare.imgix.net/78bdcc6d684eb5d88a99928cece30026ecc8f18b6cac2132321ef9db0defcbf7?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Down The Rails", image: "https://mediumrare.imgix.net/88d127f9829aa7336afc1d00ef0513e7c48d412ef33138b73f7a7746314375bd?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Vampires VS Wolves", image: "https://mediumrare.imgix.net/8ca4629bcca72704927e675915413ad9f98a314cd603517bd809cbcbb4d29924?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Treasure Horse", image: "https://mediumrare.imgix.net/4da5a6db92e88c5cb5229922880251bf731c7f4c032406d1ac7682ad0af4ad44?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Nile Fortune", image: "https://mediumrare.imgix.net/37b0a1348edbf203e11eeb2f658465df6c8c252140e9f2798cb6408e648f1d8c?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Money Mouse", image: "https://mediumrare.imgix.net/562fc9af93243b46b0dba231ececb2b3d45e1727ac8f0c6ab3992118afbcd809?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Aladdin And The Sorcerer", image: "https://mediumrare.imgix.net/b8d98fa50cdc43bb95b7ceee3398f29eb4602ebb9f31e47f4d37fadc9838637a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Hellvis Wild", image: "https://mediumrare.imgix.net/03bc370096fdc8598d0c80c48424453b6e347c25fd730e0d70c8f045842bc25a?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Train To Seoul", image: "https://mediumrare.imgix.net/2f996359a2a57645c4b223f27201aa98a670e53bf7bf647aa3e68a9086cc3333?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Fishin´Reels", image: "https://mediumrare.imgix.net/e69f5be1edf52523d40ce887d6e3a873688eba7f49ba46543e9855e7be90bd1d?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Wild Depths", image: "https://mediumrare.imgix.net/9105b0df6aeb7c815f682dde45797250148843aaee998dd0c6070b0e20a00e64?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Tundra´s Fortune", image: "https://mediumrare.imgix.net/6aad37625c60f40a14c5c3dad2b827dd1d1967e8e52ce58ed8317edc426ee025?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Drill That Gold", image: "https://mediumrare.imgix.net/65bcc1f0577743c7cb39d746ba1a8dc1cb80470f64a44c280f5d3da5c00c2881?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Heist For The Golden Nuggets", image: "https://mediumrare.imgix.net/f4497ec0788104591f01cb6489396999ab3dc55575c65b4381c746e0baf27dcb?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "African Elephant", image: "https://mediumrare.imgix.net/69ee90c74482668dce88f06f91d216f4db0c703bbbc05c9837191a04320f9a48?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "John Hunter And The Quest For Bermuda Riches", image: "https://mediumrare.imgix.net/844e20d524df66d1076a17665ef7d6e318d42c1c749bba24331dc7c16b0122e1?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Star Bounty", image: "https://mediumrare.imgix.net/796ea48927702e14ae2006f5612031152016c2f7e4f4c7d13dc644189f10825b?w=180&h=236&fit=min&auto=format", provider: "Pragmatic Play" },
  { name: "Bear´s Tricks", image: "https://imgproxy.belatra.games/hKJL-wnBwFckVTBwgposy9gHBXR8YbrzinJ4mq1hMa8/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82YzhlZDY2MC0wMGY5LTQ1OWItYTAwYi1lZDU4OTA3MzZkNzEvQmVhcnMtVHJpY2tzLS0zMDB4MzAwLS1CRUxBVFJBLnBuZw.webp", provider: "Belatra" },
  { name: "Cyber Gypsies", image: "https://imgproxy.belatra.games/t8rJsSKwYQGsQ0LbVl3Nn4bpXYlmE7dznLOPp6cVVJg/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81NDVjYzIzZS1iZTYxLTQwNWYtOTRkYi1iMzNiOGM1NDU0ODEvQ3liZXItR3lwc2llcy0zMDB4MzAwLTIuMC5wbmc.webp", provider: "Belatra" },
  { name: "Mummy´s Mines", image: "https://imgproxy.belatra.games/QN7o98ey8oesi9bpqME8if8792cv6vt4GdKHlD66_Ug/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8wY2RiOGM1Mi02N2Y4LTQwZDMtOWUyOC0xZTMyMTEwYTVmNjQvTXVtbXlzX01pbmVzXzMwMHgzMDBfQkVMQVRSQS5wbmc.webp", provider: "Belatra" },
  { name: "Xing Fu Panda", image: "https://imgproxy.belatra.games/ercak5XY7xIpGWnLC_-rPBLodvBzZkcUqp21TVNksoQ/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8zZTBhODhiYi1lNjBkLTRjNGQtOWQyOC1kZmRjYmRhOGYwNWEvWElOR19GVV9QQU5EQV80MjDRhTQyMC1jLnBuZw.webp", provider: "Belatra" },
  { name: "Blast the Bass", image: "https://imgproxy.belatra.games/ES3j3T43CI7bIW2t6R6k56GHxdlshAvg3fTZNVA5Vr0/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9iZDBiZDM1My01NmU5LTQxNTctYmU2MC03NTI2ODMyNjYxMzcvQmxhc3QtdGhlLUJhc3MtaWNvbi53ZWJw.webp", provider: "Belatra" },
  { name: "Make it Gold", image: "https://imgproxy.belatra.games/hky2IigWOd3HAYo6RsBz1nObgturqtGblgdtB_IVGCE/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9iM2UyYmRhOS00NGUwLTRlNDEtODUzYy04YjlhMGQ5ZTc1NzMvTWFrZS1pdC1Hb2xkLTMwMHgzMDAtQmVsYXRyYS5wbmc.webp", provider: "Belatra" },
  { name: "Winter Thunder", image: "https://imgproxy.belatra.games/Ul37I8iRJ83-GTQC68zCffWpecqVpHe8kwk3kkA5dT4/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81NDc4ZTYwNS1jNDU5LTRmMWMtOWIyMy00Yzk2M2Q2MGM2ZTcvV2ludGVyLVRodW5kZXItNDAw0YU0MDAtbm8tZnJhbWUucG5n.webp", provider: "Belatra" },
  { name: "Cafe 50´s", image: "https://imgproxy.belatra.games/4XSc1iAleriF1RT5p0Xpqp_Gv_ye9nRiBCAVzvBn7Os/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9iMWUzYWE0Mi05MmRkLTQ4NDEtOTlmMi03M2E0NDY2YzJhMTUvQ2FmZTUwJ3NfNDAweDQwMC1iZy5wbmc.webp", provider: "Belatra" },
  { name: "Tortuga CodeX", image: "https://imgproxy.belatra.games/FXPDWWwIUif5L9hGFgJK0Pr17he_G4nOoFgtjqhRpf8/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9hY2RlMmE3ZS1kMjQ1LTRiMWEtYjY2ZS03NjVmMDYwOWFlMjQvVG9ydHVnYS1Db2RleC00MjB4NDIwLUJFTEFUUkEucG5n.webp", provider: "Belatra" },
  { name: "Lucky Bandits", image: "https://imgproxy.belatra.games/RHUzUkNW3i5H0GgCT0g7krtriijouhDEaEfZwIn9dzg/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mNmRkYjE4My0xYTc4LTQ4ODQtOWNlZi0wYmFkMzYwNzg5N2YvTHVja3ktQmFuZGl0cy00MjDRhTQyMC1CRUxBVFJBLdC60L7Qv9C40Y8ucG5n.webp", provider: "Belatra" },
  { name: "X Towers", image: "https://imgproxy.belatra.games/ry3n5JxI-hx3TRjKn4rE9oU3G0VyoIKE3s641uvf0_I/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yNDNmOWJjZC04MDJkLTQzODYtYTU1Ny1kZjAyZjNiZDZhNzMvWC1UT1dFUlMtNDIw0YU0MjAucG5n.webp", provider: "Belatra" },
  { name: "Wolf Thunder", image: "https://imgproxy.belatra.games/VQ4j3b13D980AwpsGdL-fLxbru5YKQYAWITs4b-o_1s/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9jOTI0MGRkYS05MmNmLTQyMTMtYTMxMi1hZGVhZDJkYmQxM2MvV29sZi1UaHVuZGVyLTQyMHg0MjAtQkVMQVRSQS5wbmc.webp", provider: "Belatra" },
  { name: "Lucky Barrel Tavern", image: "https://imgproxy.belatra.games/ZXAE2F8e4sfJEC-2OKDOZo2dcO4g4HUi-EpdZtF68mQ/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8zODc4MjViYy02ZThhLTQxNmItYjAwNC1kNDI5M2YwNjE0MzUvTHVja3ktQmFycmVsLVRhdmVybi00MjB4NDIwLXZlci5wbmc.webp", provider: "Belatra" },
  { name: "Tony Gambler", image: "https://imgproxy.belatra.games/0Z_NSf7jdND0-OxLbyowWUmD5V3t01tyFzeKhaiKCYA/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8xNmJkZTRiYy0yMzBlLTRkNzUtOTJmOC03NGY4ZDllMDNlNjcvVG9ueUdhbWJsZXItMzAweDMwMF8wMi5wbmc.webp", provider: "Belatra" },
  { name: "Golden Plinko", image: "https://imgproxy.belatra.games/SlBNLLe7tducwNKwuAEGLDb1M-MZgVYBG0Y9YYRDMNc/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8xNzcyYmU3Yy1lYTUwLTRiNmMtYTcwNS0wNGIzY2QxYzA2NWEvR29sZGVuLVBsaW5rby00MjB4NDIwLnBuZw.webp", provider: "Belatra" },
  { name: "Chef´s Sticky Fruits", image: "https://imgproxy.belatra.games/UYGa5CtzRO7QwNnzBiTaxcnYs3n-hdaoCWZQyBdVzP8/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82NTJhMGMwNi03ZTBmLTRjNmMtOTBhNi0wYWRhYzNlOTBlOTgvQ2hlZnMtc3RpY2t5LUZydWl0cy00MjB4NDIwLnBuZw.webp", provider: "Belatra" },
  { name: "Golden oks", image: "https://imgproxy.belatra.games/K3rYeaykZ2Q2Ke9W5tymiDi3DH6U3JSIoftyr4LvorQ/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8wZGUxZDI5MC02ZjAwLTQzNjAtODUxOS1jNDQ1NWJiMjY3ZjUvR29sZGVuLcO4a3MtNDIw0YU0MjAt0JfQsNC60YDRg9Cz0LsucG5n.webp", provider: "Belatra" },
  { name: "Jackpot Mines", image: "https://imgproxy.belatra.games/g9SvuP-88MO7CzVU2LrQ_W1R5OOj0xocjmWdyAnFIwY/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mODM2MTg5Mi0zZmZhLTQyODMtOGU3MS0xMWYyZmE0MDZmNjUvSmFja3BvdC1NaW5lcy0zMDB4MzAwXy5wbmc.webp", provider: "Belatra" },
  { name: "Rise of Zeus", image: "https://imgproxy.belatra.games/AV004E8pijX2cyfr6B9JZn9FHmztN_rqHjDq1BSigpU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mYTFiYjU1OC1iODg1LTQ0OTktOTJmNC0yNjc3OGYxMThkOGEvUmlzZS1vZi1aZXVzLTMwMHgzMDBfLnBuZw.webp", provider: "Belatra" },
  { name: "Sweet Lotto", image: "https://imgproxy.belatra.games/NNTObqAKz3vKXrFitCxqzjlympqSTFexOGD7K2OVvd8/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy85MzZhNDkzNi05OWNiLTQ0ZTItYmI4MC0zZjVkYTEwMmRmZmQvU3dlZXQtTG90dG8tNDUw0YU0NTAucG5n.webp", provider: "Belatra" },
  { name: "Golden Lantern", image: "https://imgproxy.belatra.games/cGDqZfxTADzeHZQS2bkFmguuXJz0ptwcMIMyVoIY7sY/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy83NWQ1MDBjNC1kMmFlLTRjMWMtYThiYy00NmFiNzI0ZTIyYTIvR29sZGVuLUxhbnRlcm5fMzAweDMwMF9zaXRlLnBuZw.webp", provider: "Belatra" },
  { name: "Santa Mummy", image: "https://imgproxy.belatra.games/VlQ_MTvGe--llOClYQRARm2x-BullMsXGB4GeRfQCUU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mMjM0YWFkYS02NjQyLTQ4YjgtOWFlMy1hMmYxNTgxMzNkODEvU2FudGEtTXVtbXlfNDUweDQ1MC5wbmc.webp", provider: "Belatra" },
  { name: "Ice Princess", image: "https://imgproxy.belatra.games/QoT6bHJ4Hy7W4xsAnDqStf2iGMM4nwTzKp_dVJ1tTAI/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82MGM0ZjcwZC00MDg3LTRiOWItODcyMS1mMDNkM2U0YTk1NDgvSWNlLVByaW5jZXNzLTQ1MHg0NTAucG5n.webp", provider: "Belatra" },
  { name: "Merry Hog", image: "https://imgproxy.belatra.games/rilpT0zmp5EERlSvSeiF8Ln7L2gWG0h0FU45OYb8-xM/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9lYWRjNWNlNy01OTY1LTQ4NWQtODIyOS00ZTNhNzAxODA2MGQvTWVycnktSG9nLTQyMHg0MjAucG5n.webp", provider: "Belatra" },
  { name: "4 Secrets of Aladin", image: "https://imgproxy.belatra.games/d7Z1n4ySwXPUdWID1KGzvZ6rhR0rrHyrfaxdn_6XHdQ/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy83ODk2YjdkZC05ZTRiLTRmNzAtYWU0Mi0wMzgzNjEyZTAzNjEvQWxhZGRpbl80NTB4NDUwLnBuZw.webp", provider: "Belatra" },
  { name: "Halloween Bingo", image: "https://imgproxy.belatra.games/kTeyNtAwIshWRIusSqIdQsykBtNTyRsON-sXUxBx7Ic/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80MjQ3NDY2Zi1hNTAwLTRlOTYtOTUzOS1lODVkYWUzZGIyNzAvSGFsbG93ZWVuX0JpbmdvXzQ1MHg0NTAucG5n.webp", provider: "Belatra" },
  { name: "Dragon´s Bonanza", image: "https://imgproxy.belatra.games/f7od3dya4TdnaMfj_ZzjcU9fbLZbT7rb5fwmJ7LiEZs/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80ZDgzYTYzYS0zZmE4LTRjNjEtYjY2Yy0wY2Y0OGY2YTk2MDIvRHJhZ29ucy1Cb25hbnphLTQ1MHg0NTAucG5n.webp", provider: "Belatra" },
  { name: "Full Moon Magic", image: "https://imgproxy.belatra.games/zi9js_43nKYCxI6otqlLw1r-vutRzGqtI3_-xstxFjY/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81ZjhkZmM5NC0wYmViLTRmOTYtYjY1Zi05YTBiMjViYmJkZjkvRnVsbC1tb29uLW1hZ2ljLTQyMNGFNDIwLnBuZw.webp", provider: "Belatra" },
  { name: "Bingo Power", image: "https://imgproxy.belatra.games/fWoe75P0TPYz6IKptmPK7wsu07dx-ogvJ3FOXJIPvs0/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mMWNhNTdlMC0yMGFkLTQwMGYtYjAwMS0wYzNhMmQ3YWY5OWUvQmluZ28tUG93ZXItMzgweDM4MC5wbmc.webp", provider: "Belatra" },
  { name: "Richy Hog", image: "https://imgproxy.belatra.games/nhhu2NM6xY5XKVGofwG7khV03NjTXqXYKtgw552ffHA/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy85OTdhMjViMi1iZDkzLTRmYTItYmE5My00NTk1MWNkZWM1MzYvUmljaHktSG9nXzMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Princess Suki", image: "https://imgproxy.belatra.games/rWMI1fJcirar0O1qrBFqfsGQ-da3zOOhtsFPltuKufU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yNmY0YWQ3My1hYWNhLTRmZTEtOGFiNC1kYmE5Mjk0ZTA3MjYvUHJpbmNlc3MtU3VraS0zMDDRhTMwMF8ucG5n.webp", provider: "Belatra" },
  { name: "Wild Fruit Jam", image: "https://imgproxy.belatra.games/6eJxJlWoMUhZOVGZrUCGRNyC_--b14x_IREQArgq5vo/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8xNTk3NDA1ZS1lNWVmLTRkNTEtOWFiNS1hYzJiMDBmZTVhOWIvV2lsZC1GcnVpdC1KYW0tMzAw0YUzMDBfLnBuZw.webp", provider: "Belatra" },
  { name: "Witch School", image: "https://imgproxy.belatra.games/QivFC0QQ42DdFpYju8o938K4gr4lG8mRjrdG5lNh270/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy85ZmJlZDFmNi0xMTMzLTQ2M2YtYWVhMS1mNmUyOGZmZmI3MTYvV2l0Y2gtc2Nob29sXzMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Mummyland Treasures", image: "https://imgproxy.belatra.games/er5aV68yT8vESdR3vLWKOkwENG5jt2R8NGYaE5hZOiw/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81MTkwMTlmNC0xNDZkLTRiNTQtYTA4OS02N2UzZDYzMGY0MzQvTXVtbXlsYW5kLVRyZWFzdXJlcy0zMDB4MzAwXy5wbmc.webp", provider: "Belatra" },
  { name: "3x Superpeppers", image: "https://imgproxy.belatra.games/ptm7RuJCcGeSfmKuDyos96sZBuirhDeq3DEZvmG5EfU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8wZDJjYjc0My1jMGNlLTRiNzYtYTY3NC1hMzZjZDY2ZjBmZjUvM1gtU3VwZXItUGVwcGVycy0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Big Bang", image: "https://imgproxy.belatra.games/tr93JOjPQnddZDyXQ6bDBMbbzBYjhbBpMKa9ybQZUrA/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy84NTU1N2E3ZS01ZmZkLTQwYjktYTU2Zi05ODAwM2RkNTUzNjAvQmlnLUJhbmctMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "x-mas Buffalo", image: "https://imgproxy.belatra.games/kuV_tei-JNizjqLzCk9VNoIdaNYUWJTafygIsggwaMs/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80MjA4MDA2YS04ZGU4LTQ3NjEtYWY3Zi1lNjNmNDAyNThlODAvWG1hc19idWZmYWxvXzMwMHgzMDBfLnBuZw.webp", provider: "Belatra" },
  { name: "Cleo´s Book", image: "https://imgproxy.belatra.games/Gkn8HcNbkcG_RO0n9dhRB7TTshxDvaXVqyk3UjbkEKk/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9jYjc3MGVmMy00NWJiLTRhMjktOGMwOS0yNDRkNjQ2OWY4NTUvQ2xlb3MtYm9va18zMDB4MzAwXy5wbmc.webp", provider: "Belatra" },
  { name: "Big Wild Buffalo", image: "https://imgproxy.belatra.games/OJqBs3Nckow8u3NJrk5Rn9PeRuRmt3CNqygPyotlqfo/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9lNzljMDQwNi1hY2ZjLTRkYmMtYWE4NS1kMThlNWE4MGY2YWYvQmlnLXdpbGQtQnVmZmFsb18zMDB4MzAwXy5wbmc.webp", provider: "Belatra" },
  { name: "5 Wild Wild Peppers", image: "https://imgproxy.belatra.games/yuX_TobGrHrPq8PyOKhrSE2PyOSft06vq2Xbm5zsAIM/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy85NGE5MjYwYS00NGMwLTQ4MWUtODY4NS0wMTE3ZTQxZDc2OTQvNS1XaWxkLXdpbGQtcGVwcGVyc18zMDB4MzAwLnBuZw.webp  ", provider: "Belatra" },
  { name: "Triple X Hot Pepper", image: "https://imgproxy.belatra.games/wYI2PN3Mo2B8dYCDi6j7dFQSeFvskHFPL32Ymfy6NI4/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82YThhNzc3ZS02MWQ4LTQwMTYtYmVjZC1iZmFlNzQyYTIxNDYvVHJpcGxlWC1ob3QtcGVwcGVyc18zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Irish Thunder", image: "https://imgproxy.belatra.games/CJHCeyvd-7yFLpFdOCAghbTpRZmJB2B5OeaC-oesqgE/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mMmQyYmJhMC00ZmQwLTQ1MzUtYTgxYi05NGI5YmUwNjYwMWUvSXJpc2gtVGh1bmRlci0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Legacy of Doom", image: "https://imgproxy.belatra.games/M6qKWl_D24COgXojjvzfmVWfqCPyeg9DQs-vxZ9wUKo/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yZWI5MjAyYi0wYjk3LTQ2MDAtYTAwMS00YmI1YWY4Njk2OTgvTGVnYWN5LW9mLURvb21fMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Catch & Snatch", image: "https://imgproxy.belatra.games/X5gIEwQ_lKzVVbel6E9_tjzviikZtmXZzAUqzsWXIV4/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81N2U4YTViMy01N2ZiLTQwYTMtYTI1OC1jZjEwNGE5OTFlOTcvQ2F0Y2gtU25hdGNoLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Hot Wild Pepper", image: "https://imgproxy.belatra.games/JnKirFYO84bQ4lHj7msctROK3eW3ReDMSzPMGn53gW0/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yZDI2ZmIxYi00YjQ1LTQ4MTMtYjNmZC00MGI1MWE4ODJkMGIvSG90LVdpbGQtUGVwcGVyLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Northern Boom", image: "https://imgproxy.belatra.games/aUD5OpsZ_rKXAQv_MoIuclY7psFYPiRepPuC9oGbt-g/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80OTczNjAwMy0wNTQxLTQ4NmUtYTExYS00ZTk5N2JjZjFlOGEvTm9ydGhlcm4tYm9vbS0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "X-mas Gifts", image: "https://imgproxy.belatra.games/OhuAePUdnCm8cWwtFWz3Q9l6hN9DHWHH2bajzaL06xc/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9jNTM2OGJkNy0yMzJmLTQzYTAtYWJhYi0zMjJlODUyMGFlMjYvWC1tYXMtR2lmdHMtMzAwWDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Master of Xmas", image: "https://imgproxy.belatra.games/L08QPn92kpRUX56Hi5asBmUk1BKy2TfwvGWLdPWgR_s/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8zZjFkZDcwNi1jYjdhLTRmM2UtYjM2YS0xNWE2NjI1YjcxYmMvTWFzdGVyLU9mLVhtYXMtMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Pirate Jackpots", image: "https://imgproxy.belatra.games/WnQhsvJ6Uf7Nkr_ouK_GxZdsA3hdM6yZOc5AmbBnChg/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9kZDRjZGU2ZS0zZTRiLTQ1YmYtYmExNS1mNGY5MmZhZDRkZTgvUGlyYXRlLUphY2twb3RzXzMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Ancient Temple Gems", image: "https://imgproxy.belatra.games/_90pZJ4Y8rU09Y5ejtjH7GLPR4MQ1MURSeJVtipG2jk/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9lMmY0NzczOC0xM2EyLTQ4NDEtOGVlMi05ZmFkZjg2MDc5ZjcvQW5jaWVudC1UZW1wbGUtR2Vtc18zMDDRhTMwMC5wbmc.webp", provider: "Belatra" },  
  { name: "Halloween Crystals", image: "https://imgproxy.belatra.games/wkVJ_VoIireyNNef1WmwlSFxlxxPD6ZESnhTRo6r_XA/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81OWVhNDdlMC0zNGE2LTRlMTAtYWNhNS1jYTZkODFjZTQzYWUvSGFsbG93ZWVuLUNyeXN0YWxzLTMwMHgzMDBfLnBuZw.webp", provider: "Belatra" },
  { name: "Lucie´s Cats", image: "https://imgproxy.belatra.games/1ysCp5mGqO_-tK0r0Ya55JY4xUE_ZGMq5lHjJI7iWyY/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82ZDc0MTU2MC02NjgyLTRiMmUtOTBjNy04ZTk2OTAyOGU5MzkvTHVjaWUncy1jYXRzLTMwMHgzMDBfLnBuZw.webp", provider: "Belatra" },
  { name: "Crystals Digger", image: "https://imgproxy.belatra.games/ZchTSITTl__Fwt7eegeww7P542p5PO6XXXvnsfBoqpQ/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8wYzQ1ZTM2Ni1mMzRmLTQzNjYtYTkzNi1hNDIxYjg1Y2RmMGMvQ3J5c3RhbC1EaWdnZXItMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Zombie Town", image: "https://imgproxy.belatra.games/4k9jXTu11fyLxKIOGhLTyg46WoZ0k1PrfPTBJvVyxmI/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9iMzQ0ZWY1Yy1hYzU0LTQ4N2ItYTMwNS0xY2E3MGIxMWNiNDQvWm9tYmllLVRvd24tMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "500 Juicy fruits", image: "https://imgproxy.belatra.games/dc1u5z67vSoVaqMw3Xk8FusaoxMHH1xU9YbHikXZDfU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9hMjcwZmNiNi0wZmRjLTQzZTYtYjM5YS1mMzBmYzQ5OGIxNGIvNTAwLWp1aWN5LWZydWl0cy0zMDDRhTMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Fortune Craft", image: "https://imgproxy.belatra.games/F8dgOn7Tyh7GhOBFz7g98fUGpaTUGhLxS8xWqg0UDIk/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy83YjI5NzMwMi05NTIyLTQyNmUtYTY4MC04NDg4MjliMjQ0NzUvRm9ydHVuZS1DcmFmdC0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Mayan Book", image: "https://imgproxy.belatra.games/GcZqjrwSsKhKJvV0UtQmjV8G8_qgokuQhyg41R6CBcI/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9hZWU2YWY2Mi05ZTNkLTRmNWMtYmFiZS04NjdiZTVhMWZmOTUvTWF5YW4tQm9va18zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Africa Gold 2", image: "https://imgproxy.belatra.games/G6pEolnYWyCpFaBa76ROsbemGn7cEo2tYv4W4f8WueY/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9kNTM2NmZmMS0yYzVmLTRiNDEtYTAxZi01ZTgxYmYwMmIxNzgvQWZyaWNhLUdvbGQyLTMwMHgzMDBfLnBuZw.webp", provider: "Belatra" },
  { name: "Masters of Gold", image: "https://imgproxy.belatra.games/e2IU0nOUv7-wXMaN9wB2pBAZzCgZbjP6Za1kx5EL0HU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9iODc4ZGJiNC03NWRhLTRiNWEtYThkNS01ZjQ5YzZmODA3YjYvTWFzdGVyLW9mLWdvbGRfMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "The Night Racing", image: "https://imgproxy.belatra.games/_iOExLU9RIXODokHqLCKa5DJi9sXXdrOyYtODcGemaE/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy85NzI5NzQ1YS1hOGU2LTQ1ZGYtYTA0Zi02YzhkYjI0YmUyOTgvVGhlLW5pZ2h0LXJhY2luZ18zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "King Of Jumping Scratch", image: "https://imgproxy.belatra.games/zH_OuBM24NlGqDtfTAOm1E8ilW30QSTldnweOjkhGqE/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9lY2UzNzBlMS1kYThmLTQ4MWUtODBkNC0yZmRiOTIxZmNlMzIvS2luZy1vZi1KdW1waW5nLVNjcmF0Y2gtMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Lazy Monkey", image: "https://imgproxy.belatra.games/CC1Nl9jDTTJGUyxk30iMKLtiXgi5nkHa2ao-jJwHPV4/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9kOGE2MWI0ZC04N2M0LTRlNTEtYWE4Mi1hZmUyNmYwMzNjOWEvTGF6eS1tb25rZXktMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Christmas Jackpot", image: "https://imgproxy.belatra.games/_rmnAaQGoOt5zJpnKS0lWqe1r6IJkAkdK8dTpa_KrIA/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80NTM1MjAwOS1mZGFiLTQyOTAtODUxYi04NWIyZjAwMjU0N2EvQ2hyaXN0bWFzLUphY2twb3QtMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "20 Icy Fruits", image: "https://imgproxy.belatra.games/zvdiYuZJ22e6rqaIY4Mer4d_pc6kItB5Y3CeIxcUM_g/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8xYzhiMjQ3OC0yMTgyLTQ1MjgtYjdhYy05Y2M2YjJlYWQ1OWEvMjAtSWN5LUZydWl0c18zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Lavish Joker", image: "https://imgproxy.belatra.games/Nf0jruBnVmw-B7AgA4D_8FFQOzA8XgqzAnsT2un4dDM/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80MmU1MjEwNy1kODY3LTRjY2UtYWVmYi0yNTliNjQzMTM0ZGIvTGF2aXNoLUpva2VyXzMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Golden Lemon DeLuxe", image: "https://imgproxy.belatra.games/mRYTN3T_dUrWp65-LL1d1y6j9oAfSCq29C69szotVW8/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82NzMwODFhZS1mMzEzLTRmZDUtOGU1ZS03MmM3Mjc2NzBhYTYvR29sZGVuLUxlbW9uLURlbHV4ZS0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Prehistoric Story", image: "https://imgproxy.belatra.games/xZgBm3HCunoeQOlbmfbSlRmb5VKHNj3DnK6YfoOiX10/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9jM2RiNTY0Ny00ZTE3LTQ1MTctYjYyNS01ZmUxNDIzNjVkMWQvUHJlaGlzdG9yaWMtU3RvcnktMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "7 Fruits", image: "https://imgproxy.belatra.games/CyBgL6ZD9yrJw_2z3zctR1vNQLjuhYp3hcNtl7erlyU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80ODgwODEzOC00MGY3LTQ2ZjAtOTEzNy1iYmJkOWVkYWNhY2YvNy1GcnVpdHNfMzAweDMwMF8ucG5n.webp", provider: "Belatra" },
  { name: "Lucky Bank Robbers", image: "https://imgproxy.belatra.games/FI6Xnn44mAbSZnPgD0PPxjCL4zeIcJW2qQrWQkKRU4A/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy82MDM0ZjQ0Mi0zMWI1LTQyNmYtOTY3ZC0wYjA4NDYwYzNiNzgvTHVja3ktQmFuay1Sb2JiZXJzLTQyMHg0MjAucG5n.webp", provider: "Belatra" },
  { name: "J-Monsters", image: "https://imgproxy.belatra.games/KUTQht-6W1ipQOd-JExKf5t2_6prkozCpRdwUUtcSmo/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81ZTk1YThmMS0yMDY3LTRiOTItYmM3MC05MDMyYmE4MjI5Y2YvSi5Nb25zdGVycy0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "The Moneymania", image: "https://imgproxy.belatra.games/tbGTs-x5rCoz9YZdmtxnJoCEZbbyimaCxG4qVddkIF0/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy81YjQxNjBjZi0zNjYyLTRkYzUtOTVkNC1mZjA5Mjg1YzU3NGYvTW9uZXltYW5pYS0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Golden Lemon", image: "https://imgproxy.belatra.games/UcD5HckduMktuEejiz-ym3LpoScj5lCOCTsYDgJHk4U/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9hZTI1NDk2ZS0wYmFhLTQwNTYtOTM1NC0xYzEwM2VlYTNlZGQvR29sZGVuLUxlbW9uLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Beauty and the Beast", image: "https://imgproxy.belatra.games/tdDPC3-66AvIeI-ZO9HCqS2e2umcXQz7oTYD9bIkhtc/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8xYmJiMWQ0Ni05MzRjLTQ3YTQtOTA5ZC02MmQ4Nzk0OTI1MWEvQmVhdXR5LWFuZC10aGUtQmVhc3QtMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Lucky Drink", image: "https://imgproxy.belatra.games/anD1A869wzXgmvWOQJ4x3z1Jaae0WfBlxNBg-DGqdto/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8xYTE4ZTI1NC1kNGI2LTQyOGMtYmE1Zi1kNDZjNzU1MGE1YjgvTHVja3ktRHJpbmstMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Princess of Swamp", image: "https://imgproxy.belatra.games/TnIKznf_aeypNyxFfg7cKh9OhuYWUO5V8kcqDZKDG_Y/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9mMjJiYTIwMy01Y2M5LTQ4ZmQtYjlmNi02YWJlZjBiMGNlNWIvUHJpbmNlc3MtT2YtU3dhbXAtMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "Escape from Alcatraz", image: "https://imgproxy.belatra.games/loKEgCNDCuFMFqdyzhNAC7b15sTsTFANjG1PdiQhLXk/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy84YmMxMDAwMy1mNzZhLTRmMDItYjRjOS02ZTMyNGU5NzU2MDcvQW4tRXNjYXBlLUZyb20tQWwtQ2F0cmF6LTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Halloween", image: "https://imgproxy.belatra.games/ZEMF_lFWWl4ttNcIEjZ8CoKhLoWESXZyhqcIr5esrUI/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9jZGNhYTQ1ZS1iZjQxLTQzODYtYWJkZS03NjgyNDQ5MTcyNTAvSGFsbG93ZWVuLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Frog Creek", image: "https://imgproxy.belatra.games/mlrmsrRBQHORNYPqGxDEy3YZie8cjhS2e5AwF1AdNA0/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy84ZDZiM2QyMS0zNmI2LTQwZjctODg5OS02MzE1NGE3Yjg0YjMvRnJvZy1DcmVlay0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Super Sevens", image: "https://imgproxy.belatra.games/q-AERvH-v6eRsQZGMTT5VrUdLwyjo5iMRvkHZnXIElo/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy83M2RhMTI4MC00ZDU5LTQwMGMtODRmYi05MWZjZWZmZjEzNzgvU3VwZXItU2V2ZW5zLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Dracula Riches", image: "https://imgproxy.belatra.games/kf2SN8FFIl5nmCY06AdsY1MEmeOLSsR0Un4_9-RoOdU/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy84ZmI4NGU1MS0wYzM0LTRmYTQtODU3NC1jMmYwYWRhNjhkZmYvRHJhY3VsYS1SaWNoZXMtMzAweDMwMC5wbmc.webp", provider: "Belatra" },
  { name: "The Ghost Walks", image: "https://imgproxy.belatra.games/hx7ei-vuGtNy6skPsYxUq7A67zJ7UALm0wxLl99Cj8w/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy83ZDdmNWMyZi05MTc1LTQ0NzEtODFjYS01ZTYyMmI1N2Y3ZTkvVGhlLUdob3N0LVdhbGtzLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Piggy Bank", image: "https://imgproxy.belatra.games/2v6It4gBzpYvrVkFud3g3d30594cqVndWh_HH2EvosQ/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9lZjhkODBjYi00YzQyLTQ3YTMtOGYyZS1jZTBkMzBhYzY5MzYvUGlnZ3ktQmFuay0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Blue Beard", image: "https://imgproxy.belatra.games/chJ0m5rBnJ5zH3Pw-21kgNoThIhMY1f1xlozUzBT0UM/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yMTM3OTYxNi04ZjU2LTQ1MDctYjkwMy1lNDUyZTc0NjRiNzQvQmx1ZS1CZWFyZC0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "88 Golden", image: "https://imgproxy.belatra.games/uYQfAEfUDhjtxosHNBZTIqvzOME37GIleIHRiEb04X8/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy84ODlkMjBkYy03YjAyLTRlYTktOTEwMS1mMjIxMzRlMGEyMjcvODgtR29sZGVuLTg4LTMwMNGFMzAwLnBuZw.webp", provider: "Belatra" },
  { name: "777 Sevens", image: "https://imgproxy.belatra.games/_cXEzz0DyMtzsWGVtLwVNDvDl2hgvvM6-X_XfwpHNak/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy80NzNlYTk1Yi02Yzk1LTQzYjctOTYwNS0zMGI5ZjhlNTlkMzMvU2V2ZW5zLTMwMHgzMDAucG5n.webp", provider: "Belatra" },
  { name: "Love Magic", image: "https://imgproxy.belatra.games/_JKDh29Kke48xNX4suyjOj7TkXsamZNlrQlRU4MlLk4/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yYmY4NDgzNS1kYzdmLTQ3NmEtOTMyMy1mMTI4NTVhNWEzMWQvTG92ZS1NYWdpYy0zMDB4MzAwLnBuZw.webp", provider: "Belatra" },
  { name: "7 Days The Spanish Armada", image: "https://imgproxy.belatra.games/13XxtcjV8Fb0AMNWEroPXlxhGFLHy2hZjeZal6Tkx3w/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy9kZWI0Nzc3YS1kMDBjLTQ0MWYtOTEzYy00YTAwYjU2ODFjOTIvVGhlLVNwYW5pc2gtQXJtYWRhLTMwMNGFMzAwLnBuZw.webp", provider: "Belatra" },
  { name: "Africa Gold", image: "https://imgproxy.belatra.games/ctG1v4xt6v8OFah7hYtK4hQaZv-lXNNiG75OSXXk6ak/q:100/w:300/rt:fill/czM6Ly9iZWxhdHJhL21lZGlhL0dhbWUvcHJldmlldy8yZDNiZjM0Zi05ZWNmLTQ5NDAtOTIxMC02MDRjZGNmNjJiNDkvQWZyaWNhLUdvbGQtMzAw0YUzMDBfLnBuZw.webp", provider: "Belatra" }
  
];

// Tournament-related functions
function initializeTournamentSlotSuggestions() {
  const tournamentSlotInputs = document.querySelectorAll('.tournament-slot-input');
  
  tournamentSlotInputs.forEach((input, index) => {
    const container = input.closest('.slot-input-container');
    if (!container) return;
    
    // Create suggestion box for this input
    let suggestionBox = document.createElement('div');
    suggestionBox.className = 'tournament-slot-suggestion-box';
    suggestionBox.style.display = 'none';
    
    container.appendChild(suggestionBox);
    
    input.addEventListener('input', function () {
      const value = input.value.trim();
      if (value.length < 3) {
        suggestionBox.style.display = 'none';
        return;
      }
      
      // Make sure slotDatabase is available
      if (typeof slotDatabase === 'undefined') return;
      
      const matches = slotDatabase.filter(slot =>
        slot.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6); // Limit to 6 for better UX in smaller boxes
      
      if (matches.length === 0) {
        suggestionBox.style.display = 'none';
        return;
      }
      
      suggestionBox.innerHTML = '';
      matches.forEach(slot => {
        const item = document.createElement('div');
        item.className = 'tournament-slot-suggestion-item';
        item.innerHTML = `
          <span class="slot-suggestion-name">${slot.name}</span>
          <span class="slot-suggestion-provider">${slot.provider}</span>
        `;
        
        const selectSlot = function(e) {
          e.preventDefault();
          e.stopPropagation();
          input.value = slot.name;
          suggestionBox.style.display = 'none';
          input.dispatchEvent(new Event('input'));
        };
        
        item.addEventListener('click', selectSlot);
        item.addEventListener('mousedown', selectSlot);
        
        suggestionBox.appendChild(item);
      });
      
      suggestionBox.style.display = 'block';
    });
    
    input.addEventListener('blur', function () {
      setTimeout(() => { suggestionBox.style.display = 'none'; }, 200);
    });
    
    // Hide other suggestion boxes when this one gets focus
    input.addEventListener('focus', function () {
      tournamentSlotInputs.forEach((otherInput, otherIndex) => {
        if (otherIndex !== index) {
          const otherContainer = otherInput.closest('.slot-input-container');
          const otherSuggestionBox = otherContainer ? otherContainer.querySelector('.tournament-slot-suggestion-box') : null;
          if (otherSuggestionBox) {
            otherSuggestionBox.style.display = 'none';
          }
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const bhBtn = document.getElementById('bh-btn');
  const boBtn = document.getElementById('bo-btn');
  const randomSlotBtn = document.getElementById('random-slot-btn');
  const tournamentBtn = document.getElementById('tournament-btn'); // Trophy button
  const infoPanel = document.querySelector('.info-panel');
  const middlePanel = document.getElementById('middle-panel');
  const randomSlotPanel = document.getElementById('random-slot-panel');
  const tournamentPanel = document.getElementById('tournament-panel');
  let panelVisible = false;
  let randomSlotPanelVisible = false;
  let tournamentPanelVisible = false;

  // Helper to update info panel visibility with slide
  function updateInfoPanelVisibility() {
    const bhActive = bhBtn && bhBtn.classList.contains('active');
    const boActive = boBtn && boBtn.classList.contains('active');
    const randomSlotActive = randomSlotBtn && randomSlotBtn.classList.contains('active');
    const tournamentActive = tournamentBtn && tournamentBtn.classList.contains('active');
    
    if (infoPanel) {
      // Hide info panel when tournament panel is active, keep visible for others
      if (tournamentActive) {
        infoPanel.classList.remove('info-panel--visible');
      } else if (bhActive || boActive || randomSlotActive) {
        infoPanel.classList.add('info-panel--visible');
      } else {
        infoPanel.classList.remove('info-panel--visible');
      }
    }
  }
  // Patch BH button logic
  bhBtn.addEventListener('click', () => {
    panelVisible = !panelVisible;
    middlePanel.style.display = panelVisible ? 'flex' : 'none';
    bhBtn.classList.toggle('active', panelVisible);
    
    // Hide selected slot display when BH panel is closed
    if (!panelVisible) {
      hideSelectedSlot();
    }
    
    // Hide random slot panel when BH is shown
    const randomSlotPanel = document.getElementById('random-slot-panel');
    if (randomSlotPanel && panelVisible) {
      randomSlotPanel.style.display = 'none';
    }
    // Remove 'active' from all sidebar buttons except BH
    if (panelVisible) {
      document.querySelectorAll('.sidebar-btn').forEach(btn => {
        if (btn !== bhBtn) btn.classList.remove('active');
      });
    }
    updateInfoPanelVisibility();
  });

  // Random Slot Button Logic
  if (randomSlotBtn && randomSlotPanel) {
    randomSlotBtn.addEventListener('click', () => {
      randomSlotPanelVisible = !randomSlotPanelVisible;
      randomSlotPanel.style.display = randomSlotPanelVisible ? 'flex' : 'none';
      randomSlotBtn.classList.toggle('active', randomSlotPanelVisible);
      
      // Hide BH panel when random slot is shown
      if (randomSlotPanelVisible) {
        middlePanel.style.display = 'none';
        panelVisible = false;
        hideSelectedSlot(); // Hide selected slot display when random slot panel opens
      }
      
      // Remove 'active' from all sidebar buttons except random slot
      if (randomSlotPanelVisible) {
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
          if (btn !== randomSlotBtn) btn.classList.remove('active');
        });
      }
      updateInfoPanelVisibility();
    });
  }

  // Tournament Button Logic
  if (tournamentBtn && tournamentPanel) {
    let tournamentInitialized = false;
    
    tournamentBtn.addEventListener('click', () => {
      tournamentPanelVisible = !tournamentPanelVisible;
      tournamentPanel.style.display = tournamentPanelVisible ? 'flex' : 'none';
      tournamentBtn.classList.toggle('active', tournamentPanelVisible);
      
      // Initialize tournament slot suggestions on first open
      if (tournamentPanelVisible && !tournamentInitialized) {
        initializeTournamentSlotSuggestions();
        tournamentInitialized = true;
      }
      
      // Hide other panels when tournament is shown
      if (tournamentPanelVisible) {
        middlePanel.style.display = 'none';
        randomSlotPanel.style.display = 'none';
        panelVisible = false;
        randomSlotPanelVisible = false;
        hideSelectedSlot(); // Hide selected slot display when tournament panel opens
      }
      
      // Remove 'active' from all sidebar buttons except tournament
      if (tournamentPanelVisible) {
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
          if (btn !== tournamentBtn) btn.classList.remove('active');
        });
      }
      updateInfoPanelVisibility();
    });
  }

  const adInput = document.getElementById('ad-image-input');
  const adPreview = document.getElementById('ad-image-preview');
  const adLabel = document.querySelector('.ad-upload-label');

  adInput.addEventListener('change', (e) => {
    const file = adInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        adPreview.src = evt.target.result;
        adPreview.style.display = 'block';
        adLabel.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });

  // Focus bet size after pressing Enter in slot name
  const slotNameInput = document.getElementById('slot-name-input');
  const betSizeInput = document.getElementById('bet-size-input');
  if (slotNameInput && betSizeInput) {
    slotNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        betSizeInput.focus();
      }
    });
  }

  // Slot image URL button/input toggle
  const slotImgUrlBtn = document.getElementById('slot-img-url-btn');
  const slotImgUrlInput = document.getElementById('slot-img-url-input');
  if (slotImgUrlBtn && slotImgUrlInput) {
    slotImgUrlBtn.addEventListener('click', () => {
      slotImgUrlBtn.style.display = 'none';
      slotImgUrlInput.style.display = 'inline-block';
      slotImgUrlInput.focus();
    });
    slotImgUrlInput.addEventListener('blur', () => {
      slotImgUrlInput.style.display = 'none';
      slotImgUrlBtn.style.display = 'inline-flex';
    });
    slotImgUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        slotImgUrlInput.blur();
      }
    });
  }

  // --- Bonus Opening / BO Button Logic ---
  const bonusOpenBtn = document.getElementById('bonus-opening-btn'); // "Bonus opening" button in BH panel
  const bhPanel = document.getElementById('middle-panel'); // BH panel element

  // Slot image URL (replace with your logic to get the actual image)
  let slotImageUrl = '';
  const slotImgInput = document.getElementById('slot-img-url-input');
  if (slotImgInput) {
    slotImgInput.addEventListener('input', (e) => {
      slotImageUrl = e.target.value;
    });
  }

  // Patch Bonus Opening button in BH panel
  if (bonusOpenBtn) {
    bonusOpenBtn.addEventListener('click', () => {
      if (middlePanel) middlePanel.style.display = 'none';
      showPayoutPanel();
      // Set BO button as active, BH as inactive
      if (boBtn) boBtn.classList.add('active');
      if (bhBtn) bhBtn.classList.remove('active');
      updateInfoPanelVisibility();
      // --- Ensure slot highlight card updates immediately ---
      setTimeout(updateSlotHighlightCard, 50);
    });
  }

  // Hide info panel by default on load
  if (infoPanel) infoPanel.classList.remove('info-panel--visible');

  // --- Twitch Login/Logout Mockup ---
  // REMOVE Twitch login logic, username span, and related code
  // const twitchLoginBtn = document.getElementById('twitch-login-btn');
  // const twitchUsernameSpan = document.getElementById('twitch-username');
  // function mockTwitchLogin() { ... }
  // if (twitchLoginBtn) { ... }

  // Update Start/Stop Money display in right sidebar
  const startMoneyInput = document.getElementById('start-money-input');
  const stopMoneyInput = document.getElementById('stop-money-input');
  const startMoneyDisplay = document.getElementById('start-money-display');
  const stopMoneyDisplay = document.getElementById('stop-money-display');
  const startMoneyDisplayMain = document.getElementById('start-money-display-main');
  const stopMoneyDisplayMain = document.getElementById('stop-money-display-main');

  function updateStartMoneyDisplays(val) {
    const formatted = val ? `€${parseFloat(val).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '--';
    if (startMoneyDisplay) startMoneyDisplay.textContent = formatted;
    if (startMoneyDisplayMain) startMoneyDisplayMain.textContent = formatted;
  }
  function updateStopMoneyDisplays(val) {
    const formatted = val ? `€${parseFloat(val).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '--';
    if (stopMoneyDisplay) stopMoneyDisplay.textContent = formatted;
    if (stopMoneyDisplayMain) stopMoneyDisplayMain.textContent = formatted;
  }

  if (startMoneyInput) {
    startMoneyInput.addEventListener('input', () => {
      updateStartMoneyDisplays(startMoneyInput.value);
    });
  }
  if (stopMoneyInput) {
    stopMoneyInput.addEventListener('input', () => {
      updateStopMoneyDisplays(stopMoneyInput.value);
    });
  }

  // --- Slot Name Suggestion Dropdown ---
  if (slotNameInput) {
    let suggestionBox = document.createElement('div');
    suggestionBox.style.position = 'absolute';
    suggestionBox.style.background = 'linear-gradient(135deg, #23243a 0%, #2d2e4a 100%)';
    suggestionBox.style.color = '#fff';
    suggestionBox.style.borderRadius = '12px';
    suggestionBox.style.boxShadow = '0 4px 16px rgba(0,225,255,0.2)';
    suggestionBox.style.border = '1px solid #00e1ff';
    suggestionBox.style.zIndex = '1010';
    suggestionBox.style.display = 'none';
    suggestionBox.style.maxHeight = '200px';
    suggestionBox.style.overflowY = 'auto';
    suggestionBox.style.fontSize = '0.95rem';
    suggestionBox.style.padding = '0.3rem 0';
    suggestionBox.style.backdropFilter = 'blur(8px)';
    suggestionBox.style.left = '0';
    suggestionBox.style.top = '100%';
    suggestionBox.style.width = '100%';
    suggestionBox.style.marginTop = '0.3rem';
    suggestionBox.className = 'slot-suggestion-box';
    
    // Append to the slot name input's parent container for proper positioning
    const slotNameContainer = slotNameInput.closest('.middle-input-label');
    if (slotNameContainer) {
      slotNameContainer.style.position = 'relative';
      slotNameContainer.appendChild(suggestionBox);
    } else {
      document.body.appendChild(suggestionBox);
    }

    slotNameInput.addEventListener('input', function () {
      const value = slotNameInput.value.trim();
      if (value.length < 3) {
        suggestionBox.style.display = 'none';
        return;
      }
      const matches = slotDatabase.filter(slot =>
        slot.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      if (matches.length === 0) {
        suggestionBox.style.display = 'none';
        return;
      }
      suggestionBox.innerHTML = '';
      matches.forEach(slot => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.padding = '0.5rem 0.8rem';
        item.style.cursor = 'pointer';
        item.style.borderRadius = '8px';
        item.style.margin = '0.1rem 0.3rem';
        item.style.transition = 'all 0.2s ease';
        item.innerHTML = `
          <img src="${slot.image}" alt="${slot.name}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;margin-right:0.6rem;border:1px solid #00e1ff;">
          <div>
            <div style="font-weight:600;font-size:0.9rem;">${slot.name}</div>
            <div style="font-size:0.8rem;color:#b0b3b8;">${slot.provider}</div>
          </div>
        `;
        // Handle both click and mousedown to ensure selection works
        const selectSlot = function(e) {
          e.preventDefault();
          e.stopPropagation();
          slotNameInput.value = slot.name;
          suggestionBox.style.display = 'none';
          slotNameInput.dispatchEvent(new Event('input'));
          // Show selected slot in right-side display
          showSelectedSlot(slot);
          // Focus bet size input after selecting a suggestion
          if (betSizeInput) {
            setTimeout(() => betSizeInput.focus(), 50);
          }
        };
        
        item.addEventListener('click', selectSlot);
        item.addEventListener('mousedown', selectSlot);
        item.addEventListener('mouseover', function () {
          item.style.background = 'linear-gradient(90deg, #9147ff 0%, #00e1ff 100%)';
          item.style.transform = 'scale(1.02)';
        });
        item.addEventListener('mouseout', function () {
          item.style.background = 'transparent';
          item.style.transform = 'scale(1)';
        });
        suggestionBox.appendChild(item);
      });
      suggestionBox.style.display = 'block';
    });

    // Hide suggestions on blur
    slotNameInput.addEventListener('blur', function () {
      setTimeout(() => { suggestionBox.style.display = 'none'; }, 200);
    });
  }

  // Add slot to Bonus List on Enter in Bet Size input
  // Ensure there is a <ul> inside .bonus-list, create if missing
  let bonusListUl = document.querySelector('.bonus-list ul');
  if (!bonusListUl) {
    const bonusListDiv = document.querySelector('.bonus-list');
    if (bonusListDiv) {
      bonusListUl = document.createElement('ul');
      bonusListDiv.appendChild(bonusListUl);
    }
  }
  // --- Super checkbox logic ---
  const superCheckbox = document.getElementById('super-checkbox');
  if (betSizeInput && slotNameInput && bonusListUl) {
    betSizeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const slotName = slotNameInput.value.trim();
        const betSize = betSizeInput.value.trim();
        if (slotName && betSize) {
          // Try to find slot in database for image
          let slot = slotDatabase.find(s => s.name.toLowerCase() === slotName.toLowerCase());
          let imgSrc = slot ? slot.image : DEFAULT_SLOT_IMAGE;
          // Create new list item with image and highlight classes
          const li = document.createElement('li');
          li.innerHTML = `
            <img src="${imgSrc}" alt="${slotName}" class="slot-img">
            <span class="slot-name">${slotName}</span>
            <span class="slot-payout">--</span>
            <span class="slot-bet">€${parseFloat(betSize).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          `;
          // Highlight if super checkbox is checked
          if (superCheckbox && superCheckbox.checked) {
            li.classList.add('super-slot');
            superCheckbox.checked = false; // Optionally uncheck after use
          }
          bonusListUl.appendChild(li);

          // Optionally clear inputs
          slotNameInput.value = '';
          betSizeInput.value = '';
          slotNameInput.focus();

          renderBonusHuntResults();
          updateBonusListCarousel();
        }
      }
    });
  }

  // --- Bonus Opening Payout Panel Logic (Vanilla JS, styled to match your app) ---

  function getBonusListData() {
    const bonusListUl = document.querySelector('.bonus-list ul');
    if (!bonusListUl) return [];
    // Only use non-clone lis for calculations and payout
    return Array.from(bonusListUl.children)
      .filter(li => !li.classList.contains('carousel-clone'))
      .map(li => {
        const spans = li.querySelectorAll('span');
        return {
          name: spans[0] ? spans[0].textContent : '',
          bet: spans[1] ? parseFloat(spans[1].textContent.replace(/[^\d.]/g, '')) : 0,
          payout: li.dataset && li.dataset.payout ? parseFloat(li.dataset.payout) : null
        };
      });
  }

  let payoutPanel = null;
  let payoutBonuses = [];
  let payoutIndex = 0;

  function showPayoutPanel() {
    if (payoutPanel) return;
    payoutBonuses = getBonusListData();
    if (!payoutBonuses.length) return;

    payoutIndex = 0;
    payoutPanel = document.createElement('div');
    payoutPanel.className = 'middle-panel';
    payoutPanel.style.display = 'flex';
    payoutPanel.style.flexDirection = 'column';
    payoutPanel.style.alignItems = 'center';
    payoutPanel.style.position = 'fixed';
    payoutPanel.style.top = '50%';
    payoutPanel.style.left = '50%';
    payoutPanel.style.transform = 'translate(-50%, -50%)';
    payoutPanel.style.zIndex = '1001';
    payoutPanel.style.background = 'rgba(36, 38, 48, 0.97)';
    payoutPanel.style.borderRadius = '24px';
    payoutPanel.style.boxShadow = '0 6px 24px 0 rgba(0,0,0,0.18)';
    payoutPanel.style.padding = '2rem 1.5rem';
    payoutPanel.style.width = '400px';
    payoutPanel.style.height = '420px';

    document.body.appendChild(payoutPanel);
    renderPayoutStep();
  }

  function renderPayoutStep() {
    if (!payoutPanel) return;
    const bonus = payoutBonuses[payoutIndex];
    payoutPanel.innerHTML = `
      <div class="middle-panel-title" style="margin-bottom:1.2rem;">
        Enter Payout (${payoutIndex + 1}/${payoutBonuses.length})
      </div>
      <img src="${getSlotImage(bonus.name)}" alt="${bonus.name}" style="width:120px;height:80px;object-fit:cover;border-radius:12px;margin-bottom:12px;box-shadow:0 2px 8px 0 rgba(0,0,0,0.18);">
      <div style="color:#fff;font-weight:600;margin-bottom:12px;font-size:1.15rem;">${bonus.name}</div>
      <form id="payout-form" style="display:flex;gap:8px;margin-bottom:1.5rem;">
        <input
          id="payout-input"
          type="number"
          min="0"
          step="any"
          value="${bonus.payout !== null ? bonus.payout : ''}"
          placeholder="Enter payout"
          class="middle-input"
          style="width:140px;"
          autofocus
        />
        <button type="submit" class="middle-btn small-btn" style="width:auto;">
          OK
        </button>
      </form>
      <div style="flex:1"></div>
      <button id="cancel-payout-panel" class="middle-btn small-btn" style="margin-top:auto;background:#ff5c5c;color:#fff;">Cancel</button>
    `;

    const form = payoutPanel.querySelector('#payout-form');
    form.onsubmit = function (e) {
      e.preventDefault();
      const val = payoutPanel.querySelector('#payout-input').value;
      if (val && !isNaN(val)) {
        payoutBonuses[payoutIndex].payout = parseFloat(val);
        setBonusPayout(bonus.name, parseFloat(val)); // <-- update sidebar
        if (payoutIndex < payoutBonuses.length - 1) {
          payoutIndex++;
          renderPayoutStep();
        } else {
          document.body.removeChild(payoutPanel);
          payoutPanel = null;
          // Optionally: display results or update sidebar
          // Example: console.log(payoutBonuses);
        }
      }
    };

    payoutPanel.querySelector('#cancel-payout-panel').onclick = function () {
      document.body.removeChild(payoutPanel);
      payoutPanel = null;
      // Optionally: show the BH panel again
      const bhPanel = document.getElementById('middle-panel');
      if (bhPanel) bhPanel.style.display = 'flex';
    };
  }

  function getSlotImage(slotName) {
    // Use the slotDatabase defined in this script
    const slot = slotDatabase.find(s => s.name.toLowerCase() === slotName.toLowerCase());
    const imageUrl = slot ? slot.image : DEFAULT_SLOT_IMAGE;
    console.log(`Getting image for slot: ${slotName}, found: ${!!slot}, image: ${imageUrl}`);
    return imageUrl;
  }

  // --- Hook up Bonus Opening button ---
  // Remove duplicate event listener for bonusOpenBtn
  // Only keep the payout panel logic, not the slot card logic, for the "Bonus Opening" button
  if (bonusOpenBtn) {
    bonusOpenBtn.addEventListener('click', () => {
      if (middlePanel) middlePanel.style.display = 'none';
      showPayoutPanel();
    });
  }

  // Hide selected slot by default
  hideSelectedSlot();

  function renderBonusHuntResults() {
    const startBalance = parseFloat(document.getElementById('start-money-input')?.value) || 0;
    const openingBalance = parseFloat(document.getElementById('stop-money-input')?.value) || 0;
    // Only use non-clone lis for calculations
    const bonusListUl = document.querySelector('.bonus-list ul');
    const bonuses = bonusListUl
      ? Array.from(bonusListUl.children)
          .filter(li => !li.classList.contains('carousel-clone'))
          .map(li => {
            const spans = li.querySelectorAll('span');
            let slot = spans[0] ? spans[0].textContent : '';
            let bet = spans[1] ? parseFloat(spans[1].textContent.replace(/[^\d.]/g, '')) : 0;
            let result = 0;
            if (li.dataset && li.dataset.payout) {
              result = parseFloat(li.dataset.payout) || 0;
            }
            return { slot, bet, result };
          })
      : [];

    const stats = calculateBonusHuntStats(startBalance, openingBalance, bonuses);

    const resultsDiv = document.getElementById('bonus-hunt-results');
    if (!resultsDiv) return;
    resultsDiv.innerHTML = `
      <div class="bhr-compact" style="
        display:grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 0.07rem 0.2rem;
        font-size: 0.89rem;
        line-height: 1.08;
        ">
        <div><span class="bhr-label">Bon:</span> <span class="bhr-value">${stats.bonuses}</span></div>
        <div><span class="bhr-label">Pft:</span> <span class="bhr-value ${stats.totalProfit >= 0 ? 'bhr-profit' : 'bhr-loss'}">€${stats.totalProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}</span></div>
        <div><span class="bhr-label">Bet:</span> <span class="bhr-value">€${stats.averageBetSize.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}</span></div>
        <div><span class="bhr-label">Win:</span> <span class="bhr-value">€${stats.averageWin.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}</span></div>
        <div><span class="bhr-label">X:</span> <span class="bhr-value">${stats.averageX.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}x</span></div>
        <div><span class="bhr-label">BE X:</span> <span class="bhr-value">${stats.breakEvenX.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}x</span></div>
        <div><span class="bhr-label">BEB:</span> <span class="bhr-value">€${stats.breakEvenPerBonus.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
        <div><span class="bhr-label">BE:</span> <span class="bhr-value">€${stats.breakEven.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
        <div><span class="bhr-label">Cost:</span> <span class="bhr-value">€${stats.totalCost.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}</span></div>
        <div><span class="bhr-label">Ret:</span> <span class="bhr-value">€${stats.totalReturn.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}</span></div>
      </div>
    `;
  }

  // --- Call renderBonusHuntResults on relevant changes ---

  // After start/stop money input
  if (startMoneyInput) {
    startMoneyInput.addEventListener('input', renderBonusHuntResults);
  }
  if (stopMoneyInput) {
    stopMoneyInput.addEventListener('input', renderBonusHuntResults);
  }
  // After bet size input
  if (betSizeInput) {
    betSizeInput.addEventListener('input', renderBonusHuntResults);
  }

  // After adding a bonus to the list, update the results
  if (betSizeInput && slotNameInput && bonusListUl) {
    betSizeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // ...existing code...
        // After adding the li:
        renderBonusHuntResults();
      }
    });
  }

  // When a payout is entered in the payout panel, store it as a data attribute and update results
  function setBonusPayout(slotName, payout) {
    const bonusListUl = document.querySelector('.bonus-list ul');
    if (!bonusListUl) return;
    Array.from(bonusListUl.children)
      // Remove the filter so it updates both original and carousel-clone items
      //.filter(li => !li.classList.contains('carousel-clone'))
      .forEach(li => {
        const spans = li.querySelectorAll('span');
        if (spans[0] && spans[0].textContent === slotName) {
          li.dataset.payout = payout;
          // Update payout span
          const payoutSpan = li.querySelector('.slot-payout');
          if (payoutSpan) {
            payoutSpan.textContent = `€${parseFloat(payout).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`;
          }
        }
      });
    renderBonusHuntResults();
  }

  // In renderPayoutStep, after payout is entered, call setBonusPayout
  function renderPayoutStep() {
    if (!payoutPanel) return;
    const bonus = payoutBonuses[payoutIndex];
    payoutPanel.innerHTML = `
      <div class="middle-panel-title" style="margin-bottom:1.2rem;">
        Enter Payout (${payoutIndex + 1}/${payoutBonuses.length})
      </div>
      <img src="${getSlotImage(bonus.name)}" alt="${bonus.name}" style="width:120px;height:80px;object-fit:cover;border-radius:12px;margin-bottom:12px;box-shadow:0 2px 8px 0 rgba(0,0,0,0.18);">
      <div style="color:#fff;font-weight:600;margin-bottom:12px;font-size:1.15rem;">${bonus.name}</div>
      <form id="payout-form" style="display:flex;gap:8px;margin-bottom:1.5rem;">
        <input
          id="payout-input"
          type="number"
          min="0"
          step="any"
          value="${bonus.payout !== null ? bonus.payout : ''}"
          placeholder="Enter payout"
          class="middle-input"
          style="width:140px;"
          autofocus
        />
        <button type="submit" class="middle-btn small-btn" style="width:auto;">
          OK
        </button>
      </form>
      <div style="flex:1"></div>
      <button id="cancel-payout-panel" class="middle-btn small-btn" style="margin-top:auto;background:#ff5c5c;color:#fff;">Cancel</button>
    `;

    const form = payoutPanel.querySelector('#payout-form');
    form.onsubmit = function (e) {
      e.preventDefault();
      const val = payoutPanel.querySelector('#payout-input').value;
      if (val && !isNaN(val)) {
        payoutBonuses[payoutIndex].payout = parseFloat(val);
        setBonusPayout(bonus.name, parseFloat(val)); // <-- update sidebar
        if (payoutIndex < payoutBonuses.length - 1) {
          payoutIndex++;
          renderPayoutStep();
        } else {
          document.body.removeChild(payoutPanel);
          payoutPanel = null;
          // Optionally: display results or update sidebar
          // Example: console.log(payoutBonuses);
        }
      }
    };

    payoutPanel.querySelector('#cancel-payout-panel').onclick = function () {
      document.body.removeChild(payoutPanel);
      payoutPanel = null;
      // Optionally: show the BH panel again
      const bhPanel = document.getElementById('middle-panel');
      if (bhPanel) bhPanel.style.display = 'flex';
    };
  }

  // Initial render on page load
  document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    renderBonusHuntResults();
  });

  // --- Carousel Animation for Bonus List ---
  function setupBonusListCarousel() {
    const bonusListUl = document.querySelector('.bonus-list ul');
    if (!bonusListUl) return;
    // Remove previous clones if any
    Array.from(bonusListUl.querySelectorAll('.carousel-clone')).forEach(clone => clone.remove());

    // Only clone the original items (not clones)
    const items = Array.from(bonusListUl.children).filter(li => !li.classList.contains('carousel-clone'));
    if (items.length === 0) return;

    // Clone all original li elements and append for seamless loop
    items.forEach(li => {
      const clone = li.cloneNode(true);
      clone.classList.add('carousel-clone');
      bonusListUl.appendChild(clone);
    });
  }

  function updateBonusListCarousel() {
    setupBonusListCarousel();
    const bonusListUl = document.querySelector('.bonus-list ul');
    if (!bonusListUl) return;
    // Only count original items (not clones)
    const itemCount = Array.from(bonusListUl.children).filter(li => !li.classList.contains('carousel-clone')).length;
    // Animation duration: 2s per item, min 6s, then double for 0.5x speed
    const duration = Math.max(6, itemCount * 2) * 2;
    bonusListUl.style.animationDuration = duration + 's';
  }

  // Patch add-to-list logic to update carousel
  if (betSizeInput && slotNameInput && bonusListUl) {
    betSizeInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // ...existing code...
        bonusListUl.appendChild(li);
        updateBonusListCarousel();
      }
    });
  }

  // On page load, setup carousel if there are items
  document.addEventListener('DOMContentLoaded', () => {
    updateBonusListCarousel();
  });

  // --- Navbar Image Switcher ---
  const navbarImages = [
    {
      src: "https://fotos.web.sapo.io/i/B461700fe/21422125_3vteV.jpeg",
      alt: "Portugal"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStr2NVVKx3knQM8G6xjqAge6UAfV9JK_d1uw&s",
      alt: "Espanha"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK80UXc3cYsAFngfk9Av5dv8T29mKcR4vlEQ&s",
      alt: "França"
    }, 
    {
      src: "https://todabandeira.com.br/wp-content/uploads/2024/04/bandeira-da-belgica.jpg",
      alt: "Belgica"
    },
    {
      src: "https://todabandeira.com.br/wp-content/uploads/2025/07/bandeiras-de-paises-da-europa-33.jpg",
      alt: "Holanda"
    },
        {
      src: "https://todabandeira.com.br/wp-content/uploads/2025/07/bandeiras-de-paises-da-europa-47.jpg",
      alt: "Inglaterra"
    },
    {
      src: "https://todabandeira.com.br/wp-content/uploads/2025/07/bandeiras-de-paises-da-europa-48.jpg",
      alt: "Escocia"
    },
    {
      src: "https://todabandeira.com.br/wp-content/uploads/2023/08/bandeira-da-alemanha.jpg",
      alt: "Alemanha"
    }, 
    {
      src: "https://todabandeira.com.br/wp-content/uploads/2025/07/bandeiras-de-paises-da-europa-27.jpg",
      alt: "Luxemburgo"
    }
  ];
  let navbarImageIndex = 0;
  const navbarImg = document.getElementById('navbar-image-switcher');
  const navbarLink = document.getElementById('navbar-image-link');
  function updateNavbarImage() {
    if (!navbarImg || !navbarLink) return;
    navbarImg.src = navbarImages[navbarImageIndex].src;
    navbarImg.alt = navbarImages[navbarImageIndex].alt;
    navbarLink.href = navbarImages[navbarImageIndex].link;
  }
  if (navbarImg && navbarLink) {
    navbarImg.addEventListener('click', (e) => {
      e.preventDefault();
      navbarImageIndex = (navbarImageIndex + 1) % navbarImages.length;
      updateNavbarImage();
    });
    // Also allow clicking the link to cycle (optional)
    navbarLink.addEventListener('click', (e) => {
      // Only cycle if clicking the image, not the link itself
      if (e.target === navbarImg) return;
      e.preventDefault();
      navbarImageIndex = (navbarImageIndex + 1) % navbarImages.length;
      updateNavbarImage();
    });
    updateNavbarImage();
  }

  // --- Slot Highlight Card (Bottom Left) ---
  let slotHighlightCard = null;
  function updateSlotHighlightCard() {
    // Only show if BO is active
    const boBtn = document.getElementById('bo-btn');
    if (!boBtn || !boBtn.classList.contains('active')) {
      if (slotHighlightCard) {
        slotHighlightCard.remove();
        slotHighlightCard = null;
      }
      return;
    }

    // Remove old card if present
    if (slotHighlightCard) {
      slotHighlightCard.remove();
      slotHighlightCard = null;
    }

    // Get bonus list data (with payouts)
    const bonusListUl = document.querySelector('.bonus-list ul');
    if (!bonusListUl) return;
    const bonuses = Array.from(bonusListUl.children)
      .filter(li => !li.classList.contains('carousel-clone'))
      .map(li => {
        const spans = li.querySelectorAll('span');
        return {
          name: spans[0] ? spans[0].textContent : '',
          bet: spans[1] ? parseFloat(spans[1].textContent.replace(/[^\d.]/g, '')) : 0,
          payout: li.dataset && li.dataset.payout ? parseFloat(li.dataset.payout) : null,
          img: li.querySelector('img') ? li.querySelector('img').src : DEFAULT_SLOT_IMAGE
        };
      });

    if (!bonuses.length) return;

    // Find best (highest payout), worst (lowest payout), and current (first with payout==null)
    let best = null, worst = null, current = null;
    const bonusesWithPayout = bonuses.filter(b => typeof b.payout === 'number' && !isNaN(b.payout));
    if (bonusesWithPayout.length) {
      best = bonusesWithPayout.reduce((a, b) => (b.payout > a.payout ? b : a), bonusesWithPayout[0]);
      worst = bonusesWithPayout.reduce((a, b) => (b.payout < a.payout ? b : a), bonusesWithPayout[0]);
    }
    current = bonuses.find(b => b.payout === null || isNaN(b.payout));

    // Always show 3 slots: left=best, middle=current, right=worst (even if some are the same)
    const slotsToShow = [
      best ? { ...best, type: 'best' } : null,
      current ? { ...current, type: 'current' } : null,
      worst ? { ...worst, type: 'worst' } : null
    ];

    // If all are null, don't show
    if (!slotsToShow[0] && !slotsToShow[1] && !slotsToShow[2]) return;

    // Card container (bigger, with gradient background)
    slotHighlightCard = document.createElement('div');
    slotHighlightCard.style.position = 'fixed';
    slotHighlightCard.style.left = '24px';
    slotHighlightCard.style.bottom = '8px';
    slotHighlightCard.style.width = '540px';
    slotHighlightCard.style.height = '210px';
    slotHighlightCard.style.background = 'linear-gradient(120deg, #23243a 0%, #3a2d4a 60%, #1a1c2e 100%)';
    slotHighlightCard.style.borderRadius = '32px';
    slotHighlightCard.style.boxShadow = '0 12px 48px 0 rgba(0,0,0,0.28), 0 2px 0 0 #00e1ff inset';
    slotHighlightCard.style.display = 'flex';
    slotHighlightCard.style.alignItems = 'center';
    slotHighlightCard.style.justifyContent = 'space-between';
    slotHighlightCard.style.zIndex = '1000';
    slotHighlightCard.style.padding = '0 38px';
    slotHighlightCard.style.gap = '0px';
    slotHighlightCard.style.border = '2.5px solid #23243a';
    slotHighlightCard.style.backdropFilter = 'blur(12px)';
    slotHighlightCard.style.transition = 'box-shadow 0.3s, background 0.3s, border-radius 0.3s';

    // Pill colors
    const pillColors = {
      best: '#00ff7a',
      current: '#ffe600',
      worst: '#ff3b7a'
    };
    const pillLabels = {
      best: 'Best',
      current: 'Current',
      worst: 'Worst'
    };

    // Helper to render a slot card (empty if slot is null)
    function renderSlot(slot, type) {
      // Outer container (bigger)
      const card = document.createElement('div');
      card.style.position = 'relative';
      card.style.width = '160px';
      card.style.height = '190px';
      card.style.borderRadius = '28px';
      card.style.overflow = 'hidden';
      card.style.background = '#23242a';
      card.style.display = 'flex';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'center';
      card.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.18)';
      card.style.margin = '0 8px';

      if (!slot) {
        // Empty placeholder
        card.style.opacity = '0.25';
        card.style.background = '#444';
        return card;
      }

      // Slot image fills card
      const img = document.createElement('img');
      img.src = slot.img;
      img.alt = slot.name;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      img.style.borderRadius = '28px';
      card.appendChild(img);

      // Top pill (type) - move higher (closer to top)
      const topPill = document.createElement('div');
      topPill.textContent = pillLabels[type];
      topPill.style.position = 'absolute';
      topPill.style.top = '3px'; // was 14px, now much closer to top
      topPill.style.left = '50%';
      topPill.style.transform = 'translateX(-50%)';
      topPill.style.background = pillColors[type];
      topPill.style.color = '#23242a';
      topPill.style.fontWeight = 'bold';
      topPill.style.fontSize = '1.0rem';
      topPill.style.padding = '6px 26px';
      topPill.style.borderRadius = '999px';
      topPill.style.boxShadow = '0 1px 8px 0 rgba(0,0,0,0.13)';
      topPill.style.letterSpacing = '0.5px';
      card.appendChild(topPill);

      // Bottom pill (payout)
      const payoutPill = document.createElement('div');
      payoutPill.textContent = typeof slot.payout === 'number' && !isNaN(slot.payout)
        ? `€${slot.payout.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`
        : '--';
      payoutPill.style.position = 'absolute';
      payoutPill.style.bottom = '3px';
      payoutPill.style.left = '50%';
      payoutPill.style.transform = 'translateX(-50%)';
      payoutPill.style.background = '#f3f4f6';
      payoutPill.style.color = '#23242a';
      payoutPill.style.fontWeight = 'bold';
      payoutPill.style.fontSize = '1.0rem';
      payoutPill.style.padding = '7px 22px';
      payoutPill.style.borderRadius = '999px';
      payoutPill.style.boxShadow = '0 1px 8px 0 rgba(0,0,0,0.13)';
      payoutPill.style.letterSpacing = '0.5px';
      card.appendChild(payoutPill);

      return card;
    }

    // Render left (best), middle (current), right (worst)
    slotHighlightCard.appendChild(renderSlot(slotsToShow[0], 'best'));
    slotHighlightCard.appendChild(renderSlot(slotsToShow[1], 'current'));
    slotHighlightCard.appendChild(renderSlot(slotsToShow[2], 'worst'));

    document.body.appendChild(slotHighlightCard);
  }

  // Call updateSlotHighlightCard whenever the bonus list or payouts change
  function patchSlotHighlightCardUpdates() {
    // After adding a bonus
    if (betSizeInput && slotNameInput && bonusListUl) {
      betSizeInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          setTimeout(updateSlotHighlightCard, 50);
        }
      });
    }
    // After payout is set
    const origSetBonusPayout = setBonusPayout;
    setBonusPayout = function(slotName, payout) {
      origSetBonusPayout(slotName, payout);
      setTimeout(updateSlotHighlightCard, 50);
    };
    // On page load
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(updateSlotHighlightCard, 100);
    });
    // Also update when BO button is toggled
    const boBtn = document.getElementById('bo-btn');
    if (boBtn) {
      boBtn.addEventListener('click', () => {
        setTimeout(updateSlotHighlightCard, 50);
      });
    }
  }
  patchSlotHighlightCardUpdates();

  // --- Edit Slots Panel Logic ---
  const editSlotsBtn = document.getElementById('edit-slots-btn');
  let editSlotsPanel = null;

  function getBonusListUl() {
    return document.querySelector('.bonus-list ul');
  }

  function showEditSlotsPanel() {
    if (editSlotsPanel) return;
    const bonusListUl = getBonusListUl();
    if (!bonusListUl) return;
    // Only original items (not clones)
    const bonuses = Array.from(bonusListUl.children)
      .filter(li => !li.classList.contains('carousel-clone'))
      .map(li => {
        const spans = li.querySelectorAll('span');
        return {
          li,
          name: spans[0] ? spans[0].textContent : '',
          bet: spans[1] ? parseFloat(spans[1].textContent.replace(/[^\d.]/g, '')) : 0,
          img: li.querySelector('img') ? li.querySelector('img').src : ''
        };
      });

    // Create panel
    editSlotsPanel = document.createElement('div');
    editSlotsPanel.className = 'middle-panel';
    editSlotsPanel.style.display = 'flex';
    editSlotsPanel.style.flexDirection = 'column';
    editSlotsPanel.style.alignItems = 'center';
    editSlotsPanel.style.position = 'fixed';
    editSlotsPanel.style.top = '50%';
    editSlotsPanel.style.left = '50%';
    editSlotsPanel.style.transform = 'translate(-50%, -50%)';
    editSlotsPanel.style.zIndex = '1002';
    editSlotsPanel.style.background = 'rgba(36, 38, 48, 0.97)';
    editSlotsPanel.style.borderRadius = '24px';
    editSlotsPanel.style.boxShadow = '0 6px 24px 0 rgba(0,0,0,0.18)';
    editSlotsPanel.style.padding = '2rem 1.5rem';
    editSlotsPanel.style.width = '440px';
    editSlotsPanel.style.maxHeight = '480px';
    editSlotsPanel.style.overflowY = 'auto';

    // Build slot list with bin icon
    let html = `
      <div class="middle-panel-title" style="margin-bottom:1.2rem;">Edit Slots</div>
      <form id="edit-slots-form" style="width:100%;">
        <div id="edit-slots-list" style="display:flex;flex-direction:column;gap:1.1rem;">
    `;
    bonuses.forEach((bonus, idx) => {
      html += `
        <div class="edit-slot-row" style="display:flex;align-items:center;gap:0.7rem;" data-idx="${idx}">
          <img src="${bonus.img}" alt="" style="width:38px;height:38px;object-fit:cover;border-radius:8px;box-shadow:0 1px 4px 0 rgba(0,0,0,0.13);">
          <input type="text" class="middle-input" style="width:120px;" value="${bonus.name.replace(/"/g, '&quot;')}" data-idx="${idx}" data-type="name" />
          <input type="number" class="middle-input" style="width:90px;" value="${bonus.bet}" min="0" step="any" data-idx="${idx}" data-type="bet" />
          <button type="button" class="delete-slot-btn" title="Delete slot" style="background:none;border:none;cursor:pointer;padding:0 0.5rem;">
            <span style="font-size:1.5rem;color:#ff5c5c;">🗑️</span>
          </button>
        </div>
      `;
    });
    html += `
        </div>
        <div style="display:flex;gap:1rem;justify-content:center;margin-top:2.2rem;">
          <button type="submit" class="middle-btn small-btn" style="width:120px;">Save</button>
          <button type="button" id="close-edit-slots-btn" class="middle-btn small-btn" style="width:120px;background:#ff5c5c;color:#fff;">Close</button>
        </div>
      </form>
    `;
    editSlotsPanel.innerHTML = html;
    document.body.appendChild(editSlotsPanel);

    // Delete slot logic
    editSlotsPanel.querySelectorAll('.delete-slot-btn').forEach((btn, i) => {
      btn.addEventListener('click', function() {
        // Remove from DOM
        const row = btn.closest('.edit-slot-row');
        if (row) row.remove();
        // Remove from bonus list UI
        if (bonuses[i] && bonuses[i].li && bonuses[i].li.parentNode) {
          bonuses[i].li.parentNode.removeChild(bonuses[i].li);
        }
        renderBonusHuntResults();
        updateBonusListCarousel();
        setTimeout(updateSlotHighlightCard, 50);
      });
    });

    // Save handler
    editSlotsPanel.querySelector('#edit-slots-form').onsubmit = function(e) {
      e.preventDefault();
      // Get all input values
      const nameInputs = editSlotsPanel.querySelectorAll('input[data-type="name"]');
      const betInputs = editSlotsPanel.querySelectorAll('input[data-type="bet"]');
      nameInputs.forEach((input, i) => {
        const idx = parseInt(input.dataset.idx, 10);
        // Only update if the row still exists (not deleted)
        const li = bonuses[idx] && bonuses[idx].li && document.body.contains(bonuses[idx].li) ? bonuses[idx].li : null;
        if (li) {
          const spans = li.querySelectorAll('span');
          if (spans[0]) spans[0].textContent = input.value;
        }
      });
      betInputs.forEach((input, i) => {
        const idx = parseInt(input.dataset.idx, 10);
        const li = bonuses[idx] && bonuses[idx].li && document.body.contains(bonuses[idx].li) ? bonuses[idx].li : null;
        if (li) {
          const spans = li.querySelectorAll('span');
          if (spans[1]) spans[1].textContent = '€' + (parseFloat(input.value) || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
        }
      });
      renderBonusHuntResults();
      updateBonusListCarousel();
      setTimeout(updateSlotHighlightCard, 50);
      document.body.removeChild(editSlotsPanel);
      editSlotsPanel = null;
    };

    // Close handler
    editSlotsPanel.querySelector('#close-edit-slots-btn').onclick = function() {
      document.body.removeChild(editSlotsPanel);
      editSlotsPanel = null;
    };
  }

  if (editSlotsBtn) {
    editSlotsBtn.addEventListener('click', () => {
      showEditSlotsPanel();
    });
  }

  // --- Random Slot Picker Functionality ---
  let currentRandomSlot = null;
  let isShuffling = false;

  function getFilteredSlots() {
    const checkedProviders = Array.from(document.querySelectorAll('.provider-checkbox input:checked'))
      .map(cb => cb.value);
    
    return slotDatabase.filter(slot => checkedProviders.includes(slot.provider));
  }

  function getRandomSlot() {
    const filteredSlots = getFilteredSlots();
    if (filteredSlots.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filteredSlots.length);
    return filteredSlots[randomIndex];
  }

  function updateRandomSlotDisplay(slot) {
    const slotCard = document.getElementById('random-slot-card');
    const slotImage = slotCard.querySelector('.slot-image');
    const slotName = slotCard.querySelector('.slot-name');
    const slotProvider = slotCard.querySelector('.slot-provider');

    if (slot) {
      slotImage.src = slot.image;
      slotImage.alt = slot.name;
      slotName.textContent = slot.name;
      slotProvider.textContent = slot.provider;
      currentRandomSlot = slot;
    } else {
      slotImage.src = 'https://i.imgur.com/8E3ucNx.png';
      slotName.textContent = 'No slots available';
      slotProvider.textContent = 'Check filter settings';
      currentRandomSlot = null;
    }
  }

  function shuffleSlot() {
    if (isShuffling) return;
    
    isShuffling = true;
    const slotCard = document.getElementById('random-slot-card');
    const shuffleBtn = document.getElementById('shuffle-slot-btn');
    
    slotCard.classList.add('shuffling');
    shuffleBtn.textContent = '🎲 Shuffling...';
    shuffleBtn.disabled = true;

    // Shuffle multiple times for effect
    let shuffleCount = 0;
    const maxShuffles = 8;
    
    const shuffleInterval = setInterval(() => {
      const randomSlot = getRandomSlot();
      if (randomSlot) {
        updateRandomSlotDisplay(randomSlot);
      }
      
      shuffleCount++;
      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);
        
        setTimeout(() => {
          slotCard.classList.remove('shuffling');
          shuffleBtn.innerHTML = '<span class="middle-icon">🎲</span><span>Shuffle Slot</span>';
          shuffleBtn.disabled = false;
          isShuffling = false;
        }, 300);
      }
    }, 100);
  }

  function useRandomSlot() {
    if (!currentRandomSlot) return;
    
    // Fill the slot name input in the BH panel
    const slotNameInput = document.getElementById('slot-name-input');
    if (slotNameInput) {
      slotNameInput.value = currentRandomSlot.name;
      slotNameInput.dispatchEvent(new Event('input'));
    }
    
    // Switch to BH panel
    const bhBtn = document.getElementById('bh-btn');
    const randomSlotBtn = document.getElementById('random-slot-btn');
    const middlePanel = document.getElementById('middle-panel');
    const randomSlotPanel = document.getElementById('random-slot-panel');
    
    if (bhBtn && middlePanel) {
      // Hide random slot panel
      randomSlotPanel.style.display = 'none';
      randomSlotPanelVisible = false;
      randomSlotBtn.classList.remove('active');
      
      // Show BH panel
      middlePanel.style.display = 'flex';
      panelVisible = true;
      bhBtn.classList.add('active');
      
      // Focus bet size input
      const betSizeInput = document.getElementById('bet-size-input');
      if (betSizeInput) {
        setTimeout(() => betSizeInput.focus(), 100);
      }
      
      updateInfoPanelVisibility();
    }
  }

  // Initialize random slot functionality
  const shuffleBtn = document.getElementById('shuffle-slot-btn');
  const useSlotBtn = document.getElementById('use-random-slot-btn');

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', shuffleSlot);
  }

  if (useSlotBtn) {
    useSlotBtn.addEventListener('click', useRandomSlot);
  }

  // Provider filter change handler
  document.addEventListener('change', (e) => {
    if (e.target.matches('.provider-checkbox input')) {
      // Update available slots count or show message if no slots available
      const filteredSlots = getFilteredSlots();
      if (filteredSlots.length === 0 && currentRandomSlot) {
        updateRandomSlotDisplay(null);
      }
    }
  });

  // Initialize with a random slot
  document.addEventListener('DOMContentLoaded', () => {
    const initialSlot = getRandomSlot();
    updateRandomSlotDisplay(initialSlot);
  });

  // Function to show selected slot in right-side display
  function showSelectedSlot(slot) {
    const selectedSlotDisplay = document.getElementById('selected-slot-display');
    const selectedSlotImage = document.getElementById('selected-slot-image');
    
    if (selectedSlotDisplay && selectedSlotImage && slot) {
      selectedSlotImage.src = slot.image || DEFAULT_SLOT_IMAGE;
      selectedSlotImage.alt = slot.name;
      
      selectedSlotDisplay.style.display = 'flex';
      selectedSlotDisplay.classList.add('visible');
    }
  }

  // Function to hide selected slot display
  function hideSelectedSlot() {
    const selectedSlotDisplay = document.getElementById('selected-slot-display');
    if (selectedSlotDisplay) {
      selectedSlotDisplay.style.display = 'none';
      selectedSlotDisplay.classList.remove('visible');
    }
  }

  // Show selected slot when slot name input changes
  if (slotNameInput) {
    slotNameInput.addEventListener('input', function() {
      const slotName = slotNameInput.value.trim();
      if (slotName) {
        const slot = slotDatabase.find(s => s.name.toLowerCase() === slotName.toLowerCase());
        if (slot) {
          showSelectedSlot(slot);
        } else {
          hideSelectedSlot();
        }
      } else {
        hideSelectedSlot();
      }
    });
    
    slotNameInput.addEventListener('blur', function() {
      // Keep the selected slot display visible even when input loses focus
      // Only hide when the input is actually empty
      const slotName = slotNameInput.value.trim();
      if (!slotName) {
        hideSelectedSlot();
      }
    });
  }

  // --- Tournament Bracket System ---
let tournamentData = {
  participants: [],
  phases: [],
  currentPhase: 0,
  currentMatchIndex: 0,
  isActive: false
};

function initializeTournament(participants) {
  tournamentData.participants = participants;
  tournamentData.isActive = true;
  tournamentData.currentPhase = 0;
  tournamentData.currentMatchIndex = 0;
  
  // Create tournament phases based on participant count
  if (participants.length <= 2) {
    // Direct final
    tournamentData.phases = [
      { name: 'Final', matches: createMatches(participants) }
    ];
  } else if (participants.length <= 4) {
    // Semi-finals and final
    tournamentData.phases = [
      { name: 'Semi-Finals', matches: createMatches(participants) },
      { name: 'Final', matches: [] }
    ];
  } else {
    // Quarter-finals, semi-finals, and final
    tournamentData.phases = [
      { name: 'Quarter-Finals', matches: createMatches(participants) },
      { name: 'Semi-Finals', matches: [] },
      { name: 'Final', matches: [] }
    ];
  }
  
  showTournamentBracket();
  updateTournamentDisplay();
}

function createMatches(participants) {
  const matches = [];
  for (let i = 0; i < participants.length; i += 2) {
    if (i + 1 < participants.length) {
      matches.push({
        participant1: participants[i],
        participant2: participants[i + 1],
        winner: null
      });
    } else {
      // Bye - participant automatically advances
      matches.push({
        participant1: participants[i],
        participant2: null,
        winner: participants[i]
      });
    }
  }
  return matches;
}

function showTournamentBracket() {
  const tournamentBracket = document.getElementById('tournament-bracket');
  const infoPanel = document.querySelector('.info-panel');
  
  if (tournamentBracket) {
    tournamentBracket.style.display = 'block';
    
    // Hide tournament panel and show right sidebar
    const tournamentPanel = document.getElementById('tournament-panel');
    if (tournamentPanel) {
      tournamentPanel.style.display = 'none';
    }
    
    // Hide components we don't need during tournament
    const bonusHuntResults = document.getElementById('bonus-hunt-results');
    const bonusList = document.querySelector('.info-section.bonus-list');
    const discordSection = document.querySelector('.info-section.discord');
    const moneyRowMain = document.querySelector('.money-row-main');
    
    if (bonusHuntResults) bonusHuntResults.style.display = 'none';
    if (bonusList) bonusList.style.display = 'none';
    if (discordSection) discordSection.style.display = 'none';
    if (moneyRowMain) moneyRowMain.style.display = 'none';
    
    // Make sure info panel is visible
    if (infoPanel) {
      infoPanel.classList.add('info-panel--visible');
    }
    
    // Show tournament control panel
    showTournamentControlPanel();
  }
}

function showTournamentControlPanel() {
  // Remove existing control panel if any
  const existingPanel = document.getElementById('tournament-control-panel');
  if (existingPanel) {
    existingPanel.remove();
  }
  
  // Create new control panel (no backdrop)
  const controlPanel = document.createElement('div');
  controlPanel.id = 'tournament-control-panel';
  controlPanel.className = 'tournament-control-panel';
  
  // Initialize current match tracker
  if (!tournamentData.currentMatchIndex) {
    tournamentData.currentMatchIndex = 0;
  }
  
  // Add to DOM immediately
  document.body.appendChild(controlPanel);
  
  updateTournamentControlPanel();
}

function updateTournamentControlPanel() {
  const controlPanel = document.getElementById('tournament-control-panel');
  if (!controlPanel) return;
  
  const currentPhaseData = tournamentData.phases[tournamentData.currentPhase];
  const currentMatch = currentPhaseData.matches[tournamentData.currentMatchIndex];
  
  if (!currentMatch) return;
  
  const matchNumber = tournamentData.currentMatchIndex + 1;
  const totalMatches = currentPhaseData.matches.length;
  
  controlPanel.innerHTML = `
    <div class="control-panel-title">Tournament Control</div>
    <div class="tournament-controls">
      <button class="tournament-nav-btn" id="prev-phase-btn" ${tournamentData.currentPhase === 0 ? 'disabled' : ''}>◀</button>
      <span class="phase-indicator" id="phase-indicator">${tournamentData.currentPhase + 1}/${tournamentData.phases.length}</span>
      <button class="tournament-nav-btn" id="next-phase-btn" ${tournamentData.currentPhase === tournamentData.phases.length - 1 ? 'disabled' : ''}>▶</button>
    </div>
    
    <div class="match-control-section">
      <div class="match-title">${currentPhaseData.name} - Match ${matchNumber}/${totalMatches}</div>
      
      <div class="match-participants-control">
        <div class="participant-control">
          <div class="participant-name">${currentMatch.participant1 ? currentMatch.participant1.player : 'BYE'}</div>
          <div class="participant-slot">${currentMatch.participant1 ? currentMatch.participant1.slot : '-'}</div>
          ${currentMatch.participant1 ? `
            <div class="betting-inputs">
              <input type="number" class="bet-input" id="bet1" placeholder="Bet" min="0" step="0.01" />
              <input type="number" class="payout-input" id="payout1" placeholder="Payout" min="0" step="0.01" />
              <div class="multiplier" id="multiplier1">x0.00</div>
            </div>
          ` : ''}
        </div>
        
        <div class="vs-separator">VS</div>
        
        <div class="participant-control">
          <div class="participant-name">${currentMatch.participant2 ? currentMatch.participant2.player : 'BYE'}</div>
          <div class="participant-slot">${currentMatch.participant2 ? currentMatch.participant2.slot : '-'}</div>
          ${currentMatch.participant2 ? `
            <div class="betting-inputs">
              <input type="number" class="bet-input" id="bet2" placeholder="Bet" min="0" step="0.01" />
              <input type="number" class="payout-input" id="payout2" placeholder="Payout" min="0" step="0.01" />
              <div class="multiplier" id="multiplier2">x0.00</div>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="match-controls">
        <button class="match-nav-btn" id="prev-match-btn" ${tournamentData.currentMatchIndex === 0 ? 'disabled' : ''}>← Previous Match</button>
        <button class="determine-winner-btn" id="determine-winner-btn">Determine Winner</button>
        <button class="match-nav-btn" id="next-match-btn" ${tournamentData.currentMatchIndex === totalMatches - 1 ? 'disabled' : ''}>Next Match →</button>
      </div>
      
      ${currentMatch.winner ? `
        <div class="winner-display">
          <div class="winner-crown">👑</div>
          <div class="winner-text">Winner: ${currentMatch.winner.player}</div>
        </div>
      ` : ''}
    </div>
    
    <div class="control-panel-actions">
      <button class="control-panel-btn" id="advance-winners-btn">
        <span>⚡</span>
        <span>Advance Winners</span>
      </button>
      <button class="control-panel-btn danger" id="end-tournament-btn">
        <span>🚪</span>
        <span>End Tournament</span>
      </button>
    </div>
  `;
  
  // Make sure the panel is visible
  controlPanel.classList.add('active');
  
  // Add event listeners
  addTournamentControlListeners();
}

function addTournamentControlListeners() {
  // Betting input listeners
  const bet1 = document.getElementById('bet1');
  const payout1 = document.getElementById('payout1');
  const bet2 = document.getElementById('bet2');
  const payout2 = document.getElementById('payout2');
  const multiplier1 = document.getElementById('multiplier1');
  const multiplier2 = document.getElementById('multiplier2');
  
  function updateMultiplier(betInput, payoutInput, multiplierDisplay) {
    const bet = parseFloat(betInput.value) || 0;
    const payout = parseFloat(payoutInput.value) || 0;
    const multiplier = bet > 0 ? (payout / bet) : 0;
    multiplierDisplay.textContent = `x${multiplier.toFixed(2)}`;
  }
  
  if (bet1 && payout1 && multiplier1) {
    bet1.addEventListener('input', () => updateMultiplier(bet1, payout1, multiplier1));
    payout1.addEventListener('input', () => updateMultiplier(bet1, payout1, multiplier1));
  }
  
  if (bet2 && payout2 && multiplier2) {
    bet2.addEventListener('input', () => updateMultiplier(bet2, payout2, multiplier2));
    payout2.addEventListener('input', () => updateMultiplier(bet2, payout2, multiplier2));
  }
  
  // Match navigation
  const prevMatchBtn = document.getElementById('prev-match-btn');
  const nextMatchBtn = document.getElementById('next-match-btn');
  
  if (prevMatchBtn) {
    prevMatchBtn.addEventListener('click', () => {
      if (tournamentData.currentMatchIndex > 0) {
        tournamentData.currentMatchIndex--;
        updateTournamentControlPanel();
      }
    });
  }
  
  if (nextMatchBtn) {
    nextMatchBtn.addEventListener('click', () => {
      const currentPhaseData = tournamentData.phases[tournamentData.currentPhase];
      if (tournamentData.currentMatchIndex < currentPhaseData.matches.length - 1) {
        tournamentData.currentMatchIndex++;
        updateTournamentControlPanel();
      }
    });
  }
  
  // Determine winner
  const determineWinnerBtn = document.getElementById('determine-winner-btn');
  if (determineWinnerBtn) {
    determineWinnerBtn.addEventListener('click', () => {
      const currentPhaseData = tournamentData.phases[tournamentData.currentPhase];
      const currentMatch = currentPhaseData.matches[tournamentData.currentMatchIndex];
      
      if (!currentMatch.participant1 || !currentMatch.participant2) {
        // Handle BYE case
        currentMatch.winner = currentMatch.participant1 || currentMatch.participant2;
        updateTournamentControlPanel();
        updateTournamentDisplay();
        return;
      }
      
      const bet1 = parseFloat(document.getElementById('bet1')?.value) || 0;
      const payout1 = parseFloat(document.getElementById('payout1')?.value) || 0;
      const bet2 = parseFloat(document.getElementById('bet2')?.value) ||  0;
      const payout2 = parseFloat(document.getElementById('payout2')?.value) || 0;
      
      if (bet1 <= 0 || bet2 <= 0) {
        alert('Please enter valid bet amounts for both players');
        return;
      }
      
      const multiplier1 = payout1 / bet1;
      const multiplier2 = payout2 / bet2;
      
      // Winner is the one with higher multiplier
      if (multiplier1 > multiplier2) {
        currentMatch.winner = currentMatch.participant1;
      } else if (multiplier2 > multiplier1) {
        currentMatch.winner = currentMatch.participant2;
      } else {
        alert('It\'s a tie! Please adjust the payouts.');
        return;
      }
      
      updateTournamentControlPanel();
      updateTournamentDisplay();
    });
  }
  
  // Phase navigation
  const prevPhaseBtn = document.getElementById('prev-phase-btn');
  const nextPhaseBtn = document.getElementById('next-phase-btn');
  
  if (prevPhaseBtn) {
    prevPhaseBtn.addEventListener('click', () => {
      if (tournamentData.currentPhase > 0) {
        tournamentData.currentPhase--;
        tournamentData.currentMatchIndex = 0;
        updateTournamentControlPanel();
        updateTournamentDisplay();
      }
    });
  }
  
  if (nextPhaseBtn) {
    nextPhaseBtn.addEventListener('click', () => {
      if (tournamentData.currentPhase < tournamentData.phases.length - 1) {
        tournamentData.currentPhase++;
        tournamentData.currentMatchIndex = 0;
        updateTournamentControlPanel();
        updateTournamentDisplay();
      }
    });
  }
  
  // Main actions
  const advanceBtn = document.getElementById('advance-winners-btn');
  const endBtn = document.getElementById('end-tournament-btn');
  
  if (advanceBtn) {
    advanceBtn.addEventListener('click', advanceWinners);
  }
  
  if (endBtn) {
    endBtn.addEventListener('click', endTournament);
  }
}

function hideTournamentControlPanel() {
  const controlPanel = document.getElementById('tournament-control-panel');
  
  if (controlPanel) {
    controlPanel.classList.remove('active');
    setTimeout(() => {
      controlPanel.remove();
    }, 400);
  }
}

function updateTournamentDisplay() {
  if (!tournamentData.isActive) return;
  
  const phaseTitle = document.getElementById('tournament-phase-title');
  const phaseIndicator = document.getElementById('phase-indicator');
  const bracketContent = document.getElementById('tournament-bracket-content');
  const prevBtn = document.getElementById('prev-phase-btn');
  const nextBtn = document.getElementById('next-phase-btn');
  
  const currentPhaseData = tournamentData.phases[tournamentData.currentPhase];
  
  if (phaseTitle) {
    phaseTitle.textContent = `Tournament - ${currentPhaseData.name}`;
  }
  
  if (phaseIndicator) {
    phaseIndicator.textContent = `${tournamentData.currentPhase + 1}/${tournamentData.phases.length}`;
  }
  
  if (prevBtn) {
    prevBtn.disabled = tournamentData.currentPhase === 0;
  }
  
  if (nextBtn) {
    nextBtn.disabled = tournamentData.currentPhase === tournamentData.phases.length - 1;
  }
  
  // Render current phase matches
  if (bracketContent) {
    if (currentPhaseData.name === 'Final' && currentPhaseData.matches.length === 1 && currentPhaseData.matches[0].winner) {
      // Show champion
      const winner = currentPhaseData.matches[0].winner;
      bracketContent.innerHTML = `
        <div class="tournament-champion">
          <div class="champion-crown">👑</div>
          <div class="champion-name">${winner.player}</div>
          <div class="champion-slot">${winner.slot}</div>
        </div>
      `;
    } else {
      bracketContent.innerHTML = '';
      currentPhaseData.matches.forEach((match, index) => {
        const matchElement = createMatchElement(match, index, currentPhaseData.name === 'Final');
        bracketContent.appendChild(matchElement);
      });
    }
  }
}

function createMatchElement(match, index, isFinal = false) {
  const matchDiv = document.createElement('div');
  matchDiv.className = `tournament-match ${isFinal ? 'final-match' : ''}`;
  
  const matchNumber = index + 1;
  const phasePrefix = isFinal ? 'Final' : `Match ${matchNumber}`;
  
  let participant1Html = '';
  let participant2Html = '';
  
  if (match.participant1) {
    participant1Html = `
      <div class="match-participant ${match.winner === match.participant1 ? 'selected-winner' : ''} ${match.winner && match.winner !== match.participant1 ? 'eliminated' : ''}" 
           data-participant="1" data-match="${index}">
        <div class="participant-info">
          <div class="participant-name">${match.participant1.player}</div>
          <img src="${getSlotImage(match.participant1.slot)}" alt="${match.participant1.slot}" class="participant-slot-image" onerror="this.src='${DEFAULT_SLOT_IMAGE}'" />
        </div>
        <div class="winner-indicator">✓</div>
      </div>
    `;
  }
  
  if (match.participant2) {
    participant2Html = `
      <div class="match-participant ${match.winner === match.participant2 ? 'selected-winner' : ''} ${match.winner && match.winner !== match.participant2 ? 'eliminated' : ''}" 
           data-participant="2" data-match="${index}">
        <div class="participant-info">
          <div class="participant-name">${match.participant2.player}</div>
          <img src="${getSlotImage(match.participant2.slot)}" alt="${match.participant2.slot}" class="participant-slot-image" onerror="this.src='${DEFAULT_SLOT_IMAGE}'" />
        </div>
        <div class="winner-indicator">✓</div>
      </div>
    `;
  } else if (match.participant1) {
    // Bye match
    participant2Html = `
      <div class="match-participant eliminated" style="opacity: 0.3; cursor: default;">
        <div class="participant-info">
          <div class="participant-name">BYE</div>
          <div class="participant-slot">-</div>
        </div>
      </div>
    `;
  }
  
  matchDiv.innerHTML = `
    <div class="match-header">${phasePrefix}</div>
    <div class="match-participants">
      ${participant1Html}
      <div class="match-vs-separator">
        <div class="vs-swords">⚔️</div>
        <div class="vs-text">VS</div>
      </div>
      ${participant2Html}
    </div>
  `;
  
  // Add click handlers for selecting winners
  const participants = matchDiv.querySelectorAll('.match-participant:not(.eliminated)');
  participants.forEach(participant => {
    if (!participant.textContent.includes('BYE')) {
      participant.addEventListener('click', () => selectWinner(index, participant));
    }
  });
  
  return matchDiv;
}

function selectWinner(matchIndex, participantElement) {
  const currentPhaseData = tournamentData.phases[tournamentData.currentPhase];
  const match = currentPhaseData.matches[matchIndex];
  
  if (match.winner) return; // Winner already selected
  
  const participantNum = participantElement.dataset.participant;
  const winner = participantNum === '1' ? match.participant1 : match.participant2;
  
  if (winner) {
    match.winner = winner;
    updateTournamentDisplay();
  }
}

function advanceWinners() {
  const currentPhaseData = tournamentData.phases[tournamentData.currentPhase];
  
  // Check if all matches in current phase have winners
  const allMatchesComplete = currentPhaseData.matches.every(match => match.winner !== null);
  
  if (!allMatchesComplete) {
    // Visual feedback instead of alert
    const advanceBtn = document.getElementById('advance-winners-btn');
    if (advanceBtn) {
      const originalContent = advanceBtn.innerHTML;
      advanceBtn.innerHTML = '<span>⚠️</span><span>Select All Winners First!</span>';
      advanceBtn.style.background = 'linear-gradient(135deg, #ff5c5c 0%, #ff3b7a 100%)';
      setTimeout(() => {
        advanceBtn.innerHTML = originalContent;
        advanceBtn.style.background = 'linear-gradient(135deg, #00e1ff 0%, #9147ff 100%)';
      }, 2000);
    }
    return;
  }
  
  // If this is the final phase, tournament is complete
  if (tournamentData.currentPhase === tournamentData.phases.length - 1) {
    // Show completion feedback in button
    const advanceBtn = document.getElementById('advance-winners-btn');
    if (advanceBtn) {
      advanceBtn.innerHTML = '<span>🏆</span><span>Tournament Complete!</span>';
      advanceBtn.style.background = 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)';
      advanceBtn.style.color = '#1a1b23';
      advanceBtn.disabled = true;
    }
    return;
  }
  
  // Advance to next phase
  const nextPhaseIndex = tournamentData.currentPhase + 1;
  const winners = currentPhaseData.matches.map(match => match.winner).filter(winner => winner !== null);
  
  tournamentData.phases[nextPhaseIndex].matches = createMatches(winners);
  tournamentData.currentPhase = nextPhaseIndex;
  
  updateTournamentDisplay();
}

function endTournament() {
  tournamentData.isActive = false;
  tournamentData.participants = [];
  tournamentData.phases = [];
  tournamentData.currentPhase = 0;
  tournamentData.currentMatchIndex = 0;
  
  const tournamentBracket = document.getElementById('tournament-bracket');
  if (tournamentBracket) {
    tournamentBracket.style.display = 'none';
  }
  
  // Show back the components we hid during tournament
  const bonusHuntResults = document.getElementById('bonus-hunt-results');
  const bonusList = document.querySelector('.info-section.bonus-list');
  const discordSection = document.querySelector('.info-section.discord');
  const moneyRowMain = document.querySelector('.money-row-main');
  
  if (bonusHuntResults) bonusHuntResults.style.display = 'block';
  if (bonusList) bonusList.style.display = 'block';
  if (discordSection) discordSection.style.display = 'block';
  if (moneyRowMain) moneyRowMain.style.display = 'flex';
  
  // Hide tournament control panel
  hideTournamentControlPanel();
  
  // Show tournament panel again
  const tournamentPanel = document.getElementById('tournament-panel');
  if (tournamentPanel) {
    tournamentPanel.style.display = 'flex';
  }
  
  // Visual feedback
  const endBtn = document.getElementById('end-tournament-btn');
  if (endBtn) {
    const originalContent = endBtn.innerHTML;
    endBtn.innerHTML = '<span>✅</span><span>Tournament Ended</span>';
    setTimeout(() => {
      endBtn.innerHTML = originalContent;
    }, 1500);
  }
}

// Tournament button event handlers
const startTournamentBtn = document.getElementById('start-tournament-btn');
const resetTournamentBtn = document.getElementById('reset-tournament-btn');
const prevPhaseBtn = document.getElementById('prev-phase-btn');
const nextPhaseBtn = document.getElementById('next-phase-btn');

if (startTournamentBtn) {
  startTournamentBtn.addEventListener('click', () => {
    const playerInputs = document.querySelectorAll('.player-input');
    const slotInputs = document.querySelectorAll('.tournament-slot-input');
    
    let participants = [];
    
    for (let i = 0; i < playerInputs.length; i++) {
      const playerName = playerInputs[i].value.trim();
      const slotName = slotInputs[i].value.trim();
      
      if (playerName && slotName) {
        participants.push({
          player: playerName,
          slot: slotName,
          playerIndex: i + 1
        });
      }
    }
    
    if (participants.length < 2) {
      // Visual feedback instead of alert
      startTournamentBtn.textContent = 'Need at least 2 players!';
      startTournamentBtn.style.background = 'linear-gradient(135deg, #ff5c5c 0%, #ff3b7a 100%)';
      setTimeout(() => {
        startTournamentBtn.innerHTML = '<span class="middle-icon">🚀</span><span>Start Tournament</span>';
        startTournamentBtn.style.background = '';
      }, 2500);
      return;
    }
    
    // Visual feedback for successful start
    startTournamentBtn.textContent = `Starting with ${participants.length} players...`;
    startTournamentBtn.style.background = 'linear-gradient(135deg, #00ff7a 0%, #00e1ff 100%)';
    
    // Shuffle participants for randomness
    for (let i = participants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [participants[i], participants[j]] = [participants[j], participants[i]];
    }
    
    setTimeout(() => {
      initializeTournament(participants);
      startTournamentBtn.innerHTML = '<span class="middle-icon">🚀</span><span>Start Tournament</span>';
      startTournamentBtn.style.background = '';
    }, 1000);
  });
}

if (resetTournamentBtn) {
  resetTournamentBtn.addEventListener('click', () => {
    // Clear all player inputs
    document.querySelectorAll('.player-input').forEach(input => {
      input.value = '';
    });
    
    // Clear all slot inputs
    document.querySelectorAll('.tournament-slot-input').forEach(input => {
      input.value = '';
    });
    
    // End active tournament
    if (tournamentData.isActive) {
      endTournament();
    }
    
    // Visual feedback
    resetTournamentBtn.textContent = 'Reset Complete!';
    resetTournamentBtn.style.background = 'linear-gradient(135deg, #00ff7a 0%, #00e1ff 100%)';
    setTimeout(() => {
      resetTournamentBtn.innerHTML = '<span class="middle-icon">🔄</span><span>Reset Tournament</span>';
      resetTournamentBtn.style.background = '';
    }, 1500);
    
    console.log('Tournament reset');
  });
}

if (prevPhaseBtn) {
  prevPhaseBtn.addEventListener('click', () => {
    if (tournamentData.currentPhase > 0) {
      tournamentData.currentPhase--;
      updateTournamentDisplay();
    }
  });
}

if (nextPhaseBtn) {
  nextPhaseBtn.addEventListener('click', () => {
    if (tournamentData.currentPhase < tournamentData.phases.length - 1) {
      tournamentData.currentPhase++;
      updateTournamentDisplay();
    }
  });
}
});

// Set your fallback slot image here:
const DEFAULT_SLOT_IMAGE = 'https://i.imgur.com/8E3ucNx.png';
