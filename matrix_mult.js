var result = document.getElementById("result");

document.querySelector("#my-btn").addEventListener("click", function() {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      let sum = 0;
      for (let k = 1; k < 5; k++) {
        let x = Number(document.getElementById("A" + i + k).value);
        let y = Number(document.getElementById("B" + k + j).value);
        sum = sum + x * y;
      }
      document.getElementById("C" + i + j).innerHTML = sum;
    }
  }

  result.style.display = "inline-block";
});

document.querySelector("#my-btn2").addEventListener("click", function() {
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      document.getElementById("A" + i + j).value = "";
      document.getElementById("B" + i + j).value = "";
    }
  }
  result.style.display = "none";
});
