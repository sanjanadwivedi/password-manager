//logic to fill the tableee
function MaskPassword(pass) {
  let str = '';
  for (let index = 0; index < pass.length; index++) {
    str += '*';
  }
  return str;
}
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      alert('Copied!!');
    },
    () => {
      alert('Copying text failed');
    }
  );
}

const deletePasswords = website => {
  let data = localStorage.getItem('passwords');
  let arr = JSON.parse(data);
  arrUpdated = arr.filter(e => {
    return e.website != website;
  });
  localStorage.setItem('passwords', JSON.stringify(arrUpdated));
  alert(`Successfully deleted ${website}'s password`);
  showPasswords();
};
const showPasswords = () => {
  let tb = document.querySelector('table');
  let data = localStorage.getItem('passwords');
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = 'No data to show';
  } else {
    tb.innerHTML = `<tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
    </tr>`;
    let str = '';
    let arr = JSON.parse(data);
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      str += `<tr>
    <td> ${element.website} <img
    src="copy.svg" onclick="copyText('${element.website}')"
    alt="Copy Icon"
    width="10px"
    height="10px"
  /></td>
    <td> ${element.username}<img
    src="copy.svg" onclick="copyText('${element.username}')"
    alt="Copy Icon"
    width="10px"
    height="10px"
  /> </td>
    <td>${MaskPassword(element.password)}<img
    src="copy.svg" onclick="copyText('${element.password}')"
    alt="Copy Icon"
    width="10px"
    height="10px"
  />
   </td>
    <td> <button class="btnsm" onclick = "deletePasswords('${
      element.website
    }')">Delete</button> </td>
  </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = '';
  username.value = '';
  password.value = '';
};

console.log('working');
showPasswords();
document.querySelector('.btn').addEventListener('click', e => {
  e.preventDefault();
  console.log('clicked....');
  console.log(username.value, password.value);
  let passwords = localStorage.getItem('passwords');
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert('Password saved');
    localStorage.setItem('passwords', JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem('passwords'));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert('Password saved');
    localStorage.setItem('passwords', JSON.stringify(json));
  }
  showPasswords();
});
