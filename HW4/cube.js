var gl;

function testGLError(functionLastCalled) {
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
  // Backface (RED/WHITE) -> z = 0.5
  -0.5,
  -0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  0.0,
  0.0,
  0.5,
  0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  0.5,
  -0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  -0.5,
  -0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  -0.0,
  -0.0,
  -0.5,
  0.5,
  -0.5,
  1.0,
  0.0,
  0.0,
  1.0,
  -0.0,
  1.0,
  0.5,
  0.5,
  -0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  // Front (BLUE/WHITE) -> z = 0.5
  -0.5,
  -0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  -0.0,
  0.5,
  0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  1.0,
  0.5,
  -0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  1.0,
  -0.0,
  -0.5,
  -0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  -0.0,
  -0.5,
  0.5,
  0.5,
  0.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  1.0,
  0.5,
  0.5,
  0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  // LEFT (GREEN/WHITE) -> z = 0.5
  -0.5,
  -0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  -0.0,
  -0.0,
  -0.5,
  0.5,
  0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  1.0,
  1.0,
  -0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  1.0,
  0.0,
  -0.5,
  -0.5,
  -0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  -0.0,
  -0.0,
  -0.5,
  -0.5,
  0.5,
  0.0,
  1.0,
  0.0,
  1.0,
  -0.0,
  1.0,
  -0.5,
  0.5,
  0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  // RIGHT (YELLOE/WHITE) -> z = 0.5
  0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  1.0,
  -0.0,
  -0.0,
  0.5,
  0.5,
  0.5,
  1.0,
  1.0,
  0.0,
  1.0,
  1.0,
  1.0,
  0.5,
  0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  1.0,
  1.0,
  0.0,
  0.5,
  -0.5,
  -0.5,
  1.0,
  1.0,
  0.0,
  1.0,
  -0.0,
  -0.0,
  0.5,
  -0.5,
  0.5,
  1.0,
  1.0,
  0.0,
  1.0,
  -0.0,
  1.0,
  0.5,
  0.5,
  0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  // BOTTON (MAGENTA/WHITE) -> z = 0.5
  -0.5,
  -0.5,
  -0.5,
  1.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  -0.0,
  0.5,
  -0.5,
  0.5,
  1.0,
  0.0,
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
  1.0,
  1.0,
  0.0,
  -0.5,
  -0.5,
  -0.5,
  1.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  -0.0,
  -0.5,
  -0.5,
  0.5,
  1.0,
  0.0,
  1.0,
  1.0,
  -0.0,
  1.0,
  0.5,
  -0.5,
  0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  // TOP (CYAN/WHITE) -> z = 0.5
  -0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  -0.0,
  -0.0,
  0.5,
  0.5,
  0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  1.0,
  0.0,
  -0.5,
  0.5,
  -0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  -0.0,
  -0.0,
  -0.5,
  0.5,
  0.5,
  0.0,
  1.0,
  1.0,
  1.0,
  -0.0,
  1.0,
  0.5,
  0.5,
  0.5,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
  1.0,
];

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
    color[3],
    1.0,
    1.0, // v0
    -sx / 2,
    sy / 2,
    sz / 2,
    color[4],
    color[5],
    color[6],
    color[7],
    -0.0,
    1.0, // v1
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[8],
    color[9],
    color[10],
    color[11],
    -0.0,
    -0.0, // v2

    sx / 2,
    sy / 2,
    sz / 2,
    color[12],
    color[13],
    color[14],
    color[15],
    1.0,
    1.0, // v0
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[16],
    color[17],
    color[18],
    color[19],
    -0.0,
    -0.0, // v2
    sx / 2,
    -sy / 2,
    sz / 2,
    color[20],
    color[21],
    color[22],
    color[23],
    1.0,
    -0.0, // v3

    sx / 2,
    sy / 2,
    sz / 2,
    color[24],
    color[25],
    color[26],
    color[27],
    1.0,
    1.0, // v0
    sx / 2,
    -sy / 2,
    sz / 2,
    color[28],
    color[29],
    color[30],
    color[31],
    -0.0,
    1.0, // v3
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[32],
    color[33],
    color[34],
    color[35],
    -0.0,
    -0.0, // v4

    sx / 2,
    sy / 2,
    sz / 2,
    color[36],
    color[37],
    color[38],
    color[39],
    1.0,
    1.0, // v0
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[40],
    color[41],
    color[42],
    color[43],
    -0.0,
    -0.0, // v4
    sx / 2,
    sy / 2,
    -sz / 2,
    color[44],
    color[45],
    color[46],
    color[47],
    1.0,
    0.0, // v5

    sx / 2,
    sy / 2,
    sz / 2,
    color[48],
    color[49],
    color[50],
    color[51],
    1.0,
    1.0, // v0
    sx / 2,
    sy / 2,
    -sz / 2,
    color[52],
    color[53],
    color[54],
    color[53],
    1.0,
    0.0, // v5
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[56],
    color[57],
    color[58],
    color[59],
    -0.0,
    -0.0, // v6

    sx / 2,
    sy / 2,
    sz / 2,
    color[60],
    color[61],
    color[62],
    color[63],
    1.0,
    1.0, // v0
    -sx / 2,
    sy / 2,
    sz / 2,
    color[64],
    color[65],
    color[66],
    color[67],
    -0.0,
    1.0, // v1
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[68],
    color[69],
    color[70],
    color[71],
    -0.0,
    -0.0, // v6

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[72],
    color[73],
    color[74],
    color[75],
    -0.0,
    -0.0, // v7
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[76],
    color[77],
    color[78],
    color[78],
    -0.0,
    1.0, // v2
    sx / 2,
    -sy / 2,
    sz / 2,
    color[80],
    color[81],
    color[82],
    color[83],
    1.0,
    1.0, // v3

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[84],
    color[85],
    color[86],
    color[87],
    -0.0,
    -0.0, // v7
    sx / 2,
    -sy / 2,
    sz / 2,
    color[88],
    color[89],
    color[90],
    color[91],
    1.0,
    1.0, // v3
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[92],
    color[93],
    color[94],
    color[95],
    1.0,
    0.0, // v4

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[96],
    color[97],
    color[98],
    color[99],
    -0.0,
    -0.0, // v7
    -sx / 2,
    sy / 2,
    sz / 2,
    color[100],
    color[101],
    color[102],
    color[103],
    1.0,
    1.0, // v1
    -sx / 2,
    -sy / 2,
    sz / 2,
    color[104],
    color[105],
    color[106],
    color[107],
    -0.0,
    1.0, // v2

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[108],
    color[109],
    color[110],
    color[111],
    -0.0,
    -0.0, // v7
    -sx / 2,
    sy / 2,
    sz / 2,
    color[112],
    color[113],
    color[114],
    color[115],
    1.0,
    1.0, // v1
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[116],
    color[117],
    color[118],
    color[119],
    1.0,
    0.0, // v6

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[120],
    color[121],
    color[122],
    color[123],
    -0.0,
    -0.0, // v7
    -sx / 2,
    sy / 2,
    -sz / 2,
    color[124],
    color[125],
    color[126],
    color[127],
    -0.0,
    1.0, // v6
    sx / 2,
    sy / 2,
    -sz / 2,
    color[128],
    color[129],
    color[130],
    color[131],
    1.0,
    1.0, // v5

    -sx / 2,
    -sy / 2,
    -sz / 2,
    color[132],
    color[133],
    color[134],
    color[135],
    0.0,
    0.0, // v7
    sx / 2,
    sy / 2,
    -sz / 2,
    color[136],
    color[137],
    color[138],
    color[139],
    1.0,
    1.0, // v5
    sx / 2,
    -sy / 2,
    -sz / 2,
    color[140],
    color[141],
    color[142],
    color[143],
    1.0, // v4
    -0.0,
  ];

  return vertexArray;
}

