document.querySelector("#my-btn").addEventListener("click", function() {
  var A11 = Number(document.getElementById("A11").value);
  var A12 = Number(document.getElementById("A12").value);
  var A13 = Number(document.getElementById("A13").value);
  var A14 = Number(document.getElementById("A14").value);
  var A21 = Number(document.getElementById("A21").value);
  var A22 = Number(document.getElementById("A22").value);
  var A23 = Number(document.getElementById("A23").value);
  var A24 = Number(document.getElementById("A24").value);
  var A31 = Number(document.getElementById("A31").value);
  var A32 = Number(document.getElementById("A32").value);
  var A33 = Number(document.getElementById("A33").value);
  var A34 = Number(document.getElementById("A34").value);
  var A41 = Number(document.getElementById("A41").value);
  var A42 = Number(document.getElementById("A42").value);
  var A43 = Number(document.getElementById("A43").value);
  var A44 = Number(document.getElementById("A44").value);

  var B11 = Number(document.getElementById("B11").value);
  var B12 = Number(document.getElementById("B12").value);
  var B13 = Number(document.getElementById("B13").value);
  var B14 = Number(document.getElementById("B14").value);
  var B21 = Number(document.getElementById("B21").value);
  var B22 = Number(document.getElementById("B22").value);
  var B23 = Number(document.getElementById("B23").value);
  var B24 = Number(document.getElementById("B24").value);
  var B31 = Number(document.getElementById("B31").value);
  var B32 = Number(document.getElementById("B32").value);
  var B33 = Number(document.getElementById("B33").value);
  var B34 = Number(document.getElementById("B34").value);
  var B41 = Number(document.getElementById("B41").value);
  var B42 = Number(document.getElementById("B42").value);
  var B43 = Number(document.getElementById("B43").value);
  var B44 = Number(document.getElementById("B44").value);

  var C11 = document.getElementById("C11");
  var C12 = document.getElementById("C12");
  var C13 = document.getElementById("C13");
  var C14 = document.getElementById("C14");
  var C21 = document.getElementById("C21");
  var C22 = document.getElementById("C22");
  var C23 = document.getElementById("C23");
  var C24 = document.getElementById("C24");
  var C31 = document.getElementById("C31");
  var C32 = document.getElementById("C32");
  var C33 = document.getElementById("C33");
  var C34 = document.getElementById("C34");
  var C41 = document.getElementById("C41");
  var C42 = document.getElementById("C42");
  var C43 = document.getElementById("C43");
  var C44 = document.getElementById("C44");

  C11.innerHTML = A11 * B11 + A12 * B21 + A13 * B31 + A14 * B41;
  C12.innerHTML = A11 * B12 + A12 * B22 + A13 * B32 + A14 * B42;
  C13.innerHTML = A11 * B13 + A12 * B23 + A13 * B33 + A14 * B43;
  C14.innerHTML = A11 * B14 + A12 * B24 + A13 * B34 + A14 * B44;

  C21.innerHTML = A21 * B11 + A22 * B21 + A23 * B31 + A24 * B41;
  C22.innerHTML = A21 * B12 + A22 * B22 + A23 * B32 + A24 * B42;
  C23.innerHTML = A21 * B13 + A22 * B23 + A23 * B33 + A24 * B43;
  C24.innerHTML = A21 * B14 + A22 * B24 + A23 * B34 + A24 * B44;

  C31.innerHTML = A31 * B11 + A32 * B21 + A33 * B31 + A34 * B41;
  C32.innerHTML = A31 * B12 + A32 * B22 + A33 * B32 + A34 * B42;
  C33.innerHTML = A31 * B13 + A32 * B23 + A33 * B33 + A34 * B43;
  C34.innerHTML = A31 * B14 + A32 * B24 + A33 * B34 + A34 * B44;

  C41.innerHTML = A41 * B11 + A42 * B21 + A43 * B31 + A44 * B41;
  C42.innerHTML = A41 * B12 + A42 * B22 + A43 * B32 + A44 * B42;
  C43.innerHTML = A41 * B13 + A42 * B23 + A43 * B33 + A44 * B43;
  C44.innerHTML = A41 * B14 + A42 * B24 + A43 * B34 + A44 * B44;

  document.getElementById("result").style.display = "inline-block";
});
