var gl;

function testGLError(functionLastCalled) {
  /* gl.getError returns the last error that occurred using WebGL for debugging */

  var lastError = gl.getError();

  if (lastError != gl.NO_ERROR) {
    alert(functionLastCalled + " failed (" + lastError + ")");
    return false;
  }
  return true;
}

function initialiseGL(canvas) {
  try {
    // Try to grab the standard context. If it fails, fallback to experimental
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
  } catch (e) {}

  if (!gl) {
    alert("Unable to initialise WebGL. Your browser may not support it");
    return false;
  }
  return true;
}

var shaderProgram;
var vertexData = [
  -0.5,
  -0.5,
  0.5,
  1.0,
  0.0,
  1.0,
  1.0, // First Triangle
  -0.5,
  0.5,
  0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  0.5,
  0.5,
  0.5,
  1.0,
  0.0,
  0.0,
  1.0,

  0.5,
  0.5,
  -0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  0.5,
  -0.5,
  -0.5,
  1.0,
  0.0,
  1.0,
  1.0, // Second Triangle
  -0.5,
  0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,

  // You need to make here!
];
var elementData = [0, 1];

function createCubePos(sx, sy, sz) {
  // 1.0 1.0 1.0 쓰면
  //0.5 0.5 0.5 r g b a 36 * 7 elements 1차원

  var color = new Array(); // color 항상 다르게
  for (let i = 0; i < 4 * 36; i++) {
    color[i] = Math.random();
  }

  var vertexArray = [
    sx / 2,
    sy / 2,
    sz / 2,
    color[0],
    color[1],
    color[2],
    color[3], // v0
    -sx / 2,
    sy / 2,
    sz / 2,
    color[4],
    color[5],
    color[6],
    color[7], // v1
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[8],
    color[9],
    color[10],
    color[11], // v2

    sx / 2,
    sy / 2,
    sz / 2,
    color[12],
    color[13],
    color[14],
    color[15], // v0
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[16],
    color[17],
    color[18],
    color[19], // v2
    sx / 2,
    -sy / 2,
    sz / 2,
    color[20],
    color[21],
    color[22],
    color[23], // v3

    sx / 2,
    sy / 2,
    sz / 2,
    color[24],
    color[25],
    color[26],
    color[27], // v0
    sx / 2,
    -sy / 2,
    sz / 2,
    color[28],
    color[29],
    color[30],
    color[31], // v3
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[32],
    color[33],
    color[34],
    color[35], // v4

    sx / 2,
    sy / 2,
    sz / 2,
    color[36],
    color[37],
    color[38],
    color[39], // v0
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[40],
    color[41],
    color[42],
    color[43], // v4
    sx / 2,
    sy / 2,
    -sz / 2,
    color[44],
    color[45],
    color[46],
    color[47], // v5

    sx / 2,
    sy / 2,
    sz / 2,
    color[48],
    color[49],
    color[50],
    color[51], // v0
    sx / 2,
    sy / 2,
    -sz / 2,
    color[52],
    color[53],
    color[54],
    color[53], // v5
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[56],
    color[57],
    color[58],
    color[59], // v6

    sx / 2,
    sy / 2,
    sz / 2,
    color[60],
    color[61],
    color[62],
    color[63], // v0
    -sx / 2,
    sy / 2,
    sz / 2,
    color[64],
    color[65],
    color[66],
    color[67], // v1
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[68],
    color[69],
    color[70],
    color[71], // v6

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[72],
    color[73],
    color[74],
    color[75], // v7
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[76],
    color[77],
    color[78],
    color[78], // v2
    sx / 2,
    -sy / 2,
    sz / 2,
    color[80],
    color[81],
    color[82],
    color[83], // v3

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[84],
    color[85],
    color[86],
    color[87], // v7
    sx / 2,
    -sy / 2,
    sz / 2,
    color[88],
    color[89],
    color[90],
    color[91], // v3
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[92],
    color[93],
    color[94],
    color[95], // v4

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[96],
    color[97],
    color[98],
    color[99], // v7
    -sx / 2,
    sy / 2,
    sz / 2,
    color[100],
    color[101],
    color[102],
    color[103], // v1
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[104],
    color[105],
    color[106],
    color[107], // v2

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[108],
    color[109],
    color[110],
    color[111], // v7
    -sx / 2,
    sy / 2,
    sz / 2,
    color[112],
    color[113],
    color[114],
    color[115], // v1
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[116],
    color[117],
    color[118],
    color[119], // v6

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[120],
    color[121],
    color[122],
    color[123], // v7
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[124],
    color[125],
    color[126],
    color[127], // v6
    sx / 2,
    sy / 2,
    -sz / 2,
    color[128],
    color[129],
    color[130],
    color[131], // v5

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[132],
    color[133],
    color[134],
    color[135], // v7
    sx / 2,
    sy / 2,
    -sz / 2,
    color[136],
    color[137],
    color[138],
    color[139], // v5
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[140],
    color[141],
    color[142],
    color[143], // v4
  ];

  return vertexArray;
}