function initialiseBuffer() {
  gl.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(createCubePos(1.0, 1.0, 1.0)),
    gl.STATIC_DRAW
  );

  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 red pixel.
  /*
  const texData = new Uint8Array([
    255,
    0,
    0,
    255,
    0,
    255,
    0,
    255,
    0,
    0,
    255,
    255,
    255,
    255,
    0,
    255,
  ]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    2,
    2,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texData
  );
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST); // It is default
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  */
  // Asynchronously load an image

  var image = new Image();
  image.src = "photo.jpg";
  image.addEventListener("load", function () {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  });

  return testGLError("initialiseBuffers and texture initialize");
}

function initialiseShaders() {
  var fragmentShaderSource =
    "\
			varying highp vec4 color; \
			varying mediump vec2 texCoord;\
			uniform sampler2D sampler2d;\
			void main(void) \
			{ \
				gl_FragColor = 0.0 * color + 1.0 * texture2D(sampler2d, texCoord); \
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
  attribute highp vec2 myUV;\
			uniform mediump mat4 mMat; \
			uniform mediump mat4 vMat; \
			uniform mediump mat4 pMat; \
			varying  highp vec4 color;\
			varying mediump vec2 texCoord;\
			void main(void)  \
			{ \
				gl_Position = pMat * vMat * mMat * myVertex; \
				gl_PointSize = 8.0; \
				color = myColor; \
				texCoord = myUV; \
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
  gl.bindAttribLocation(gl.programObject, 2, "myUV");
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
  // console.log("myVertex Location is: ", gl.getAttribLocation(gl.programObject, "myColor"));

  return testGLError("initialiseShaders");
}

flag_animation = 0;
function toggleAnimation() {
  flag_animation ^= 1;
}

rotY = 0.0;

function renderScene() {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0); // Added for depth Test

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Added for depth Test
  gl.enable(gl.DEPTH_TEST); // Added for depth Test

  var mMatLocation = gl.getUniformLocation(gl.programObject, "mMat");
  var vMatLocation = gl.getUniformLocation(gl.programObject, "vMat");
  var pMatLocation = gl.getUniformLocation(gl.programObject, "pMat");
  var mMat = [];
  mat4.translate(mMat, mMat, [0.5, 0.0, 0.0]);
  mat4.fromYRotation(mMat, rotY);
  if (flag_animation) {
    rotY += 0.01;
  }
  var vMat = [];
  mat4.lookAt(vMat, [0.0, 0.0, 2.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
  var pMat = [];
  mat4.identity(pMat);
  mat4.perspective(pMat, 3.14 / 2.0, 800.0 / 600.0, 0.5, 5);

  gl.uniformMatrix4fv(mMatLocation, gl.FALSE, mMat);
  gl.uniformMatrix4fv(vMatLocation, gl.FALSE, vMat);
  gl.uniformMatrix4fv(pMatLocation, gl.FALSE, pMat);

  if (!testGLError("gl.uniformMatrix4fv")) {
    return false;
  }
  //vertexData[0] += 0.01;

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 36, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 36, 12);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 36, 28);
  //gl.vertexAttrib4f(1, 1.0, 0.0, 1.0, 1.0);

  if (!testGLError("gl.vertexAttribPointer")) {
    return false;
  }

  gl.drawArrays(gl.TRIANGLES, 0, 36);
  // gl.drawArrays(gl.LINE_STRIP, 0, 36);
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

  // renderScene();
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
