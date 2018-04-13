import '../scss/index.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

let togglebutton = document.getElementById('togglebut');

function templateCard(data) {
  return `
  <div class="col-md-5">
  <div class="card text-center   ">
    <img class="card-img-card img-fluid" src="../src/img/card-bg.jpg" alt="Card image">
    <img class="card-img-top " src="../src/img/profile.svg" alt="Card image cap">
    <div class="card-body ">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text text-muted">${data.gender},${data.age}</p>

      <img
        class="card-img-view btn"
        src="../src/img/view-more.svg"
        data-toggle="collapse"
        data-target="#collapseExample-${data.id}"
        aria-expanded="false"
        aria-controls="collapseExample-${data.id}"
      >
      <div id="collapseExample-${data.id}" class="collapse">
        <div><h5>Relationship</h5>
        <p>${data.relationship}</p>
        </div>
        <div><h5>Biography</h5>
        <p>${data.biography}</p>
        </div>
        <div><h5>Other friend</h5>
        <p>${data.newname}</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

// function list view

function templateView(listdata) {
  return `<div class="container">
    <hr>
      <div class="d-flex justify-content-around"
      style="margin-bottom: 0.5em;"><img class="list-img-top imageProfile"
        src="../src/img/profile.svg"
        alt="Card image cap"
        >

        <h5>${listdata.name}</h5>
        <p>${listdata.gender},${listdata.age}</p>

          <img class="list-view btn" src="../src/img/view-more.svg"
          data-toggle="collapse"
          data-target="#collapseExample-${listdata.id}"
          aria-expanded="false"
          aria-controls="collapseExample-${listdata.id}" alt="View more">
        </div>
        <div id="collapseExample-${listdata.id}" class="collapse">
            <div><h5>Relationship</h5>
              <p>${listdata.relationship}</p>
            </div>
            <div><h5>Biography</h5>
              <p>${listdata.biography}</p>
            </div>
            <div><h5>Other friend</h5>
              <p>${listdata.newname}</p>
            </div>
          </div>
</div>`;
}

// testing func

// function templateView(listdata) {
//   return `<div class="container ">
//    <hr>
//     <div class="d-flex justify-content-around"><img class="list-img-top imageProfile order-1"
//     src="../src/img/profile.svg" alt="Card image cap">
//      <h5 class="order-2">${listdata.name}</h5
//      <p class="order-3">${listdata.gender},${listdata.age}</p>
//
//      <img class="list-view btn order-4" src="../src/img/view-more.svg"
//         data-toggle="collapse"
//         data-target="#collapseExample-${listdata.id}"
//         aria-expanded="false"
//         aria-controls="collapseExample-${listdata.id}">
//   </div>
//     <div id="collapseExample-${listdata.id}" class="collapse">
//         <div><h5>Relationship</h5>
//         <p>${listdata.relationship}</p>
//         </div>
//         <div><h5>Biography</h5>
//         <p>${listdata.biography}</p>
//         </div>
//         <div><h5>Other friend</h5>
//         <p>${listdata.newname}</p>
//         </div>
//      </div>
// </div>`;
// }

// function
const mappedRelationship = (friends) => friends.map((friend) => friend.relationship).join(', ');
const mappedOtherFriends = (friends) => friends.map((friend) => friend.name).join(', ');

function getData(newData) {
  let nameCard = '';
  let nameList = '';

  nameCard += '<div style="width:100%"><h4 class="col-2">Card View</h4></div>';
  nameList += '<h4 class="col-2">List View</h4>';

  for (let i = 0; i < newData.friends.length; i++) {
    const friendDetails = Object.assign(newData.friends[i], {
      relationship: mappedRelationship(newData.friends[i].friends),
      newname: mappedOtherFriends(newData.friends[i].friends)
    });

    nameCard += templateCard(friendDetails);
    nameList += templateView(friendDetails);
  }

  document.getElementById('whatever').innerHTML = nameCard;

  togglebutton.addEventListener('click', () => {
    if (togglebutton.checked) {
      document.getElementById('whatever').innerHTML = '<h4 class="col-2">"List View"</h4>';
      document.getElementById('whatever').innerHTML = nameList;
    } else {
      document.getElementById('whatever').innerHTML = nameCard;
    }
  });

}

fetch('http://www.json-generator.com/api/json/get/cqHzMtkErS?indent=2')
  .then(
    function (response) {

      // Examine the text in the response
      response.json().then(function (data) {
        getData(data.data);

      });
    });
