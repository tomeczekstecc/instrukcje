const operContainer = document.getElementById('oper-container');
const benContainer = document.getElementById('ben-container');

const createDocs = (docsArr, target, type, isArchived) => {
  let container;

  target === 'oper' ? (container = operContainer) : (container = benContainer);

  container.innerHTML = docsArr
    .filter(
      (doc) =>
        doc.target == target && doc.archived == isArchived && doc.type == type
    )
    .sort((a, b) => a.order - b.order)
    .map((doc) => {
      let premiereTag;
      doc.premiereTag === true
        ? (premiereTag = 'newDoc')
        : (premiereTag = 'wDoc');
      return `
                <div id = "${premiereTag}"class="doc col-sm-6 col-md-4 slide ${premiereTag}"  >
                <div class="slide_content">
                    <div>${doc.title}</div>
                    <div class="slide_options">
                        <a href="http://bestcodes.pl/lsi/pdf_host/${
                          '[' +
                          doc.ver +
                          ']' +
                          '_' +
                          doc.shortTitle +
                          '_' +
                          doc.target
                        }.pdf" target="_blank"
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

const fetchData = async () => {
  const docsData = await fetch('https://dokmenagier.herokuapp.com/api/pdfs');
  const data = await docsData.json();

  createDocs(data.data, 'oper', 'pdf', false);
  createDocs(data.data, 'ben', 'pdf', false);
  addItemCss();
};

fetchData();

function addItemCss() {
  const newDoc = document.querySelectorAll('.newDoc');
  newDoc.forEach((item) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = '<h3>NOWOŚĆ</h3>';
    newDiv.id = 'newItem';
    item.appendChild(newDiv);
  });
}
