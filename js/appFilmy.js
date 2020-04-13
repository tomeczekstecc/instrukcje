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
      console.log(doc.premiereTag);
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

// fetch('https://docprovider.netlify.com/.netlify/functions/server', {
fetch('https://dokmenagier.herokuapp.com/api/films', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((res) => {
    createDocs(res.data, 'oper', 'film', false);
    createDocs(res.data, 'ben', 'film', false);
    console.log(res.data);
  });

setTimeout(addItemCss, 1000);

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
    console.log(newDoc);
    item.appendChild(newDiv);
  });

  // newDoc.appendChild(newDiv);
}
