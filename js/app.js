const operContainer = document.getElementById('oper-container')
const benContainer = document.getElementById('ben-container')

const createDocs = (docsArr, type) => {

  let container

  type === 'oper' ? container = operContainer : container = benContainer

  container.innerHTML = docsArr.filter(doc => doc.target == type).map(doc => {
    return (`
                <div class="doc col-sm-6 col-md-4 slide">
                <div class="slide_content">
                    <div>${doc.title}</div>
                    <div class="slide_options">
                        <a href="ins_pdf/${'[' + doc.ver + ']' + '_' + doc.shortTitle}.pdf" target="_blank"
                            class="anchor_1">
                            <i class="icon-down-circled2 option_1">Otwórz PDF</i>
                        </a>

                        <a href="ins_pdf/${'[' + doc.ver + ']' + '_' + doc.shortTitle}.zip" download
                            class="anchor_2">
                            <i class="icon-file-archive option_2">Pobierz .zip</i>
                        </a>

                    </div>
                </div>
                <img alt="strona tytułowa" src="img/${'[' + doc.ver + ']' + '_' + doc.shortTitle}.png">
                <div class="doc_aside">
                    <div class="doc_info_head">${doc.shortTitle.toUpperCase()}</div>
                    <div class="doc_info">
                        <i class="icon-calendar-check-o"></i>Data przyjęcia: ${doc.publishDate}
                        <br>
                        <i class="icon-sort-number-up"></i>Numer wersji: ${doc.ver}
                        <br>
                        <i class="icon-bookmark"></i>Liczba stron: ${doc.pagesCount}
                        <br>
                        <i class="icon-back-in-time"></i>Poprzednia wersja: ${doc.prevVer}
                    </div>

                </div>
            </div>

`)
  }).join(' ')

}


fetch('https://docprovider.netlify.com/.netlify/functions/server', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json()).then(res => { createDocs(res.data, 'oper'); createDocs(res.data, 'ben'); console.log(res.data) })

