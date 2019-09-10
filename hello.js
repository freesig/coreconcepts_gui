function hello() {
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'hello_holo')({"args": {} }).then((result) => update_element(result, 'output'))
  })
}
function update_element(result, id) {
  var el = document.getElementById(id);
  var output = JSON.parse(result);
  el.textContent = " " + output.Ok;
}
function display_posts(result) {
  var list = document.getElementById('posts_output');
  list.innerHTML = "";
  var output = JSON.parse(result);
  console.log(output.Ok);
  var posts = output.Ok.sort((a, b) => a[1].timestamp - b[1].timestamp);
  for (i of posts.entries()) {
    var post = i[1];
    var node = document.createElement("LI");
    var id = "list_item" + i[0];
    var address = "<input id="+ id +" type=\"hidden\" value=\"" + post[0] + "\">";
    var delete_button = "<button onclick=\"delete_post(" + id + ")\" type=\"button\">Delete</button>"
    var edit_button = "<button onclick=\"edit_post(this.parentNode)\" type=\"button\">Edit</button>"
    node.innerHTML = post[1].message + address + " " + edit_button + " " + delete_button; 
    list.appendChild(node);
  }
}

function delete_post(id) {
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'delete_post')({post_address: id.value}).then((result) => console.log(result))
  })
}
function edit_post(parent_node) {
  var node = document.createElement("DIV");
  var message = parent_node.childNodes[0].data;
  console.log(message);
  var post_id = parent_node.childNodes[1].value;
  var submit_button = "<button onclick=\"update_post(\'" + post_id + "\', \'" + message + "\')\" type=\"button\">Submit</button>";
  node.innerHTML = "<input type=\"text\" value=\"" + message + "\"> " + submit_button;
  parent_node.appendChild(node);
}

function update_post(address, message) {
  console.log(address);
  console.log(message);
  var timestamp = Date.now();
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'update_post')({post_address: address, message, timestamp}).then((result) => console.log(result))
  })
}

function create_post() {
  var message = document.getElementById('post').value;
  var instance = document.getElementById('instance').value;
  var timestamp = Date.now();
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'create_post')({message: message, timestamp: timestamp }).then((result) => update_element(result, 'post_address'))
  })
}

function retrieve_posts() {
  var address = document.getElementById('post_agent_id').value;
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'retrieve_posts')({address: address}).then((result) => display_posts(result))
  })
}

function get_agent_id() {
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'get_agent_id')({}).then((result) => update_element(result, 'agent_id'))
  })
}