function initialiseBuffer() {
  // var vertextData=[-0.4, -0.4, 0.0, 0.4, -0.4, 0.0,
  // 0.0, 0.4, 0.0]; // triangle
  gl.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(createCubePos(1.0, 1.0, 1.0)),
    gl.STATIC_DRAW
  );

  gl.elementBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.elementBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(elementData),
    gl.STATIC_DRAW
  );

  return testGLError("initialiseBuffers");
}

function initialiseShaders() {
  var fragmentShaderSource =
    "\
			varying highp vec4 color; \
			void main(void) \
			{ \
				gl_FragColor = color; \
			}";

  gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(gl.fragShader, fragmentShaderSource);
  gl.compileShader(gl.fragShader);
  // Check if compilation succeeded
  if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
    alert(
      "Failed to compile the fragment shader.\n" +
        gl.getShaderInfoLog(gl.fragShader)
    );
    return false;
  }

  // Vertex shader code
  var vertexShaderSource =
    "\
			attribute highp vec4 myVertex; \
			attribute highp vec4 myColor; \
			uniform mediump mat4 transformationMatrix; \
			uniform mediump mat4 virwMatrix; \
			uniform mediump mat4 projMatrix; \
			varying highp vec4 color;\
			void main(void)  \
			{ \
				gl_Position = transformationMatrix * myVertex; \
				color = myColor; \
			}";

  gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(gl.vertexShader, vertexShaderSource);
  gl.compileShader(gl.vertexShader);
  // Check if compilation succeeded
  if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
    alert(
      "Failed to compile the vertex shader.\n" +
        gl.getShaderInfoLog(gl.vertexShader)
    );
    return false;
  }

  // Create the shader program
  gl.programObject = gl.createProgram();
  // Attach the fragment and vertex shaders to it
  gl.attachShader(gl.programObject, gl.fragShader);
  gl.attachShader(gl.programObject, gl.vertexShader);
  // Bind the custom vertex attribute "myVertex" to location 0
  gl.bindAttribLocation(gl.programObject, 0, "myVertex");
  gl.bindAttribLocation(gl.programObject, 1, "myColor");
  // Link the program
  gl.linkProgram(gl.programObject);
  // Check if linking succeeded in a similar way we checked for compilation errors
  if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
    alert(
      "Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject)
    );
    return false;
  }

  gl.useProgram(gl.programObject);
  console.log(
    "myVertex Location is: ",
    gl.getAttribLocation(gl.programObject, "myColor")
  );

  return testGLError("initialiseShaders");
}

var rotY = 0.0;

function renderScene() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  var matrixLocation = gl.getUniformLocation(
    gl.programObject,
    "transformationMatrix"
  );
  var transformationMatrix = [
    Math.cos(rotY),
    0.0,
    -Math.sin(rotY),
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    Math.sin(rotY),
    0.0,
    Math.cos(rotY),
    0.5, // For pseudo perspective View
    0.0,
    0.0,
    0.0,
    1.0,
  ];
  rotY += 0.01;

  gl.uniformMatrix4fv(matrixLocation, gl.FALSE, transformationMatrix);

  if (!testGLError("gl.uniformMatrix4fv")) {
    return false;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 28, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 28, 12);
  // gl.vertexAttrib4f(1, Math.random(), 0.0, 1.0, 1.0);

  if (!testGLError("gl.vertexAttribPointer")) {
    return false;
  }

  // gl.lineWidth(6.0);  // It is not working at Chrome!
  // gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0);
  // gl.drawArrays(gl.POINTS, 0, 6);
  // gl.drawArrays(gl.LINES, 0, 6);
  //gl.drawArrays(gl.LINE_STRIP, 0, 36);
  gl.drawArrays(gl.TRIANGLES, 0, 36);
  console.log(
    "Enum for Primitive Assumbly",
    gl.TRIANGLES,
    gl.TRIANGLE,
    gl.POINTS
  );
  if (!testGLError("gl.drawArrays")) {
    return false;
  }

  return true;
}

function main() {
  var canvas = document.getElementById("helloapicanvas");

  if (!initialiseGL(canvas)) {
    return;
  }

  if (!initialiseBuffer()) {
    return;
  }

  if (!initialiseShaders()) {
    return;
  }

  // Render loop
  requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000, 60);
      }
    );
  })();

  (function renderLoop() {
    if (renderScene()) {
      // Everything was successful, request that we redraw our scene again in the future
      requestAnimFrame(renderLoop);
    }
  })();
}
