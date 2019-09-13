var holochain_connection = holochainclient.connect({ url: "ws://localhost:3401"});

// Render funcitons
function update_element(result, id) {
  var el = document.getElementById(id);
  var output = JSON.parse(result);
  el.textContent = " " + output.Ok;
}

function update_person(result) {
  var person = document.getElementById('entry_output');
  var output = JSON.parse(result);
  var output = JSON.parse(output.Ok.App[1]);
  person.textContent = " " + output.name;
}

// Zome calls

function hello() {
  var instance = document.getElementById('instance').value;
  holochain_connection.then(({callZome, close}) => {
    callZome(instance, 'hello', 'hello_holo')({"args": {} }).then((result) => update_element(result, 'output'))
  })
}

function create_person() {
  var name = document.getElementById('name').value;
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'create_person')({person: {name: name} }).then((result) => update_element(result, 'address_output'))
  })
}

function retrieve_person() {
  var address = document.getElementById('address_in').value;
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'retrieve_person')({address: address}).then((result) => update_person(result))
  })
}
