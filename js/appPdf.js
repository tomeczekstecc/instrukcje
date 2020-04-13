const operContainer = document.getElementById('oper-container');
const benContainer = document.getElementById('ben-container');

const createDocs = (docsArr, type, isArchived) => {
  let container;

  type === 'oper' ? (container = operContainer) : (container = benContainer);

  container.innerHTML = docsArr
    .filter(doc => (doc.target == type && doc.archived == isArchived))
    .sort((a, b) => a.order - b.order)
    .map(doc => {
      let premiereTag;
      doc.premiereTag === true
        ? (premiereTag = 'newDoc')
        : (premiereTag = 'wDoc');
      console.log(doc.premiereTag);
      return `
                <div id = "${premiereTag}"class="doc col-sm-6 col-md-4 slide ${premiereTag}"  >
                <div class="slide_content">
                    <div>${doc.title}</div>
                    <div class="slide_options">
                        <a href="http://bestcodes.pl/lsi/pdf_host/${'[' +
                          doc.ver +
                          ']' +
                          '_' +
                          doc.shortTitle +
                          '_' +
                          doc.target}.pdf" target="_blank"
                            class="anchor_1">
                            <i class="icon-down-circled2 option_1">Otwórz PDF</i>
                        </a>
                    </div>
                </div>
                <img alt="strona tytułowa" src="app_files/img/thumbnail.png">
                <div class="doc_aside">
                    <div class="doc_info_head">${doc.shortTitle.toUpperCase()}</div>
                    <div class="doc_info">
                        <i class="icon-calendar-check-o"></i>Data przyjęcia: ${
                          doc.publishDate
                        }
                        <br>
                        <i class="icon-sort-number-up"></i>Numer wersji: ${
                          doc.ver
                        }
                        <br>
                        <i class="icon-bookmark"></i>Liczba stron: ${
                          doc.pagesCount
                        }
                        <br>
                        <i class="icon-back-in-time"></i>Poprzednia wersja: ${
                          doc.prevVer
                        }
                    </div>

                </div>
            </div>

`;
    })
    .join(' ');
};

fetch('https://dokmenagier.herokuapp.com/api/pdfs', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((res) => {
    createDocs(res.data, 'oper', false);
    createDocs(res.data, 'ben', false);
    console.log(res.data);
  });

setTimeout(addItemCss, 700);

function addItemCss() {
  const newDoc = document.querySelectorAll('.newDoc');
  newDoc.forEach(item => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = '<h3>NOWOŚĆ</h3>';
    newDiv.id = 'newItem';
    console.log(newDoc);
    item.appendChild(newDiv);
  });

  // newDoc.appendChild(newDiv);
}
