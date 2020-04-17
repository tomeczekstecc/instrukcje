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
                <div id = "${premiereTag}" class="col-sm-6 film ${premiereTag}">
                <figcaption>${doc.title}
                    <iframe src=${doc.linkYT} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </figcaption>
            </div>

`;
    })
    .join(' ');
};

const fetchData = async () => {
  const docsData = await fetch('https://dokmenagier.herokuapp.com/api/films');
  const data = await docsData.json();
  createDocs(data.data, 'oper', 'film', false);
  createDocs(data.data, 'ben', 'film', false);
  addItemCss();
};

fetchData();

function addItemCss() {
  const newDoc = document.querySelectorAll('.newDoc');
  newDoc.forEach((item) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = '<h3>NOWOŚĆ</h3>';
    newDiv.style.transform = 'rotate(0deg)';
    newDiv.style.top = '22px';
    newDiv.style.left = '0%';
    newDiv.style.maxWidth = '22%';
    newDiv.style.height = '15%';
    newDiv.style.paddingTop = '.5em';
    newDiv.style.fontSize = '.95em';

    newDiv.style.marginLeft = '15px';
    newDiv.id = 'newItem';
    item.appendChild(newDiv);
  });
}
