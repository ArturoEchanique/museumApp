const charactersAPI = new APIHandler();

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(({ data }) => {
        let result = ''
        data.forEach(elm => result += `
      <div class="character-info">
      <div class="name">Character id: ${elm.id}</div>
        <div class="name">Character Name: ${elm.name}</div>
        <div class="occupation">Character Occupation: ${elm.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${elm.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.weapon}</div>
      </div>`)

        document.querySelector('.characters-container').innerHTML = result
      })
      .catch(err => console.log(err))


  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    let node = document.querySelector('#fetch_id').value
    charactersAPI
      .getOneRegister(node)
      .then(elm => {
        let result =
          `<div class="character-info">
        <div class="name">Character Name: ${elm.data.name}</div>
        <div class="occupation">Character Occupation: ${elm.data.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${elm.data.cartoon}</div>
        <div class="weapon">Character Weapon: ${elm.data.weapon}</div>
      </div>`

        document.querySelector('.characters-container').innerHTML = result

      })
      .catch(err => console.log(err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    let node = document.querySelector('#delete_id').value
    charactersAPI
      .deleteOneRegister(node)
      .then(result => {
        console.log(result)
        if (result.statusText === "OK") {
          document.querySelector('.btn_edit').style.backgroundColor = "#008000"
        }
      })
      .catch(err => {
        document.querySelector('.btn_edit').style.backgroundColor = "#ff0000"
        console.log(err)
      })
  });



  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const name = document.querySelector("input[name='name']").value
    const occupation = document.querySelector("input[name='occupation']").value
    const weapon = document.querySelector("input[name='weapon']").value
    const cartoon = document.querySelector("input[name='cartoon']").checked
    const characterInfo = { name, occupation, weapon, cartoon }

    charactersAPI
      .createOneRegister(characterInfo)
      .then(result => {
        console.log(result)
        if (result.statusText === "OK") {
          document.querySelector('.btn_edit').style.backgroundColor = "#008000"
        }
      })
      .catch(err => {
        document.querySelector('.btn_edit').style.backgroundColor = "#ff0000"
        console.log(err)
      })
  });


  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()
    const characterId = document.querySelector("input[name='chr-id']").value
    const name = document.querySelector("input[name='edit_name']").value
    const occupation = document.querySelector("input[name='edit_occupation']").value
    const weapon = document.querySelector("input[name='edit_weapon']").value
    const cartoon = document.querySelector("input[name='edit_cartoon']").checked
    const characterInfo = { name, occupation, weapon, cartoon }

    charactersAPI
      .updateOneRegister(characterId, characterInfo)
      .then(result => {
        console.log(result)
        if (result.statusText === "OK") {
          document.querySelector('.btn_edit').style.backgroundColor = "#008000"
        }
      })
      .catch(err => {
        document.querySelector('.btn_edit').style.backgroundColor = "#ff0000"
        console.log(err)
      })
  });
});

