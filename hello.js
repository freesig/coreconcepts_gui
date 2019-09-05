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
function update_posts(result) {
  var list = document.getElementById('posts_output');
  list.innerHTML = "";
  var output = JSON.parse(result);
  var posts = output.Ok.sort((a, b) => a.timestamp - b.timestamp);
  for (post of posts) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(post.message);
    node.appendChild(textnode);
    list.appendChild(node);
  }
}

function create_post() {
  var message = document.getElementById('post').value;
  var instance = document.getElementById('instance').value;
  var timestamp = Date.now();
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'create_post')({message: message, timestamp: timestamp }).then((result) => update_element(result, 'post_output'))
  })
}
function retrieve_posts() {
  var address = document.getElementById('post_agent_id').value;
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    //callZome(instance, 'hello', 'retrieve_posts')({address: address}).then((result) => update_posts(result))
    callZome(instance, 'hello', 'retrieve_posts')({address: address}).then((result) => console.log(result))
  })
}
function get_agent_id() {
  var instance = document.getElementById('instance').value;
  holochainclient.connect({ url: "ws://localhost:3401"}).then(({callZome, close}) => {
    callZome(instance, 'hello', 'get_agent_id')({}).then((result) => update_element(result, 'agent_id'))
  })
}
