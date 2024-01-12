const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const statusCheck = document.querySelector('#status-input');
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const selectFilter = document.querySelector('#filter-select');



// izleme işlmeleri
formBtn.addEventListener('click', addExpense);
liste.addEventListener('click', handleClick);
selectFilter.addEventListener("change", handleFilter);


// toplam state'i (durum)
let toplam = 0;

function updateToplam(fiyat){
    toplam += Number(fiyat);
    toplamBilgi.innerText = toplam;
}


// harcama oluşturma
function addExpense(e){
    e.preventDefault();
    if(!fiyatInput.value || !harcamaInput.value) {
    alert('Formları doldurun');
    //fonksiyonu durduruyoruz
    return;
}
    


// div oluşturma
const harcamaDiv = document.createElement('div');

// class ekleme
harcamaDiv.classList.add("harcama");
// eğer checkbox tıklandıysa bir class daha eklendi
if (statusCheck.checked){
    harcamaDiv.classList.add('payed');
}

// içeriğini ayarlama
harcamaDiv.innerHTML = `
<h2>${harcamaInput.value}</h2>
<h2 id="value">${fiyatInput.value}</h2>
<div class="buttons">
<img id = "payment" src="images/pay.png">
<img id = "remove" src="images/remove.png">
</div>
`;
// oluşan harcama divi html gönderme(listeye ekleme)
liste.appendChild(harcamaDiv);


// toplamı güncelle
updateToplam(fiyatInput.value);


//formu temizleme
harcamaInput.value = '';
fiyatInput.value ='';
}


// listeye tıklanma olayını yönetme
function handleClick(e){
    //tıklanılan elamanı alma
const element = e.target;

if(element.id === 'remove') {
    //tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;

        //silinen elemanın fiyatını alma
   const deletedprice = wrapperElement.querySelector('#value').innerText;


  //silinenin fiyatını toplamdan çıkarma
  updateToplam( - Number(deletedprice));

    // kapsayıcıuı htmlden kaldırma
    wrapperElement.remove();

}

}

// filtreleme işlemi
function handleFilter(e) {
    const items = liste.childNodes;
  
    items.forEach((item) => {
      switch (e.target.value) {
        case 'all':
          item.style.display = 'flex';
          break;
  
        case 'payed':
          if (!item.classList.contains('payed')) {
            item.style.display = 'none';
          } else {
            item.style.display = 'flex';
          }
  
          break;
  
        case 'not-payed':
          if (item.classList.contains('payed')) {
            item.style.display = 'none';
          } else {
            item.style.display = 'flex';
          }
          break;
      }
    });
  }
  